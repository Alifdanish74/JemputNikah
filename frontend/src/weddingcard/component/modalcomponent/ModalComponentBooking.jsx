/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BeatLoader } from "react-spinners";

const ModalComponentBooking = ({
  onCancel,
  title,
  image, // New prop
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [item, setItem] = useState(title);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const notify = () =>
      toast.success("Your booking has been submitted", {
        autoClose: 1800,
        position: "top-center",
        closeOnClick: true,
      });
    try {
      const form = {
        name,
        phone,
        item,
      };

      const response = await fetch("/api/submit-form-booking", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setName("");
      setPhone("");
      setItem(title);
      notify();
      onCancel();
      setLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
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
          <div className="flex-grow">
            <h3 className="text-base text-center text-balance font-normal text-gray-800">
              {title}
            </h3>
          </div>
          <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto p-4 pt-0 text-black"
          >
            <div>
              <label
                htmlFor="name"
                className="block text-center mt-2 text-gray-700 font-bold"
              >
                Nama
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-1 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="phone"
                className="block text-center text-gray-700 font-bold"
              >
                Nombor Telefon
              </label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-1 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="item"
                className="block text-center text-gray-700 font-bold"
              >
                Item
              </label>
              <input
                type="text"
                id="item"
                readOnly
                value={item}
                onChange={() => setItem(title)}
                className="w-full p-1 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mt-4 flex space-x-4 text-sm font-semibold justify-center items-center">
              {loading ? (
                <button
                  className="flex items-center bg-gray-100 text-gray-800 px-3 py-2 rounded hover:bg-gray-200 transition-colors"
                  disabled
                >
                  <BeatLoader color={"#123abc"} loading={loading} size={10} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center bg-gray-100 text-gray-800 px-3 py-2 rounded hover:bg-gray-200 transition-colors"
                >
                  <IoIosSend className="mr-2" />
                  Submit
                </button>
              )}
              <button
                onClick={onCancel}
                className="flex items-center bg-gray-100 text-gray-800 px-3 py-2 rounded hover:bg-gray-200 transition-colors"
              >
                <MdOutlineCancel className="mr-2" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ModalComponentBooking;
