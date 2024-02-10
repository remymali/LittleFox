import {Navigate,Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux';

const AuthorizedRoute = ({ allowedRoles }) => {
    const { userInfo } = useSelector((state) => state.auth);
    const isAuthorized = allowedRoles.includes(userInfo.role);

    return isAuthorized ? <Outlet /> : <Navigate to="/" replace />;
};

export default AuthorizedRoute;
