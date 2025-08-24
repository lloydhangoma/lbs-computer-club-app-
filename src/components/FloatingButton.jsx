import { Link, useLocation } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';

const FloatingButton = () => {
  const location = useLocation();

  // Hide the button on specific pages like login or signup
  const hideButton = [
    '/login',
    '/signup',
    '/reporter-dashboard',
    '/member-dashboard',
  ].some((path) => location.pathname.startsWith(path));

  // Don't render the button if it's on a hidden path
  if (hideButton) {
    return null;
  }

  return (
    <Link
      to="/login"
      className="fixed bottom-6 right-4 sm:right-6 z-50 flex flex-col items-center group"
      aria-label="Join the Club"
    >
      <div
        className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-[#00b8e6] text-white shadow-lg transition-transform duration-300 group-hover:scale-105 animate-pulse"
        title="Join the Club"
      >
        <FaUserPlus className="text-lg sm:text-xl" />
      </div>
      <span className="mt-1 text-[10px] sm:text-xs text-[#00b8e6] font-medium animate-fade-in">
        Join the Club
      </span>
    </Link>
  );
};

export default FloatingButton;