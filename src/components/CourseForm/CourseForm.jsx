import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Title from './components/Title';
import Description from './components/Description/Description';
import AddAuthor from './components/AddAuthor/AddAuthor';
import Duration from './components/Duration/Duration';
import AuthorsList from './components/AuthorsList/AuthorsList';
import CourseAuthorsList from './components/CourseAuthorsList';

import { fetchCourseAdd } from '../../store/courses/thunk';
import { fetchAuthorAdd } from '../../store/authors/thunk';
import { getAuthorsList, getUserToken } from '../../selectors';
import dateGenerator from '../../helpers/dateGenerator';
import validateCreateCourse from '../../helpers/validateCreateCourse';
import filteredAuthorsFromIds from '../../helpers/filteredAuthorsFromIds';
import filteredCourseAuthorsFromIds from '../../helpers/filteredCourseAuthorsFromIds';
import filteredAuthorsFromList from '../../helpers/filteredAuthorsFromList';
import { validateText } from '../../constants';

import './courseForm.scss';
import { fetchCourseUpdate } from '../../store/courses/thunk';

const CourseForm = ({ updateInfo }) => {
	const { id, title, description, duration, courseAuthorsIdsArr } =
		updateInfo ?? {
			id: '',
			title: '',
			description: '',
			duration: '',
			courseAuthorsIdsArr: [],
		};

	const authorsList = useSelector(getAuthorsList);
	const token = useSelector(getUserToken);
	const authorsArr = filteredAuthorsFromIds(authorsList, courseAuthorsIdsArr);
	const courseAuthorsArr = filteredCourseAuthorsFromIds(
		authorsList,
		courseAuthorsIdsArr
	);
	const [authorName, setAuthorName] = useState('');
	const [courseTitle, setCourseTitle] = useState(title);
	const [courseDescription, setCourseDescription] = useState(description);
	const [courseDuration, setCourseDuration] = useState(duration);
	const [authors, setAuthors] = useState(authorsArr);
	const [courseAuthors, setCourseAuthors] = useState(courseAuthorsArr);

	useEffect(() => {
		const authorsArr = filteredAuthorsFromList(authorsList, courseAuthors);
		setAuthors(authorsArr);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authorsList]);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const handleClickCreateCourse = () => {
		if (
			validateCreateCourse(
				courseTitle,
				courseDescription,
				courseDuration,
				courseAuthors
			)
		) {
			alert(validateText.allFields);
			return;
		}

		const newCourse = {
			title: courseTitle,
			description: courseDescription,
			creationDate: dateGenerator(),
			duration: +courseDuration,
			authors: courseAuthors.map((courseAuthor) => courseAuthor.id),
		};

		dispatch(fetchCourseAdd(token, newCourse));

		navigate('/courses');
	};

	const handleClickUpdateCourse = () => {
		if (
			validateCreateCourse(
				courseTitle,
				courseDescription,
				courseDuration,
				courseAuthors
			)
		) {
			alert(validateText.allFields);
			return;
		}

		const course = {
			title: courseTitle,
			description: courseDescription,
			duration: +courseDuration,
			authors: courseAuthors.map((courseAuthor) => courseAuthor.id),
		};
		dispatch(fetchCourseUpdate(token, id, course));
		navigate('/courses');
	};

	const handleChangeCourseTitle = ({ target }) => {
		setCourseTitle(target.value);
	};

	const handleChangeCourseDescription = ({ target }) => {
		setCourseDescription(target.value);
	};

	const handleClickCreateAuthor = () => {
		const newAuthor = { name: authorName };
		dispatch(fetchAuthorAdd(token, newAuthor));
		setAuthorName('');
	};

	const handleChangeAuthorName = ({ target }) => {
		setAuthorName(target.value);
	};

	const handleChangeCourseDuration = ({ target }) => {
		setCourseDuration(target.value);
	};

	const handleClickAddAuthor = (author) => {
		setAuthors((prevAuthors) =>
			prevAuthors.filter((prevAuthor) => prevAuthor.id !== author.id)
		);
		setCourseAuthors((prevCourseAuthors) => [...prevCourseAuthors, author]);
	};

	const handleClickDeleteAuthor = (courseAuthor) => {
		setAuthors((prevAuthors) => [...prevAuthors, courseAuthor]);
		setCourseAuthors((prevCourseAuthors) =>
			prevCourseAuthors.filter(
				(prevCourseAuthor) => prevCourseAuthor.id !== courseAuthor.id
			)
		);
	};

	return (
		<section className='createCourse'>
			<div className='createCourse-title'>
				<Title
					courseTitle={courseTitle}
					updateInfo={updateInfo}
					handleChangeCourseTitle={handleChangeCourseTitle}
					handleClickCreateCourse={handleClickCreateCourse}
					handleClickUpdateCourse={handleClickUpdateCourse}
				/>
			</div>
			<div className='createCourse-description'>
				<Description
					courseDescription={courseDescription}
					handleChangeCourseDescription={handleChangeCourseDescription}
				/>
			</div>
			<div className='createCourse-info'>
				<div className='createCourse-info__general'>
					<div className='createCourse-info__addAuthor'>
						<AddAuthor
							authorName={authorName}
							handleChangeAuthorName={handleChangeAuthorName}
							handleClickCreateAuthor={handleClickCreateAuthor}
						/>
					</div>
					<div className='createCourse-info__duration'>
						<Duration
							courseDuration={courseDuration}
							handleChangeCourseDuration={handleChangeCourseDuration}
						/>
					</div>
				</div>
				<div className='createCourse-info__authors'>
					<div className='createCourse-info__authorsList'>
						<AuthorsList
							authors={authors}
							handleClickAddAuthor={handleClickAddAuthor}
						/>
					</div>
					<div className='createCourse-info__courseAuthorsList'>
						<CourseAuthorsList
							courseAuthors={courseAuthors}
							handleClickDeleteAuthor={handleClickDeleteAuthor}
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CourseForm;
