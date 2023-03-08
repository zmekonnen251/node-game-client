import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useVerifyOtpMutation } from './authApiSlice';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ErrorMessage } from '@hookform/error-message';
import { setCredentials } from './authSlice2';
import PulseLoader from 'react-spinners/PulseLoader';
import { toast } from 'react-toastify';
import { SubmitButton } from '../../components/form';

const otpRegExp = /^([0-9]){1}?\d{5}$/;

const validationSchema = Yup.object().shape({
	otp: Yup.string().matches(otpRegExp, 'OTP is not valid'),
});
const VerifyOtp = () => {
	const { phone } = useParams();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, touchedFields },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	const [verifyOtp, { isSuccess, isLoading }] = useVerifyOtpMutation();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	if (!phone) return;

	const onSubmit = async (values) => {
		const credentials = {
			phone,
			otp: values.otp,
		};
		const {
			data: { accessToken },
		} = await verifyOtp(credentials);

		dispatch(setCredentials({ accessToken }));
	};

	if (isSuccess) {
		toast.success('Your phone number verified successfully');
		window.location.reload('/profile');
		navigate(`/profile`, { replace: true });
	}

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

	console.log('isSuccess', isSuccess);
	console.log('isLoading', isLoading);

	return (
		<div className='auth'>
			<div className='login-form u_margin_top_big'>
				<h1
					className='heading-tertiary u_center_text u_margin_bottom_medium'
					style={{ fontSize: '2.5rem' }}
				>
					Verify OTP
				</h1>
				<form className='login__form' onSubmit={handleSubmit(onSubmit)}>
					<div className='form__group'>
						<input
							type='text'
							className='form__input'
							placeholder='Enter the 6 digit code'
							id='otp'
							{...register('otp')}
						/>
						<label htmlFor='passwordConfirm' className='form__label'>
							Verify OTP
						</label>
						<ErrorMessage errors={errors} name='otp' as='p' />
					</div>
					<div
						className='form__group'
						style={{ transform: 'translateX(2.2rem)' }}
					>
						<SubmitButton
							title='Verify Otp'
							type='submit'
							disabled={isSubmitting || (errors.otp && touchedFields.otp)}
						/>
					</div>
				</form>
			</div>
		</div>
	);
};

export default VerifyOtp;
