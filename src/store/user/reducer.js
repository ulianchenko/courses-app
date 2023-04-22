import userActionTypes from './actionTypes';

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: localStorage.getItem('token'),
};

const userReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case userActionTypes.USER_LOGIN:
			return {
				...state,
				isAuth: true,
				name: action.payload.user.name,
				email: action.payload.user.email,
				token: action.payload.result,
			};
		case userActionTypes.USER_LOGOUT:
			return {
				...state,
				isAuth: false,
				name: '',
				email: '',
				token: '',
			};
		default:
			return state;
	}
};

export default userReducer;
