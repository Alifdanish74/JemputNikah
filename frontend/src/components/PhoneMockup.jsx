// import React from "react";
// import featurevideo from "../assets/featurevideo.mp4";
function PhoneMockup() {
  return (
    <>
      {/* Phone Mockup */}
      <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[500px] w-[250px] shadow-xl">
        <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[124px] rounded-s-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -start-[17px] top-[178px] rounded-s-lg"></div>
        <div className="h-[64px] w-[3px] bg-gray-800 absolute -end-[17px] top-[142px] rounded-e-lg"></div>
        <div className="rounded-[2rem] mx-auto overflow-hidden w-[222px] h-[470px] bg-white dark:bg-gray-800">
          {/* insert video here */}
          <video 
            // src={featurevideo}
            src="https://jemputkahwin-bucket.s3.ap-southeast-1.amazonaws.com/video/featurevideo.mp4"
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* Phone Mockup End */}
    </>
  );
}

export default PhoneMockup;
