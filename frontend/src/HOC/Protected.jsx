// ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

function isAuthenticated() {
  return (
    localStorage.getItem('userId') && localStorage.getItem('token')) ||
    localStorage.getItem('googleToken')
}

const ProtectedRoute = ({ children, ...rest }) => {
  const isAuth = isAuthenticated();
  return isAuth ? children : 
  (
    <>
      <Navigate to="/login" replace />
    </>
  );
};

export default ProtectedRoute;
