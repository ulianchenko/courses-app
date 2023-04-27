import './Button.scss';

const Button = ({
	buttonText = '',
	onClick = null,
	type = 'button',
	icon = null,
}) => {
	return (
		<button className='button' onClick={onClick} type={type}>
			{buttonText}
			{icon}
		</button>
	);
};

export default Button;
