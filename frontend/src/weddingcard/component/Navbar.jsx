// import { useState, useEffect } from "react";
// import Modal from "./Modal";
import { IoReceiptOutline } from "react-icons/io5";
import { BiMoneyWithdraw } from "react-icons/bi";
import { CiGift } from "react-icons/ci";
import { MdOutlineLocalPhone } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { FaRegCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";
function Navbar() {
  const navbarButtonCSS = "focus:outline-none flex flex-col items-center";
  return (
    <>
      <motion.div
        initial={{
          y: 30,
          opacity: 0,
        }}
        transition={{ duration: 0.6 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="fixed w-full max-w-[400px] text-black bottom-0 flex flex-col justify-center z-50 min-h-16"
      >
        {/* Navbar */}
        <div
          id="buttondiv"
          className="main-div bg-white w-full border-t border-gray-200 rounded-t-3xl text-[10px] font-medium flex flex-wrap justify-around items-center p-2 min-h-16"
        >
          <motion.button
            initial={{ opacity: 0.8 }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.4, opacity: 1 },
            }}
            // onClick={() => openModal("Money Gift")}
            className={navbarButtonCSS}
          >
            <BiMoneyWithdraw className="text-2xl mb-1" /> Money Gift
          </motion.button>
          <motion.button
            initial={{ opacity: 0.8 }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.4, opacity: 1 },
            }}
            // onClick={() => openModal("Wishlist")}
            className={navbarButtonCSS}
          >
            <CiGift className="text-2xl mb-1" /> Wishlist
          </motion.button> 

            <motion.button
              initial={{ opacity: 0.8 }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.4, opacity: 1 },
              }}
              // onClick={() => openModal("RSVP")}
              className={navbarButtonCSS}
            >
              <IoReceiptOutline className="text-2xl mb-1" /> RSVP
            </motion.button>
      

          {/* <div>
            <button className="relative inline-flex flex-col items-center text-xs font-medium text-white py-3 px-6 flex-grow">
              <div className="absolute bottom-5 p-3 rounded-full border-4 border-white bg-blue-600">
                <IoReceiptOutline className="text-2xl mb-1" /> RSVP
              </div>
            </button>
          </div> */}

          <motion.button
            initial={{ opacity: 0.8 }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.4, opacity: 1 },
            }}
            // onClick={() => openModal("Contact")}
            className={navbarButtonCSS}
          >
            <MdOutlineLocalPhone className="text-2xl mb-1" /> Contact
          </motion.button>
          <motion.button
            initial={{ opacity: 0.8 }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.4, opacity: 1 },
            }}
            // onClick={() => openModal("Location")}
            className={navbarButtonCSS}
          >
            <SlLocationPin className="text-2xl mb-1" /> Location
          </motion.button>
          <motion.button
            initial={{ opacity: 0.8 }}
            whileHover={{
              scale: 1.1,
              transition: { duration: 0.4, opacity: 1 },
            }}
            // onClick={() => openModal("Calendar")}
            className={navbarButtonCSS}
          >
            <FaRegCalendarAlt className="text-2xl mb-1" /> Calendar
          </motion.button>
          {/* Other buttons */}
        </div>
      </motion.div>

      {/* Modals
          <Modal
            isOpen={activeModal !== null}
            onClose={closeModal}
            modalType={activeModal || ""}
            onConfirm={handleConfirm}
            onCancel={closeModal}
            isClosing={isClosing}
            onGuestbookUpdate={onGuestbookUpdate}  // Pass closing animation flag to the Modal component
          /> */}
    </>
  );
}

export default Navbar;
