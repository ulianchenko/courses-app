import { useEffect } from 'react';
import { createBrowserRouter, useNavigate } from 'react-router-dom';

import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import Registration from './components/Registration';
import Login from './components/Login';
import CourseInfo from './components/CourseInfo';
import Error from './components/Error';

import './app.scss';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <Error />,
	},
	{
		path: '/registration',
		element: <Registration />,
		errorElement: <Error />,
	},
	{
		path: '/login',
		element: <Login />,
		errorElement: <Error />,
	},
	{
		path: '/courses',
		element: <Courses />,
		errorElement: <Error />,
	},
	{
		path: '/courses/:courseId',
		element: <CourseInfo />,
		errorElement: <Error />,
	},
	{
		path: '/courses/add',
		element: <CreateCourse />,
		errorElement: <Error />,
	},
]);

function App() {
	const navigate = useNavigate();

	useEffect(() => {
		if (localStorage.getItem('token')) {
			navigate('/courses');
		} else {
			navigate('/login');
		}
	}, [navigate]);

	return <div className='container'></div>;
}

export default App;
export { router };
