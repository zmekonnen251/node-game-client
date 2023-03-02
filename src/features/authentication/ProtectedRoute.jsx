import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ProtectedRoute = () => {
	const user = useAuth();
	console.log('Protected route', user);

	return user.isLoggedIn ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoute;
