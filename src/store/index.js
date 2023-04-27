import {
	combineReducers,
	legacy_createStore as createStore,
	applyMiddleware,
} from 'redux';
import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension';
import thunkMiddleware from 'redux-thunk';

import userReducer from './user/reducer';
import coursesReducer from './courses/reducer';
import authorsReducer from './authors/reducer';

export const rootReducer = combineReducers({
	user: userReducer,
	courses: coursesReducer,
	authors: authorsReducer,
});

const store = createStore(
	rootReducer,
	composeWithDevToolsDevelopmentOnly(applyMiddleware(thunkMiddleware))
);

store.subscribe(() => {
	const token = store.getState().user.token;
	if (!token) {
		localStorage.removeItem('token');
	} else {
		localStorage.setItem('token', token);
	}
});

export default store;
