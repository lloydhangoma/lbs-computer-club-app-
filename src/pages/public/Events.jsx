import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaCode, FaTrophy } from 'react-icons/fa'; // Importing relevant icons
import ScrollToTopButton from '../../components/ScrollToTopButton';

const Events = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS, run once for events
  }, []);

  // Dummy data for events
  const eventsData = [
    {
      id: 1,
      title: 'Annual Coding Challenge',
      date: 'October 26, 2025',
      time: '09:00 AM - 05:00 PM',
      location: 'School Main Hall',
      description: 'A competitive coding challenge for all skill levels, focusing on problem-solving and algorithm design. Prizes for top performers!',
      type: 'Competition',
      image: 'https://placehold.co/600x400/00b8e6/ffffff?text=Coding+Challenge', // Placeholder image
      past: false,
    },
    {
      id: 2,
      title: 'Beginner Robotics Workshop',
      date: 'September 15, 2025',
      time: '02:00 PM - 04:00 PM',
      location: 'Science Lab',
      description: 'Learn the basics of robotics, build a simple robot, and program it to complete tasks. No prior experience needed!',
      type: 'Workshop',
      image: 'https://placehold.co/600x400/071f49/ffffff?text=Robotics+Workshop', // Placeholder image
      past: false,
    },
    {
      id: 3,
      title: 'Cybersecurity Awareness Session',
      date: 'August 20, 2025',
      time: '03:00 PM - 04:30 PM',
      location: 'Computer Lab 1',
      description: 'An interactive session on staying safe online, understanding common cyber threats, and protecting your digital footprint.',
      type: 'Session',
      image: 'https://placehold.co/600x400/00b8e6/ffffff?text=Cybersecurity+Session', // Placeholder image
      past: false,
    },
    {
      id: 4,
      title: 'Web Development Basics (Past Event)',
      date: 'July 10, 2025',
      time: '10:00 AM - 01:00 PM',
      location: 'Computer Lab 2',
      description: 'A hands-on workshop covering HTML, CSS, and basic JavaScript to build your first web page.',
      type: 'Workshop',
      image: 'https://placehold.co/600x400/071f49/ffffff?text=Web+Dev+Workshop', // Placeholder image
      past: true,
    },
    {
      id: 5,
      title: 'Game Development Hackathon (Past Event)',
      date: 'June 1-2, 2025',
      time: 'Full Weekend',
      location: 'School Library',
      description: 'A 24-hour hackathon for aspiring game developers to create and showcase their own games.',
      type: 'Competition',
      image: 'https://placehold.co/600x400/00b8e6/ffffff?text=Game+Hackathon', // Placeholder image
      past: true,
    },
  ];

  const upcomingEvents = eventsData.filter(event => !event.past);
  const pastEvents = eventsData.filter(event => event.past);

  return (
    <div className="font-poppins overflow-x-hidden">
      {/* ============================================== */}
      {/* SECTION 1: EVENTS HEADING */}
      {/* ============================================== */}
      <section className="relative w-full py-16 md:py-28 bg-[#071f49] text-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-60" aria-hidden="true"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 flex justify-center" data-aos="fade-left">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#00b8e6] mb-4 leading-tight text-center max-w-xl">
              Our Exciting Events
            </h1>
            <p className="text-xl text-white text-center">Join us and explore the world of technology!</p>
          </div>
        </div>
      </section>

      {/* ============================================== */}
      {/* SECTION 2: UPCOMING EVENTS */}
      {/* ============================================== */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#071f49] mb-10 text-center" data-aos="fade-up">
            Upcoming Events
          </h2>
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map(event => (
                <div 
                  key={event.id} 
                  className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
                  data-aos="fade-up" data-aos-delay={event.id * 100}
                >
                  <img src={event.image} alt={event.title} className="w-full h-48 object-cover"/>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-700 text-sm mb-1 flex items-center">
                      <FaCalendarAlt className="mr-2 text-[#00b8e6]" /> {event.date} - {event.time}
                    </p>
                    <p className="text-gray-700 text-sm mb-3 flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-[#00b8e6]" /> {event.location}
                    </p>
                    <p className="text-gray-600 text-base mb-4">{event.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span className="flex items-center">
                        {event.type === 'Competition' && <FaTrophy className="mr-1 text-[#00b8e6]" />}
                        {event.type === 'Workshop' && <FaCode className="mr-1 text-[#00b8e6]" />}
                        {event.type === 'Session' && <FaUsers className="mr-1 text-[#00b8e6]" />}
                        {event.type}
                      </span>
                      <button className="bg-[#00b8e6] hover:bg-[#009ac2] text-white px-4 py-2 rounded-full text-sm font-medium transition">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 text-lg">No upcoming events scheduled yet. Check back soon!</p>
          )}
        </div>
      </section>

      {/* ============================================== */}
      {/* SECTION 3: PAST EVENTS */}
      {/* ============================================== */}
      <section className="bg-[#071f49] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#00b8e6] mb-10 text-center" data-aos="fade-up">
            Past Events
          </h2>
          {pastEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map(event => (
                <div 
                  key={event.id} 
                  className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 opacity-80"
                  data-aos="fade-up" data-aos-delay={event.id * 100}
                >
                  <img src={event.image} alt={event.title} className="w-full h-48 object-cover grayscale"/>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                    <p className="text-gray-700 text-sm mb-1 flex items-center">
                      <FaCalendarAlt className="mr-2 text-[#00b8e6]" /> {event.date} - {event.time}
                    </p>
                    <p className="text-gray-700 text-sm mb-3 flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-[#00b8e6]" /> {event.location}
                    </p>
                    <p className="text-gray-600 text-base mb-4">{event.description}</p>
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span className="flex items-center">
                        {event.type === 'Competition' && <FaTrophy className="mr-1 text-[#00b8e6]" />}
                        {event.type === 'Workshop' && <FaCode className="mr-1 text-[#00b8e6]" />}
                        {event.type === 'Session' && <FaUsers className="mr-1 text-[#00b8e6]" />}
                        {event.type}
                      </span>
                      <span className="text-red-500 font-semibold">Ended</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-white text-lg">No past events to display.</p>
          )}
        </div>
      </section>

      <ScrollToTopButton />
    </div>
  );
};

export default Events;
