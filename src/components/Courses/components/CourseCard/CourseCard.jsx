import { useNavigate } from 'react-router-dom';

import Button from '../../../../common/Button';

import {
	buttonText,
	durationSettings,
	infoSettings,
} from '../../../../constants';
import createAuthorsStr from '../../../../helpers/createAuthorsStr';
import pipeDuration from '../../../../helpers/pipeDuration';

import './courseCard.scss';

const CourseCard = ({
	id,
	title,
	duration,
	creationDate,
	description,
	authors,
	mockedAuthorsList,
}) => {
	const navigate = useNavigate();

	const authorsStr = createAuthorsStr(authors, mockedAuthorsList);

	const durationStr = pipeDuration(duration, durationSettings);

	const handleShowCourse = () => {
		navigate(`/courses/${id}`);
	};
	return (
		<li className='card'>
			<div className='card-text'>
				<h2 className='card-text__title'>{title}</h2>
				<p className='card-text__description'>{description}</p>
			</div>
			<div className='card-info'>
				<p className='card-info__authors'>
					<b>{infoSettings.authors}</b> {authorsStr}
				</p>
				<p className='card-info__duration'>
					<b>{durationSettings.duration}</b>
					{` ${durationStr}  ${durationSettings.hours}`}
				</p>
				<p className='card-info__created'>
					<b>{infoSettings.created}</b> {creationDate.replace(/\//g, '.')}
				</p>
				<div className='card-info__button'>
					<Button
						buttonText={buttonText.showCourse}
						onClick={handleShowCourse}
					/>
				</div>
			</div>
		</li>
	);
};

export default CourseCard;
