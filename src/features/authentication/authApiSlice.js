import { apiSlice } from '../../app/api/apiSlice';
import { logOut, setCredentials } from './authSlice2';

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (credentials) => ({
				url: '/users/login',
				method: 'POST',
				body: { ...credentials },
			}),
		}),
		signInWithGoogle: builder.mutation({
			query: (credentials) => ({
				url: '/users/google-signin',
				method: 'POST',
				body: { ...credentials },
			}),
		}),
		signup: builder.mutation({
			query: (credentials) => ({
				url: '/users/signup',
				method: 'POST',
				body: { ...credentials },
			}),
		}),
		verifyOtp: builder.mutation({
			query: (credentials) => ({
				url: '/users/verify-otp',
				method: 'POST',
				body: { ...credentials },
			}),
		}),
		forgotPassword: builder.mutation({
			query: (email) => ({
				url: '/users/forgot-password',
				method: 'POST',
				body: { email },
			}),
		}),
		resetPassword: builder.mutation({
			query: (credentials) => ({
				url: `users/reset-password/${credentials.resetToken}`,
				method: 'PATCH',
				body: { password: credentials.password },
			}),
		}),
		updatePassword: builder.mutation({
			query: (credentials) => ({
				url: 'users/update-my-password',
				method: 'PATCH',
				body: { ...credentials },
			}),
		}),
		updatePhoneNumber: builder.mutation({
			query: (credentials) => ({
				url: 'users/update-my-phone-number',
				method: 'PATCH',
				body: { ...credentials },
			}),
		}),
		updateMe: builder.mutation({
			query: (body) => ({
				url: 'users/update-me',
				method: 'PATCH',
				body,
			}),
		}),
		sendLogout: builder.mutation({
			query: () => ({
				url: '/users/logout',
				method: 'DELETE',
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;

					dispatch(logOut());
					setTimeout(() => {
						dispatch(apiSlice.util.resetApiState());
					}, 1000);
				} catch (err) {
					console.log(err);
				}
			},
		}),
		refresh: builder.mutation({
			query: () => ({
				url: '/users/refresh',
				method: 'GET',
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					const { accessToken } = data;
					dispatch(setCredentials({ accessToken }));
				} catch (err) {
					console.log(err);
				}
			},
		}),
	}),
});

export const {
	useLoginMutation,
	useSignupMutation,
	useVerifyOtpMutation,
	useSendLogoutMutation,
	useRefreshMutation,
	useForgotPasswordMutation,
	useResetPasswordMutation,
	useUpdatePasswordMutation,
	useSignInWithGoogleMutation,
	useUpdatePhoneNumberMutation,
	useUpdateMeMutation,
} = authApiSlice;
