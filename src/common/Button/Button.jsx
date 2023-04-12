import './Button.scss';

const Button = ({ buttonText, onClick }) => {
	return (
		<button className='button' onClick={onClick}>
			{buttonText}
		</button>
	);
};

export default Button;
