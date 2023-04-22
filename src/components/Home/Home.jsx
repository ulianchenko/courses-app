import { useEffect } from 'react';
import { Outlet, useHref, useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../Header';

import { coursesReceived } from '../../store/courses/actionCreators';
import { authorsReceived } from '../../store/authors/actionCreators';
import { userLogin, userLogout } from '../../store/user/actionCreators';
import { getCourses, getAuthors } from '../../services';
import { getLoggedIn, getUserName } from '../../selectors';
import { urls } from '../../constants';

import './Home.scss';

const Home = () => {
	const href = useHref();
	const navigate = useNavigate();
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

	const handleLogoutButton = () => {
		// localStorage.removeItem('token');
		dispatch(userLogout());
		navigate(urls.login);
	};

	const loggedIn = useSelector(getLoggedIn);
	const userName = useSelector(getUserName);

	const component =
		href === urls.home ? <Navigate to={urls.courses} /> : <Outlet />;

	return (
		<div className='container'>
			<Header
				loggedIn={loggedIn}
				userName={userName}
				onLogoutButton={handleLogoutButton}
			/>
			{component}
		</div>
	);
};

export default Home;
