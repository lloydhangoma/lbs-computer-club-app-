import { useEffect } from 'react';
import { FaCode, FaShieldAlt, FaRobot, FaUsers, FaLaptopCode, FaTrophy, FaLightbulb, FaChalkboardTeacher } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

// ✅ Corrected import paths
import TabbedSection from './homecomponents/TabbedSection';
import OurMembershipProcess from './homecomponents/OurMembershipProcess';

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <>
      {/* 🔥 HERO SECTION - Computer Club Theme */}
      <section className="relative w-full overflow-hidden min-h-screen md:h-screen font-poppins py-12 md:py-15 bg-[#071f49]">
        {/* 🔹 Background - Replaced video with a solid color */}
        <div className="absolute inset-0 bg-[#071f49] z-0" />

        {/* 🔹 Overlay */}
        <div className="absolute inset-0 bg-black/50 z-10" />

        {/* 🔹 Hero Content - Top aligned */}
        <div
          className="relative z-20 flex flex-col items-center text-center px-4 text-white h-full justify-start pt-6 sm:pt-10"
          data-aos="fade-up"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#00b8e6] mb-4 leading-snug">
            Welcome to LBS Computer Club
          </h1>

          <p className="mt-2 text-lg sm:text-xl md:text-3xl font-semibold flex flex-col sm:flex-row items-center gap-2 text-white text-center max-w-xl">
            <FaLaptopCode className="text-[#00b8e6] text-3xl sm:text-4xl" />
            <span className="leading-tight">
              Empowering the Next Generation <br className="sm:hidden" />
              of Innovators
            </span>
          </p>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto flex items-center justify-center gap-2 text-center">
            Join us to explore the exciting worlds of
            <FaCode className="text-[#00b8e6] text-2xl sm:text-3xl" />,
            <FaShieldAlt className="text-[#00b8e6] text-2xl sm:text-3xl" />, and
            <FaRobot className="text-[#00b8e6] text-2xl sm:text-3xl" />.
          </p>
        </div>
      </section>

      {/* 🔹 Tabbed Section */}
      <div className="bg-[#071f49] py-12 px-4">
        <TabbedSection />
      </div>

      {/* 🔥 OUR IMPACT SECTION - Computer Club Achievements */}
      <section className="bg-[#071f49] text-white font-poppins py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-[#00b8e6]">Our Achievements</h2>
          <h3 className="text-2xl md:text-3xl font-bold mb-6 text-[#00b8e6]">Building a legacy of tech excellence</h3>
          <p className="mb-12 text-sm md:text-base max-w-2xl mx-auto text-white">
            Celebrating our students' hard work and dedication in programming, robotics, and more.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* 🔹 Students Enrolled */}
            <div className="p-6 rounded-lg shadow-lg hover:shadow-xl transition bg-[#00b8e6]">
              <FaUsers className="text-white text-4xl mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-1 text-[#071f49]">78+</h3>
              <p className="font-semibold mb-1 text-white">Students Enrolled</p>
              <p className="text-sm text-white">Dedicated young learners</p>
            </div>

            {/* 🔹 Projects Completed */}
            <div className="p-6 rounded-lg shadow-lg hover:shadow-xl transition bg-[#00b8e6]">
              <FaLightbulb className="text-white text-4xl mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-1 text-[#071f49]">20+</h3>
              <p className="font-semibold mb-1 text-white">Projects Completed</p>
              <p className="text-sm text-white">Innovative solutions created</p>
            </div>

            {/* 🔹 Competitions Participated */}
            <div className="p-6 rounded-lg shadow-lg hover:shadow-xl transition bg-[#00b8e6]">
              <FaChalkboardTeacher className="text-white text-4xl mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-1 text-[#071f49]">5+</h3>
              <p className="font-semibold mb-1 text-white">Competitions Participated</p>
              <p className="text-sm text-white">Testing our skills and knowledge</p>
            </div>

            {/* 🔹 Awards Won */}
            <div className="p-6 rounded-lg shadow-lg hover:shadow-xl transition bg-[#00b8e6]">
              <FaTrophy className="text-white text-4xl mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-1 text-[#071f49]">3+</h3>
              <p className="font-semibold mb-1 text-white">Awards Won</p>
              <p className="text-sm text-white">Recognized for excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🔹 Membership Process Section */}
      <div className="bg-[#071f49] py-12 px-4">
        <OurMembershipProcess />
      </div>
    </>
  );
};

export default Home;