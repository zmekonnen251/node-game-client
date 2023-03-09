import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ProtectedRouteAdmin = () => {
	const user = useAuth();


	return user?.isAdmin ? <Outlet /> : <Navigate to='/profile' />;
};

export default ProtectedRouteAdmin;
