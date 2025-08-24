import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth(); // Still use login for automatic sign-in after successful signup
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    setLoading(true);
    try {
      // Call your backend API for signup
      const response = await axios.post(`${API_BASE_URL}/signup`, {
        email,
        password,
      });

      console.log('User signed up successfully:', response.data);
      
      // Automatically log the user in after successful signup
      await login(email, password); 
      navigate('/dashboard');
    } catch (err) {
      // Handle backend errors
      const errorMessage = err.response?.data?.message || 'Failed to create an account. Please try again.';
      setError(errorMessage);
      console.error("Signup error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 font-poppins">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full text-center border-t-4 border-blue-500">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
          Create Your Account
        </h2>
        {error && <p className="text-red-600 bg-red-100 border border-red-200 rounded p-3 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-xl"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8 text-md text-gray-700">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/signin')} // Link to the separate sign-in page
            className="text-blue-600 hover:underline font-semibold focus:outline-none"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
