/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from "react-spinners";
import axios from "axios";
import { useWeddingCard } from "../../../customhooks/WeddingCardContext";

const ModalComponentBooking = ({ onCancel, title, image }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const { order } = useWeddingCard();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        `/api/wishlist/book-item/${order.orderNumber}`,
        {
          productName: title, // The name of the product to book
          bookingName: name, // The name of the person booking
          bookingPhoneNumber: phone, // The phone number of the person booking
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Your booking has been submitted successfully!", {
        autoClose: 1800,
        position: "top-center",
      });
      onCancel();
    } catch (error) {
      console.error("Error submitting booking:", error);
      toast.error("Failed to submit booking. Please try again.", {
        autoClose: 2000,
        position: "top-center",
        closeOnClick: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col mb-5 min-h-[35vh]">
      <h2 className="text-lg text-center mb-4 font-bold text-gray-500">
        Booking Wishlist Item
      </h2>
      <div className="flex flex-col items-center border rounded-lg p-4 my-2 bg-white shadow-md">
        <div className="flex-shrink-0 mr-4">
          <img
            src={image}
            alt="Product Image"
            width={100}
            height={100}
            className="rounded"
          />
        </div>
        <h3 className="text-base text-center text-balance font-normal text-gray-800">
          {title}
        </h3>
        <form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto p-4 pt-0 text-black"
        >
          <div>
            <label className="block text-center mt-2 text-gray-700 font-bold">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block text-center text-gray-700 font-bold">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mt-4 flex space-x-4 text-sm font-semibold justify-center items-center">
            {loading ? (
              <button
                className="flex items-center bg-gray-100 px-3 py-2 rounded"
                disabled
              >
                <BeatLoader color={"#123abc"} loading={loading} size={10} />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center bg-gray-100 px-3 py-2 rounded"
              >
                <IoIosSend className="mr-2" />
                Submit
              </button>
            )}
            <button
              onClick={onCancel}
              className="flex items-center bg-gray-100 px-3 py-2 rounded"
            >
              <MdOutlineCancel className="mr-2" />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalComponentBooking;
