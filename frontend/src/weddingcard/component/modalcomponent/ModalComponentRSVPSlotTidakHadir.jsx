/* eslint-disable react/prop-types */
// components/ModalComponentRSVPSlotTidakHadir.js
import axios from "axios";
import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { CircleLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useWeddingCard } from "../../../customhooks/WeddingCardContext";

const ModalComponentRSVPSlotTidakHadir = ({ onCancel, onGuestbookUpdate }) => {
  const { weddingCard, order } = useWeddingCard();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dewasa, setDewasa] = useState(0);
  const [kanak, setKanak] = useState(0);
  const [timeslot, setTimeSlot] = useState("");
  const [pihak, setPihak] = useState("");
  const [ucapan, setUcapan] = useState("");
  const [status, setStatus] = useState("Tidak Hadir");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = {
        name,
        phone,
        dewasa,
        kanak,
        timeslot,
        pihak,
        ucapan,
        status,
      };

      const response = await axios.post("/api/rsvp/submit-form", {
        weddingCardId: weddingCard._id,
        orderId: order._id, // Assuming the weddingCard has an associated orderId
        formData,
      });

      if (response.status === 200) {
        toast.success("Your RSVP has been submitted", {
          autoClose: 1800,
          position: "top-center",
          closeOnClick: true,
        });
        setName("");
        setPhone("");
        setDewasa(0);
        setKanak(0);
        setTimeSlot("");
        setPihak("");
        setUcapan("");
        setStatus("Tidak Hadir");
        onGuestbookUpdate();
        onCancel();
      }
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      toast.error("Failed to submit RSVP.", {
        autoClose: 1800,
        position: "top-center",
        closeOnClick: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col mb-5 min-h-[45vh]">
        <h2 className="text-lg text-center mb-4 font-bold text-gray-500">
          RSVP
        </h2>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto p-4 pt-0 text-black bg-white shadow-md border-2 rounded-md"
        >
          {/* Name start */}
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

            <input
              type="hidden"
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* Name end */}
          {/* Start Status */}
          <div>
            <input
              type="hidden"
              id="status"
              value={status}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md"
              required
            />
          </div>
          {/* End Status */}
          {/* Ucapan start */}
          <div className="mb-2">
            <label
              htmlFor="ucapan"
              className="block text-center text-gray-700 font-bold"
            >
              Ucapan
            </label>
            <textarea
              id="ucapan"
              value={ucapan}
              onChange={(e) => setUcapan(e.target.value)}
              className="w-full p-2 h-20 border border-gray-300 rounded-md"
            />
          </div>
          {/* Ucapan end */}

          <div className="mt-4 flex space-x-4 text-sm font-semibold justify-center items-center">
            {loading ? (
              <button
                className="flex items-center bg-gray-100 text-gray-800 px-3 py-2 rounded hover:bg-gray-200 transition-colors"
                disabled
              >
                <CircleLoader color={"#123abc"} loading={loading} size={10} />
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

        {/* Button */}
      </div>
    </>
  );
};

export default ModalComponentRSVPSlotTidakHadir;
