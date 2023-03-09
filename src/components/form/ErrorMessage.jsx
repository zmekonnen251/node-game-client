import React from 'react';



const ErrorMessage = ({ error, visible }) => {
	if (!visible || !error) return null;

	return <p style={{ fontSize: '1rem', color: 'red' }}> {error}</p>;
};

export default ErrorMessage;
