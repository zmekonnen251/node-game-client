import React from 'react';

const Button = ({ onClick, title, color, variant, type, disabled }) => {
	const cls = `${
		variant === 'contained' ? 'btn' : variant === 'text' ? 'btn-text' : 'btn'
	} btn--${color}`;
	return (
		<button
			onClick={onClick}
			className={`btn ${cls}`}
			type={type}
			disabled={disabled}
		>
			{title}
		</button>
	);
};

export default Button;
