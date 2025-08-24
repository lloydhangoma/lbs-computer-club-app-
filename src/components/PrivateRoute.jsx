import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth(); // Get currentUser and loading state

  if (loading) {
    // Show a loading indicator while the authentication status is being determined
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 font-poppins">
        <div className="text-primary-blue text-lg font-medium">Loading authentication...</div>
      </div>
    );
  }

  // If currentUser exists, render the children (the protected component)
  // Otherwise, redirect to the sign-in page
  return currentUser ? children : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
