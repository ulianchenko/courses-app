import authorsActionTypes from './actionTypes';

const authorsInitialState = [];

const authorsReducer = (state = authorsInitialState, action) => {
	switch (action.type) {
		case authorsActionTypes.AUTHORS_RECEIVED:
			return [...action.payload];
		case authorsActionTypes.AUTHOR_ADD:
			return [...state, action.payload];
		default:
			return state;
	}
};

export default authorsReducer;
