import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import API from '../../services/httpService';
import { toast } from 'react-toastify';
import decode from 'jwt-decode';
import Cookies from 'js-cookie';

// Define a type for the slice state

// Define the initial state using that type
const initialState = {
	user: null,
	status: 'idle',
	error: null,
};

export const login = createAsyncThunk(
	'users/login',
	async (userData, thunkApi) => {
		try {
			const { email, password, navigate } = userData;
			const { data } = await API.post('/users/login', {
				email,
				password,
			});

			console.log('user is admin', data?.user?.role === 'admin');
			if (data?.user?.role === 'admin') {
				navigate('/dashboard');
			} else {
				navigate('/');
			}
			return data;
		} catch (err) {
			// console.log(err.response.data.message);
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const logout = createAsyncThunk(
	'users/logout',
	async (data, thunkApi) => {
		try {
			const response = await API.delete('/users/logout');

			if (response.status === 200) return null;
		} catch (err) {
			// console.log(err.response.data.message);
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const signup = createAsyncThunk(
	'users/signup',
	async (signUpData, thunkApi) => {
		try {
			const { data } = await API.post('/users/signup', signUpData);
			return data;
		} catch (err) {
			// console.log(err.response.data.message);
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const resetPassword = createAsyncThunk(
	'users/resetPassword',
	async (resetData, thunkApi) => {
		const { resetToken, password, passwordConfirm } = resetData;
		try {
			const { data } = await API.patch(`/users/resetPassword/${resetToken}`, {
				password,
				passwordConfirm,
			});
			toast.success('Password reset successfully');

			return data;
		} catch (err) {
			// console.log(err.response.data.message);
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const getUser = createAsyncThunk(
	'users/getuser',
	async (data, thunkApi) => {
		try {
			const data = Cookies.get('accessToken');
			if (data === 'loggedout' || data === undefined)
				return thunkApi.rejectWithValue('User not logged in');

			const token = data;

			const decodedUser = decode(token);

			const existingUser = {
				user: {
					name: decodedUser?.name,
					email: decodedUser?.email,
					role: decodedUser?.role,
					photo: decodedUser?.photo,
					_id: decodedUser?._id,
				},
				status: 'success',
			};

			return existingUser;
		} catch (err) {
			// console.log(err.response.data.message);
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const forgotPassword = createAsyncThunk(
	'users/forgotPassword',
	async (email, thunkApi) => {
		try {
			const { data } = await API.post('/users/forgotPassword', {
				email,
			});
			toast.success('Password reset link sent to your email');
			return data;
		} catch (err) {
			// console.log(err.response.data.message);
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const updatePassword = createAsyncThunk(
	'users/updatePassword',
	async (passwordData, thunkApi) => {
		console.log(passwordData);
		try {
			const { data } = await API.patch('/users/updateMyPassword', passwordData);
			toast.success('Password updated successfully');
			return data;
		} catch (err) {
			// console.log(err.response.data.message);
			toast.error('Unexpected error happened!');
			return thunkApi.rejectWithValue(err.response.data.message);
		}
	}
);

export const updateMe = createAsyncThunk(
	'user/updateMe',
	async (userData, thunkApi) => {
		console.log(userData);
		try {
			const { data } = await API.patch('/users/updateMe', userData);
			console.log(data);
			toast.success('Profile updated successfully');

			return data;
		} catch (error) {
			toast.error(error.response.data.message);
			return thunkApi.rejectWithValue(error.response.data.message);
		}
	}
);

export const authSlice = createSlice({
	name: 'auth',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(login.fulfilled, (state, action) => {
				// const navigate = useNavigate();

				state.status = 'succeed';
				state.user = action.payload;
				// navigate('/home');
			})
			.addCase(login.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(signup.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(signup.fulfilled, (state, action) => {
				// console.log(state);

				state.status = 'succeed';
				toast.success(action.payload.message);
				// console.log(action.payload);
			})
			.addCase(signup.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(getUser.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(getUser.fulfilled, (state, action) => {
				state.status = 'succeed';
				state.user = action.payload;
			})
			.addCase(getUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(logout.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(logout.fulfilled, (state, action) => {
				state.status = 'loggedOut';
				state.user = action.payload;
			})
			.addCase(logout.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(resetPassword.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(resetPassword.fulfilled, (state, action) => {
				state.status = 'password-reseted';
				state.user = action.payload;
			})
			.addCase(resetPassword.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(forgotPassword.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(forgotPassword.fulfilled, (state, action) => {
				state.status = 'succeed';
				state.user = null;
			})
			.addCase(forgotPassword.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(updateMe.pending, (state, action) => {
				state.status = 'loading';
			})
			.addCase(updateMe.fulfilled, (state, action) => {
				state.status = 'userUpdated';
				state.user = action.payload;
			})
			.addCase(updateMe.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

// export const { getAllTours } = toursSlice.actions;

// Other code such as selectors can use the imported `RootState` type

export const currentUser = (state) => state.auth.user;

export default authSlice.reducer;
