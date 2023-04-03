import { http } from './constants';

export const getCourses = async () => {
	try {
		const response = await fetch(`${http.base}${http.courses}`);
		if (!response.ok) throw new Error(response.statusText);
		return await response.json();
	} catch (error) {
		console.log(error.message);
	}
};

export const getAuthors = async () => {
	try {
		const response = await fetch(`${http.base}${http.authors}`);
		if (!response.ok) throw new Error(response.statusText);
		return await response.json();
	} catch (error) {
		console.log(error.message);
	}
};

export const postLogin = async (user) => {
	try {
		const response = await fetch(`${http.base}${http.login}`, {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response;
	} catch (error) {
		console.log(error.message);
	}
};

export const postRegister = async (user) => {
	try {
		const response = await fetch(`${http.base}${http.register}`, {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response;
	} catch (error) {
		console.log(error.message);
	}
};
