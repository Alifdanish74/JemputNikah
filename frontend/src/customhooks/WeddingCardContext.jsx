/* eslint-disable react-refresh/only-export-components */
// WeddingCardContext.js
import { createContext, useContext, useState } from 'react';
import axios from 'axios';

const WeddingCardContext = createContext();

// Provider Component
// eslint-disable-next-line react/prop-types
export const WeddingCardProvider = ({ children }) => {
  const [weddingCard, setWeddingCard] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch wedding card data by orderNumber
  const fetchWeddingCard = async (orderNumber) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/orders/order/${orderNumber}`);
      setWeddingCard(response.data.weddingCardId);
      setOrder(response.data) // Assuming the wedding card is in response.data.weddingCardId
    } catch (error) {
      console.error("Error fetching wedding card:", error);
    } finally {
      setLoading(false);
    }
  };
//   console.log("WeddingCard data from WeddingCardContext:", weddingCard);
//   console.log("Order data from WeddingCardContext:", order);
  return (
    <WeddingCardContext.Provider value={{ weddingCard, order, loading, fetchWeddingCard }}>
      {children}
    </WeddingCardContext.Provider>
  );
};

// Custom hook for using WeddingCard context
export const useWeddingCard = () => {
  return useContext(WeddingCardContext);
};