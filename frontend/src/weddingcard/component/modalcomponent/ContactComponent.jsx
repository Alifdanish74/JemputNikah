/* eslint-disable react/prop-types */
// components/Contact.tsx

import { FiCopy } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    <button
      onClick={copyToClipboard}
      className="ml-2 font-black flex flex-row items-center"
    >
      <FiCopy className="text-black" />
      {/* {copied ? (
          <span className="ml-1 text-center justify-center items-center text-gray-500">
            Copied!
          </span>
        ) : null} */}
    </button>
  );
};

const Contact = ({ contactName, phoneNumber, wsLink, gelaran }) => {
  return (
    <div className="flex flex-row items-center justify-around border rounded-lg p-2 my-1 bg-white shadow-md">
      {/* <div className="flex flex-row  gap-4"> */}
      <div className="text-center w-24">
        <h3 className="text-base  font-normal text-gray-800">{contactName}</h3>
        <h6 className="text-balance text-center text-xs font-light text-gray-800">
          {gelaran}
        </h6>
      </div>

      {/* <div className="w-20"> */}
      {/* </div> */}

      <div className=" w-32 justify-center flex items-center">
        <h3 className="flex flex-row text-base  font-normal text-gray-800">
          {phoneNumber}
          <CopyButton text={phoneNumber} />
        </h3>
      </div>

      <div className="flex text-center items-end justify-end">
        <a
          href={wsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-base text-black"
        >
          <FaWhatsapp className="mr-2" />
        </a>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Contact;
