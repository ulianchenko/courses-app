import { authorAdd } from './actionCreators';
import { http } from '../../constants';

export const fetchAuthorAdd = (token, author) => async (dispatch, getState) => {
	try {
		const response = await fetch(`${http.base}${http.authorAdd}`, {
			method: 'POST',
			body: JSON.stringify(author),
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				Authorization: token,
			},
		});
		const authorAdded = await response.json();
		if (response.ok) {
			dispatch(authorAdd(authorAdded.result));
		} else throw new Error(authorAdded.errors);
	} catch (error) {
		console.log(error.message);
	}
};
