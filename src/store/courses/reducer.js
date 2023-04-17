import coursesActionTypes from './actionTypes';

const coursesInitialState = [];

const coursesReducer = (state = coursesInitialState, action) => {
	switch (action.type) {
		case coursesActionTypes.COURSES_RECEIVED:
			return [...action.payload];
		case coursesActionTypes.COURSE_ADD:
			return [...state, action.payload];
		case coursesActionTypes.COURSE_REMOVE:
			return state.filter((course) => course.id !== action.payload);
		case coursesActionTypes.COURSE_UPDATE:
			// let courseForUpdate = state.find(
			// 	(course) => course.id === action.payload.id
			// );
			// courseForUpdate = { ...action.payload };
			// return [
			// 	...state.filter((course) => course.id !== action.payload),
			// 	courseForUpdate,
			// ];
			return [
				...state.filter((course) => course.id !== action.payload.id),
				{ ...action.payload },
			];
		default:
			return state;
	}
};

export default coursesReducer;
