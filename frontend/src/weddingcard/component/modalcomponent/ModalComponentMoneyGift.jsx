/* eslint-disable react/prop-types */
// components/ModalComponentMoneyGift.js

import { FiCopy, FiDownload } from "react-icons/fi";
import QRCode from "../../../assets/MaybankQRDanishCrop.jpg";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const CopyButton = ({ text }) => {
  // const [copied, setCopied] = useState(false);
  const notify = () => toast.success("Copied to clipboard",
    {
      autoClose: 800,
      position: 'top-center',
      closeOnClick: true,
    }
  );

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    // setCopied(true);
    // setTimeout(() => {
    //   setCopied(false);
    // }, 800);
    notify()
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
            Maybank Berhad
          </h2>
        </div>

        <h2 className="text-lg mb-2 mt-6 text-center font-normal text-gray-500">
          No Akaun
        </h2>

        <div className="px-10 py-2 flex items-center justify-center bg-slate-100 h-full">
          <h2 className="text-lg text-center font-normal text-gray-700">
            162013119145
          </h2>
          <CopyButton text="162013183456" />
          {/* <ToastContainer /> */}
        </div>

        <h2 className="text-lg mb-2 mt-2 text-center font-normal text-gray-500">
          Kod QR
        </h2>

        <div className="border-8 border-gray-300 p-1 rounded-md flex items-center justify-center mx-auto">
          <img
            src={QRCode}
            width={160}
            alt="background prayer"
            loading="lazy"
          />
        </div>

        <div className="flex justify-center mt-4">
          <a
            className="flex items-center text-black bg-transparent px-3 py-2 rounded hover:bg-blue-300 transition-colors"
            href="/QRCodeIqkriany.jpg"
            download="QRCodeIqkriany"
          >
            <FiDownload className="mr-1" />
            Download QR
          </a>
        </div>
      </div>
    </>
  );
};

export default ModalComponentMoneyGift;
