/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const LoadingWrapper = ({ isLoading, children }) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    let timer;
    if (!isLoading) {
      timer = setTimeout(() => setShowLoader(false), 500); // Delay before hiding the loader
    } else {
      setShowLoader(true); // Show loader immediately
    }

    return () => clearTimeout(timer); // Cleanup
  }, [isLoading]);

  return (
    <>
      {showLoader ? (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparent black background
            backdropFilter: "blur(8px)", // Blurred background
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            width="100"
            height="100"
          >
            {/* Ring Outer Circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#FFD700"
              strokeWidth="6"
              fill="none"
              opacity="0.6"
            />

            {/* Ring Inner Circle */}
            <circle
              cx="50"
              cy="50"
              r="30"
              stroke="#FFD700"
              strokeWidth="6"
              fill="none"
              opacity="0.3"
            />

            {/* Diamond */}
            <polygon
              points="50,5 45,15 55,15"
              fill="#B9F2FF"
              stroke="#00BFFF"
              strokeWidth="2"
            />

            {/* Spinner Animation */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#FFD700"
              strokeWidth="6"
              fill="none"
              strokeDasharray="200"
              strokeDashoffset="0"
              strokeLinecap="round"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 50 50"
                to="360 50 50"
                dur="1.5s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="200"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>
          <p className="text-white bold text-lg">Loading...</p>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default LoadingWrapper;
