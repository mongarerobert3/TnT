import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from "./withAuth";

const RequireAuth = ({ children }) => {
  const location = useLocation();
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to='/login' state={{ path: location.pathname }} />;
  }

  return <>{children}</>; // Render the children component
};

export default RequireAuth;
