import validateInput from './validateInput';

const validateCreateCourse = (
	courseTitle,
	courseDescription,
	courseDuration,
	courseAuthors
) => {
	if (
		!validateInput(courseTitle).minLength(2).isValid() ||
		!validateInput(courseDescription).minLength(2).isValid() ||
		!validateInput(courseDuration).isNumbersOnly().isMoreThanZero().isValid() ||
		courseAuthors.length === 0
	) {
		return true;
	}
	return false;
};

export default validateCreateCourse;
