import React from 'react';
import Button from '../Ui/Button';

const SubmitButton = ({ title, ...otherProps }) => {
	// const { formState } = useFormContext();
	return (
		<div className='form__group'>
			<Button
				title={title}
				color='green'
				variant='contained'
				type='submit'
				{...otherProps}
			/>
		</div>
	);
};

export default SubmitButton;
