import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RoleRoute = ({ roles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to="/auth" replace />;

  if (!roles.includes(user?.role)) {
    const fallback = user?.role === 'admin' ? '/admin' : '/venue';
    return <Navigate to={fallback} replace />;
  }

  return <Outlet />;
};

export default RoleRoute;
