/* eslint-disable react/prop-types */
// components/ModalComponentMoneyGift.js

import { FiCopy, FiDownload } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useParams } from "react-router-dom";
import { useWeddingCard } from "../../../customhooks/WeddingCardContext";
import axios from "axios";
// import { useState } from "react";
// import { useEffect } from "react";

const CopyButton = ({ text }) => {
  // const [copied, setCopied] = useState(false);
  const notify = () =>
    toast.success("Copied to clipboard", {
      autoClose: 800,
      position: "top-center",
      closeOnClick: true,
    });

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    // setCopied(true);
    // setTimeout(() => {
    //   setCopied(false);
    // }, 800);
    notify();
  };

  return (
    <button onClick={copyToClipboard} className="ml-2 font-black flex flex-row">
      <FiCopy className="text-black" />
      {/* {copied ? (
        <span className="ml-1 text-center justify-center items-center text-gray-500">
          Copied!
        </span>
      ) : null} */}
    </button>
  );
};

const ModalComponentMoneyGift = () => {
  const { weddingCard } = useWeddingCard();
  //   const [downloadUrl, setDownloadUrl] = useState("");
  const fetchAndDownloadImage = async () => {
  try {
    const response = await axios.get(`/api/wedding-cards/download-image/${weddingCard._id}`, {
      responseType: 'blob', // Set the response type to blob for binary data
    });

    // Create a download link and click it to start the download
    const blob = response.data;
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = `QR_${weddingCard.hashtag || "WeddingCard"}.png`;
    link.click();
    URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error("Error downloading image:", error);
  }
};


  return (
    <>
      <div className="flex flex-col mb-5 min-h-[66vh]">
        <h2 className="text-lg mb-4 text-center font-bold text-gray-700">
          Money Gift
        </h2>

        <h2 className="text-lg mb-2 text-center font-normal text-gray-500">
          Nama Bank
        </h2>

        <div className="px-10 py-2 flex items-center justify-center bg-slate-100 h-full">
          <h2 className="text-lg text-center font-normal text-gray-700">
            {weddingCard.bankName}
          </h2>
        </div>

        <h2 className="text-lg mb-2 mt-6 text-center font-normal text-gray-500">
          No Akaun
        </h2>

        <div className="px-10 py-2 flex items-center justify-center bg-slate-100 h-full">
          <h2 className="text-lg text-center font-normal text-gray-700">
            {weddingCard.accountNumber}
          </h2>
          <CopyButton text="162013183456" />
          {/* <ToastContainer /> */}
        </div>

        <h2 className="text-lg mb-2 mt-2 text-center font-normal text-gray-500">
          Kod QR
        </h2>

        <div className="border-8 border-gray-300 p-1 rounded-md flex items-center justify-center mx-auto">
          <img
            src={weddingCard.qrCode}
            width={160}
            alt="background prayer"
            loading="lazy"
          />
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="flex items-center text-black bg-transparent px-3 py-2 rounded hover:bg-blue-300 transition-colors"
            onClick={fetchAndDownloadImage}
          >
            <FiDownload className="mr-1" />
            Download QR
          </button>
        </div>
      </div>
    </>
  );
};

export default ModalComponentMoneyGift;
