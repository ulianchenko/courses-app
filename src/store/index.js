import { combineReducers, legacy_createStore as createStore } from 'redux';
import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension';

import userReducer from './user/reducer';
import coursesReducer from './courses/reducer';
import authorsReducer from './authors/reducer';

const rootReducer = combineReducers({
	user: userReducer,
	courses: coursesReducer,
	authors: authorsReducer,
});

const store = createStore(rootReducer, composeWithDevToolsDevelopmentOnly());

store.subscribe(() => {
	const token = store.getState().user.token;
	if (!token) {
		localStorage.removeItem('token');
	}
});

export default store;
