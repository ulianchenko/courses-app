import createAuthorsStr from './createAuthorsStr';
import pipeDuration from './pipeDuration';

import { durationSettings } from '../constants';

const formatCoursesList = (coursesList, allAutorsList) => {
	return coursesList.map((course) => ({
		...course,
		authors: createAuthorsStr(course.authors, allAutorsList),
		duration: pipeDuration(course.duration, durationSettings),
	}));
};

export default formatCoursesList;
