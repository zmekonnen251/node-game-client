import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { FormField, SubmitButton } from '../../components/form';
import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice2';
import { useLoginMutation } from './authApiSlice';
import { Link, useNavigate } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import usePersist from '../../hooks/usePersist';

const validationSchema = Yup.object().shape({
	email: Yup.string().email('Email not valid').required('Email is required'),
	password: Yup.string()
		.min(8, 'The length of your password must be 8 chracters long.')
		.required('Password is required'),
});

const LoginForm = () => {
	const [login, { isLoading, isSuccess }] = useLoginMutation();
	const [persist, setPersist] = usePersist();

	const handleToggle = () => setPersist((prev) => !prev);

	const methods = useForm({
		resolver: yupResolver(validationSchema),
	});

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		const {
			data: { accessToken },
		} = await login(values);

		dispatch(setCredentials({ accessToken }));
		if (isSuccess) navigate('/profile');
	};

	if (isLoading) return <PulseLoader color={'#55c57a'} />;

	return (
		<>
			<div className='auth'>
				<div className='auth__container'>
					<ul className='auth__links'>
						<li className='auth__links__link--active'>
							<Link className='auth__links__link' to='/login'>
								Login
							</Link>
						</li>
						<li>
							<Link className='auth__links__link' to='/signup'>
								Sign Up
							</Link>
						</li>
					</ul>
					<div className='auth__form'>
						<FormProvider {...methods}>
							<form onSubmit={methods.handleSubmit(onSubmit)} className='form'>
								<FormField
									name='email'
									label='Email'
									type='email'
									placeholder='Email'
								/>
								<FormField
									name='password'
									label='Password'
									type='password'
									placeholder='Password'
								/>
								<label htmlFor='persist' className='form__persist'>
									<input
										type='checkbox'
										className='form__checkbox'
										id='persist'
										onChange={handleToggle}
										checked={persist}
									/>
									Trust This Device
								</label>
								<SubmitButton
									disable={isLoading}
									title={`${isLoading ? 'Signing In' : 'Sign In'}`}
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

export default LoginForm;
