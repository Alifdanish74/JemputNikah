/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { CircleLoader } from "react-spinners";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useWeddingCard } from "../../../customhooks/WeddingCardContext";
import axios from "axios";

const ModalComponentRSVPSlot = ({ onCancel, onGuestbookUpdate }) => {
  const { weddingCard, order } = useWeddingCard();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dewasa, setDewasa] = useState(1);
  const [kanak, setKanak] = useState(0);
  const [ucapan, setUcapan] = useState("");
  const [timeslot, setTimeSlot] = useState("");
  const [pihak, setPihak] = useState("");
  const [status, setStatus] = useState("Hadir");
  const [loading, setLoading] = useState(false);
  const maxChars = 200; // Set your desired character limit

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
        setDewasa(1);
        setKanak(0);
        setTimeSlot("");
        setPihak("");
        setUcapan("");
        setStatus("Hadir");
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

  if (!weddingCard) return <p>Wedding card not found.</p>;

  // Dynamically generate timeslot options from weddingCard data
  const timeslotOptions = [];
  for (let i = 1; i <= 3; i++) {
    const label = weddingCard[`labelSlot${i}`];
    const from = weddingCard[`fromSlot${i}`];
    const to = weddingCard[`toSlot${i}`];
    if (label && from && to) {
      timeslotOptions.push(`${from} - ${to} | ${label}`);
    }
  }

  return (
    <div className="flex flex-col mb-2 min-h-[66vh]">
      <h2 className="text-lg text-center mb-1 font-bold text-gray-500">RSVP</h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 pt-0 text-black bg-white shadow-md border-2 rounded-md"
      >
        {/* Name */}
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

        {/* Phone */}
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
          />
        </div>

        {/* Time Slot
        <div className="mb-2">
          <label
            htmlFor="timeslot"
            className="block text-center text-gray-700 font-bold mb-2"
          >
            Masa Kehadiran
          </label>
          <select
            id="timeslot"
            value={timeslot}
            onChange={(e) => setTimeSlot(e.target.value)}
            className="w-full p-1 border border-gray-300 rounded-md text-sm"
            required
          >
            {[
              "7:30 PM - 9:00 PM | Saudara-mara",
              "9:00 PM - 11:00 PM | Rakan-rakan",
            ].map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div> */}
        {/* Time Slot */}
        {weddingCard.labelSlot1 ? (
          <div className="mb-2">
            <label
              htmlFor="timeslot"
              className="block text-center text-gray-700 font-bold mb-2"
            >
              Masa Kehadiran
            </label>
            <select
              id="timeslot"
              value={timeslot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md text-sm"
              required
            >
              <option value="" disabled>
                Pilih Masa Kehadiran
              </option>
              {timeslotOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <></>
        )}

        {/* Pihak */}
        {["LL", "PP"].includes(weddingCard.pihakMajlis) && (
          <div className="mb-2">
            <label
              htmlFor="pihak"
              className="block text-center text-gray-700 font-bold mb-2"
            >
              Jemputan Dari
            </label>
            <select
              id="pihak"
              value={pihak}
              onChange={(e) => setPihak(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded-md text-sm"
              required
            >
              <option value="" disabled>
                Pihak..
              </option>
              {["Pihak Perempuan", "Pihak Lelaki"].map((pihakOption) => (
                <option key={pihakOption} value={pihakOption}>
                  {pihakOption}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Jumlah Dewasa */}
        <div className="mb-2">
          <label
            htmlFor="dewasa"
            className="block text-center text-gray-700 font-bold"
          >
            Jumlah Dewasa
          </label>
          <select
            id="dewasa"
            value={dewasa}
            onChange={(e) => setDewasa(parseInt(e.target.value))}
            className="w-full p-1 border border-gray-300 rounded-md"
          >
            {/* {[1, 2, 3, 4, 5].map((num1) => (
              <option key={num1} value={num1}>
                {num1}
              </option>
            ))} */}
            {/* Dynamically generate options based on weddingCard.maxDewasa */}
            {Array.from(
              { length: weddingCard.maxInvitationsDewasa },
              (_, i) => i + 1
            ).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Jumlah Kanak-kanak */}
        <div className="mb-2">
          <label
            htmlFor="kanak"
            className="block text-center text-gray-700 font-bold"
          >
            Jumlah Kanak-kanak
          </label>
          <select
            id="kanak"
            value={kanak}
            onChange={(e) => setKanak(parseInt(e.target.value))}
            className="w-full p-1 border border-gray-300 rounded-md"
          >
            {/* {[0, 1, 2, 3, 4].map((num2) => (
              <option key={num2} value={num2}>
                {num2}
              </option>
            ))} */}

            {/* Dynamically generate options starting from 0 */}
            {Array.from(
              { length: weddingCard.maxInvitationsKids + 1 },
              (_, i) => i
            ).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {/* Ucapan */}
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
            maxLength={maxChars}
          />
          <div className="text-right text-gray-500 text-sm">
            {ucapan.length}/{maxChars} characters
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 text-sm font-semibold justify-center items-center">
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
    </div>
  );
};

export default ModalComponentRSVPSlot;
