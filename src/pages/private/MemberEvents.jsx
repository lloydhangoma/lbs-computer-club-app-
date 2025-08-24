import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import { useAuth } from '../../hooks/useAuth'; // Your custom JWT AuthContext

const MemberEvents = () => {
  const { currentUser, getToken } = useAuth(); // Get current user and getToken function
  const [memberEvents, setMemberEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define your API base URL from the frontend's .env file
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const fetchMemberEvents = async () => {
      const token = getToken(); // Get the JWT for authenticated requests

      if (!currentUser || !token) {
        setLoading(false);
        // If not authenticated, PrivateRoute should handle redirection.
        // This ensures component state is correct.
        return;
      }

      setLoading(true);
      setError(null);
      try {
        // ✅ Make an authenticated GET request to your backend for member events
        // You'll need to implement this endpoint on your Node.js backend (e.g., /api/member-events)
        const response = await axios.get(`${API_BASE_URL}/member-events`, {
          headers: {
            Authorization: `Bearer ${token}` // Attach the JWT for authentication
          }
        });
        
        // Assuming backend sends an array of event objects
        const eventsList = response.data;

        // Sort events in memory by date/timestamp (descending)
        // Adjust sorting logic based on the actual date format received from backend
        const sortedEvents = eventsList.sort((a, b) => {
          // Assuming 'date' is a string like "October 25, 2025" or a Date string
          const dateA = new Date(a.date || a.createdAt); // Fallback to createdAt if 'date' isn't available
          const dateB = new Date(b.date || b.createdAt);
          return dateB.getTime() - dateA.getTime(); // Sort by most recent first
        });

        setMemberEvents(sortedEvents);
      } catch (err) {
        console.error("Failed to load member events:", err);
        setError('Failed to load events. Please try again.');
        setMemberEvents([]); // Fallback to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchMemberEvents();
    // Re-run effect when currentUser changes (login/logout) or getToken/API_BASE_URL changes
  }, [currentUser, getToken, API_BASE_URL]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-poppins">
        <p className="text-[#071f49] text-xl">Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 font-poppins">
        <p className="text-red-500 text-xl text-center">{error}</p>
      </div>
    );
  }

  // Filter events based on whether they are in the past.
  // This assumes your backend provides an 'isPast' flag or a 'date' field you can compare.
  const currentDate = new Date();
  const upcomingMemberEvents = memberEvents.filter(event => {
    const eventDate = new Date(event.date || event.createdAt);
    return eventDate >= currentDate; // Event is upcoming if its date is today or in the future
  });
  const pastMemberEvents = memberEvents.filter(event => {
    const eventDate = new Date(event.date || event.createdAt);
    return eventDate < currentDate; // Event is past if its date is before today
  });


  // Using emojis/text instead of react-icons for self-containment
  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'Workshop': return <span className="mr-1 text-[#00b8e6] text-xl">💻</span>;
      case 'Session': return <span className="mr-1 text-[#00b8e6] text-xl">👥</span>;
      case 'Speaker': return <span className="mr-1 text-[#00b8e6] text-xl">🗣️</span>;
      case 'Meeting': return <span className="mr-1 text-[#00b8e6] text-xl">🤝</span>;
      default: return <span className="mr-1 text-[#00b8e6] text-xl">📅</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 font-poppins">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full mt-8">
        <h2 className="text-3xl font-bold text-[#071f49] mb-6 text-center">
          Member-Only Events & Workshops
        </h2>
        <p className="text-gray-700 text-lg mb-8 text-center">
          Welcome, <span className="font-semibold">{currentUser?.email || 'Member'}</span>! Access exclusive events just for you.
        </p>

        {/* Upcoming Events Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-[#00b8e6] mb-4 border-b pb-2">Upcoming Events 🎉</h3>
          {upcomingMemberEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingMemberEvents.map(event => (
                <div key={event.id} className="bg-blue-50 p-4 rounded-lg shadow-sm border border-blue-200">
                  {/* Placeholder image, consider fetching real images or providing static defaults from your backend */}
                  <img src={event.imageUrl || "https://placehold.co/400x200/A0D9EF/000?text=Event"} alt={event.title} className="w-full h-40 object-cover rounded-md mb-3"/>
                  <h4 className="font-bold text-xl text-gray-900 mb-2">{event.title}</h4>
                  <p className="text-gray-700 text-sm mb-1 flex items-center">
                    {getEventTypeIcon(event.type)} {event.date} - {event.time} {/* Assuming backend provides 'date' and 'time' */}
                  </p>
                  <p className="text-gray-700 text-sm mb-3 flex items-center">
                    <span className="mr-2 text-[#00b8e6] text-xl">📍</span> {event.location}
                  </p>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-700">
                      {getEventTypeIcon(event.type)} {event.type}
                    </span>
                    {event.rsvp ? (
                      <button className="bg-[#00b8e6] hover:bg-[#009ac2] text-white px-4 py-2 rounded-full font-medium transition">
                        RSVP Now
                      </button>
                    ) : (
                      <span className="text-gray-500">Details Coming Soon</span>
                    )}
                  </div>
                  {event.materials && (
                    <p className="text-xs text-green-600 mt-2">✨ Pre-event materials available!</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 text-lg">No exclusive upcoming events at the moment. Check back soon!</p>
          )}
        </div>

        {/* Past Events Section */}
        <div>
          <h3 className="text-2xl font-semibold text-[#00b8e6] mb-4 border-b pb-2">Past Events 🗓️</h3>
          {pastMemberEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pastMemberEvents.map(event => (
                <div key={event.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200 opacity-80">
                  {/* Placeholder image, consider fetching real images or providing static defaults from your backend */}
                  <img src={event.imageUrl || "https://placehold.co/400x200/CCCCCC/666?text=Event"} alt={event.title} className="w-full h-40 object-cover rounded-md mb-3 grayscale"/>
                  <h4 className="font-bold text-xl text-gray-900 mb-2">{event.title}</h4>
                  <p className="text-gray-700 text-sm mb-1 flex items-center">
                    {getEventTypeIcon(event.type)} {event.date} - {event.time}
                  </p>
                  <p className="text-gray-700 text-sm mb-3 flex items-center">
                    <span className="mr-2 text-[#00b8e6] text-xl">📍</span> {event.location}
                  </p>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-700">
                      {getEventTypeIcon(event.type)} {event.type}
                    </span>
                    {event.materials && (
                      <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full font-medium text-sm transition">
                        View Materials
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 text-lg">No past exclusive events to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberEvents;
