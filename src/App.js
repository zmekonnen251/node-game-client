import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './features/authentication/ForgotPassword';
import Profile from './features/profile/Profile';

import ProtectedRoute from './features/authentication/ProtectedRoute';
import ResetPassword from './features/authentication/ResetPassword';

import { currentUser } from './features/authentication/authSlice';
import { useSelector } from 'react-redux';
// import ProtectedRouteAdmin from './features/authentication/ProtectedRouteAdmin';

function App() {
	const user = useSelector(currentUser);

	return (
		<>
			<ToastContainer />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route
					path='/login'
					element={user?.user ? <Navigate to='/profile' /> : <Login />}
				/>
				<Route path='/signup' element={<SignUp />} />
				<Route path='/profile' element={<ProtectedRoute />}>
					<Route index element={<Profile />} />
					<Route path='my-games' element={<h1>My Games</h1>} />
				</Route>

				{/* <Route index element={<AdminDashboard />} />
				</Route> */}

				<Route path='/resetPassword/:resetToken' element={<ResetPassword />} />
				<Route path='/forgot-password' element={<ForgotPassword />} />
			</Routes>
		</>
	);
}

export default App;
