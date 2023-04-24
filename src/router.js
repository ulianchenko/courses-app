import { createBrowserRouter, redirect } from 'react-router-dom';

import Home from './components/Home';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import Registration from './components/Registration';
import Login from './components/Login';
import CourseInfo from './components/CourseInfo';
import Error from './components/Error';

import { urls } from './constants';

const router = createBrowserRouter([
	{
		path: urls.home,
		element: <Home />,
		errorElement: <Error />,
		loader: () => {
			if (!localStorage.getItem('token')) {
				return redirect(urls.login);
			}
			return null;
		},
		children: [
			{
				path: urls.courses,
				element: <Courses />,
				errorElement: <Error />,
			},
			{
				path: `${urls.courses}/:courseId`,
				element: <CourseInfo />,
				errorElement: <Error />,
			},
			{
				path: urls.addCourse,
				element: <CreateCourse />,
				errorElement: <Error />,
			},
		],
	},
	{
		path: urls.registration,
		element: <Registration />,
		errorElement: <Error />,
	},
	{
		path: urls.login,
		element: <Login />,
		errorElement: <Error />,
	},
]);

export default router;
