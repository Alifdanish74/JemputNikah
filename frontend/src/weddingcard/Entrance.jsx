/* eslint-disable react/prop-types */
// components/Entrance.tsx

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useWeddingCard } from "../customhooks/WeddingCardContext";
import { useParams } from "react-router-dom";

const variants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: -1000 },
};

const Entrance = ({ onClose, setIsPlaying }) => {
  const [isOpen, setIsOpen] = useState(true);

  const { orderNumber } = useParams();
  const { weddingCard,  fetchWeddingCard } = useWeddingCard();

  useEffect(() => {
    if (orderNumber) {
      fetchWeddingCard(orderNumber);
    }
  }, [orderNumber]);

//   if (loading) return <p>Loading wedding card details...</p>;
  if (!weddingCard) return <p>Wedding card not found.</p>;

  const handleClick = () => {
    setIsOpen(false);
    setIsPlaying(true);
    console.log("Playing: ", setIsPlaying);
    setTimeout(onClose, 800); // Ensure this matches the transition duration
  };

  return (
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      animate={isOpen ? "open" : "closed"}
      variants={variants}
      transition={{ duration: 0.8 }}
      className="flex flex-col pb-10 pt-20 text-center h-screen main-card text-black justify-center items-center bg-blurred"
      style={{
        backgroundImage: `url(${weddingCard.designUrl})`,
      }}
    >
      <div className="z-10">
        <motion.div
          initial={{
            y: -20,
            opacity: 0,
          }}
          transition={{ duration: 0.2 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <p className="text-lg text-tranform: uppercase font-['Cinzel']">
            {weddingCard.tajukMajlis}
          </p>
        </motion.div>
        {/* NAMA PENGANTIN */}
        {!["D"].includes(weddingCard.pihakMajlis) &&
          ["L"].includes(weddingCard.pihakMajlis) && (
            <>
              {/* NAMA PENGANTIN */}
              <div className={`mb-5 text-6xl ${weddingCard.jenisFont}`}>
                <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                >
                  {weddingCard.namaPendekLelaki}
                  {/* {weddingCard.designUrl} */}
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
            </>
          )}
        {!["D"].includes(weddingCard.pihakMajlis) &&
          ["P"].includes(weddingCard.pihakMajlis) && (
            <>
              {/* NAMA PENGANTIN */}
              <div className={`mb-5 text-6xl ${weddingCard.jenisFont}`}>
                <motion.p
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                >
                  {weddingCard.namaPendekPerempuan}
                  {/* {weddingCard.designUrl} */}
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
                  {weddingCard.namaPendekLelaki}
                </motion.p>
              </div>
            </>
          )}
        {/* IF PASANGAN DUA */}
        {["D"].includes(weddingCard.pihakMajlis) && (
          <>
            {/* NAMA PENGANTIN */}
            <div className={`mb-5 text-3xl ${weddingCard.jenisFont}`}>
              <motion.p
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
              >
                {weddingCard.namaPendekPasangan1}
                {/* {weddingCard.designUrl} */}
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
                {weddingCard.namaPendekPasangan2}
              </motion.p>
            </div>
          </>
        )}

        <button
          onClick={handleClick}
          className="bg-sky-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Buka
        </button>
      </div>
    </motion.div>
  );
};

export default Entrance;
