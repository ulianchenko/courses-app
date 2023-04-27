import Button from '../../../../common/Button';

import { titleText, buttonText, paragraphText } from '../../../../constants';

import './AuthorsList.scss';

const AuthorsList = ({ authors, handleClickAddAuthor }) => {
	const authorsList = authors.map((author) => (
		<li key={author.id} className='authors-authorsItem'>
			<p className='authors-authorName'>{author.name}</p>
			<Button
				buttonText={buttonText.addAuthor}
				onClick={() => handleClickAddAuthor(author)}
			/>
		</li>
	));

	return (
		<div className='authors'>
			<h3 className='authors-title'>{titleText.authors}</h3>
			{authorsList.length === 0 ? (
				<p>{paragraphText.authorListEmpty}</p>
			) : (
				<ul className='authors-authorsList'>{authorsList}</ul>
			)}
		</div>
	);
};

export default AuthorsList;
