/* eslint-disable react/prop-types */
// import { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

import "../fonts.css";
import "../swiperStyles.css";
import { useWeddingCard } from "../customhooks/WeddingCardContext"; // Assuming you use a context for wedding card details
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function GuestbookPreview() {
    const { design, fetchDesign } = useWeddingCard();
    const { designName } = useParams(); // Extract designName from the URL
  
    useEffect(() => {
      if (designName) {
        fetchDesign(designName); // Fetch design info when the component loads
      }
    }, [designName, fetchDesign]);
  
  // Hardcoded Guestbook Wishes
  const wishes = [
    { weddingWish: "Congratulations! Wishing you both a lifetime of happiness.", name: "Aminah" },
    { weddingWish: "May your love grow stronger each and every passing year.", name: "Faris" },
    { weddingWish: "Best wishes for your future together! Enjoy the journey.", name: "Zahira" },
    { weddingWish: "Selamat Pengantin Baru! Semoga bahagia hingga ke Jannah.", name: "Hakim" }
  ];

  return (
    <div
      style={{ color: design.fontColor || "#000000" }}
      className="p-6 pt-3 text-center main-card justify-center items-center"
    >
      <h1 className="pb-3 text-xl font-['Cinzel'] opacity-70"> GUESTBOOK</h1>
      <div className="p-4">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          loop={wishes.length > 1} // Disable looping if only 1 slide
        >
          {wishes.map((data, index) => (
            <SwiperSlide key={index}>
              <p
                style={{ color: design.fontColor || "#000000" }}
                className="text-center p-4 text-lg fontType-4 font-extralight"
              >
                {data.weddingWish}
              </p>
              <p
                style={{ color: design.fontColor || "#000000" }}
                className="text-center text-sm font-light"
              >
                -{data.name}-
              </p>
            </SwiperSlide>
          ))}
          {/* Custom Navigation Buttons */}
          <div className="custom-prev">‹</div>
          <div className="custom-next">›</div>
        </Swiper>
      </div>
    </div>
  );
}

export default GuestbookPreview;
