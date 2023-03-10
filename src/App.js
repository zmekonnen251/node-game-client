import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
// import Login from './pages/Login';
// import SignUp from './pages/SignUp';
import SignUp from './features/authentication/SignUp';
import Login from './features/authentication/Login';
import VerifyOtp from './features/authentication/VerifyOtp';
import ForgotPassword from './features/authentication/ForgotPassword';
import Profile from './features/profile/Profile';

import ProtectedRoute from './features/authentication/ProtectedRoute';
import ResetPassword from './features/authentication/ResetPassword';
import RestrictUnverifiedUser from './features/authentication/RestrictUnverifiedUser';

import { currentUser } from './features/authentication/authSlice';
import { useSelector } from 'react-redux';
import useAuth from './hooks/useAuth';
import PersistLogin from './features/authentication/PersistLogin';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Public from './pages/Public';
import Game from './pages/Game';

// import ProtectedRouteAdmin from './features/authentication/ProtectedRouteAdmin';

function App() {
	const user = useAuth();

	return (
		<>
			<ToastContainer />
			<Header />

			<Routes>
				
				<Route path='/' element={<Public />} />
				<Route
					path='/login'
					element={user.isLoggedIn ? <Navigate to='/profile' /> : <Login />}
				/>

				<Route path='/signup' element={<SignUp />} />
				<Route path='/verify-otp/:phone' element={<VerifyOtp />} />
				<Route path='/forgot-password' element={<ForgotPassword />} />
				<Route path='/resetPassword/:resetToken' element={<ResetPassword />} />
				<Route element={<PersistLogin />}>
				<Route path='/games'  element={ < Game />}/>
					<Route path='/profile' element={<ProtectedRoute />}>
						<Route index element={<Profile />} />
						<Route element={<RestrictUnverifiedUser />}>
							<Route path='my-games' element={<h1>My Games</h1>} />
						</Route>
					</Route>
				</Route>
			</Routes>
			<Footer />
		</>
	);
}

export default App;
