import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import classNames from 'classnames';

import Header from '../Header';
import Input from '../../common/Input';
import Button from '../../common/Button';

import {
	titleText,
	placeholderText,
	labelText,
	buttonText,
	loginSettings,
	urls,
} from '../../constants';
import { userLogin } from '../../store/user/actionCreators';

import './Login.scss';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [badResponse, setBadResponse] = useState([]);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const handleChangeEmail = ({ target }) => {
		setEmail(target.value);
	};

	const handleChangePassword = ({ target }) => {
		setPassword(target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const user = {
			password,
			email,
		};
		try {
			const response = await fetch('http://localhost:4000/login', {
				method: 'POST',
				body: JSON.stringify(user),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const result = await response.json();
			if (response.ok) {
				localStorage.setItem('token', JSON.stringify(result));
				dispatch(userLogin(result));
				navigate(urls.courses);
			} else {
				const responseErrors = result.errors ?? [result.result];
				setBadResponse(responseErrors);
				throw Error(response.statusText);
			}
		} catch (error) {}
	};

	return (
		<div className='container'>
			<Header />
			<section className='login'>
				<form
					className={classNames(
						'login-form',
						badResponse.length > 0 && 'badResponse'
					)}
					onSubmit={handleSubmit}
				>
					<h3 className='login-form__title'>{titleText.login}</h3>
					<div className='login-form__input'>
						<Input
							onChange={handleChangeEmail}
							value={email}
							placeholderText={placeholderText.email}
							labelText={labelText.email}
						/>
					</div>
					<div className='login-form__input'>
						<Input
							onChange={handleChangePassword}
							value={password}
							placeholderText={placeholderText.password}
							labelText={labelText.password}
							type={'password'}
						/>
					</div>
					<div className='login-form__button'>
						<Button buttonText={buttonText.login} type={'submit'} />
					</div>
					<p className='login-form__text'>
						{loginSettings.info}{' '}
						<Link to={urls.registration}>{loginSettings.register}</Link>
					</p>
				</form>
				{badResponse.length > 0 ? (
					<div className='badResponseMessage'>
						{badResponse.map((message) => (
							<p key={uuidv4()}>{message}</p>
						))}
					</div>
				) : null}
			</section>
		</div>
	);
};

export default Login;
