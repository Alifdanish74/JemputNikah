/* eslint-disable react-refresh/only-export-components */
// WeddingCardContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const WeddingCardContext = createContext();

// Provider Component
// eslint-disable-next-line react/prop-types
export const WeddingCardProvider = ({ children }) => {
  const [weddingCard, setWeddingCard] = useState(null);
  const [order, setOrder] = useState(null);
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state
  const location = useLocation(); // Detect the current URL


  // Function to fetch wedding card data by orderNumber
  const fetchWeddingCard = async (orderNumber) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/orders/order/${orderNumber}`);
      setWeddingCard(response.data.weddingCardId);
      setOrder(response.data); // Assuming the wedding card is in response.data.weddingCardId
    } catch (error) {
      console.error("Error fetching wedding card:", error);
      setError(error); // Set error state if fetching fails
    } finally {
      setLoading(false);
    }
  };
  const fetchDesign = async (designName) => {
    if (design && design.designName === designName) {
      return; // Avoid redundant API calls
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `/api/admin/get-design-byname/${designName}`
      );
      setDesign(response.data);
    } catch (error) {
      console.error("Error fetching design:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    const fetchPreviewDesign = async () => {

          // If the URL is /preview, fetch wedding card data for order JK0001
    if (location.pathname.includes("/preview")) {
      fetchWeddingCard("JK00001");
    }

      if (location.pathname.includes("/preview")) {
        const segments = location.pathname.split("/");
        const designName = segments[segments.length - 1]; // Extract the last part of the path (e.g., "Tradisional001")
        if (designName) {
          const fetchedDesign = await fetchDesign(designName);

          // Update weddingCard with design's particleColor and fontColor
          setWeddingCard((prevCard) => ({
            ...prevCard,
            designParticleColor: fetchedDesign?.particleColor,
            designFontColor: fetchedDesign?.fontColor,
          }));
        }
      }

    }


    if (location.pathname.includes("/pakejpreview/Bali")) {
      fetchWeddingCard("JK00005");
    } if (location.pathname.includes("/pakejpreview/Istanbul")) {
      fetchWeddingCard("JK00006");
    } if (location.pathname.includes("/pakejpreview/Paris")) {
      fetchWeddingCard("JK00001");
    } else {
      setLoading(false);
    }

    fetchPreviewDesign();
  }, [location.pathname]);
  //   console.log("WeddingCard data from WeddingCardContext:", weddingCard);
  //   console.log("Order data from WeddingCardContext:", order);
  return (
    <WeddingCardContext.Provider
      value={{
        weddingCard,
        order,
        loading,
        fetchWeddingCard,
        design,
        fetchDesign,
        error, // Provide error in context
      }}
    >
      {children}
    </WeddingCardContext.Provider>
  );
};

// Custom hook for using WeddingCard context
export const useWeddingCard = () => {
  return useContext(WeddingCardContext);
};
