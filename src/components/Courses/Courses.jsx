import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SearchBar from './components/SearchBar';
import Button from '../../common/Button';
import CourseCard from './components/CourseCard/CourseCard';

import { buttonText } from '../../constants';
import { getACoursesList, getAuthorsList } from '../../selectors';

import './courses.scss';

const Courses = () => {
	const coursesList = useSelector(getACoursesList);
	const authorsList = useSelector(getAuthorsList);
	const [filteredCoursesList, setFilteredCoursesList] = useState([]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => setFilteredCoursesList(coursesList), [coursesList]);

	const navigate = useNavigate();

	const handleSearch = (searchRequest) => {
		const searchCourses =
			searchRequest === ''
				? coursesList
				: coursesList.filter(
						({ title, id }) =>
							title.match(new RegExp(`${searchRequest}`, 'gi')) ||
							id.match(new RegExp(`${searchRequest}`, 'gi'))
				  );
		setFilteredCoursesList(searchCourses);
	};

	const handleClickAddNewCourse = () => {
		navigate('/courses/add');
	};

	const cards =
		filteredCoursesList.length === 0
			? null
			: filteredCoursesList.map(({ id, ...props }) => (
					<CourseCard key={id} id={id} {...props} authorsList={authorsList} />
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
