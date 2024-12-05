// import React from 'react'
import { motion } from "framer-motion";
import "../fonts.css";
import { useWeddingCard } from "../customhooks/WeddingCardContext";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AnimatedComponent from "./component/AnimatedComponent_Motion001";
import ParticleComponent from "./component/ParticleComponent";
import AnimatedComponent002 from "./component/AnimatedComponent_Motion002";

function MainContent() {
  const { weddingCard, design, fetchDesign } = useWeddingCard();
  const { designName } = useParams(); // Extract designName from the URL

  useEffect(() => {
    if (designName) {
      fetchDesign(designName); // Fetch design info when the component loads
    }
  }, [designName, fetchDesign]);

  // if (loading) return <p>Loading wedding card details...</p>;
  if (!weddingCard) return <p>Wedding card not found.</p>;

  console.log("DesignName: ", weddingCard.designName);
  console.log("Design from params: ", designName);
  // console.log("Design include: ", designName.includes("Motion"));
  console.log("Design: ", design);

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

  const particlesColor = "#f9e4cc"; // Change this value dynamically

  return (
    <div
      className="relative flex flex-col overflow-hidden z-0 px-4 pb-14 text-center min-h-screen main-card  text-black justify-center items-center"
      style={{
        backgroundImage:
        designName?.includes("Motion") || weddingCard?.designName?.includes("Motion")
          ? `url(${weddingCard.designBgUrl})`
          : designName && design
          ? `url(${design.image})`
          : `url(${weddingCard.designUrl})`,
        // backgroundImage: `url(${BgTest})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "400px",
        // overflow: "hidden",
      }}
    >
      {(weddingCard?.designName?.includes("Motion001") || designName?.includes("Motion001")) && (
        <>
          <section id="particles" className="">
            <ParticleComponent particleColor={particlesColor} />
          </section>

          <section id="animated" className="-z-10">
            <AnimatedComponent />
          </section>
        </>
      )}
      {(weddingCard?.designName?.includes("Motion002") || designName?.includes("Motion002")) && (
        <>
          <section id="particles" className="">
            <ParticleComponent particleColor={particlesColor} />
          </section>

          <section id="animated" className="-z-10">
            <AnimatedComponent002 />
          </section>
        </>
      )}

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
      {/* NAMA PENGANTIN */}
      {!["D"].includes(weddingCard.pihakMajlis) &&
        ["L","LL"].includes(weddingCard.pihakMajlis) && (
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
        ["P","PP"].includes(weddingCard.pihakMajlis) && (
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
          <div className={`mb-5 text-5xl ${weddingCard.jenisFont}`}>
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
      <motion.p
        initial={{
          y: -30,
          opacity: 0,
        }}
        transition={{ delay: 0.8, duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl mb-5 font-medium text-transform: uppercase font-['Cinzel']"
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
        className={`text-3xl mt-4 font-Libre font-normal ${weddingCard.jenisFont}`}
      >
        {weddingCard.locationMajlis}
      </motion.p>
    </div>
  );
}

export default MainContent;
