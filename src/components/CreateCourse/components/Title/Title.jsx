import { useState } from 'react';
import classNames from 'classnames';

import Input from '../../../../common/Input';
import Button from '../../../../common/Button';

import {
	buttonText,
	placeholderText,
	labelText,
	validateText,
} from '../../../../constants';
import validateInput from '../../../../helpers/validateInput';

import './Title.scss';

const Title = ({
	courseTitle,
	handleChangeCourseTitle,
	handleClickCreateCourse,
}) => {
	const [focused, setFocused] = useState(false);

	const handleFocused = () => {
		setFocused(true);
	};

	const handleBlured = () => {
		setFocused(false);
	};

	const valid =
		courseTitle.length > 0
			? validateInput(courseTitle).minLength(2).isValid()
			: true;

	return (
		<div className='title'>
			<div
				className={classNames('title-input', !valid && !focused && 'invalid')}
			>
				<Input
					onChange={handleChangeCourseTitle}
					value={courseTitle}
					placeholderText={placeholderText.title}
					labelText={labelText.title}
					onFocused={handleFocused}
					onBlured={handleBlured}
				/>
				{valid || focused ? null : (
					<p className='title-input invalidMessage'>{validateText.title}</p>
				)}
			</div>
			<div className='title-button'>
				<Button
					buttonText={buttonText.createCourse}
					onClick={handleClickCreateCourse}
				/>
			</div>
		</div>
	);
};

export default Title;
