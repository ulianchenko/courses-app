import userActionTypes from './actionTypes';

export const userLogin = (user) => ({
	type: userActionTypes.USER_LOGIN,
	payload: user,
});

export const userLogout = () => ({
	type: userActionTypes.USER_LOGOUT,
});
