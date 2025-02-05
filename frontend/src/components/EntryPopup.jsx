import { useState, useEffect } from "react";
// import PopupImage from "../assets/popup.png";
import axios from "axios";

const EntryPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [promo, setPromo] = useState("");
//   const [promoId, setPromoId] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  
//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem("hasSeenPopup");
    if (!hasSeenPopup) {
      setIsOpen(true);
      localStorage.setItem("hasSeenPopup", "true");
    }
    // setIsOpen(true);

    const fetchPromo = async () => {
        try {
          const response = await axios.get("api/promos/get-promo");
          if (response.data && response.data.length > 0) {
            const promoData = response.data[0];
            setPromo(promoData.promoDescription || "");
            setImageUrl(promoData.image || "");
          }
        } catch (error) {
          console.error("Error fetching promo:", error);
        } finally {
          setLoading(false);
        }
      };
    
      fetchPromo();
    
  }, []);



  const closePopup = () => {
    setIsOpen(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation(); // Prevent the click event from propagating to the outer div
  };

  console.log(loading);

  return (
    isOpen && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        onClick={closePopup} // Close popup when clicking outside
      >
        <div
          className="bg-white rounded-lg shadow-lg max-w-sm w-4/5 md:w-full relative"
          onClick={stopPropagation}
        >
          <button
            onClick={closePopup}
            className="absolute text-4xl  right-2 text-white hover:text-gray-700"
          >
            &times;
          </button>
          <img
            // src={PopupImage}
            src={imageUrl}
            alt="Promotion"
            className="rounded-t-lg w-full"
          />
          <div className="p-4 text-center">
            <p className="text-gray-700 font-medium">Exclusive Offer!</p>
            <p className="text-sm text-gray-500">
              {promo}
            </p>
          </div>
        </div>
      </div>
    )
  );
};

export default EntryPopup;
