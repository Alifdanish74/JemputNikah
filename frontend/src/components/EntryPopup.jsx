import { useState, useEffect } from "react";
import axios from "axios";

const EntryPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [promo, setPromo] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const DELAY_TIME = 3000; // Delay in milliseconds (3 seconds)

  useEffect(() => {
    // ✅ Detect if page is refreshed
    const isPageReload = performance?.navigation?.type === 1 || window?.performance?.getEntriesByType("navigation")?.[0]?.type === "reload";

    if (isPageReload) {
      setTimeout(() => {
        setIsOpen(true);
      }, DELAY_TIME);
    }

    // Fetch promo from API
    const fetchPromo = async () => {
      try {
        const response = await axios.get("/api/promos/get-promo");
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

  console.log(loading);

  return (
    isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={closePopup}>
        <div className="bg-white rounded-lg shadow-lg max-w-sm w-4/5 md:w-full relative" onClick={(e) => e.stopPropagation()}>
          <button onClick={closePopup} className="absolute text-4xl right-2 text-gray-500 hover:text-gray-700">
            &times;
          </button>
          {imageUrl && <img src={imageUrl} alt="Promotion" className="rounded-t-lg w-full" />}
          <div className="p-4 text-center">
            <p className="text-gray-700 font-medium">Exclusive Offer!</p>
            <p className="text-sm text-gray-500">{promo}</p>
          </div>
        </div>
      </div>
    )
  );
};

export default EntryPopup;
