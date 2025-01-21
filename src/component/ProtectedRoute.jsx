import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  useEffect(() => {
    if (user && allowedRoles && !allowedRoles.includes(user.role)) {
      logout();
    }
  }, [user, allowedRoles, logout]);

  if (!user) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace state={{ 
      from: location,
      error: "Unauthorized access attempt. Please login with appropriate credentials." 
    }} />;
  }

  return children;
};

export default ProtectedRoute;