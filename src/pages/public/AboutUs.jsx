import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  FaCode,
  FaShieldAlt,
  FaHandshake,
  FaChartBar,
  FaUsers,
  FaLightbulb,
  FaChalkboardTeacher,
  FaTrophy
} from 'react-icons/fa';
// ⭐ FIXED: Corrected the relative import path for the image ⭐
import aboutSectionImage from '../../assets/images/aboutsection.jpeg'; 
import ScrollToTopButton from '../../components/ScrollToTopButton';

const PillarCard = ({ title, text, icon, delay, onLearn }) => (
  <div
    className="bg-white p-6 rounded-lg shadow-lg border border-gray-100 flex flex-col items-center text-center h-full"
    data-aos="fade-up"
    data-aos-delay={delay}
  >
    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#00b8e6] mb-4">
      <span className="text-2xl text-[#071f49]">{icon}</span>
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    <p className="text-gray-700 mb-4 flex-grow">{text}</p>
    <button
      onClick={onLearn}
      className="mt-auto bg-[#00b8e6] hover:bg-[#009ac2] text-white px-6 py-2 rounded-full font-medium transition"
    >
      Learn more
    </button>
  </div>
);

const Modal = ({ open, onClose, content }) => {
  if (!open || !content) return null;

  return (
    <div
      role="dialog"
      aria-label={content.title}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl mx-4 rounded-lg shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-4 border-b border-gray-200 pb-2">
          <h4 className="text-xl font-semibold">{content.title}</h4>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
            Close
          </button>
        </div>
        <p className="text-gray-700 leading-relaxed">{content.text}</p>
      </div>
    </div>
  );
};

const AboutUs = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const [openModal, setOpenModal] = useState(null);

  const modalContent = {
    approach: {
      title: "Our Hands-On Approach",
      text: "We believe in hands-on learning through project-based education. Members work on real-world challenges, from building websites and mobile apps to programming robots and creating secure networks. Our approach is collaborative and student-led, fostering a culture of peer-to-peer mentorship and continuous skill development.",
    },
    vision: {
      title: "Our Vision",
      text: "Our vision is to become the leading hub for youth technology education in Zambia. We aim to inspire a new generation of developers, engineers, and entrepreneurs who will use their skills to solve national challenges and drive innovation.",
    },
    mission: {
      title: "Our Mission",
      text: "Our mission is to provide an inclusive and accessible platform for students to learn, create, and collaborate. We are committed to equipping every member with the foundational skills and confidence to excel in a technology-driven world, through expert guidance and community support.",
    }
  };

  const impactData = [
    {
      icon: <FaUsers className="text-2xl text-[#00b8e6] mx-auto mb-2" />,
      text: "78+ Students Enrolled",
      aosDelay: "100"
    },
    {
      icon: <FaLightbulb className="text-2xl text-[#00b8e6] mx-auto mb-2" />,
      text: "20+ Projects Completed",
      aosDelay: "200"
    },
    {
      icon: <FaChalkboardTeacher className="text-2xl text-[#00b8e6] mx-auto mb-2" />,
      text: "5+ Competitions Participated",
      aosDelay: "300"
    },
    {
      icon: <FaTrophy className="text-2xl text-[#00b8e6] mx-auto mb-2" />,
      text: "3+ Awards Won",
      aosDelay: "400"
    },
    {
      icon: <FaCode className="text-2xl text-[#00b8e6] mx-auto mb-2" />,
      text: "15+ Workshops Held",
      aosDelay: "500"
    },
    {
      icon: <FaHandshake className="text-2xl text-[#00b8e6] mx-auto mb-2" />,
      text: "200+ Mentorship Hours",
      aosDelay: "600"
    },
  ];

  return (
    <div className={`font-poppins overflow-x-hidden ${openModal ? 'blurred-content' : ''}`}>
      
      {/* ============================================== */}
      {/* SECTION 1: ABOUT US HEADING */}
      {/* ============================================== */}
      <section className="relative w-full py-16 md:py-28 bg-[#071f49] text-gray-800 overflow-hidden">
        <div className="absolute inset-0 opacity-60" aria-hidden="true"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 flex justify-center" data-aos="fade-left">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#00b8e6] mb-4 leading-tight text-center max-w-xl">
              About the Computer Club
            </h1>
          </div>
        </div>
      </section>

      

      {/* ============================================== */}
      {/* SECTION 2: DESCRIPTIVE TEXT WITH IMAGE */}
      {/* ============================================== */}
      {/* ⭐ UPDATED: Using the imported image directly ⭐ */}
      <section className="relative w-full py-24 md:py-40 bg-cover bg-center text-white overflow-hidden" style={{ backgroundImage: `url(${aboutSectionImage})` }}>
        {/* Image Overlay */}
        <div className="absolute inset-0 bg-black opacity-60" aria-hidden="true"></div>

        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center" data-aos="fade-up">
          <div className="p-8 rounded-lg text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About the LBS Computer Club</h2>
            <p className="mt-2 text-xl font-semibold leading-relaxed italic">
              We are a vibrant community of young innovators dedicated to exploring the exciting worlds of coding, robotics, and cybersecurity. Our mission is to empower the next generation with the skills to build a brighter digital future for Zambia.
            </p>
          </div>
        </div>
      </section>

    

      {/* ============================================== */}
      {/* SECTION 3: CORE PILLARS */}
      {/* ============================================== */}
      <section className="bg-[#071f49] text-white font-poppins py-16 px-4">
        <div className="max-w-7xl mx-auto text-center" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#00b8e6]">Our Core Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <PillarCard
              title="Our Approach"
              text="We leverage cutting-edge digital tools to ensure safety, privacy, and accountability. Our platform empowers communities through secure reporting and advocacy."
              icon={<FaLightbulb />}
              delay="100"
              onLearn={() => setOpenModal('approach')}
            />
            <PillarCard
              title="Our Vision"
              text="To create a just and equitable digital environment in Zambia where individuals can freely exercise their rights and participate in protecting them online."
              icon={<FaCode />}
              delay="200"
              onLearn={() => setOpenModal('vision')}
            />
            <PillarCard
              title="Our Mission"
              text="To empower communities with a secure, accessible platform for reporting digital and human rights violations, fostering transparency and advocacy."
              icon={<FaUsers />}
              delay="300"
              onLearn={() => setOpenModal('mission')}
            />
          </div>
        </div>
      </section>

    

      {/* ============================================== */}
      {/* SECTION 4: IMPACT SNAPSHOT */}
    
      <section className="bg-[#0b1220] text-white py-16" aria-label="Impact">
        <div className="max-w-7xl mx-auto px-4" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-[#00b8e6]">Impact Snapshot</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {impactData.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start p-4 rounded-lg bg-white/5 border border-white/20"
                data-aos="fade-up"
                data-aos-delay={item.aosDelay}
              >
                <div className="mr-4 mt-1">{item.icon}</div>
                <div className="text-sm">
                  <p className="text-white">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modals for details */}
      <Modal open={openModal === 'approach'} onClose={() => setOpenModal(null)} content={modalContent.approach} />
      <Modal open={openModal === 'vision'} onClose={() => setOpenModal(null)} content={modalContent.vision} />
      <Modal open={openModal === 'mission'} onClose={() => setOpenModal(null)} content={modalContent.mission} />
    
      <ScrollToTopButton />
    </div>
  );
};

export default AboutUs;
