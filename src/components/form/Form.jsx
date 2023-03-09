import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';

const Form = ({ initialValues, onSubmit, validationSchema, children }) => {
	const methods = useForm({
		defaultValues: {
			...initialValues,
		},
		resolver: yupResolver(validationSchema),
	});
	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
		</FormProvider>
	);
};

export default Form;
