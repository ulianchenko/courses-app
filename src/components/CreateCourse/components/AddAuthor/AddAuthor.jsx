import { useState } from 'react';
import classNames from 'classnames';

import Input from '../../../../common/Input';
import Button from '../../../../common/Button';

import {
	titleText,
	buttonText,
	placeholderText,
	labelText,
	validateText,
} from '../../../../constants';
import validateInput from '../../../../helpers/validateInput';

import './AddAuthor.scss';

const AddAuthor = ({
	authorName,
	handleChangeAuthorName,
	handleClickCreateAuthor,
}) => {
	const [focused, setFocused] = useState(false);

	const handleFocused = () => {
		setFocused(true);
	};

	const handleBlured = () => {
		setFocused(false);
	};

	const valid =
		authorName.length > 0
			? validateInput(authorName).minLength(2).isValid()
			: true;
	// const className =
	// 	valid || focused ? 'addAuthor-input' : 'addAuthor-input invalid';

	return (
		<div className='addAuthor'>
			<h3 className='addAuthor-title'>{titleText.addAuthor}</h3>
			<div
				className={classNames(
					'addAuthor-input',
					!valid && !focused && 'invalid'
				)}
			>
				<Input
					onChange={handleChangeAuthorName}
					value={authorName}
					placeholderText={placeholderText.authorName}
					labelText={labelText.authorName}
					onFocused={handleFocused}
					onBlured={handleBlured}
				/>
				{valid || focused ? null : (
					<p className='addAuthor-input invalidMessage'>
						{validateText.addAuthor}
					</p>
				)}
			</div>
			<div className='addAuthor-button'>
				<Button
					buttonText={buttonText.createAuthor}
					onClick={handleClickCreateAuthor}
				/>
			</div>
		</div>
	);
};

export default AddAuthor;
