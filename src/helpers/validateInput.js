const validateInput = (valueStr, valid = []) => {
	const isValid = () => valid.every((item) => item);

	const minLength = (length) => {
		valid.push(valueStr.length >= length);
		return validateInput(valueStr, valid);
	};

	const isNumbersOnly = () => {
		valid.push(!!Number(valueStr));
		return validateInput(valueStr, valid);
	};

	const isMoreThanZero = () => {
		valid.push(valueStr > 0 ? true : false);
		return validateInput(valueStr, valid);
	};

	return { isValid, minLength, isNumbersOnly, isMoreThanZero };
};

export default validateInput;
