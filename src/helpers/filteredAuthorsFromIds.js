const filteredAuthorsFromIds = (allAuthorsList, filterAuthorsIds) =>
	allAuthorsList.filter((author) => !filterAuthorsIds.includes(author.id));

export default filteredAuthorsFromIds;
