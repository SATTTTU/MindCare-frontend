// src/components/routes/ProtectedRoute.jsx (Correct)
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, token } = useAuth();

  if (!token) return <Navigate to="/login" replace />;
  if (!user) return null; // or show <LoadingSpinner />

  return !allowedRoles || allowedRoles.includes(user.role)
    ? <Outlet />
    : <Navigate to="/unauthorized" replace />;
};


export default ProtectedRoute;