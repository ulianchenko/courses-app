import { Link, useParams, Navigate } from 'react-router-dom';

import {
	courseInfoSettings,
	mockedCoursesList,
	mockedAuthorsList,
	durationSettings,
	infoSettings,
	urls,
} from '../../constants';
import createAuthorsStr from '../../helpers/createAuthorsStr';
import pipeDuration from '../../helpers/pipeDuration';

import './CourseInfo.scss';

const CourseInfo = () => {
	const { courseId } = useParams();
	const course = mockedCoursesList.find((course) => course.id === courseId);
	const { id, title, description, creationDate, duration, authors } =
		course ?? {
			id: '',
			title: '',
			description: '',
			creationDate: '',
			duration: '',
			authors: [],
		};
	const durationStr = pipeDuration(duration, durationSettings);
	const authorsStr = createAuthorsStr(authors, mockedAuthorsList);

	return (
		<>
			{course ? null : <Navigate to={urls.courses} />}
			<section className='courseInfo'>
				<div className='courseInfo-back'>
					<Link to={urls.courses} className='courseInfo-back__link'>
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
		</>
	);
};

export default CourseInfo;
