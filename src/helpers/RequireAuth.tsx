import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth'; 
import { auth } from '../../firebase.config';

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const [user] = useAuthState(auth); 
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;