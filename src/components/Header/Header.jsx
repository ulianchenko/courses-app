import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import Logo from './components/Logo';
import Button from '../../common/Button';

import { fetchLogout } from '../../store/user/thunk';
import { getLoggedIn, getUserName, getUserToken } from '../../selectors';
import { buttonText } from '../../constants';

import './header.scss';

const Header = () => {
	const loggedIn = useSelector(getLoggedIn);
	const userName = useSelector(getUserName);
	const userToken = useSelector(getUserToken);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleLogoutButton = () => {
		navigate('/login');
		localStorage.removeItem('token');
		dispatch(fetchLogout(userToken));
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
