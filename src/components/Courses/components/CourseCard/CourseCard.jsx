import { ReactComponent as Pencil } from './assets/pencil.svg';
import { ReactComponent as Trash } from './assets/trash.svg';

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
	onShowCourse,
	onRemoveCourse,
}) => {
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
						onClick={() => onShowCourse(id)}
					/>
					<Button icon={<Pencil />} />
					<Button onClick={() => onRemoveCourse(id)} icon={<Trash />} />
				</div>
			</div>
		</li>
	);
};

export default CourseCard;
