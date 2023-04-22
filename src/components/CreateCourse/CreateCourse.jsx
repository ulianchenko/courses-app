import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';

import Title from './components/Title';
import Description from './components/Description/Description';
import AddAuthor from './components/AddAuthor/AddAuthor';
import Duration from './components/Duration/Duration';
import AuthorsList from './components/AuthorsList/AuthorsList';
import CourseAuthorsList from './components/CourseAuthorsList';

import { courseAdd } from '../../store/courses/actionCreators';
import { authorAdd } from '../../store/authors/actionCreators';
import { getAuthorsList } from '../../selectors';
import dateGenerator from '../../helpers/dateGenerator';
import validateInput from '../../helpers/validateInput';
import { validateText, urls } from '../../constants';

import './CreateCourse.scss';

const CreateCourse = () => {
	const authorsList = useSelector(getAuthorsList);
	const [authorName, setAuthorName] = useState('');
	const [courseTitle, setCourseTitle] = useState('');
	const [courseDescription, setCourseDescription] = useState('');
	const [courseDuration, setCourseDuration] = useState('');
	const [authors, setAuthors] = useState([]);
	const [courseAuthors, setCourseAuthors] = useState([]);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => setAuthors(authorsList), [authorsList]);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const handleClickCreateCourse = () => {
		if (
			!validateInput(courseTitle).minLength(2).isValid() ||
			!validateInput(courseDescription).minLength(2).isValid() ||
			!validateInput(courseDuration)
				.isNumbersOnly()
				.isMoreThanZero()
				.isValid() ||
			courseAuthors.length === 0
		) {
			alert(validateText.allFields);
			return;
		}

		const newCourse = {
			id: uuidv4(),
			title: courseTitle,
			description: courseDescription,
			creationDate: dateGenerator(),
			duration: courseDuration,
			authors: courseAuthors.map((courseAuthor) => courseAuthor.id),
		};

		dispatch(courseAdd(newCourse));

		navigate(urls.courses);
	};

	const handleChangeCourseTitle = ({ target }) => {
		setCourseTitle(target.value);
	};

	const handleChangeCourseDescription = ({ target }) => {
		setCourseDescription(target.value);
	};

	const handleClickCreateAuthor = () => {
		const newAuthor = { id: uuidv4(), name: authorName };
		dispatch(authorAdd(newAuthor));
		setAuthors((prevAuthors) => [...prevAuthors, newAuthor]);
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
					handleChangeCourseTitle={handleChangeCourseTitle}
					handleClickCreateCourse={handleClickCreateCourse}
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

export default CreateCourse;
