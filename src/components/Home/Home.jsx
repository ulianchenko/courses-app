import { useEffect } from 'react';
import { Outlet, useHref, useNavigate, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Header from '../Header';

import { coursesReceived } from '../../store/courses/actionCreators';
import { authorsReceived } from '../../store/authors/actionCreators';
import { userLogout } from '../../store/user/actionCreators';
import { getCourses, getAuthors } from '../../services';
import { getLoggedIn, getUserName } from '../../selectors';
import { fetchUser } from '../../store/user/thunk';
import { urls } from '../../constants';

import './Home.scss';

const Home = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const href = useHref();

	const loggedIn = useSelector(getLoggedIn);
	const userName = useSelector(getUserName);

	useEffect(
		() => {
			const fetchInitialData = async () => {
				const token = localStorage.getItem('token');
				try {
					if (token) {
						dispatch(fetchUser(token));
					} else navigate(urls.login);

					const courses = await getCourses();
					if (courses.successful) {
						dispatch(coursesReceived(courses.result));
					}

					const authors = await getAuthors();
					if (authors.successful) {
						dispatch(authorsReceived(authors.result));
					}
				} catch (error) {}
			};
			fetchInitialData();
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const handleLogoutButton = () => {
		dispatch(userLogout());
		navigate(urls.login);
	};

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
