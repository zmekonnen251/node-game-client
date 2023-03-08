import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const RestrictUnverifiedUser = () => {
	const user = useAuth();

	return user.verified ? <Outlet /> : <Navigate to='/profile' />;
};

export default RestrictUnverifiedUser;
