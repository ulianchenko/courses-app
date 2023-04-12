import Logo from './components/Logo';
import Button from '../../common/Button';
import { buttonText } from '../../constants';

import './Header.scss';

const Header = () => {
	return (
		<header className='header'>
			<Logo className='header__logo' />
			<div className='header-login'>
				<div className='header-login__username'>Dave</div>
				<Button buttonText={buttonText.logout} />
			</div>
		</header>
	);
};

export default Header;
