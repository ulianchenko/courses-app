import { Outlet, useHref, useNavigate, Navigate } from 'react-router-dom';

import Header from '../Header';

import { urls } from '../../constants';

import './Home.scss';

const Home = () => {
	const href = useHref();
	const navigate = useNavigate();

	const component =
		href === urls.home ? <Navigate to={urls.courses} /> : <Outlet />;

	const loggedIn = localStorage.getItem('token')
		? JSON.parse(localStorage.getItem('token')).user.name
		: null;

	const handleLogoutButton = () => {
		localStorage.removeItem('token');
		navigate(urls.login);
	};

	return (
		<div className='container'>
			<Header loggedIn={loggedIn} onLogoutButton={handleLogoutButton} />
			{component}
		</div>
	);
};

export default Home;
