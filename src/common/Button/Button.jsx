import './button.scss';

const Button = ({ buttonText, onClick, type = 'button' }) => {
	return (
		<button className='button' onClick={onClick}>
			{buttonText}
		</button>
	);
};

export default Button;
