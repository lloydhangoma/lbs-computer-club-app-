import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaCode,
  FaRobot,
  FaLaptopCode,
  FaTools,
  FaImage,
  FaMapMarkerAlt
} from 'react-icons/fa';

const Footer = () => {
  const location = useLocation();

  // Condition to not render on dashboard pages
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  // If it's a dashboard route, the Footer will not render anything
  if (isDashboardRoute) {
    return null;
  }

  return (
    <footer className="bg-[#071f49] text-white font-poppins px-6 pt-16">
      {/* Top Separator */}
      <div className="w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-full mb-8 shadow-md"></div>

      {/* Footer Main Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 pb-12">
        {/* Left Column - Logo and Description */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-[#00b8e6] p-2 rounded-full">
              <FaLaptopCode className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg">LBS Computer Club</h2>
              <p className="text-sm text-gray-400 -mt-1">Empowering Digital Minds</p>
            </div>
          </div>
          <p className="text-sm text-gray-300 mb-4">
            The official computer club of Lusaka Boys Secondary School. We are dedicated to
            imparting skills in programming, cybersecurity, and robotics to our students.
          </p>
          <div className="flex gap-3 mt-4">
            <button className="bg-gray-800 p-2 rounded-full hover:bg-gray-700">
              <FaFacebookF />
            </button>
            <button className="bg-gray-800 p-2 rounded-full hover:bg-gray-700">
              <FaTwitter />
            </button>
            <button className="bg-gray-800 p-2 rounded-full hover:bg-gray-700">
              <FaInstagram />
            </button>
          </div>
        </div>

        {/* Right Section - Grid for Club Links */}
        <div className="md:col-span-2 grid grid-cols-2 gap-6">
          {/* Club Sections */}
          <div>
            <h3 className="font-semibold text-white mb-3">Club Sections</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li><NavLink to="/projects" className="hover:text-[#00b8e6] flex items-center gap-2"><FaRobot /> Robotics</NavLink></li>
              <li><NavLink to="/cyber-security" className="hover:text-[#00b8e6] flex items-center gap-2"><FaTools /> Cybersecurity</NavLink></li>
              <li><NavLink to="/programming" className="hover:text-[#00b8e6] flex items-center gap-2"><FaCode /> Programming</NavLink></li>
              <li><NavLink to="/events" className="hover:text-[#00b8e6]">Events Calendar</NavLink></li>
            </ul>
          </div>

          {/* Community Links with Correct Google Maps URL */}
          <div>
            <h3 className="font-semibold text-white mb-3">Community</h3>
            <ul className="text-gray-300 space-y-2 text-sm">
              <li><NavLink to="/gallery" className="hover:text-[#00b8e6] flex items-center gap-2"><FaImage /> Photo Gallery</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-[#00b8e6]">Contact Us</NavLink></li>
              <li><NavLink to="/about-us" className="hover:text-[#00b8e6]">About the Club</NavLink></li>
              <li><NavLink to="/faqs" className="hover:text-[#00b8e6]">FAQs</NavLink></li>
              <li>
                <a
                  href="https://maps.google.com/?q=Lusaka%20Boys%20Secondary%20School"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#00b8e6] flex items-center gap-2"
                >
                  <FaMapMarkerAlt /> Lusaka Boys Secondary
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Club Contact Banner */}
      <div className="bg-gray-800 text-white px-6 py-4 rounded-md mb-6 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <div className="font-semibold">Ready to join the club?</div>
        <div className="text-sm">Reach out to our club patrons for more information.</div>
        <div className="font-bold text-lg text-right">Email Us <br /><span className="text-[#00b8e6]">computerclub@lbs.edu</span></div>
      </div>

      {/* Footer Bottom Row */}
      <div className="border-t border-gray-800 text-gray-400 text-xs py-4 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto px-2">
        <p>© {new Date().getFullYear()} LBS Computer Club. All rights reserved. | Built with passion by our members.</p>
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <a href="/privacy" className="hover:text-white">Privacy</a>
          <span>•</span>
          <a href="/terms" className="hover:text-white">Terms</a>
          <span>•</span>
          <span>Made with <span className="text-[#00b8e6]">💻</span> for Lusaka Boys</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;