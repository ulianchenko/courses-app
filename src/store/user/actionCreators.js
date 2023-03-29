import userActionTypes from './actionTypes';

export const userLogin = (token) => ({
	type: userActionTypes.USER_LOGIN,
	payload: token,
});

export const userLogout = () => ({
	type: userActionTypes.USER_LOGOUT,
});
