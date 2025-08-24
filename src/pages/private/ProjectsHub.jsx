import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth'; // Your custom JWT AuthContext
import axios from 'axios'; // Import axios for making HTTP requests

const ProjectsHub = () => {
  const { currentUser, getToken } = useAuth(); // Get current user and getToken function
  const [projects, setProjects] = useState([]); // State for projects data
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [errorProjects, setErrorProjects] = useState(null);

  const [ideaTitle, setIdeaTitle] = useState('');
  const [ideaDescription, setIdeaDescription] = useState('');
  const [submittingIdea, setSubmittingIdea] = useState(false);
  const [ideaMessage, setIdeaMessage] = useState('');

  // Define your API base URL from the frontend's .env file
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Effect to fetch Projects
  useEffect(() => {
    const fetchProjects = async () => {
      const token = getToken();
      if (!currentUser || !token) {
        setLoadingProjects(false);
        return;
      }

      setLoadingProjects(true);
      setErrorProjects(null);
      try {
        // ✅ Make authenticated GET request to your backend for projects
        // You'll need to implement this endpoint on your Node.js backend (e.g., /api/projects)
        const response = await axios.get(`${API_BASE_URL}/projects`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProjects(response.data); // Assuming backend sends an array of project objects
      } catch (err) {
        console.error("Failed to load projects:", err);
        setErrorProjects('Failed to load projects. Please try again.');
        setProjects([]); // Fallback to empty array on error
      } finally {
        setLoadingProjects(false);
      }
    };
    fetchProjects();
  }, [currentUser, getToken, API_BASE_URL]);

  const handleSubmitIdea = async (e) => {
    e.preventDefault();
    setIdeaMessage('');
    setErrorProjects(null); // Clear any previous errors

    if (!ideaTitle.trim() || !ideaDescription.trim()) {
      setIdeaMessage("Title and description cannot be empty.");
      return;
    }

    setSubmittingIdea(true);
    try {
      const token = getToken();
      if (!token) {
        setIdeaMessage("You must be logged in to submit an idea.");
        setSubmittingIdea(false);
        return;
      }

      // ✅ Make an authenticated POST request to submit a new project idea
      // You'll need to implement this endpoint on your Node.js backend (e.g., POST /api/project-ideas)
      const response = await axios.post(`${API_BASE_URL}/project-ideas`, {
        title: ideaTitle,
        description: ideaDescription,
        suggestedBy: currentUser?.email || 'Anonymous', // Send author from frontend
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setIdeaMessage("Project idea submitted successfully!");
      setIdeaTitle('');
      setIdeaDescription('');
      // Optionally refetch projects to see if the new idea is immediately displayed
      // fetchProjects(); // If your backend adds new ideas directly to main projects
    } catch (err) {
      console.error("Failed to submit project idea:", err);
      setIdeaMessage('Failed to submit idea. Please try again.');
    } finally {
      setSubmittingIdea(false);
    }
  };

  // Helper function to render loading/error messages for sections
  const renderSectionContent = (loadingState, errorState, data, noDataMessage, renderItems) => {
    if (loadingState) {
      // Removed min-h-screen and added h-full w-full for full-height within parent
      return (
        <div className="bg-gray-100 flex items-center justify-center p-4 font-poppins h-full w-full">
          <p className="text-center text-gray-600 text-lg">Loading...</p>
        </div>
      );
    }
    if (errorState) {
      // Removed min-h-screen and added h-full w-full for full-height within parent
      return (
        <div className="bg-gray-100 flex items-center justify-center p-4 font-poppins h-full w-full">
          <p className="text-center text-red-500 text-lg">{errorState}</p>
        </div>
      );
    }
    if (data.length === 0) {
      return <p className="text-center text-gray-600 text-lg">{noDataMessage}</p>;
    }
    return renderItems(data);
  };

  // Mock data for initial rendering if backend not fully implemented or returns empty
  const mockProjectsData = [
    {
      id: 'mock-1',
      title: 'Club Management System',
      description: 'A web application to streamline club member management, event sign-ups, and resource tracking.',
      tags: ['WebDev', 'Database', 'React'],
    },
    {
      id: 'mock-2',
      title: 'AI Chatbot for School Support',
      description: 'Develop an intelligent chatbot to answer common student queries and provide academic assistance.',
      tags: ['AI', 'Python', 'NaturalLanguageProcessing'],
    },
  ];

  const projectsToDisplay = projects.length > 0 ? projects : mockProjectsData;


  return (
    // Removed min-h-screen and related centering classes from the outermost div
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full mt-8">
      <h2 className="text-3xl font-bold text-[#071f49] mb-6 text-center">
        Project Collaboration Hub
      </h2>
      <p className="text-gray-700 text-lg mb-8 text-center">
        Welcome, <span className="font-semibold">{currentUser?.email || 'Member'}</span>! Explore ongoing projects, join teams, and contribute your ideas.
      </p>

      {/* Section: Current and Upcoming Projects */}
      <div className="mb-8 border-b pb-6 border-gray-200">
        <h3 className="text-2xl font-semibold text-[#00b8e6] mb-3">Current & Upcoming Projects 💻</h3>
        <p className="text-gray-700 mb-4">
          Browse through the club's active development initiatives. Click on a project to see more details and how to join!
        </p>
        {renderSectionContent(
          loadingProjects,
          errorProjects,
          projectsToDisplay, // Use projectsToDisplay (fetched or mock)
          "No projects available at the moment. Check back soon!",
          (items) => (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map(project => (
                <div key={project.id} className="bg-blue-50 p-4 rounded-md shadow-sm border border-blue-200">
                  <h4 className="font-bold text-lg text-[#071f49] mb-1">{project.title}</h4>
                  <p className="text-gray-700 text-sm">{project.description}</p>
                  {project.tags && project.tags.length > 0 && (
                    <span className="text-xs text-blue-600 font-medium">
                      {project.tags.map((tag, idx) => `#${tag}`).join(' ')}
                    </span>
                  )}
                  <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-1 px-3 rounded-full mt-3">View Details</button>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {/* Section: Team Access & Collaboration Tools */}
      <div className="mb-8 border-b pb-6 border-gray-200">
        <h3 className="text-2xl font-semibold text-[#00b8e6] mb-3">Team Access & Tools 🤝</h3>
        <p className="text-gray-700 mb-4">
          Find links to your project team's specific resources.
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li><a href="#" className="text-[#00b8e6] hover:underline">Private GitHub Repositories</a></li>
          <li><a href="#" className="text-[#00b8e6] hover:underline">Discord Channels for Project Communication</a></li>
          <li><a href="#" className="text-[#00b8e6] hover:underline">Trello/Jira Boards for Task Management</a></li>
          <li><a href="#" className="text-[#00b8e6] hover:underline">Shared Google Drive for Documents</a></li>
        </ul>
      </div>

      {/* Section: Project Idea Submission */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-[#00b8e6] mb-3">Submit a Project Idea ✨</h3>
        <p className="text-gray-700 mb-4">
          Have a brilliant idea for a new club project? Submit it here!
        </p>
        <form onSubmit={handleSubmitIdea} className="space-y-4">
          {ideaMessage && <p className={`text-center ${ideaMessage.includes('successfully') ? 'text-green-500' : 'text-red-500'} mb-4`}>{ideaMessage}</p>}
          <div>
            <label htmlFor="ideaTitle" className="block text-gray-700 text-sm font-bold mb-1">Idea Title:</label>
            <input
              type="text"
              id="ideaTitle"
              value={ideaTitle}
              onChange={(e) => setIdeaTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00b8e6]"
              placeholder="e.g., Develop a Smart Classroom Automation System"
              required
            />
          </div>
          <div>
            <label htmlFor="ideaDescription" className="block text-gray-700 text-sm font-bold mb-1">Description:</label>
            <textarea
              id="ideaDescription"
              rows="4"
              value={ideaDescription}
              onChange={(e) => setIdeaDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00b8e6]"
              placeholder="Briefly describe your project idea, its purpose, and potential technologies."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={submittingIdea}
            className="bg-[#00b8e6] hover:bg-[#009ac2] text-white font-semibold py-2 px-4 rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submittingIdea ? 'Submitting...' : 'Submit Idea'}
          </button>
        </form>
      </div>

    </div>
  );
};

export default ProjectsHub;
