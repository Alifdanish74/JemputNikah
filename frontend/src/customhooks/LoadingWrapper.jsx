/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const LoadingWrapper = ({ isLoading, children }) => {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    let timer;
    if (!isLoading) {
      timer = setTimeout(() => setShowLoader(false), 800); // 1.5s minimum delay
    } else {
      setShowLoader(true); // Show loader immediately
    }

    return () => clearTimeout(timer); // Cleanup
  }, [isLoading]);

  return (
    <>
      {showLoader ? (
        <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default LoadingWrapper;
