import createAuthorsStr from './createAuthorsStr';
import pipeDuration from './pipeDuration';

const formatCoursesList = (coursesList, allAuthorsList, durationSettings) => {
	return coursesList.map((course) => ({
		...course,
		authors: createAuthorsStr(course.authors, allAuthorsList),
		duration: pipeDuration(course.duration, durationSettings),
	}));
};

export default formatCoursesList;
