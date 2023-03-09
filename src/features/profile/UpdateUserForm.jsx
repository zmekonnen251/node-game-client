import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { ErrorMessage } from '@hookform/error-message';

import { SubmitButton } from '../../components/form';
import { useDispatch } from 'react-redux';
import { useUpdateMeMutation } from '../authentication/authApiSlice';
import { setCredentials } from '../authentication/authSlice2';
import PulseLoader from 'react-spinners/PulseLoader';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
	name: Yup.string().min(4),
	email: Yup.string().email('Email not valid'),
	photo: Yup.mixed(),
});

const UpdateUserForm = ({ name, email, photo: userPhoto }) => {
	const [updateMe, { isLoading, isSuccess, isError, error }] =
		useUpdateMeMutation();
	const {
		register,
		handleSubmit,

		formState: { errors, isSubmitting, touchedFields },
	} = useForm({
		defaultValues: {
			name,
			email,
			photo: undefined,
		},
		resolver: yupResolver(validationSchema),
	});

	const [file, setFile] = useState(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		const formData = new FormData();
		if (values.name !== name) formData.append('name', values.name);
		if (values.email !== email) formData.append('email', values.email);
		if (values.photo) formData.append('photo', values.photo[0]);

		const {
			data: { accessToken },
		} = await updateMe(formData);
		dispatch(setCredentials({ accessToken }));
	};

	useEffect(() => {
		if (isSuccess) {
			toast.success('User updated successfully!');
			window.location.reload('/profile');
		}
	}, [isSuccess, navigate]);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='form form-user-data'>
			<div className='form__group'>
				<label className='form__label' htmlFor='name'>
					Name
				</label>
				<input
					className='form__input'
					id='name'
					type='text'
					{...register('name')}
				/>

				<ErrorMessage errors={errors} name='name' as='p' />
			</div>
			<div className='form__group'>
				<label className='form__label' htmlFor='name'>
					Email
				</label>
				<input
					className='form__input'
					id='email'
					type='email'
					{...register('email')}
				/>

				<ErrorMessage errors={errors} name='email' as='p' />
			</div>

			<div className='form__group form__photo-upload'>
				<img
					className='form__user-photo'
					src={
						file
							? URL.createObjectURL(file)
							: `${process.env.REACT_APP_PUBLIC_API_URL}/img/users/${userPhoto}`
					}
					alt='User'
				/>
				<label className='btn-text' htmlFor='photo'>
					Choose new photo
				</label>
				<input
					id='photo'
					type='file'
					accept='image/*'
					style={{
						textIndent: '-90px',
						opacity: touchedFields?.photo ? 1 : 0,
						color: '#4a2a2a',
					}}
					{...register('photo')}
					onChange={(e) => setFile(e.target.files[0])}
				/>
			</div>
			<ErrorMessage errors={errors} name='photo' as='p' />
			<SubmitButton
				type='submit'
				title={isLoading ? <PulseLoader color={'#fff'} /> : 'Save Settings'}
				disabled={
					isSubmitting ||
					(errors.email && touchedFields.email) ||
					(errors.name && touchedFields.name) ||
					(errors.photo && touchedFields.photo)
				}
			/>
		</form>
	);
};

export default UpdateUserForm;
