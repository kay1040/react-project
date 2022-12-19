import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

function NeedAuth(props) {
  const auth = useSelector((state) => state.auth);
  const location = useLocation();
  const { children } = props;
  return auth.isLogged ? children
    : <Navigate to="/auth_form" replace state={{ preLocation: location }} />;
}

export default NeedAuth;
