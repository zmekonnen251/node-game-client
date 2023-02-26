import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from './authSlice';

import Header from '../../layouts/Header';

const PasswordReset = () => {
	const { resetToken } = useParams();
	const [password, setPassword] = useState('');
	const [passwordConfirm, setPasswordConfirm] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const resetPasswordStatus = useSelector((state) => state.auth.status);

	if (resetToken === undefined) return <div>Invalid token</div>;

	const handleSubmit = (e) => {
		e.preventDefault();

		dispatch(resetPassword({ resetToken, password }));
	};

	if (resetPasswordStatus === 'password-reseted') {
		navigate('/profile');
	}
	return (
		<>
			<Header />
			<div className='login-form u_margin_top_big'>
				<h1
					className='heading-tertiary u_center_text u_margin_bottom_medium'
					style={{ fontSize: '2.5rem', transform: 'translateX(-2.5rem)' }}
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
						<button className='btn btn--green'>Next step &#10132;</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default PasswordReset;
