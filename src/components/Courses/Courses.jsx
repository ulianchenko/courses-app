import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchBar from './components/SearchBar';
import Button from '../../common/Button';
import CourseCard from './components/CourseCard/CourseCard';

import { buttonText } from '../../constants';

import { mockedCoursesList, mockedAuthorsList } from '../../constants';

import './Courses.scss';

const Courses = () => {
	const [filteredCoursesList, setFilteredCoursesList] =
		useState(mockedCoursesList);

	const navigate = useNavigate();

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
	};

	const handleClickAddNewCourse = () => {
		navigate('/courses/add');
	};

	const cards = filteredCoursesList.map(({ id, ...props }) => (
		<CourseCard
			key={id}
			id={id}
			{...props}
			mockedAuthorsList={mockedAuthorsList}
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
