import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { getUserRole } from '../../selectors';
import { urls } from '../../constants';

import './PrivateRouter.scss';

const PrivateRouter = ({ component: Component }) => {
	const updateInfo = useLocation();
	const userRole = useSelector(getUserRole);

	return userRole === 'admin' ? (
		<Component updateInfo={updateInfo.state} />
	) : (
		<Navigate to={urls.courses} replace={true} />
	);
};

export default PrivateRouter;
