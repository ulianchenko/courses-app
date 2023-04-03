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
		console.log(response);
		const authorAdded = await response.json();
		console.log('Response from POST author', authorAdded.result);
		if (response.ok) {
			dispatch(authorAdd(authorAdded.result));
		} else throw new Error(authorAdded.errors);
	} catch (error) {
		console.log(error.message);
	}
};
