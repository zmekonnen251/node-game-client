import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../features/authentication/authSlice2';
import jwtDecode from 'jwt-decode';

const useAuth = () => {
	const token = useSelector(selectCurrentToken);
	let isAdmin = false;

	if (token) {
		const decoded = jwtDecode(token);
		const { name, email, photo, phone, verified, role, _id } = decoded;
		isAdmin = role === 'Admin';

		return {
			name,
			email,
			verified,
			photo,
			phone,
			role,
			_id,
			isAdmin,
			isLoggedIn: true,
		};
	}

	return {
		name: '',
		email: '',
		photo: '',
		phone: '',
		role: '',
		verified: false,
		isAdmin,
		isLoggedIn: false,
	};
};
export default useAuth;
