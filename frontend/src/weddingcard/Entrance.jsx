/* eslint-disable react/prop-types */
// components/Entrance.tsx

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useWeddingCard } from "../customhooks/WeddingCardContext";
import { useParams } from "react-router-dom";
import LoadingWrapper from "../customhooks/LoadingWrapper";

const variants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: -1000 },
};

const Entrance = ({ onClose, setIsPlaying }) => {
  const [isOpen, setIsOpen] = useState(true);

  const { orderNumber } = useParams();
  const { weddingCard, fetchWeddingCard, loading, error } = useWeddingCard();

  useEffect(() => {
    if (orderNumber) {
      fetchWeddingCard(orderNumber);
    }
  }, [orderNumber]);

  const handleClick = () => {
    setIsOpen(false);
    setIsPlaying(true);
    console.log("Playing: ", setIsPlaying);
    setTimeout(onClose, 800); // Ensure this matches the transition duration
  };


  return (
    <LoadingWrapper isLoading={loading || (!weddingCard && !error)}>
      {error ? (
        <p className="text-center text-red-400">Wedding card not found.</p>
      ) : weddingCard ? (
        <motion.div
          initial={{ y: 0, opacity: 1 }}
          animate={isOpen ? "open" : "closed"}
          variants={variants}
          transition={{ duration: 0.8 }}
          className="flex flex-col pb-10 pt-20 text-center h-screen main-card text-black justify-center items-center bg-blurred"
          style={{
            backgroundImage: `url(${weddingCard.designUrl})`,
            color: weddingCard.designFontColor || "#000000",
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
              <p className="text-2xl text-tranform: uppercase font-['Cinzel']">
                {weddingCard.tajukMajlis}
              </p>
            </motion.div>
            {/* NAMA PENGANTIN */}
            {!["D"].includes(weddingCard.pihakMajlis) &&
              ["L", "LL"].includes(weddingCard.pihakMajlis) && (
                <>
                  {/* NAMA PENGANTIN */}
                  <div className={`mt-16 mb-10 text-6xl ${weddingCard.jenisFont}`}>
                    <motion.h1
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1 }}
                    >
                      {weddingCard.namaPendekLelaki}
                      {/* {weddingCard.designUrl} */}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 1 }}
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.4, opacity: 1 },
                      }}
                      className="my-5"
                    >
                      &
                    </motion.p>
                    <motion.h1
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6, duration: 1 }}
                    >
                      {weddingCard.namaPendekPerempuan}
                    </motion.h1>
                  </div>
                </>
              )}
            {!["D"].includes(weddingCard.pihakMajlis) &&
              ["P", "PP"].includes(weddingCard.pihakMajlis) && (
                <>
                  {/* NAMA PENGANTIN */}
                  <div className={`mt-16 mb-10 text-6xl ${weddingCard.jenisFont}`}>
                    <motion.h1
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1 }}
                    >
                      {weddingCard.namaPendekPerempuan}
                      {/* {weddingCard.designUrl} */}
                    </motion.h1>
                    <motion.p
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 1 }}
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.4, opacity: 1 },
                      }}
                      className="my-5"
                    >
                      &
                    </motion.p>
                    <motion.h1
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6, duration: 1 }}
                    >
                      {weddingCard.namaPendekLelaki}
                    </motion.h1>
                  </div>
                </>
              )}
            {/* IF PASANGAN DUA */}
            {["D"].includes(weddingCard.pihakMajlis) && (
              <>
                {/* NAMA PENGANTIN */}
                <div className={`mt-16 mb-10 text-4xl ${weddingCard.jenisFont}`}>
                  <motion.h1
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                  >
                    {weddingCard.namaPendekPasangan1}
                    {/* {weddingCard.designUrl} */}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.4, opacity: 1 },
                    }}
                    className="my-5"
                  >
                    dan
                  </motion.p>
                  <motion.h1
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 1 }}
                  >
                    {weddingCard.namaPendekPasangan2}
                  </motion.h1>
                </div>
              </>
            )}

            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.4, opacity: 1 },
              }}
              onClick={handleClick}
              className="border border-black hover:bg-yellow-600  hover:text-white
              font-bold py-2 px-4 rounded-full"
              style={{
                color: weddingCard.designFontColor || "#000000",
                borderColor: weddingCard.designFontColor || "#000000", // Border color
              }}
            >
              {" "}
              Buka
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <p className="text-center text-red-400">Wedding card not found.</p>
      )}
    </LoadingWrapper>
  );
};

export default Entrance;
