import authorsActionTypes from './actionTypes';

export const authorsReceived = (authors) => ({
	type: authorsActionTypes.AUTHORS_RECEIVED,
	payload: authors,
});

export const authorAdd = (author) => ({
	type: authorsActionTypes.AUTHOR_ADD,
	payload: author,
});
