import { userLogin, userLogout } from './actionCreators';
import { http } from '../../constants';

export const fetchUser = (token) => async (dispatch, getState) => {
	try {
		const response = await fetch(`${http.base}${http.user}`, {
			headers: {
				Authorization: token,
			},
		});

		const userResponse = await response.json();
		if (response.ok) {
			const user = { token, ...userResponse.result };
			dispatch(userLogin(user));
		} else {
			localStorage.removeItem('token');
			throw new Error(response.statusText);
		}
	} catch (error) {
		console.log(error.message);
	}
};

export const fetchLogout = (token) => async (dispatch, getState) => {
	try {
		const response = await fetch(`${http.base}${http.logout}`, {
			method: 'DELETE',
			headers: {
				Authorization: token,
			},
		});
		if (response.ok) {
			dispatch(userLogout());
		} else throw new Error(response.statusText);
	} catch (error) {
		console.log(error.message);
	}
};
