/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import JemputKahwinLogo from "../assets/JemputKahwinLogo.png";
const LoadingWrapper = ({ isLoading, children }) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    let timer;
    if (!isLoading) {
      timer = setTimeout(() => setShowLoader(false), 500); // 0.5s delay before hiding loader
    } else {
      setShowLoader(true); // Show loader immediately
    }

    return () => clearTimeout(timer); // Cleanup
  }, [isLoading]);

  return (
    <>
      {showLoader ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20 backdrop-blur-md"
          style={{
            backdropFilter: "blur(8px)", // Ensure compatibility for older browsers
          }}
        >
          <img
            // src="https://icons.veryicon.com/png/o/miscellaneous/icheyong/wheel-14.png"
            src={JemputKahwinLogo}
            alt="Loading"
            className="w-40 h-40 animate-spin"
          />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default LoadingWrapper;
