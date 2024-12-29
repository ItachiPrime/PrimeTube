import React, { FC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase.config';
import { Navigate } from 'react-router-dom';

const RequireAuth: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  // Show a loading state while Firebase checks the authentication state
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Redirect to login if no user is authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default RequireAuth;
