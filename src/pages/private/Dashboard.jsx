import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import axios from 'axios';
// We no longer need to import DashboardLayout here if it's only used for wrapping
// However, if DashboardLayout is a named export and also contains other things you might use, you can leave the import.
// For now, let's assume it was just for the wrapper.

const Dashboard = () => {
  const { currentUser, getToken } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [error, setError] = useState('');

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = getToken();

      if (!currentUser || !token) {
        setLoadingProfile(false);
        return;
      }

      setLoadingProfile(true);
      setError('');
      try {
        const response = await axios.get(`${API_BASE_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserProfile(response.data);
      } catch (err) {
        console.error("Failed to load user profile:", err.response?.data?.message || err.message);
        setError('Failed to load user profile. Please try again.');
        setUserProfile({ email: currentUser.email });
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchUserProfile();
  }, [currentUser, getToken, API_BASE_URL]);


  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center font-poppins">
        <p className="text-gray-700 text-lg">You need to be logged in to view this page.</p>
      </div>
    );
  }

  // THE FIX IS HERE: The <DashboardLayout> wrapper has been removed.
  // This component now only returns the content for the main area.
  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-5xl w-full text-center border-t-4 border-blue-500">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-6 flex items-center justify-center">
        <svg className="w-10 h-10 mr-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
        User Dashboard Overview
      </h2>
      {error && <p className="text-red-600 bg-red-100 border border-red-200 rounded p-3 mb-4">{error}</p>}

      {loadingProfile ? (
        <p className="text-gray-600 text-lg">Loading profile...</p>
      ) : (
        <>
          <p className="text-lg text-gray-700 mb-2">
            Welcome, <span className="font-semibold text-blue-700">{userProfile?.email || 'User'}</span>!
          </p>
          {currentUser?.userId && (
            <p className="text-md text-gray-500 mb-6">
              Your User ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded text-sm">{currentUser.userId}</span>
            </p>
          )}
          <p className="text-gray-700 mt-8">
            This is your central hub. Use the navigation on the left to access your profile, learning resources, project collaboration, and more!
          </p>
        </>
      )}
    </div>
  );
};

export default Dashboard;