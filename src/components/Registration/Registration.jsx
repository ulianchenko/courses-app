import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
	registrationSettings,
	urls,
} from '../../constants';

import './Registration.scss';

const Registration = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [badResponse, setBadResponse] = useState([]);

	const navigate = useNavigate();

	const handleChangeName = ({ target }) => {
		setName(target.value);
	};

	const handleChangeEmail = ({ target }) => {
		setEmail(target.value);
	};

	const handleChangePassword = ({ target }) => {
		setPassword(target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const newUser = {
			name,
			password,
			email,
		};
		try {
			const response = await fetch('http://localhost:4000/register', {
				method: 'POST',
				body: JSON.stringify(newUser),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const result = await response.json();
			if (response.ok) {
				navigate(urls.login);
			} else {
				setBadResponse(result.errors);
				throw Error(response.statusText);
			}
		} catch (error) {}
	};

	return (
		<div className='container'>
			<Header showLoginInfo={false} />
			<section className='registration'>
				<form
					className={classNames(
						'registration-form',
						badResponse.length > 0 && 'badResponse'
					)}
					onSubmit={handleSubmit}
				>
					<h3 className='registration-form__title'>{titleText.registration}</h3>
					<div className='registration-form__input'>
						<Input
							onChange={handleChangeName}
							value={name}
							placeholderText={placeholderText.name}
							labelText={labelText.name}
						/>
					</div>
					<div className='registration-form__input'>
						<Input
							onChange={handleChangeEmail}
							value={email}
							placeholderText={placeholderText.email}
							labelText={labelText.email}
						/>
					</div>
					<div className='registration-form__input'>
						<Input
							onChange={handleChangePassword}
							value={password}
							placeholderText={placeholderText.password}
							labelText={labelText.password}
							type={'password'}
						/>
					</div>
					<div className='registration-form__button'>
						<Button buttonText={buttonText.registration} type={'submit'} />
					</div>
					<p className='registration-form__text'>
						{registrationSettings.info}{' '}
						<Link to={urls.login}>{registrationSettings.login}</Link>
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

export default Registration;
