import { Link } from 'react-router-dom';

import { errorSettings, urls } from '../../constants';

import './Error.scss';

const Error = () => {
	return (
		<div className='error'>
			<h2 className='error-title'>{errorSettings.title}</h2>
			<p className='error-text'>{errorSettings.text}</p>
			<div className='courseInfo-back'>
				<Link to={urls.courses} className='courseInfo-back__link'>
					{errorSettings.linkText}
				</Link>
			</div>
		</div>
	);
};

export default Error;
