/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { BeatLoader } from "react-spinners";
import { wishlistitem } from "../modalcomponent/wishlistitem";

export const dynamic = "force-dynamic";

const ModalComponentWishlist = ({ onConfirmBook }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay to showcase the spinner
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the delay as needed
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/get-booking", {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
          Expires: "0",
        },
      });
      const data = await response.json();
      setBookings(
        data.bookings.map((booking) => ({
          name: booking[0],
          phone: booking[1],
          item: booking[2],
        }))
      );
      setLoading(false);
      console.log(data);
      console.log("fetch wishlist first time");
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const isItemBooked = (title) => {
    return bookings.some((booking) => booking.item === title);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[66vh]">
        <BeatLoader color={"#123abc"} loading={loading} size={15} />
      </div>
    );
  }

  return (
    <div className="flex flex-col mb-5 max-h-[66vh]">
      <h2 className="text-lg mb-4 text-center font-bold text-gray-500">
        Wishlist
      </h2>
      <div className="overflow-y-auto overflow-hidden max-h-[60vh]">
        {wishlistitem.map((item, index) => (
          <ProductCard
            key={item.itemLink}
            number={index + 1}
            imageSrc={item.imageSrc}
            title={item.title}
            itemLink={item.itemLink}
            onConfirmBook={onConfirmBook}
            isBooked={isItemBooked(item.title)}
          />
        ))}
      </div>
    </div>
  );
};

export default ModalComponentWishlist;
