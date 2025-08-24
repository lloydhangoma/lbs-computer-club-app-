import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom'; // ✅ Import useLocation
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPhoneAlt,
  FaClock,
  FaMapMarkerAlt,
  FaBars,
  FaTimes,
  // FaUser, // This icon is imported but not used, can be removed if not needed elsewhere
} from 'react-icons/fa'; 

import dummyLogo from '../assets/logos/dummyLogo.png'; // Assuming this path is correct

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // ✅ Get current location
  
  // ✅ Check if the current path is a dashboard route OR an authentication route
  const isDashboardRoute = location.pathname.startsWith('/dashboard');
  const isAuthRoute = location.pathname === '/signin' || location.pathname === '/signup';

  // ✅ CRITICAL FIX: If it's a dashboard or authentication route, this Navbar will not render anything
  // This prevents it from conflicting with DashboardLayout and keeps auth pages clean.
  if (isDashboardRoute || isAuthRoute) {
    return null; 
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="font-poppins sticky top-0 z-50 shadow-lg">
      {/* Top Header Bar */}
      <div className="bg-[#071f49] text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between">
          <div className="flex items-center gap-4 md:gap-6 text-xs md:text-sm">
            <div className="flex items-center gap-1 md:gap-2">
              <FaPhoneAlt className="text-[#00b8e6]" />
              <span>(260) 97 000 0000</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 md:gap-2">
              <FaClock className="text-[#00b8e6]" />
              <span>Thursdays: 14:10hrs-15hrs</span>
            </div>
            <div className="hidden md:flex items-center gap-1 md:gap-2">
              <FaMapMarkerAlt className="text-[#00b8e6]" />
              <span>Lusaka Boys Secondary</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-white">
            <a href="#" aria-label="Facebook" className="hover:text-[#00b8e6] transition p-1">
              <FaFacebookF />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-[#00b8e6] transition p-1">
              <FaTwitter />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-[#00b8e6] transition p-1">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-[#071f49] p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo and Club Name */}
          <div className="flex items-center space-x-2">
            <img
              src={dummyLogo}
              alt="LBS Computer Club Logo"
              className="h-20 w-30"
            />
            <NavLink to="/" className="text-xl font-bold tracking-wide">
              LBS Computer Club
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? 'text-[#00b8e6] border-b-2 border-[#00b8e6] font-semibold'
                  : 'hover:text-[#00b8e6] transition duration-300'
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about-us"
              className={({ isActive }) =>
                isActive
                  ? 'text-[#00b8e6] border-b-2 border-[#00b8e6] font-semibold'
                  : 'hover:text-[#00b8e6] transition duration-300'
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive
                  ? 'text-[#00b8e6] border-b-2 border-[#00b8e6] font-semibold'
                  : 'hover:text-[#00b8e6] transition duration-300'
              }
            >
              Events
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) =>
                isActive
                  ? 'text-[#00b8e6] border-b-2 border-[#00b8e6] font-semibold'
                  : 'hover:text-[#00b8e6] transition duration-300'
              }
            >
              Projects
            </NavLink>
            <NavLink
              to="/signin"
              className="bg-[#00b8e6] text-white py-2 px-4 rounded-full hover:bg-[#009ac2] transition-colors duration-300"
            >
              Member Login
            </NavLink>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-20 left-0 w-full bg-[#071f49] transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0'
        } overflow-hidden`}
        // Adjusted top-margin for mobile menu to account for new top header
        style={{ marginTop: '56px' }} 
      >
        <div className="flex flex-col items-center py-4 space-y-4">
          <NavLink to="/" onClick={toggleMenu} className="w-full text-center py-2 hover:bg-[#00b8e6] transition-colors duration-300">
            Home
          </NavLink>
          <NavLink to="/about-us" onClick={toggleMenu} className="w-full text-center py-2 hover:bg-[#00b8e6] transition-colors duration-300">
            About Us
          </NavLink>
          <NavLink to="/events" onClick={toggleMenu} className="w-full text-center py-2 hover:bg-[#00b8e6] transition-colors duration-300">
            Events
          </NavLink>
          <NavLink to="/projects" onClick={toggleMenu} className="w-full text-center py-2 hover:bg-[#00b8e6] transition-colors duration-300">
            Projects
          </NavLink>
          <NavLink to="/signin" onClick={toggleMenu} className="w-full text-center py-2 hover:bg-[#00b8e6] transition-colors duration-300">
            Member Login
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
