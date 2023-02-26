import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { forgotPassword } from './authSlice';
import Header from '../../layouts/Header';
import { FormProvider } from 'react-hook-form';
import { FormField, SubmitButton } from '../../components/form';

const validationSchema = Yup.object().shape({
	email: Yup.string().email('Email not valid').required('Email is required'),
});

const ForgotPassword = () => {
	const methods = useForm({
		resolver: yupResolver(validationSchema),
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const forgotPasswordStatus = useSelector((state) => state.auth.status);

	const onSubmit = (values) => {
		dispatch(forgotPassword(values?.email));
	};

	if (
		forgotPasswordStatus === 'succeed' &&
		location.pathname === '/forgot-password'
	) {
		navigate('/');
	}

	return (
		<>
			<Header />
			<div className='auth'>
				<div className='auth__container'>
					<ul className='auth__links'>
						<li className='auth__links__link--active'>
							<Link className='auth__links__link' to='/login'>
								Forgot Password
							</Link>
						</li>
					</ul>
					<div className='auth__form'>
						<FormProvider {...methods}>
							<form className='form' onSubmit={methods.handleSubmit(onSubmit)}>
								<FormField
									name='email'
									type='email'
									label='Email'
									placeholder='Enter Your Email'
								/>

								<SubmitButton title='Submit' />
							</form>
						</FormProvider>
					</div>
				</div>
			</div>
		</>
	);
};

export default ForgotPassword;
