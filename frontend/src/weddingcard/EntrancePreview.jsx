/* eslint-disable react/prop-types */
// components/EntrancePreview.tsx

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios"; // Import axios for API calls
import { useParams } from "react-router-dom";

const variants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: -1000 },
};

const EntrancePreview = ({ onClose, setIsPlaying }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [design, setDesign] = useState(null); // State to store design data
  const { designName } = useParams(); // Extract designName from the URL

  // Function to fetch design data
  const fetchDesign = async (designName) => {
    try {
      const response = await axios.get(`/api/admin/get-design-byname/${designName}`);
      setDesign(response.data); // Store fetched design data
    } catch (error) {
      console.error("Error fetching design:", error);
    }
  };

  // Fetch design data when the component loads or when designName changes
  useEffect(() => {
    if (designName) {
      fetchDesign(designName);
    }
  }, [designName]);

  const handleClick = () => {
    setIsOpen(false);
    setIsPlaying(true);
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
        backgroundImage: design ? `url(${design.image})` : "none", // Use the design image if available
        backgroundSize: "cover",
        backgroundPosition: "center",
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
          <p className="text-lg uppercase font-['Cinzel']">Walimatulurus</p>
        </motion.div>

        {/* Display names of the bride and groom */}
        <div className="mb-5 text-6xl font-Tangerine">
          <motion.p
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            Alif Danish
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
            Nur Iqkriany
          </motion.p>
        </div>

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

export default EntrancePreview;