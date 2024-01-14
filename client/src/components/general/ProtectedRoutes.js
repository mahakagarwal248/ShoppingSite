import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCookie } from '../../helpers/Cookies';

function ProtectedRoutes({ component: Component, ...props }) {
  const location = useLocation();

  const auth = getCookie('auth');
  const role = getCookie('role');

  if (location.pathname.includes('dashboard')) {
    return auth && role === 'merchant' ? (
      <Component {...props} />
    ) : auth && role !== 'merchant' ? (
      toast.error('Login with the merchant account to view merchant dashboard') && (
        <Navigate to="/" />
      )
    ) : (
      <Navigate to="/login" replace state={{ from: location }} />
    );
  }

  return auth ? (
    <Component {...props} />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

export default ProtectedRoutes;
