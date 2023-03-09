import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from './authSlice';
import { useResetPasswordMutation } from './authApiSlice';
import { setCredentials } from './authSlice2';
import { toast } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader';

// import Header from '../../layouts/Header';

const PasswordReset = () => {
	const { resetToken } = useParams();
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [resetPassword, {isLoading, isSuccess, isError, error}] = useResetPasswordMutation();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	if (resetToken === undefined) return;

	const handleSubmit = async (e) => {
		e.preventDefault();

		const credentials = {
			resetToken,
			password
		}

		const {
			data: { accessToken },
		} = await resetPassword(credentials);

		dispatch(setCredentials({ accessToken }));
		
	};

	if (isSuccess) {
		toast.success('Your password reseted successfully!');	
		navigate('/profile')
	};

	if (isLoading)
		return (
			<div
				style={{
					height: '70vh',
					width: '100%',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<PulseLoader color={'#55c57a'} />
			</div>
	);

	return (
		<div className='auth'>
			<div className='login-form u_margin_top_big'>
				<h1
					className='heading-tertiary u_center_text u_margin_bottom_medium'
					style={{ fontSize: '2.5rem'}}
				>
					Reset Password
				</h1>
				<form className='login__form' onSubmit={handleSubmit}>
					<div className='form__group'>
						<input
							type='password'
							className='form__input'
							placeholder='Password'
							id='password'
							name='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<label htmlFor='password' className='form__label'>
							Password
						</label>
					</div>
					<div className='form__group'>
						<input
							type='password'
							className='form__input'
							placeholder='Confirm password'
							id='passwordConfirm'
							name='passwordConfirm'
							value={passwordConfirm}
							onChange={(e) => setPasswordConfirm(e.target.value)}
							required
						/>
						<label htmlFor='passwordConfirm' className='form__label'>
							Confirm password
						</label>
					</div>
					<div className='form__group'>
						<button className='btn btn--green' style={{ transform: 'translateX(0.6rem)' }}>Reset Password</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PasswordReset;
