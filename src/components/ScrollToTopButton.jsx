import React, { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa'; // ✅ Import a consistent up-arrow icon

const ScrollToTopButton = () => {
    // State to control the visibility of the button.
    const [isVisible, setIsVisible] = useState(false);

    // Function to check the scroll position and update the state.
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Function to handle the click event and scroll to the top of the page.
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    // useEffect hook to add and remove the scroll event listener.
    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <button
            // ✅ Updated Tailwind CSS classes for consistent styling and positioning.
            className={`fixed bottom-8 left-8 p-3 md:p-4 rounded-full bg-[#00b8e6] text-white shadow-lg transition-opacity duration-300 ${
                isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={scrollToTop}
            aria-label="Scroll to top"
        >
            {/* ✅ Use the Font Awesome icon for consistency */}
            <FaArrowUp className="h-5 w-5 md:h-6 md:w-6" />
        </button>
    );
};

export default ScrollToTopButton;