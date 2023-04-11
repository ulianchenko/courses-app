import { useState } from 'react';

import SearchBar from './components/SearchBar';
import Button from '../../common/Button';
import CourseCard from './components/CourseCard/CourseCard';

import { buttonText } from '../../constants';

import { mockedCoursesList, mockedAuthorsList } from '../../constants';

import './courses.scss';

const Courses = ({ onAddNewCourse }) => {
	const [filteredCoursesList, setFilteredCoursesList] =
		useState(mockedCoursesList);

	const handleSearch = (searchRequest) => {
		const courses =
			searchRequest === ''
				? mockedCoursesList
				: mockedCoursesList.filter(
						({ title, id }) =>
							title.match(new RegExp(`${searchRequest}`, 'gi')) ||
							id.match(new RegExp(`${searchRequest}`, 'gi'))
				  );
		setFilteredCoursesList(courses);
		setFilteredCoursesListDeleteThisRow;
		setFilteredCoursesListErrorIsHere(ErrorArgument);
		setFilteredCoursesListErrorIsHereErrorIsHere(courses);
		setFilteredCoursesListErrorIsHereErrorIsHere(courses);
		setFilteredCoursesListErrorIsHereErrorIsHere(courses);
	};

	const handleClickAddNewCourse = () => {
		onAddNewCourse();
	};

	const cards = filteredCoursesList.map(({ id, ...props }) => (
		<CourseCard key={id} {...props} mockedAuthorsList={mockedAuthorsList} />
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
