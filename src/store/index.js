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

export default store;
