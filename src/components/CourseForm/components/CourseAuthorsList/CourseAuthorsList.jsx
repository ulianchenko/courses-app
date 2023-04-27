import Button from '../../../../common/Button';

import { titleText, buttonText, paragraphText } from '../../../../constants';

import './CourseAuthorsList.scss';

const CourseAuthorsList = ({ courseAuthors, handleClickDeleteAuthor }) => {
	const courseAuthorsList = courseAuthors.map((courseAuthor) => (
		<li key={courseAuthor.id} className='courseAuthors-courseAuthorsItem'>
			<p className='courseAuthors-courseAuthorName'>{courseAuthor.name}</p>
			<Button
				buttonText={buttonText.deleteAuthor}
				onClick={() => handleClickDeleteAuthor(courseAuthor)}
			/>
		</li>
	));

	return (
		<div className='courseAuthors'>
			<h3 className='courseAuthors-title'>{titleText.courseAuthors}</h3>
			{courseAuthorsList.length === 0 ? (
				<p>{paragraphText.courseAuthorListEmpty}</p>
			) : (
				<ul className='courseAuthors-courseAuthorsList'>{courseAuthorsList}</ul>
			)}
		</div>
	);
};

export default CourseAuthorsList;
