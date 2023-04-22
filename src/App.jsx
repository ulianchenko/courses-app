import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
	createBrowserRouter,
	redirect,
	Outlet,
	useHref,
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import Registration from './components/Registration';
import Login from './components/Login';
import CourseInfo from './components/CourseInfo';
import Error from './components/Error';

import { getCourses, getAuthors } from './services';
import { coursesReceived } from './store/courses/actionCreators';
import { authorsReceived } from './store/authors/actionCreators';
import { userLogin } from './store/user/actionCreators';

import './App.scss';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <Error />,
		loader: () => {
			if (!localStorage.getItem('token')) {
				return redirect('/login');
			}
			return null;
		},
		children: [
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
		],
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
]);

function App() {
	const dispatch = useDispatch();

	useEffect(
		() => {
			const fetchInitialData = async () => {
				try {
					const courses = await getCourses();
					if (courses.successful) {
						dispatch(coursesReceived(courses.result));
					}

					const authors = await getAuthors();
					if (authors.successful) {
						dispatch(authorsReceived(authors.result));
					}

					if (localStorage.getItem('token')) {
						const token = localStorage.getItem('token');
						dispatch(userLogin(JSON.parse(token)));
					}
				} catch (error) {}
			};
			fetchInitialData();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);
	const href = useHref();

	const component = href === '/' ? <Courses /> : <Outlet />;

	return (
		<div className='container'>
			<Header />
			{component}
		</div>
	);
}

export default App;
export { router };
