/* eslint-disable react/prop-types */
// components/Modal.jsx
import { useState } from "react";
import ModalComponentRSVP from "./component/modalcomponent/ModalComponentRSVP";
import ModalComponentMoneyGift from "./component/modalcomponent/ModalComponentMoneyGift";
import ModalComponentWishlist from "./component/modalcomponent/ModalComponentWishlist";
import ModalComponentContact from "./component/modalcomponent/ModalComponentContact";
import ModalComponentLocation from "./component/modalcomponent/ModalComponentLocation";
import ModalComponentCalendar from "./component/modalcomponent/ModalComponentCalendar";
import ModalComponentBooking from "./component/modalcomponent/ModalComponentBooking";
import ModalComponentRSVPSlot from "./component/modalcomponent/ModalComponentRSVPSlot";
import ModalComponentRSVPSlotTidakHadir from "./component/modalcomponent/ModalComponentRSVPSlotTidakHadir";

const Modal = ({
  isOpen,
  onClose,
  modalType,
  setModalType, // Added to manage modal transitions
  onConfirm,
  onCancel,
  onGuestbookUpdate,
}) => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  // Handles the transition to the "Booking" modal
  const onConfirmBook = (nextModal, title, image) => {
    setTitle(title);
    setImage(image);
    setModalType(nextModal); // Dynamically switch the modal type
  };

  const renderModalContent = () => {
    switch (modalType) {
      case "RSVP":
        return <ModalComponentRSVP onConfirm={onConfirm} />;
      case "RSVP-preview":
        return <ModalComponentRSVP onConfirm={""} />;
      case "Money Gift":
        return <ModalComponentMoneyGift />;
      case "Wishlist":
        return (
          <ModalComponentWishlist
            onConfirmBook={(nextModal, title, image) =>
              onConfirmBook(nextModal, title, image)
            }
          />
        );
      case "Contact":
        return <ModalComponentContact />;
      case "Location":
        return <ModalComponentLocation />;
      case "Calendar":
        return <ModalComponentCalendar />;
      case "RSVPSlot":
        return (
          <ModalComponentRSVPSlot
            onConfirm={onConfirm}
            onCancel={onCancel}
            onGuestbookUpdate={onGuestbookUpdate}
          />
        );
      case "RSVPTidakHadir":
        return (
          <ModalComponentRSVPSlotTidakHadir
            onConfirm={onConfirm}
            onCancel={onCancel}
            onGuestbookUpdate={onGuestbookUpdate}
          />
        );
      case "Booking":
        return (
          <ModalComponentBooking
            onCancel={() => setModalType("Wishlist")} // Return to Wishlist on cancel
            title={title}
            image={image}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`fixed no-scrollbar inset-0 overflow-y-scroll z-40 bg-gray-600 bg-opacity-50 flex items-end justify-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white p-4 rounded-t-xl shadow-lg pb-14 w-full max-w-[400px] mx-auto transition-transform duration-300 transform ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {renderModalContent()}
      </div>
    </div>
  );
};

export default Modal;
