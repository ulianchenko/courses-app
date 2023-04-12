import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
	courseInfoSettings,
	durationSettings,
	infoSettings,
} from '../../constants';
import createAuthorsStr from '../../helpers/createAuthorsStr';
import pipeDuration from '../../helpers/pipeDuration';
import { getACoursesList, getAuthorsList } from '../../selectors';

import './CourseInfo.scss';

const CourseInfo = () => {
	const { courseId } = useParams();
	const coursesList = useSelector(getACoursesList);
	const authorsList = useSelector(getAuthorsList);
	const { id, title, description, creationDate, duration, authors } =
		coursesList.find((course) => course.id === courseId);
	const durationStr = pipeDuration(duration, durationSettings);
	const authorsStr = createAuthorsStr(authors, authorsList);

	return (
		<section className='courseInfo'>
			<div className='courseInfo-back'>
				<Link to={'/courses'} className='courseInfo-back__link'>
					{courseInfoSettings.linkText}
				</Link>
			</div>
			<h2 className='courseInfo-title'>{title}</h2>
			<div className='courseInfo-text'>
				<p className='courseInfo-text__description'>{description}</p>
				<div className='courseInfo-text__info'>
					<p className='courseInfo-text__info-id'>
						<b>{infoSettings.id}</b> {id}
					</p>
					<p className='courseInfo-text__info-duration'>
						<b>{durationSettings.duration}</b>
						{` ${durationStr}  ${durationSettings.hours}`}
					</p>
					<p className='courseInfo-text__info-created'>
						<b>{infoSettings.created}</b> {creationDate.replace(/\//g, '.')}
					</p>
					<p className='courseInfo-text__info-authors'>
						<b>{infoSettings.authors}</b> {authorsStr}
					</p>
				</div>
			</div>
		</section>
	);
};

export default CourseInfo;
