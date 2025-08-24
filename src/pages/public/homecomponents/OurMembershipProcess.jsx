import { useEffect } from 'react';
import { FaUserPlus, FaLaptopCode, FaCheckCircle, FaUsers } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';

const OurMembershipProcess = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className="bg-[#071f49] py-16 px-4 font-poppins text-center text-white min-h-screen">
      <div className="max-w-7xl mx-auto h-full flex flex-col justify-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4" data-aos="fade-up" style={{ color: '#00b8e6' }}>
          Our Membership Process
        </h2>
        <p className="text-gray-300 text-base md:text-lg mb-8 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          Joining our club is a straightforward process to get you started on your tech journey.
        </p>

        <div className="flex justify-center mb-12" data-aos="fade-up" data-aos-delay="200">
          <button className="bg-[#00b8e6] hover:bg-[#009ac2] text-[#071f49] font-bold px-6 py-3 rounded-full flex items-center gap-2 shadow-md transition">
            <span className="text-sm font-medium">Join Now</span>
          </button>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
          {[
            {
              icon: <FaUserPlus className="text-white text-3xl md:text-4xl mx-auto mb-4" />,
              title: 'Step 1: Sign Up',
              description: 'Fill out the membership form and get your parent/guardian consent.'
            },
            {
              icon: <FaLaptopCode className="text-white text-3xl md:text-4xl mx-auto mb-4" />,
              title: 'Step 2: Attend Orientation',
              description: 'Learn about our club rules, activities, and the resources available to you.'
            },
            {
              icon: <FaCheckCircle className="text-white text-3xl md:text-4xl mx-auto mb-4" />,
              title: 'Step 3: Membership Approval',
              description: 'Your application is reviewed, and you are officially welcomed to the club.'
            },
            {
              icon: <FaUsers className="text-white text-3xl md:text-4xl mx-auto mb-4" />,
              title: 'Step 4: Start Learning',
              description: 'Dive into projects, workshops, and competitions with fellow members.'
            }
          ].map((step, index) => (
            <div
              key={index}
              className="bg-[#1f2937] border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 h-full"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="flex justify-center mb-4">
                <span className="text-white bg-[#00b8e6] rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-md">
                  {`0${index + 1}`}
                </span>
              </div>
              {step.icon}
              <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: '#00b8e6' }}>{step.title}</h3>
              <p className="text-gray-300 text-sm">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurMembershipProcess;