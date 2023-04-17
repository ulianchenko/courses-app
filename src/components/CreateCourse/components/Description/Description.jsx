import { useState } from 'react';
import classNames from 'classnames';

import {
	placeholderText,
	labelText,
	validateText,
} from '../../../../constants';
import validateInput from '../../../../helpers/validateInput';

import './Description.scss';

const Description = ({ courseDescription, handleChangeCourseDescription }) => {
	const [focused, setFocused] = useState(false);

	const handleFocused = () => {
		setFocused(true);
	};

	const handleBlured = () => {
		setFocused(false);
	};
	const valid =
		courseDescription.length > 0
			? validateInput(courseDescription).minLength(2).isValid()
			: true;

	return (
		<div className='description'>
			<div
				className={classNames(
					'description-textarea',
					!valid && !focused && 'invalid'
				)}
			>
				<label htmlFor={labelText.description}>{labelText.description}</label>
				<textarea
					placeholder={placeholderText.description}
					onChange={handleChangeCourseDescription}
					value={courseDescription}
					id={labelText.description}
					onFocus={handleFocused}
					onBlur={handleBlured}
				></textarea>
			</div>
			{valid || focused ? null : (
				<p className='description invalidMessage'>{validateText.description}</p>
			)}
		</div>
	);
};

export default Description;
