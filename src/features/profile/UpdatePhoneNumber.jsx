import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ErrorMessage } from '@hookform/error-message';
import { toast } from 'react-toastify';
import PulseLoader from 'react-spinners/PulseLoader';

import { SubmitButton } from '../../components/form';
import { useDispatch } from 'react-redux';
// import { updatePassword } from '../authentication/authSlice';
import { useUpdatePhoneNumberMutation } from '../authentication/authApiSlice';
import { setCredentials } from '../authentication/authSlice2';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const phoneRegExp = /^(\+251?(9|7))?\d{8}$/;

const validationSchema = Yup.object().shape({
	phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
});

const UpdatePhoneNumber = ({ phoneNumber, verified }) => {
	const [updatePhoneNumber, { isLoading, isSuccess, isError, error }] =
		useUpdatePhoneNumberMutation();
	const [phone, setPhone] = useState('');

	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting, touchedFields },
	} = useForm({
		resolver: yupResolver(validationSchema),
	});

	const onSubmit = async (values) => {
		setPhone(values.phone);
		await updatePhoneNumber(values);
	};

	if (isSuccess) {
		toast.success('OTP sent to your phone number and email');
		navigate(`/verify-otp/${phone}`);
	}

	if (isLoading)
		return (
			<div
				style={{
					height: '20vh',
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
		<div className='user-view__form-container'>
			{!verified && (
				<h2 className='heading-secondary ma-bt-md'>Update Phone Number</h2>
			)}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='form form-user-settings'
			>
				<div className='form__group'>
					<label className='form__label' htmlFor='phone'>
						Phone Number
					</label>
					<input
						className='form__input'
						id='phone'
						type='text'
						placeholder={phoneNumber}
						{...register('phone')}
					/>
					<ErrorMessage errors={errors} name='phone' as='p' />
				</div>

				<div className='form__group right'>
					<SubmitButton
						title='Update Phone Number'
						type='submit'
						disabled={isSubmitting || (errors.phone && touchedFields.phone)}
					/>
				</div>
			</form>
		</div>
	);
};

export default UpdatePhoneNumber;
