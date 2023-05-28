import { rootReducer } from '../index';
import coursesReducer from '../courses/reducer';
import coursesActionTypes from '../courses/actionTypes';

import { mockedCoursesList } from '../../constants';

describe('store reducer', () => {
	it('should return the initial state of rootReducer', () => {
		expect(rootReducer(undefined, { type: undefined })).toEqual({
			user: {
				isAuth: false,
				name: '',
				email: '',
				token: '',
				role: '',
			},
			courses: [],
			authors: [],
		});
	});
	it('should return the initial state of coursesReducer', () => {
		expect(coursesReducer(undefined, { type: undefined })).toEqual([]);
	});
	it('should handle COURSE_ADD and returns new state of coursesReducer', () => {
		expect(
			coursesReducer(undefined, {
				type: coursesActionTypes.COURSE_ADD,
				payload: mockedCoursesList[0],
			})
		).toEqual([mockedCoursesList[0]]);
	});
	it('should handle COURSES_RECEIVED and returns new state of coursesReducer', () => {
		expect(
			coursesReducer(undefined, {
				type: coursesActionTypes.COURSES_RECEIVED,
				payload: mockedCoursesList,
			})
		).toEqual([...mockedCoursesList]);
	});
});
