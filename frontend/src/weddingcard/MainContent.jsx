// import React from 'react'
import { motion } from "framer-motion";
import "../fonts.css";
import { useWeddingCard } from "../customhooks/WeddingCardContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function MainContent() {
  const { orderNumber } = useParams();
  const { weddingCard, loading, fetchWeddingCard } = useWeddingCard();

  useEffect(() => {
    if (orderNumber) {
      fetchWeddingCard(orderNumber);
    }
  }, [orderNumber]);

  if (loading) return <p>Loading wedding card details...</p>;
  if (!weddingCard) return <p>Wedding card not found.</p>;

  const dateString = weddingCard.tarikhMajlis.split("T")[0]; // Extract the date part only
  const date = new Date(dateString); // Now `date` represents only the date
  
  const dayName = new Intl.DateTimeFormat("ms-MY", { weekday: "long" }).format(
    date
  );
  const dayNumber = new Intl.DateTimeFormat("ms-MY", { day: "numeric" }).format(
    date
  );
  const month = new Intl.DateTimeFormat("ms-MY", { month: "long" }).format(
    date
  );
  const year = new Intl.DateTimeFormat("ms-MY", { year: "numeric" }).format(
    date
  );

  return (
    <div className="flex flex-col z-10 pb-14 text-center min-h-screen main-card text-black justify-center items-center background-div">
      <motion.div
        initial={{
          y: -30,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="card-opening"
      >
        <p className="text-lg py-5 font-bold text-tranform: uppercase font-['Cinzel']">
          {weddingCard.tajukMajlis}
        </p>
      </motion.div>
      <div className="mb-5 text-7xl font-Tangerine">
        <motion.p
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          {weddingCard.namaPendekLelaki}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          whileHover={{
            scale: 1.1,
            transition: { duration: 0.4, opacity: 1 },
          }}
        >
          &
        </motion.p>
        <motion.p
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          {weddingCard.namaPendekPerempuan}
        </motion.p>
      </div>
      <motion.p
        initial={{
          y: -30,
          opacity: 0,
        }}
        transition={{ delay: 0.8, duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl mb-5 font-medium text-transform: uppercase font-Libre"
      >
        {/* <br />
        <span>Sabtu</span>
        <br />
        <span>10 </span>
        <span> August</span>
        <span> 2024</span> */}
        <span>{dayName}</span>
        <br />
        <span>{dayNumber}</span>
        <span> {month}</span>
        <span> {year}</span>
      </motion.p>

      <motion.p
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="text-lg font-Libre font-normal"
      >
        {weddingCard.locationMajlis}
      </motion.p>
    </div>
  );
}

export default MainContent;
