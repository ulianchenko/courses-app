const filteredAuthorsFromList = (allAuthorsList, filterCourseAuthorsList) => {
	const filterCourseAuthorsIds = filterCourseAuthorsList.map(
		(author) => author.id
	);
	return allAuthorsList.filter(
		(author) => !filterCourseAuthorsIds.includes(author.id)
	);
};

export default filteredAuthorsFromList;
