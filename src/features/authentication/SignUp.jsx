import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';

import { FormField, SubmitButton } from '../../components/form';

// import { signup } from './authSlice';
import { useSignupMutation } from './authApiSlice';
import { Link, useNavigate } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import { toast } from 'react-toastify';

const phoneRegExp = /^(\+251?(9|7))?\d{8}$/;

const validationSchema = Yup.object().shape({
	name: Yup.string().min(4).required('Name is required'),
	email: Yup.string().email('Email not valid').required('Email is required'),
	phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
	password: Yup.string()
		.min(8, 'The length of your password must be 8 chracters long.')
		.required('Password is required'),
	passwordConfirm: Yup.string().oneOf(
		[Yup.ref('password'), null],
		'Passwords must match'
	),
});

const SignUpForm = () => {
	const [signup, { isLoading, isSuccess, isError, error }] =
		useSignupMutation();
	const [phone, setPhone] = useState('');

	const methods = useForm({
		resolver: yupResolver(validationSchema),
	});

	const navigate = useNavigate();

	const onSubmit = async (values) => {
		values.passwordConfirm = undefined;
		setPhone(values.phone);
		await signup(values);
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success('OTP sent to your phone number and email');
			navigate(`/verify-otp/${phone}`);
		}
	}, [isSuccess, navigate, phone]);

	return (
		<>
			<div className='auth'>
				<div className='auth__container'>
					<ul className='auth__links'>
						<li>
							<Link className='auth__links__link' to='/login'>
								Login
							</Link>
						</li>
						<li className='auth__links__link--active'>
							<Link className='auth__links__link' to='/signup'>
								Sign Up
							</Link>
						</li>
					</ul>
					<div className='auth__form'>
						<FormProvider {...methods}>
							<form onSubmit={methods.handleSubmit(onSubmit)} className='form'>
								<FormField
									label='Name'
									type='text'
									name='name'
									placeholder='Enter your name'
								/>
								<FormField
									label='Email'
									type='email'
									name='email'
									placeholder='Enter your email'
								/>

								<FormField
									label='Phone'
									type='text'
									name='phone'
									placeholder='Enter your phone number'
								/>

								<FormField
									label='Password'
									type='password'
									name='password'
									placeholder='Enter your password'
								/>
								<FormField
									label='Confirm Password'
									type='password'
									name='passwordConfirm'
									placeholder='Confirm your password'
								/>
								<SubmitButton
									title={isLoading ? <PulseLoader color={'#fff'} /> : 'Sign Up'}
								/>

								<div className='login__divider' />
								<div className='action-links'>
									<Link to='/signup' className='btn-text'>
										Don't have an account? Sign up
									</Link>
									<Link to='/forgot-password' className='btn-text'>
										Forgot password?
									</Link>
								</div>
							</form>
						</FormProvider>
					</div>
				</div>
			</div>
		</>
	);
};

export default SignUpForm;
