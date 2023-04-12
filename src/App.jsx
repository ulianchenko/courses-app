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
