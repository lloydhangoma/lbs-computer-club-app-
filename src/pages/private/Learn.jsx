import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth'; // Your custom JWT AuthContext
import axios from 'axios'; // Import axios for making HTTP requests

const Learn = () => {
  const { currentUser, getToken } = useAuth(); // Get current user and getToken function
  const [learningContent, setLearningContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define your API base URL from the frontend's .env file
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchLearningResources = async () => {
      const token = getToken(); // Get the JWT for authenticated requests

      if (!currentUser || !token) {
        setLoading(false);
        // If not authenticated, the PrivateRoute should handle redirection,
        // but this ensures component state is correct.
        return;
      }

      setLoading(true);
      setError(null);
      try {
        // ✅ Make an authenticated GET request to your backend for learning resources
        // You'll need to implement this endpoint on your Node.js backend (e.g., /api/learning-resources)
        const response = await axios.get(`${API_BASE_URL}/learning-resources`, {
          headers: {
            Authorization: `Bearer ${token}` // Attach the JWT for authentication
          }
        });
        // Assuming your backend returns an object with sections like codingChallenges, guides, etc.
        setLearningContent(response.data); 
      } catch (err) {
        console.error("Failed to load learning resources:", err);
        setError('Failed to load learning resources. Please try again.');
        // Fallback or show empty state if data fetch fails
        setLearningContent({}); // Set to empty object to avoid rendering issues
      } finally {
        setLoading(false);
      }
    };

    fetchLearningResources();
    // Re-run effect if currentUser changes (login/logout) or getToken/API_BASE_URL changes
  }, [currentUser, getToken, API_BASE_URL]);

  // Placeholder/Mock data structure for initial rendering if backend not fully implemented
  // Remove this mock data once your backend sends actual data for /api/learning-resources
  const mockLearningData = {
    codingChallenges: [
      "Beginner: Array Manipulation, String Reversal",
      "Intermediate: Dynamic Programming Basics, Tree Traversals",
      "Advanced: Graph Algorithms, Concurrency Problems"
    ],
    advancedGuides: [
      "Building a REST API with Node.js and Express",
      "Introduction to Machine Learning with Python and Scikit-learn",
      "Demystifying Cybersecurity: Basics of Network Security"
    ],
    resourceLibrary: [
      "FreeCodeCamp & Codecademy Pro discounts",
      "Selected O'Reilly E-books for members",
      "Access to academic journals (via club credentials)"
    ],
    workshopMaterials: [
      "\"Intro to Git & GitHub\" Workshop Recording (May 2025)",
      "\"Build Your First Web App\" Slides & Code (April 2025)",
      "\"Competitive Programming Strategies\" Session Notes (March 2025)"
    ]
  };

  const contentToDisplay = learningContent || mockLearningData; // Use fetched data or mock data

  if (loading) {
    return (
      // Removed min-h-screen and added h-full w-full for full-height within parent
      <div className="bg-gray-100 flex items-center justify-center p-4 font-poppins h-full w-full">
        <p className="text-[#071f49] text-xl">Loading learning resources...</p>
      </div>
    );
  }

  if (error) {
    return (
      // Removed min-h-screen and added h-full w-full for full-height within parent
      <div className="bg-gray-100 flex items-center justify-center p-4 font-poppins h-full w-full">
        <p className="text-red-500 text-xl text-center">{error}</p>
      </div>
    );
  }

  return (
    // Removed min-h-screen and related centering classes from the outermost div
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full mt-8">
      <h2 className="text-3xl font-bold text-[#071f49] mb-6 text-center">
        Exclusive Learning Resources
      </h2>
      <p className="text-gray-700 text-lg mb-8 text-center">
        Welcome, <span className="font-semibold">{currentUser?.email || 'Member'}</span>! Dive into our exclusive content designed to boost your skills.
      </p>

      {/* Section: Coding Challenges */}
      <div className="mb-8 border-b pb-6 border-gray-200">
        <h3 className="text-2xl font-semibold text-[#00b8e6] mb-3">Coding Challenges 🚀</h3>
        <p className="text-gray-700 mb-4">
          Sharpen your problem-solving skills with member-only coding puzzles and practice problems. New challenges are added weekly!
        </p>
        <ul className="list-disc list-inside text-gray-600">
          {contentToDisplay.codingChallenges && contentToDisplay.codingChallenges.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <button className="bg-[#00b8e6] hover:bg-[#009ac2] text-white font-semibold py-2 px-4 rounded-md transition duration-300 mt-4">
          View Challenges
        </button>
      </div>

      {/* Section: Advanced Guides */}
      <div className="mb-8 border-b pb-6 border-gray-200">
        <h3 className="text-2xl font-semibold text-[#00b8e6] mb-3">Advanced Guides 📚</h3>
        <p className="text-gray-700 mb-4">
          Access in-depth tutorials on specialized topics.
        </p>
        <ul className="list-disc list-inside text-gray-600">
          {contentToDisplay.advancedGuides && contentToDisplay.advancedGuides.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <button className="bg-[#00b8e6] hover:bg-[#009ac2] text-white font-semibold py-2 px-4 rounded-md transition duration-300 mt-4">
          Explore Guides
        </button>
      </div>

      {/* Section: Resource Library */}
      <div className="mb-8 border-b pb-6 border-gray-200">
        <h3 className="text-2xl font-semibold text-[#00b8e6] mb-3">Resource Library 📖</h3>
        <p className="text-gray-700 mb-4">
          Curated links to premium online courses, e-books, and research papers recommended by the club.
        </p>
        <ul className="list-disc list-inside text-gray-600">
          {contentToDisplay.resourceLibrary && contentToDisplay.resourceLibrary.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <button className="bg-[#00b8e6] hover:bg-[#009ac2] text-white font-semibold py-2 px-4 rounded-md transition duration-300 mt-4">
          Access Library
        </button>
      </div>

      {/* Section: Workshop Materials */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-[#00b8e6] mb-3">Workshop Materials 🎥</h3>
        <p className="text-gray-700 mb-4">
          Catch up on past workshops with recordings, slides, and code.
        </p>
        <ul className="list-disc list-inside text-gray-600">
          {contentToDisplay.workshopMaterials && contentToDisplay.workshopMaterials.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <button className="bg-[#00b8e6] hover:bg-[#009ac2] text-white font-semibold py-2 px-4 rounded-md transition duration-300 mt-4">
          View Workshop Archives
        </button>
      </div>

    </div>
  );
};

export default Learn;
