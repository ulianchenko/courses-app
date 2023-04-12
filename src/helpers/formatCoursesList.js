import createAuthorsStr from './createAuthorsStr';
import pipeDuration from './pipeDuration';

const formatCoursesList = (coursesList, allAutorsList, durationSettings) => {
	return coursesList.map((course) => ({
		...course,
		authors: createAuthorsStr(course.authors, allAutorsList),
		duration: pipeDuration(course.duration, durationSettings),
	}));
};

export default formatCoursesList;
