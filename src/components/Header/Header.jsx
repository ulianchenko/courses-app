import { useNavigate } from 'react-router-dom';

import Logo from './components/Logo';
import Button from '../../common/Button';
import { buttonText } from '../../constants';

import './header.scss';

const Header = ({ showLoginInfo = true }) => {
	const navigate = useNavigate();

	const loggedIn = localStorage.getItem('token')
		? JSON.parse(localStorage.getItem('token')).user.name
		: null;

	const handleLogoutButton = () => {
		localStorage.removeItem('token');
		navigate('/login');
	};

	const loginInfo = showLoginInfo ? (
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
	) : null;

	return (
		<header className='header'>
			<Logo className='header__logo' />
			{loginInfo}
		</header>
	);
};

export default Header;
