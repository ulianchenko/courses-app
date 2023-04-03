import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { getUserRole } from '../../selectors';

import './privateRouter.scss';

const PrivateRouter = ({ component: Component }) => {
	const updateInfo = useLocation();
	const userRole = useSelector(getUserRole);

	return userRole === 'admin' ? (
		<Component updateInfo={updateInfo.state} />
	) : (
		<Navigate to='/courses' replace={true} />
	);
};

export default PrivateRouter;
