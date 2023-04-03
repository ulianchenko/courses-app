import { courseRemove, courseUpdate, courseAdd } from './actionCreators';
import { http } from '../../constants';

export const fetchCourseRemove = (token, id) => async (dispatch, getState) => {
	try {
		const response = await fetch(`${http.base}${http.courseRemove}${id}`, {
			method: 'DELETE',
			headers: {
				Authorization: token,
			},
		});
		if (response.ok) {
			dispatch(courseRemove(id));
		} else throw new Error(response.statusText);
	} catch (error) {
		console.log(error.message);
	}
};

export const fetchCourseUpdate =
	(token, id, course) => async (dispatch, getState) => {
		try {
			const response = await fetch(`${http.base}${http.courseUpdate}${id}`, {
				method: 'PUT',
				body: JSON.stringify(course),
				headers: {
					'Content-Type': 'application/json;charset=utf-8',
					Authorization: token,
				},
			});
			const updatedCourse = await response.json();
			if (response.ok) {
				dispatch(courseUpdate(updatedCourse.result));
			} else throw new Error(updatedCourse.errors);
		} catch (error) {
			console.log(error.message);
		}
	};

export const fetchCourseAdd = (token, course) => async (dispatch, getState) => {
	try {
		const response = await fetch(`${http.base}${http.courseAdd}`, {
			method: 'POST',
			body: JSON.stringify(course),
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				Authorization: token,
			},
		});
		const addedCourse = await response.json();
		if (response.ok) {
			dispatch(courseAdd(addedCourse.result));
		} else throw new Error(addedCourse.errors);
	} catch (error) {
		console.log(error.message);
	}
};
