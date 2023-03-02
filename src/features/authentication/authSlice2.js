import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
	name: 'auth',
	initialState: { token: null },
	reducers: {
		setCredentials: (state, action) => {
			console.log(
				'setCredentials action.payload: ',
				action.payload.accessToken
			);
			const { accessToken } = action.payload;
			state.token = accessToken;
		},
		logOut: (state, action) => {
			state.token = null;
		},
	},
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
