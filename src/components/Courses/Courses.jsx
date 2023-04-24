import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import SearchBar from './components/SearchBar';
import Button from '../../common/Button';
import CourseCard from './components/CourseCard/CourseCard';

import { fetchCourseRemove } from '../../store/courses/thunk';
import {
	getCoursesList,
	getAuthorsList,
	getUserRole,
	getUserToken,
} from '../../selectors';
import formatCoursesList from '../../helpers/formatCoursesList';
import { buttonText, durationSettings, urls } from '../../constants';

import './Courses.scss';

const Courses = () => {
	const coursesList = useSelector(getCoursesList);
	const allAuthorsList = useSelector(getAuthorsList);
	const userRole = useSelector(getUserRole);
	const userToken = useSelector(getUserToken);
	const [filteredCoursesList, setFilteredCoursesList] = useState([]);

	useEffect(
		() =>
			setFilteredCoursesList(
				formatCoursesList(coursesList, allAuthorsList, durationSettings)
			),
		[coursesList, allAuthorsList]
	);

	const dispatch = useDispatch();

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
		setFilteredCoursesList(
			formatCoursesList(searchCourses, allAuthorsList, durationSettings)
		);
	};

	const handleClickAddNewCourse = () => {
		navigate(urls.addCourse);
	};

	const handleShowCourse = (id) => {
		navigate(`${urls.courses}/${id}`);
	};

	const handleUpdateCourse = (id) => {
		const courseForUpdate = coursesList.find((course) => course.id === id);
		navigate(`${urls.updateCourse}/${id}`, {
			replace: true,
			state: courseForUpdate
				? {
						...courseForUpdate,
						courseAuthorsIdsArr: courseForUpdate.authors,
				  }
				: null,
		});
	};

	const handleRemoveCourse = (id) => {
		dispatch(fetchCourseRemove(userToken, id));
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
						onUpdateCourse={handleUpdateCourse}
						onRemoveCourse={handleRemoveCourse}
						userRole={userRole}
					/>
			  ));

	return (
		<section className='courses'>
			<div className='courses-interface'>
				<SearchBar onSearch={handleSearch} />
				{userRole === 'admin' ? (
					<Button
						buttonText={buttonText.addNewCourse}
						onClick={handleClickAddNewCourse}
					/>
				) : null}
			</div>
			<ul className='courses-cards'>{cards}</ul>
		</section>
	);
};

export default Courses;
