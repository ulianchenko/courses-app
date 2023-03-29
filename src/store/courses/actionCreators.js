import coursesActionTypes from './actionTypes';

export const coursesReceived = (courses) => ({
	type: coursesActionTypes.COURSES_RECEIVED,
	payload: courses,
});

export const courseAdd = (course) => ({
	type: coursesActionTypes.COURSE_ADD,
	payload: course,
});

export const courseRemove = (courseId) => ({
	type: coursesActionTypes.COURSE_REMOVE,
	payload: courseId,
});

export const courseUpdate = (course) => ({
	type: coursesActionTypes.COURSE_UPDATE,
	payload: course,
});
