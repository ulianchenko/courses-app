import { http } from './constants';

export const getCourses = async () => {
	const response = await fetch(`${http.base}${http.courses}`);
	return await response.json();
};

export const getAuthors = async () => {
	const response = await fetch(`${http.base}${http.authors}`);
	return await response.json();
};
