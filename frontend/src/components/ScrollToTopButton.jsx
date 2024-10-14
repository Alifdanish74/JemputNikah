import { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa'; // Using react-icons for the arrow icon

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when the user scrolls down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5">
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring"
        >
          <FaArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}

export default ScrollToTopButton;
