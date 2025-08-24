import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth'; // Your custom JWT AuthContext
import axios from 'axios'; // Import axios for making HTTP requests

const AnnouncementsForum = () => {
  const { currentUser, getToken } = useAuth(); // Get current user and getToken function
  const [announcements, setAnnouncements] = useState([]); // State for announcements
  const [forumPosts, setForumPosts] = useState([]); // State for forum posts
  const [loadingAnnouncements, setLoadingAnnouncements] = useState(true);
  const [loadingForum, setLoadingForum] = useState(true);
  const [errorAnnouncements, setErrorAnnouncements] = useState(null);
  const [errorForum, setErrorForum] = useState(null);

  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  // Define your API base URL from the frontend's .env file
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Effect to fetch Announcements
  useEffect(() => {
    const fetchAnnouncements = async () => {
      const token = getToken();
      if (!currentUser || !token) {
        setLoadingAnnouncements(false);
        return;
      }

      setLoadingAnnouncements(true);
      setErrorAnnouncements(null);
      try {
        // ✅ Make authenticated GET request to your backend for announcements
        // You'll need to implement this endpoint on your Node.js backend (e.g., /api/announcements)
        const response = await axios.get(`${API_BASE_URL}/announcements`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAnnouncements(response.data); // Assuming backend sends an array of announcements
      } catch (err) {
        console.error("Failed to load announcements:", err);
        setErrorAnnouncements('Failed to load announcements. Please try again.');
        setAnnouncements([]); // Fallback to empty array on error
      } finally {
        setLoadingAnnouncements(false);
      }
    };
    fetchAnnouncements();
  }, [currentUser, getToken, API_BASE_URL]);

  // Effect to fetch Forum Posts
  useEffect(() => {
    const fetchForumPosts = async () => {
      const token = getToken();
      if (!currentUser || !token) {
        setLoadingForum(false);
        return;
      }

      setLoadingForum(true);
      setErrorForum(null);
      try {
        // ✅ Make authenticated GET request to your backend for forum posts
        // You'll need to implement this endpoint on your Node.js backend (e.g., /api/forum-posts)
        const response = await axios.get(`${API_BASE_URL}/forum-posts`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setForumPosts(response.data); // Assuming backend sends an array of forum posts
      } catch (err) {
        console.error("Failed to load forum posts:", err);
        setErrorForum('Failed to load forum posts. Please try again.');
        setForumPosts([]); // Fallback to empty array on error
      } finally {
        setLoadingForum(false);
      }
    };
    fetchForumPosts();
  }, [currentUser, getToken, API_BASE_URL]);

  const handleNewPostSubmit = async (e) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      // Basic client-side validation for empty fields
      setErrorForum("Title and content cannot be empty.");
      return;
    }
    setErrorForum(null); // Clear previous errors

    try {
      const token = getToken();
      if (!token) {
        setErrorForum("You must be logged in to post.");
        return;
      }

      // ✅ Make an authenticated POST request to create a new forum post
      // You'll need to implement this endpoint on your Node.js backend (e.g., POST /api/forum-posts)
      const response = await axios.post(`${API_BASE_URL}/forum-posts`, {
        title: newPostTitle,
        content: newPostContent,
        author: currentUser?.email || 'Anonymous', // Send author from frontend
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Optimistically update the UI or re-fetch posts after successful creation
      setForumPosts([response.data, ...forumPosts]); // Assuming backend returns the created post
      setNewPostTitle('');
      setNewPostContent('');
      alert("Post created successfully!"); // Use alert for now, consider custom modal later
    } catch (err) {
      console.error("Failed to create new post:", err);
      setErrorForum('Failed to create post. Please try again.');
    }
  };

  // Helper function to render loading/error messages for sections
  const renderSectionContent = (loadingState, errorState, data, noDataMessage, renderItems) => {
    if (loadingState) {
      return <p className="text-center text-gray-600 text-lg">Loading...</p>;
    }
    if (errorState) {
      return <p className="text-center text-red-500 text-lg">{errorState}</p>;
    }
    if (data.length === 0) {
      return <p className="text-center text-gray-600 text-lg">{noDataMessage}</p>;
    }
    return renderItems(data);
  };

  return (
    // Removed min-h-screen and related centering classes from the outermost div
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl w-full mt-8">
      <h2 className="text-3xl font-bold text-[#071f49] mb-6 text-center">
        Announcements & Member Forum
      </h2>
      <p className="text-gray-700 text-lg mb-8 text-center">
        Stay updated with club news and engage with fellow members!
      </p>

      {/* Announcements Section */}
      <div className="mb-12 border-b pb-6 border-gray-200">
        <h3 className="text-2xl font-semibold text-[#00b8e6] mb-4 flex items-center">
          {/* Replaced FaBullhorn with emoji/SVG equivalent */}
          <span className="mr-3 text-2xl">📢</span> Official Announcements
        </h3>
        {renderSectionContent(
          loadingAnnouncements,
          errorAnnouncements,
          announcements,
          "No new announcements at this time.",
          (items) => (
            <div className="space-y-4">
              {items.map(announcement => (
                <div key={announcement.id} className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200">
                  <h4 className="font-bold text-lg text-[#071f49] mb-1">{announcement.title}</h4>
                  <p className="text-gray-600 text-sm mb-2">Posted: {announcement.date}</p> {/* Assuming date is already formatted by backend */}
                  <p className="text-gray-700">{announcement.content}</p>
                </div>
              ))}
            </div>
          )
        )}
      </div>

      {/* Member Forum Section */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-[#00b8e6] mb-4 flex items-center">
          {/* Replaced FaComments with emoji/SVG equivalent */}
          <span className="mr-3 text-2xl">💬</span> Member Forum
        </h3>
        <p className="text-gray-700 mb-6">
          Ask questions, share resources, and discuss topics with the community.
        </p>

        {/* New Post Form */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
          <h4 className="font-bold text-xl text-[#071f49] mb-4">Start a New Discussion</h4>
          <form onSubmit={handleNewPostSubmit} className="space-y-4">
            <div>
              <label htmlFor="newPostTitle" className="block text-gray-700 text-sm font-bold mb-1">Title:</label>
              <input
                type="text"
                id="newPostTitle"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00b8e6]"
                placeholder="E.g., Seeking advice on web hosting..."
                required
              />
            </div>
            <div>
              <label htmlFor="newPostContent" className="block text-gray-700 text-sm font-bold mb-1">Content:</label>
              <textarea
                id="newPostContent"
                rows="4"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00b8e6]"
                placeholder="Share your thoughts, questions, or resources here."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#00b8e6] hover:bg-[#009ac2] text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            >
              Post Discussion
            </button>
          </form>
        </div>

        {/* Forum Posts List */}
        {renderSectionContent(
          loadingForum,
          errorForum,
          forumPosts,
          "No forum posts yet. Be the first to start a discussion!",
          (items) => (
            <div className="space-y-6">
              {items.map(post => (
                <div key={post.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                  <h4 className="font-bold text-xl text-[#071f49] mb-2">{post.title}</h4>
                  <p className="text-gray-600 text-sm mb-3">By <span className="font-medium">{post.author}</span> on {post.date || new Date(post.createdAt).toLocaleDateString()}</p>
                  <p className="text-gray-800 mb-4">{post.content}</p>
                  <div className="border-t border-gray-100 pt-4 mt-4">
                    <h5 className="font-semibold text-gray-700 mb-2 flex items-center">
                      {/* Replaced FaRegCommentDots with emoji/SVG equivalent */}
                      <span className="mr-2">🗨️</span> Comments ({post.comments?.length || 0})
                    </h5>
                    {post.comments && post.comments.length > 0 ? (
                      <div className="space-y-3 pl-4 border-l border-gray-200">
                        {post.comments.map(comment => (
                          <div key={comment.id} className="bg-gray-50 p-3 rounded-md text-sm">
                            <p className="font-medium text-gray-800">{comment.author} <span className="text-gray-500 text-xs">- {comment.date || new Date(comment.createdAt).toLocaleDateString()}</span></p>
                            <p className="text-gray-700">{comment.text}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm pl-4">No comments yet. Be the first!</p>
                    )}
                    {/* Add a simple comment input placeholder - requires backend logic to save comments */}
                    <input
                      type="text"
                      placeholder="Add a comment..."
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00b8e6] mt-3 text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AnnouncementsForum;
