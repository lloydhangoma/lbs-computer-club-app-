import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaRobot } from 'react-icons/fa';

// ✅ The corrected import path to the images directory
import TabbedSectionImage from '../../../assets/images/TabbedSection.jpg';

const TabbedSection = () => {
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
    });
    AOS.refresh();
  }, [activeTab]);

  return (
    <section className="relative bg-[#071f49] text-white font-poppins py-8 px-4 overflow-hidden">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12" data-aos="fade-down">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">What We're All About</h2>
        <h3 className="text-2xl md:text-3xl font-bold text-[#00b8e6]">The Computer Club</h3>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm md:text-base">
          Explore our passion for technology, our mission to empower young minds, and our vision for a future driven by innovation.
        </p>
      </div>
      {/* Tabs */}
      <div className="flex justify-center border-b border-gray-700 mb-8" data-aos="fade-up">
        {[
          { id: 'about', label: 'About Us' },
          { id: 'mission', label: 'Our Mission' },
          { id: 'vision', label: 'Our Vision' },
        ].map((tab) => (
          <button
            key={tab.id}
            className={`px-6 py-2 font-semibold border-b-2 transition duration-300 ease-in-out ${
              activeTab === tab.id
                ? 'border-[#00b8e6] text-[#00b8e6] scale-105'
                : 'border-transparent text-gray-400 hover:text-white hover:scale-105'
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center w-full">
        {activeTab === 'about' && (
          <>
            <img
              src={TabbedSectionImage}
              alt="Students coding or building robots"
              className="w-full h-auto max-w-[60%] rounded-lg shadow-lg hover:shadow-cyan-500/30 transition-all duration-500"
              data-aos="zoom-in"
              data-aos-once="false"
            />
            <div className="text-left" data-aos="fade-left" data-aos-once="false">
              <h4 className="text-2xl md:text-3xl font-bold mb-4 text-[#00b8e6]">
                A Place for Innovators & Problem-Solvers
              </h4>
              <p className="text-gray-300 mb-3">
                The Lusaka Boys Computer Club is a vibrant community dedicated to empowering young minds in Zambia. We provide a space for students to learn, collaborate, and explore the exciting worlds of coding, robotics, and digital creation.
              </p>
              <p className="text-gray-400 text-sm">
                Our members engage in hands-on projects, from building their first websites to programming robots for competitions. We focus on fostering critical thinking, creativity, and a lifelong passion for technology.
              </p>
            </div>
          </>
        )}
        {activeTab === 'mission' && (
          <div className="col-span-2 text-left max-w-3xl mx-auto" data-aos="fade-up" data-aos-once="false">
            <h4 className="text-2xl md:text-3xl font-bold mb-4 text-[#00b8e6]">Our Mission</h4>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              Our mission is to equip the next generation of Zambian boys with essential coding, robotics, and cybersecurity skills. We aim to foster critical thinking, creativity, and a lifelong passion for technology through hands-on projects and mentorship.
            </p>
          </div>
        )}
        {activeTab === 'vision' && (
          <div className="col-span-2 text-left max-w-3xl mx-auto" data-aos="fade-up" data-aos-once="false">
            <h4 className="text-2xl md:text-3xl font-bold mb-4 text-[#00b8e6]">Our Vision</h4>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              Our vision is to build a vibrant community of young innovators who are ready to lead Zambia's digital transformation. We envision a future where our members become successful developers, engineers, and entrepreneurs, using their skills to solve real-world problems and inspire others.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TabbedSection;