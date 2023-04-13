import { useState } from 'react';

import SearchBar from './components/SearchBar';
import Button from '../../common/Button';
import CourseCard from './components/CourseCard/CourseCard';

import formatCoursesList from '../../helpers/formatCoursesList';
import {
	mockedCoursesList,
	mockedAuthorsList,
	durationSettings,
	buttonText,
} from '../../constants';

import './Courses.scss';

const Courses = ({ onAddNewCourse }) => {
	const [filteredCoursesList, setFilteredCoursesList] = useState(
		formatCoursesList(mockedCoursesList, mockedAuthorsList, durationSettings)
	);

	const handleSearch = (searchRequest) => {
		const courses =
			searchRequest === ''
				? mockedCoursesList
				: mockedCoursesList.filter(
						({ title, id }) =>
							title.match(new RegExp(`${searchRequest}`, 'gi')) ||
							id.match(new RegExp(`${searchRequest}`, 'gi'))
				  );
		setFilteredCoursesList(
			formatCoursesList(courses, mockedAuthorsList, durationSettings)
		);
	};

	const handleClickAddNewCourse = () => {
		onAddNewCourse();
	};

	const cards = filteredCoursesList.map(({ id, ...props }) => (
		<CourseCard key={id} {...props} />
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
