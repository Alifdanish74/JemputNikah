/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ModalComponentBooking from "./ModalComponentBooking"; // Import booking modal
import { BeatLoader } from "react-spinners";
import axios from "axios";
import { useWeddingCard } from "../../../customhooks/WeddingCardContext";

export const dynamic = "force-dynamic";

const ModalComponentWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // Store selected item for booking modal
  const { order } = useWeddingCard();

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/wishlist/order/${order.orderNumber}`, {
        headers: { "Cache-Control": "no-cache" },
      });

      const { wishlist: fetchedWishlist } = response.data || {};
      setWishlist(fetchedWishlist || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleConfirmBook = (title, imageSrc) => {
    setSelectedItem({ title, imageSrc });
    setIsBookingModalOpen(true); // Open Booking Modal
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false); // Close Booking Modal
    setSelectedItem(null);
    fetchWishlist(); // Refresh wishlist after booking
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[66vh]">
        <BeatLoader color={"#123abc"} loading={loading} size={15} />
      </div>
    );
  }

  // If Booking Modal is open, hide the Wishlist Modal content
  if (isBookingModalOpen) {
    return (
      <ModalComponentBooking
        title={selectedItem?.title || ""}
        image={selectedItem?.imageSrc || ""}
        onCancel={closeBookingModal}
      />
    );
  }

  return (
    <div className="flex flex-col mb-5 max-h-[66vh]">
      <h2 className="text-lg mb-4 text-center font-bold text-gray-500">
        Wishlist
      </h2>
      <div className="overflow-y-auto overflow-hidden max-h-[60vh]">
        {wishlist.map((item, index) => (
          <ProductCard
            key={item.productUrl}
            number={index + 1}
            imageSrc={item.imageSrc || ""}
            title={item.productName}
            itemLink={item.productUrl}
            onConfirmBook={handleConfirmBook} // Trigger booking modal
            isBooked={item.bookingStatus === "Booked"}
          />
        ))}
      </div>
    </div>
  );
};

export default ModalComponentWishlist;
