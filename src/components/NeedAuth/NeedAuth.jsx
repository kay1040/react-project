import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function NeedAuth({ children }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  return currentUser ? children
    : <Navigate to="/auth_form" replace state={{ preLocation: location }} />;
}
