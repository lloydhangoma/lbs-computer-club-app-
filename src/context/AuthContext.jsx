import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // Ensure axios is installed in your frontend project (npm install axios)

const AuthContext = createContext();

// ✅ NEW: Explicitly export AuthContext here
export { AuthContext }; 

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Define your API base URL from the frontend's .env file
  // Make sure VITE_API_URL is set in your frontend's .env (e.g., VITE_API_URL=http://localhost:5000/api)
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    // Check for an existing token in local storage on app load
    const token = localStorage.getItem('token');
    if (token) {
      // In a real application, you'd typically decode the JWT here to extract user information
      // like email, user ID, and any roles. For now, we'll set basic info.
      try {
        // A very basic way to get email and userId from the token if they are in the payload.
        // This assumes a standard JWT structure (header.payload.signature)
        const payload = JSON.parse(atob(token.split('.')[1]));
        setCurrentUser({ 
          token, 
          email: payload.user?.email || 'authenticatedUser@example.com', // Get email from payload or use placeholder
          userId: payload.user?.id || 'unknownId' // Get user ID from payload
        });
      } catch (e) {
        console.error("Failed to parse token from localStorage:", e);
        localStorage.removeItem('token'); // Remove invalid token
        setCurrentUser(null);
      }
    }
    setLoading(false);
  }, []);

  // Login function: makes a request to your backend's /api/signin endpoint
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/signin`, { email, password });
      const { token, userId } = response.data; // Backend sends token and userId
      localStorage.setItem('token', token); // Store the JWT in local storage

      // Set currentUser with details from the backend's response or decoded token
      // Assuming your backend's /signin response includes userId and email or that
      // you can decode these from the token for a more robust currentUser object.
      setCurrentUser({ email, token, userId }); 
      return response;
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      throw error; // Re-throw error for components to catch and display
    }
  };

  // Logout function: clears the token from local storage and resets currentUser
  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
    // Helper to get the current token for authenticated API calls
    getToken: () => localStorage.getItem('token'), 
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Only render children when authentication state is determined */}
    </AuthContext.Provider>
  );
};
