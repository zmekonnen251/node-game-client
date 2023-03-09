import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import PulseLoader from 'react-spinners/PulseLoader';
import { useSelector, useDispatch } from 'react-redux';
import { forgotPassword } from './authSlice';
import { useForgotPasswordMutation } from './authApiSlice';

import { FormProvider } from 'react-hook-form';
import { FormField, SubmitButton } from '../../components/form';
import { toast } from 'react-toastify';

const validationSchema = Yup.object().shape({
	email: Yup.string().email('Email not valid').required('Email is required'),
});

const ForgotPassword = () => {
	const [forgotPassword, { isLoading, isSuccess,isError,error }] = useForgotPasswordMutation();

	const methods = useForm({
		resolver: yupResolver(validationSchema),
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const onSubmit = async (values) => {
		await forgotPassword(values?.email);
	};

	if (
		isSuccess
	) {
		toast.success('Password reset email sent to your email, Please check your email!');
		navigate('/');
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

	return (
		<div className='auth'>
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
		</div>
	);
};

export default ForgotPassword;
