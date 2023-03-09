import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice2';
import { useSignInWithGoogleMutation } from './authApiSlice';
import { useNavigate } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useEffect } from 'react';
// import Icon from './Icon';

import Button from '../../components/Ui/Button';

const LoginGoogle = () => {
	const [
		signInWithGoogle,
		{
			isLoading,
			isSuccess,
			// isError: isErrorGoogle,
			// error: errorGoogle,
		},
	] = useSignInWithGoogleMutation();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		function start() {
			gapi.client.init({
				clinetId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
				scope: '',
			});
		}
		gapi.load('client:auth2', start);
	});

	const googleSuccess = async (res) => {
		const { tokenId } = res;

		try {
			const {
				data: { accessToken },
			} = signInWithGoogle({ tokenId });

			dispatch(setCredentials({ accessToken }));
		} catch (error) {
			console.log(error);
		}
	};
	const googleFailure = (error) => {
		console.log(error);
		console.log('Google Sign In is unsuccessful. Try again later');
	};

	if (isSuccess) navigate('/profile');

	return (
		<div className='form__group'>
			<GoogleLogin
				clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
				render={(renderProps) => (
					<Button
						onClick={renderProps.onClick}
						title={
							isLoading ? <PulseLoader color={'#55c57a'} /> : 'Google Sign In'
						}
					/>
				)}
				onSuccess={googleSuccess}
				onFailure={googleFailure}
				cookiePolicy='single_host_origin'
			/>
		</div>
	);
};

export default LoginGoogle;
