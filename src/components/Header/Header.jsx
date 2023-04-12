import { Link, useNavigate } from 'react-router-dom';

import Logo from './components/Logo';
import Button from '../../common/Button';
import { buttonText } from '../../constants';

import './Header.scss';

const Header = () => {
	const navigate = useNavigate();

	const loggedIn = localStorage.getItem('token')
		? JSON.parse(localStorage.getItem('token')).user.name
		: null;

	const handleLogoutButton = () => {
		localStorage.removeItem('token');
		navigate('/login');
	};

	const loginInfo = (
		<>
			<div className='header-login'>
				{loggedIn ? (
					<>
						<div className='header-login__username'>{loggedIn}</div>
						<Button
							buttonText={buttonText.logout}
							onClick={handleLogoutButton}
						/>
					</>
				) : null}
			</div>
		</>
	);

	return (
		<header className='header'>
			<Link to={'/'}>
				<Logo className='header__logo' />
			</Link>
			{loginInfo}
		</header>
	);
};

export default Header;
