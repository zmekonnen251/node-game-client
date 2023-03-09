import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { currentUser } from './authSlice';

const ProtectedRoute = () => {
	const user = useSelector(currentUser);

	return user ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
