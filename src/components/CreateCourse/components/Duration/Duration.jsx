import classNames from 'classnames';

import Input from '../../../../common/Input';

import {
	titleText,
	placeholderText,
	labelText,
	durationSettings,
	validateText,
} from '../../../../constants';
import pipeDuration from '../../../../helpers/pipeDuration';
import validateInput from '../../../../helpers/validateInput';

import './Duration.scss';

const Duration = ({ courseDuration, handleChangeCourseDuration }) => {
	const durationStr = pipeDuration(courseDuration, durationSettings);

	const valid =
		courseDuration.length > 0
			? validateInput(courseDuration).isNumbersOnly().isMoreThanZero().isValid()
			: true;
	// const className = valid ? 'duration-input' : 'duration-input invalid';

	return (
		<div className='duration'>
			<h3 className='duration-title'>{titleText.duration}</h3>
			<div className={classNames('duration-input', !valid && 'invalid')}>
				<Input
					onChange={handleChangeCourseDuration}
					value={courseDuration}
					placeholderText={placeholderText.duration}
					labelText={labelText.duration}
				/>
				{valid ? null : (
					<p className='duration invalidMessage'>{validateText.duration}</p>
				)}
			</div>
			<p className='duration-text'>
				{durationSettings.duration}{' '}
				<span>{valid ? durationStr : durationSettings.default}</span>{' '}
				{durationSettings.hours}
			</p>
		</div>
	);
};

export default Duration;
