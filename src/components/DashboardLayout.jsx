import React, { useState } from 'react'; // Import useState for managing sidebar visibility
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Assuming useAuth is in src/hooks
import {
  Home as HomeIcon,
  User as UserIcon,
  BookOpen as BookOpenIcon,
  GitBranch as GitBranchIcon,
  Calendar as CalendarIcon,
  MessageSquare as MessageSquareIcon,
  LogOut as LogOutIcon,
  Lightbulb as LightbulbIcon,
  Users as UsersIcon,
  Menu as MenuIcon, // Added for hamburger menu
  X as XIcon // Added for close button
} from 'lucide-react'; // For modern icons

const DashboardLayout = ({ children }) => {
  const { currentUser, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility on mobile

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/signin');
    } catch (error) {
      console.error("Failed to log out:", error);
      // Optionally set an error state to display a message to the user
    }
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: HomeIcon },
    { name: 'Profile', path: '/dashboard/profile', icon: UserIcon },
    { name: 'Learning Resources', path: '/dashboard/learn', icon: BookOpenIcon },
    { name: 'Projects Hub', path: '/dashboard/projects-hub', icon: GitBranchIcon },
    { name: 'Member Events', path: '/dashboard/member-events', icon: CalendarIcon },
    { name: 'Forum & Announce', path: '/dashboard/announcements-forum', icon: MessageSquareIcon },
    ...(isAdmin ? [{ name: 'Admin Panel', path: '/dashboard/admin', icon: UsersIcon }] : [])
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 font-poppins">
      {/* Mobile Header for Logo and Hamburger */}
      <header className="md:hidden w-full bg-white shadow-md p-4 flex items-center justify-between z-20">
        <h1 className="text-2xl font-extrabold text-[#071f49] flex items-center">
          <LightbulbIcon className="w-6 h-6 mr-2 text-yellow-500" />
          Club Portal
        </h1>
        <button onClick={toggleSidebar} className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400">
          {isSidebarOpen ? <XIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar - Responsive */}
      <aside className={`
        fixed inset-y-0 left-0 bg-white shadow-xl p-6 flex flex-col justify-between z-10
        w-64 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:relative md:translate-x-0 md:rounded-r-none md:rounded-l-xl md:m-4 md:shadow-2xl md:w-64
      `}>
        {/* Desktop Sidebar Header (Hidden on Mobile) */}
        <div className="hidden md:block">
          <h1 className="text-3xl font-extrabold text-[#071f49] mb-8 text-center flex items-center justify-center">
            <LightbulbIcon className="w-8 h-8 mr-2 text-yellow-500" />
            Club Portal
          </h1>
        </div>
        <nav className="flex-grow"> {/* Use flex-grow to push logout to bottom */}
          <ul className="space-y-3">
            {navItems.map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => {
                    navigate(item.path);
                    setIsSidebarOpen(false); // Close sidebar after navigation on mobile
                  }}
                  className={`
                    w-full flex items-center p-3 rounded-lg text-lg font-medium transition-all duration-300 ease-in-out
                    ${location.pathname.startsWith(item.path)
                      ? 'bg-blue-600 text-white shadow-md transform translate-x-1'
                      : 'text-gray-700 hover:bg-blue-100 hover:text-blue-700'}
                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75
                  `}
                >
                  <item.icon className={`mr-3 w-5 h-5 ${location.pathname.startsWith(item.path) ? 'text-white' : 'text-blue-500'}`} />
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {/* Logout Button */}
        <div className="mt-8 md:mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300"
          >
            <LogOutIcon className="mr-2 w-5 h-5" />
            Log Out
          </button>
        </div>
      </aside>

      {/* Overlay for when sidebar is open on mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[5] md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-8 flex flex-col items-center overflow-auto"> {/* Added overflow-auto */}
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
