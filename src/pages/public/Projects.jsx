import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaLaptopCode, FaMobileAlt, FaRobot, FaShieldAlt, FaLightbulb, FaTools } from 'react-icons/fa'; // Importing relevant icons
import ScrollToTopButton from '../../components/ScrollToTopButton';

const Projects = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS, run once for projects
  }, []);

  // Dummy data for projects
  const projectsData = [
    {
      id: 1,
      title: 'Club Website Redesign',
      category: 'Web Development',
      description: 'A collaborative effort to revamp the club\'s official website, incorporating modern design principles, responsive layouts, and interactive features.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'],
      image: 'https://placehold.co/600x400/00b8e6/ffffff?text=Website+Redesign',
      featured: true,
    },
    {
      id: 2,
      title: 'Smart Home Automation System',
      category: 'Robotics & IoT',
      description: 'Developing a prototype smart home system using Raspberry Pi and various sensors to automate lighting, temperature, and security.',
      technologies: ['Python', 'Raspberry Pi', 'Sensors', 'IoT'],
      image: 'https://placehold.co/600x400/071f49/ffffff?text=Smart+Home',
      featured: true,
    },
    {
      id: 3,
      title: 'Secure Messaging App',
      category: 'Mobile App Development',
      description: 'Building an encrypted messaging application for Android, focusing on data security, privacy, and user-friendly interface design.',
      technologies: ['Java', 'Android Studio', 'Encryption'],
      image: 'https://placehold.co/600x400/00b8e6/ffffff?text=Secure+Messaging',
      featured: false,
    },
    {
      id: 4,
      title: 'AI-Powered Chatbot for Education',
      category: 'Artificial Intelligence',
      description: 'Creating a chatbot that provides educational support and answers common questions for students, utilizing natural language processing.',
      technologies: ['Python', 'NLTK', 'Machine Learning'],
      image: 'https://placehold.co/600x400/071f49/ffffff?text=AI+Chatbot',
      featured: true,
    },
    {
      id: 5,
      title: 'Cybersecurity Threat Dashboard',
      category: 'Cybersecurity',
      description: 'A real-time dashboard visualizing common cybersecurity threats and attack vectors, developed to enhance club members\' awareness.',
      technologies: ['Python', 'Flask', 'Data Visualization'],
      image: 'https://placehold.co/600x400/00b8e6/ffffff?text=Threat+Dashboard',
      featured: false,
    },
    {
      id: 6,
      title: 'E-commerce Platform Prototype',
      category: 'Web Development',
      description: 'Designing and building a functional prototype of an e-commerce website with user authentication, product listings, and a shopping cart.',
      technologies: ['Node.js', 'Express', 'MongoDB', 'React'],
      image: 'https://placehold.co/600x400/071f49/ffffff?text=E-commerce+Proto',
      featured: false,
    },
  ];

  const featuredProjects = projectsData.filter(project => project.featured);
  const allProjects = projectsData; // Display all projects under "All Projects"

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Web Development':
        return <FaLaptopCode className="mr-2 text-[#00b8e6]" />;
      case 'Robotics & IoT':
        return <FaRobot className="mr-2 text-[#00b8e6]" />;
      case 'Mobile App Development':
        return <FaMobileAlt className="mr-2 text-[#00b8e6]" />;
      case 'Artificial Intelligence':
        return <FaLightbulb className="mr-2 text-[#00b8e6]" />;
      case 'Cybersecurity':
        return <FaShieldAlt className="mr-2 text-[#00b8e6]" />;
      default:
        return <FaTools className="mr-2 text-[#00b8e6]" />;
    }
  };

  return (
    <div className="font-poppins overflow-x-hidden">
      {/* ============================================== */}
      {/* SECTION 1: PROJECTS HEADING */}
      {/* ============================================== */}
      <section className="relative w-full py-16 md:py-28 bg-[#071f49] text-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-60" aria-hidden="true"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 flex justify-center" data-aos="fade-left">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#00b8e6] mb-4 leading-tight text-center max-w-xl">
              Our Latest Projects
            </h1>
            <p className="text-xl text-white text-center">Innovating the future, one project at a time.</p>
          </div>
        </div>
      </section>

      {/* ============================================== */}
      {/* SECTION 2: FEATURED PROJECTS */}
      {/* ============================================== */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#071f49] mb-10 text-center" data-aos="fade-up">
            Featured Projects
          </h2>
          {featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map(project => (
                <div 
                  key={project.id} 
                  className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200"
                  data-aos="fade-up" data-aos-delay={project.id * 100}
                >
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover"/>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-700 text-sm mb-3 flex items-center">
                      {getCategoryIcon(project.category)} {project.category}
                    </p>
                    <p className="text-gray-600 text-base mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-4">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <button className="bg-[#00b8e6] hover:bg-[#009ac2] text-white px-4 py-2 rounded-full text-sm font-medium transition">
                      View Project
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 text-lg">No featured projects yet. Check back soon!</p>
          )}
        </div>
      </section>

      {/* ============================================== */}
      {/* SECTION 3: ALL PROJECTS */}
      {/* ============================================== */}
      <section className="bg-[#071f49] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#00b8e6] mb-10 text-center" data-aos="fade-up">
            All Projects
          </h2>
          {allProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allProjects.map(project => (
                <div 
                  key={project.id} 
                  className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 opacity-90"
                  data-aos="fade-up" data-aos-delay={project.id * 50}
                >
                  <img src={project.image} alt={project.title} className="w-full h-48 object-cover"/>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-gray-700 text-sm mb-3 flex items-center">
                      {getCategoryIcon(project.category)} {project.category}
                    </p>
                    <p className="text-gray-600 text-base mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-4">
                      {project.technologies.map((tech, idx) => (
                        <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <button className="bg-[#00b8e6] hover:bg-[#009ac2] text-white px-4 py-2 rounded-full text-sm font-medium transition">
                      View Project
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-white text-lg">No projects to display.</p>
          )}
        </div>
      </section>

      <ScrollToTopButton />
    </div>
  );
};

export default Projects;
