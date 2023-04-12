import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import Logo from './components/Logo';
import Button from '../../common/Button';

import { buttonText } from '../../constants';
import { userLogout } from '../../store/user/actionCreators';
import { getLoggedIn, getUserName } from '../../selectors';

import './Header.scss';

const Header = () => {
	const loggedIn = useSelector(getLoggedIn);
	const userName = useSelector(getUserName);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const handleLogoutButton = () => {
		localStorage.removeItem('token');
		dispatch(userLogout());
		navigate('/login');
	};

	const loginInfo = (
		<>
			<div className='header-login'>
				{loggedIn ? (
					<>
						<div className='header-login__username'>{userName}</div>
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
