import { Link } from 'react-router-dom';

import Logo from './components/Logo';
import Button from '../../common/Button';

import { buttonText, urls } from '../../constants';

import './Header.scss';

const Header = ({ loggedIn, userName, onLogoutButton }) => {
	const loginInfo = (
		<>
			<div className='header-login'>
				{loggedIn ? (
					<>
						<div className='header-login__username'>{userName}</div>
						<Button buttonText={buttonText.logout} onClick={onLogoutButton} />
					</>
				) : null}
			</div>
		</>
	);

	return (
		<header className='header'>
			<Link to={urls.home}>
				<Logo className='header__logo' />
			</Link>
			{loginInfo}
		</header>
	);
};

export default Header;
