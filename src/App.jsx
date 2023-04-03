import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import {
	createBrowserRouter,
	redirect,
	useNavigate,
	useHref,
	Outlet,
	Navigate,
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import CourseForm from './components/CourseForm';
import Registration from './components/Registration';
import Login from './components/Login';
import CourseInfo from './components/CourseInfo';
import Error from './components/Error';
import PrivateRouter from './components/PrivateRouter';

import { getCourses, getAuthors } from './services';
import { coursesReceived } from './store/courses/actionCreators';
import { authorsReceived } from './store/authors/actionCreators';
import { fetchUser } from './store/user/thunk';

import './app.scss';

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
				element: <PrivateRouter component={CourseForm} />,
				errorElement: <Error />,
			},
			{
				path: '/courses/update/:courseId',
				element: <PrivateRouter component={CourseForm} />,
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
	const navigate = useNavigate();
	const token = localStorage.getItem('token');

	useEffect(
		() => async () => {
			try {
				const courses = await getCourses();
				if (courses.successful) {
					dispatch(coursesReceived(courses.result));
				}

				const authors = await getAuthors();
				if (authors.successful) {
					dispatch(authorsReceived(authors.result));
				}

				if (token) {
					dispatch(fetchUser(token));
				} else navigate('/login');
			} catch (error) {}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[token]
	);
	const href = useHref();

	return (
		<div className='container'>
			<Header />
			{href === '/' ? <Navigate to={'/courses'} replace={true} /> : <Outlet />}
		</div>
	);
}

export default App;
export { router };
