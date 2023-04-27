import './Input.scss';

const Input = ({
	labelText,
	placeholderText,
	onChange,
	type = 'text',
	value,
	onFocused,
	onBlured,
}) => {
	return (
		<div className='inputContainer'>
			<label htmlFor={labelText}>{labelText}</label>
			<input
				type={type}
				placeholder={placeholderText}
				onChange={onChange}
				value={value}
				id={labelText}
				onFocus={onFocused}
				onBlur={onBlured}
			/>
		</div>
	);
};

export default Input;
