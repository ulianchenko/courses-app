import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchBar from './components/SearchBar';
import Button from '../../common/Button';
import CourseCard from './components/CourseCard/CourseCard';

import formatCoursesList from '../../helpers/formatCoursesList';
import {
	mockedCoursesList,
	mockedAuthorsList,
	durationSettings,
	buttonText,
	urls,
} from '../../constants';

import './Courses.scss';

const Courses = () => {
	const [filteredCoursesList, setFilteredCoursesList] = useState(
		formatCoursesList(mockedCoursesList, mockedAuthorsList, durationSettings)
	);

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
		setFilteredCoursesList(
			formatCoursesList(courses, mockedAuthorsList, durationSettings)
		);
	};

	const handleShowCourse = (id) => {
		navigate(`${urls.courses}/${id}`);
	};

	const handleClickAddNewCourse = () => {
		navigate(urls.addCourse);
	};

	const cards = filteredCoursesList.map(({ id, ...props }) => (
		<CourseCard key={id} id={id} {...props} onShowCourse={handleShowCourse} />
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
