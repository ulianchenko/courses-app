import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import SearchBar from './components/SearchBar';
import Button from '../../common/Button';
import CourseCard from './components/CourseCard/CourseCard';

import { courseRemove } from '../../store/courses/actionCreators';
import { getACoursesList, getAuthorsList } from '../../selectors';
import formatCoursesList from '../../helpers/formatCoursesList';
import { buttonText, durationSettings } from '../../constants';

import './Courses.scss';

const Courses = () => {
	const coursesList = useSelector(getACoursesList);
	const allAuthorsList = useSelector(getAuthorsList);
	const [filteredCoursesList, setFilteredCoursesList] = useState([]);

	useEffect(
		() =>
			setFilteredCoursesList(
				formatCoursesList(coursesList, allAuthorsList, durationSettings)
			),
		[coursesList, allAuthorsList]
	);

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const handleSearch = (searchRequest) => {
		const searchCourses =
			searchRequest === ''
				? coursesList
				: coursesList.filter(
						({ title, id }) =>
							title.match(new RegExp(`${searchRequest}`, 'gi')) ||
							id.match(new RegExp(`${searchRequest}`, 'gi'))
				  );
		setFilteredCoursesList(
			formatCoursesList(searchCourses, allAuthorsList, durationSettings)
		);
	};

	const handleClickAddNewCourse = () => {
		navigate('/courses/add');
	};

	const handleShowCourse = (id) => {
		navigate(`/courses/${id}`);
	};

	const handleRemoveCourse = (id) => {
		dispatch(courseRemove(id));
	};

	const cards =
		filteredCoursesList.length === 0
			? null
			: filteredCoursesList.map(({ id, ...props }) => (
					<CourseCard
						key={id}
						id={id}
						{...props}
						onShowCourse={handleShowCourse}
						onRemoveCourse={handleRemoveCourse}
					/>
			  ));

	return (
		<section className='courses'>
			<div className='courses-interface'>
				<SearchBar onSearch={handleSearch} />
				<Button
					buttonText={buttonText.addNewCourse}
					onClick={handleClickAddNewCourse}
				/>
			</div>
			<ul className='courses-cards'>{cards}</ul>
		</section>
	);
};

export default Courses;
