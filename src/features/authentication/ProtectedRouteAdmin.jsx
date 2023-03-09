import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { currentUser } from './authSlice';

const ProtectedRouteAdmin = () => {
	const user = useSelector(currentUser);
	console.log(user?.user?.role);

	return user?.user?.role === 'admin' ? <Outlet /> : <Navigate to='/profile' />;
};

export default ProtectedRouteAdmin;
