import createAuthorsStr from './createAuthorsStr';
import pipeDuration from './pipeDuration';

import { mockedAuthorsList, durationSettings } from '../constants';

const formatCoursesList = (coursesList) => {
	return coursesList.map((course) => ({
		...course,
		authors: createAuthorsStr(course.authors, mockedAuthorsList),
		duration: pipeDuration(course.duration, durationSettings),
	}));
};

export default formatCoursesList;
