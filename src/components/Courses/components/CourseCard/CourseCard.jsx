import { useNavigate } from 'react-router-dom';

import Button from '../../../../common/Button';

import {
	buttonText,
	durationSettings,
	infoSettings,
} from '../../../../constants';

import './CourseCard.scss';

const CourseCard = ({
	id,
	title,
	duration,
	creationDate,
	description,
	authors,
}) => {
	const navigate = useNavigate();

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
					<b>{infoSettings.authors}</b> {authors}
				</p>
				<p className='card-info__duration'>
					<b>{durationSettings.duration}</b>
					{` ${duration}  ${durationSettings.hours}`}
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
