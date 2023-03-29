import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ReactComponent as Pencil } from '../../../../assets/svg/pencil.svg';
import { ReactComponent as Trash } from '../../../../assets/svg/trash.svg';

import Button from '../../../../common/Button';

import {
	buttonText,
	durationSettings,
	infoSettings,
} from '../../../../constants';
import createAuthorsStr from '../../../../helpers/createAuthorsStr';
import pipeDuration from '../../../../helpers/pipeDuration';
import { courseRemove } from '../../../../store/courses/actionCreators';

import './courseCard.scss';

const CourseCard = ({
	id,
	title,
	duration,
	creationDate,
	description,
	authors,
	authorsList,
}) => {
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const authorsStr = createAuthorsStr(authors, authorsList);

	const durationStr = pipeDuration(duration, durationSettings);

	const handleShowCourse = () => {
		navigate(`/courses/${id}`);
	};

	const handleRemoveCourse = () => {
		dispatch(courseRemove(id));
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
					<Button icon={<Pencil />} />
					<Button onClick={handleRemoveCourse} icon={<Trash />} />
				</div>
			</div>
		</li>
	);
};

export default CourseCard;
