const filteredCourseAuthorsFromIds = (allAuthorsList, filterAuthorsIds) =>
	allAuthorsList.filter((author) => filterAuthorsIds.includes(author.id));

export default filteredCourseAuthorsFromIds;
