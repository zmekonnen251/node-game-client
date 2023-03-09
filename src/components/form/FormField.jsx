import React from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';


const FormField = ({ label, name, type, ...otherProps }) => {
	const { register, formState } = useFormContext();
	const { errors } = formState;
	return (
		<div className='form__group'>
			<input
				id={name}
				className='form__input'
				type={type}
				{...register(name)}
				{...otherProps}
			/>
			<label htmlFor={name} className='form__label'>
				{label}
			</label>
			<ErrorMessage errors={errors} name={name} as='p' />
		</div>
	);
};

export default FormField;
