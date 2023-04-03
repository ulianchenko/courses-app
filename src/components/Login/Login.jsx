import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import Header from '../Header';
import Input from '../../common/Input';
import Button from '../../common/Button';

import { postLogin } from '../../services';
import {
	titleText,
	placeholderText,
	labelText,
	buttonText,
	loginSettings,
} from '../../constants';

import './login.scss';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [badResponse, setBadResponse] = useState([]);

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
			const response = await postLogin(user);
			const data = await response.json();
			if (response.ok) {
				localStorage.setItem('token', data.result);
				navigate('/courses');
			} else {
				const responseErrors = data.errors ?? [data.result];
				const errorsMessage =
					typeof responseErrors[0] === 'undefined'
						? [response.statusText]
						: responseErrors;

				setBadResponse(errorsMessage);
				throw Error(response.statusText);
			}
		} catch (error) {}
	};

	const formClassName =
		badResponse.length > 0 ? 'login-form badResponse' : 'login-form';

	return (
		<div className='container'>
			<Header />
			<section className='login'>
				<form className={formClassName} onSubmit={handleSubmit}>
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
						<Link to={'/registration'}>{loginSettings.register}</Link>
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
