import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';

const Profile = () => {
  const { currentUser, getToken } = useAuth();
  
  const [name, setName] = useState('');
  const [studentId, setStudentId] = useState('');
  const [phone, setPhone] = useState('');
  const [skills, setSkills] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [photoFile, setPhotoFile] = useState(null); // State for selected file for upload
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true); // Overall loading state
  const [error, setError] = useState(null);

  // Define your API base URL from the frontend's .env file
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Effect to fetch Profile Data from Backend
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = getToken(); // Get the JWT from AuthContext/localStorage

      // If no current user or no token, means they're not authenticated
      if (!currentUser || !token) {
        setLoading(false);
        setError("You must be logged in to view your profile.");
        return;
      }

      setLoading(true);
      setError(null);
      try {
        // Fetch profile using the correct /api/user/profile endpoint
        const response = await axios.get(`${API_BASE_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}` // Attach the JWT for authentication
          }
        });
        
        const profileData = response.data; 
        setName(profileData.name || '');
        setStudentId(profileData.studentId || '');
        setPhone(profileData.phone || '');
        setSkills(Array.isArray(profileData.skills) ? profileData.skills.join(', ') : profileData.skills || '');
        setPhotoUrl(profileData.photoUrl || '');

      } catch (err) {
        console.error("Failed to load user profile:", err.response?.data?.message || err.message);
        setError('Failed to load profile data. Please try again.');
        setMessage('No profile found. Please create one by editing.'); // Indicate new profile needed
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [currentUser, getToken, API_BASE_URL]);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setPhotoFile(e.target.files[0]);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage('');
    setError(null);

    const token = getToken();
    if (!currentUser || !token) {
      setError("You must be logged in to save your profile.");
      return;
    }

    setLoading(true);
    try {
      let newPhotoUrl = photoUrl; // Initialize with current photo URL

      // 1. Handle Photo Upload to Backend (if a new file is selected)
      if (photoFile) {
        const formData = new FormData();
        formData.append('profilePhoto', photoFile); // 'profilePhoto' must match the field name on your backend's multer setup

        // ✅ CORRECTED: Use /api/user/upload-profile-photo endpoint for file upload
        const uploadResponse = await axios.post(`${API_BASE_URL}/user/upload-profile-photo`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data', // Important for file uploads
            Authorization: `Bearer ${token}`
          }
        });
        newPhotoUrl = uploadResponse.data.photoUrl; // Assuming backend returns the public URL
        setPhotoUrl(newPhotoUrl); // Update state with new URL
        setPhotoFile(null); // Clear file input after upload
        setMessage('Photo uploaded. Saving profile data...');
      }

      // 2. Save/Update Profile Data in Backend
      // This endpoint should already be correct as /api/user/profile-update
      await axios.put(`${API_BASE_URL}/user/profile-update`, {
        name: name,
        studentId: studentId,
        phone: phone,
        skills: skills.split(',').map(s => s.trim()).filter(s => s !== ''), // Convert skills string to array
        photoUrl: newPhotoUrl, // Use the new or existing photo URL
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessage('Profile updated successfully!');
      setIsEditing(false); // Exit editing mode
    } catch (err) {
      console.error("Error saving profile: ", err);
      // More specific error message from backend if available
      setError("Failed to save profile. " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  // Default avatar if no photoUrl or while loading
  const avatarSrc = photoUrl || `https://placehold.co/100x100/A0D9EF/000?text=${currentUser?.email ? currentUser.email[0].toUpperCase() : '?'}`;

  // Show loading until profile data is fetched or error occurs
  if (loading) {
    return (
      // Removed min-h-screen and centering classes
      <div className="bg-gray-100 flex items-center justify-center p-4 font-poppins h-full w-full">
        <p className="text-[#071f49] text-xl">Loading profile...</p>
      </div>
    );
  }

  // Display error message if there's an error
  if (error) {
    return (
      // Removed min-h-screen and centering classes
      <div className="bg-gray-100 flex items-center justify-center p-4 font-poppins h-full w-full">
        <p className="text-red-500 text-xl text-center">{error}</p>
      </div>
    );
  }

  return (
    // Removed min-h-screen and centering classes from the main return div
    <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-lg w-full">
      <h2 className="text-3xl font-bold text-[#071f49] mb-4">Member Profile</h2>
      <div className="mb-6">
        <img
          src={avatarSrc}
          alt="Profile Avatar"
          className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-2 border-[#00b8e6]"
        />
        <p className="text-gray-700 font-semibold text-lg">{currentUser?.email || 'Not logged in'}</p>
        {currentUser?.userId && (
          <p className="text-gray-600 text-sm break-words">User ID: <span className="font-mono bg-gray-100 p-1 rounded">{currentUser.userId}</span></p>
        )}
      </div>

      {message && <p className="text-green-500 mb-4">{message}</p>}
      {error && <p className="text-red-500 mb-4">{error}</p>}

      {isEditing ? (
        <form onSubmit={handleSave} className="space-y-4 text-left">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00b8e6]"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Student ID:</label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00b8e6]"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Phone:</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00b8e6]"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Skills (comma-separated):</label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00b8e6]"
              placeholder="e.g., Python, Web Dev, AI, Cybersecurity"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Profile Photo:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00b8e6] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#00b8e6] file:text-white hover:file:bg-[#009ac2]"
            />
            {photoFile && <p className="text-sm text-gray-600 mt-1">Selected: {photoFile.name}</p>}
            {photoUrl && !photoFile && <p className="text-sm text-gray-600 mt-1">Current photo set. Upload new to change.</p>}
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#00b8e6] hover:bg-[#009ac2] text-white font-semibold py-2 px-4 rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      ) : (
        <div className="text-left">
          <p className="text-gray-700 mb-2"><span className="font-semibold">Name:</span> {name || 'N/A'}</p>
          <p className="text-gray-700 mb-2"><span className="font-semibold">Student ID:</span> {studentId || 'N/A'}</p>
          <p className="text-gray-700 mb-2"><span className="font-semibold">Phone:</span> {phone || 'N/A'}</p>
          <p className="text-gray-700 mb-4"><span className="font-semibold">Skills:</span> {skills || 'N/A'}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-[#00b8e6] hover:bg-[#009ac2] text-white font-semibold py-2 px-4 rounded-md transition duration-300"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
