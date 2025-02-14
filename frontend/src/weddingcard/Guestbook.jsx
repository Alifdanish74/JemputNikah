/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

import "../fonts.css";
import "../swiperStyles.css";
import axios from "axios";
import { useWeddingCard } from "../customhooks/WeddingCardContext"; // Assuming you use a context for wedding card details

function Guestbook({ guestbookUpdated }) {
  const { order, weddingCard } = useWeddingCard(); // Access order details from context
  const [wishes, setWishes] = useState([]); // State for storing ucapan and names
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");

  const fetchGuestbookData = async () => {
    if (!order || !order.orderNumber) {
      // Skip fetching if order or orderNumber is missing
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.get(`/api/rsvp/list/${order.orderNumber}`);
      const submissions = response.data?.submissions || []; // Safely access submissions
      if (submissions.length > 0) {
        const filteredWishes = submissions
          .filter((submission) => submission.ucapan && submission.name) // Ensure both ucapan and name exist
          .map((submission) => ({
            weddingWish: submission.ucapan,
            name: submission.name,
          }));
        setWishes(filteredWishes);
      }
    } catch (err) {
      console.error("Error fetching guestbook data:", err);
      setError("Failed to load guestbook data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGuestbookData();
  }, []);

  // Fetch when guestbookUpdated changes
  useEffect(() => {
    if (guestbookUpdated) {
      fetchGuestbookData();
      console.log("DATA IS FETCHING AFTER FORM SUBMITTED");
    }
  }, [guestbookUpdated]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading guestbook...</p>;
  }

  // if (error) {
  //   return <p className="text-center text-red-500">{error}</p>;
  // }

  if (wishes.length === 0) {
    return (
      <p
        style={{ color: weddingCard.designFontColor || "#000000" }}
        className="text-center text-gray-500"
      >
        Be the first to wish!
      </p>
    );
  }

  return (
    <div
      style={{ color: weddingCard.designFontColor || "#000000" }}
      className="p-6 pt-3 text-center main-card  justify-center items-center"
    >
      <h1 className="pb-3 text-xl font-['Cinzel'] opacity-70"> GUESTBOOK</h1>
      <div className="p-4">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          // navigation={wishes.length > 1} // Hide navigation if only 1 slide
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
          loop={wishes.length > 1} // Disable looping if only 1 slide
        >
          {wishes.map((data, index) => (
            <SwiperSlide key={index}>
              <p
                style={{ color: weddingCard.designFontColor || "#000000" }}
                className="text-center p-4 text-lg fontType-4 font-extralight"
              >
                {data.weddingWish}
              </p>
              <p
                style={{ color: weddingCard.designFontColor || "#000000" }}
                className="text-center text-sm  font-light"
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

export default Guestbook;
