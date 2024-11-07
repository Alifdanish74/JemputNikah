import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useWeddingCard } from "../customhooks/WeddingCardContext";
import { useEffect } from "react";

function Countdown() {
  const { orderNumber } = useParams();
  const { weddingCard, loading, fetchWeddingCard } = useWeddingCard();

  useEffect(() => {
    if (orderNumber) {
      fetchWeddingCard(orderNumber);
    }
  }, [orderNumber]);

  if (loading) return <p>Loading wedding card details...</p>;
  if (!weddingCard) return <p>Wedding card not found.</p>;

  // const targetDate = new Date(weddingCard.tarikhMajlis);
  const currentDate = new Date();
  const dateString = weddingCard.tarikhMajlis.split("T")[0]; // Extract the date part only
  const targetDate = new Date(dateString); // Now `date` represents only the date
  const timeDifference = targetDate.getTime() - currentDate.getTime();
  const day = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return (
    <motion.div
      initial={{
        y: 100,
        opacity: 0,
      }}
      transition={{ duration: 1.2 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col text-black justify-center text-center items-center pt-4 pb-8"
    >
      <p className="pb-3 text-3xl  font-['Cinzel']"> Menanti Hari Bahagia</p>
      <FlipClockCountdown
        to={new Date().getTime() + day * 24 * 3600 * 1000 + 5000}
        labels={["DAYS", "HOURS", "MINUTES", "SECONDS"]}
        labelStyle={{
          fontSize: 10,
          fontWeight: 500,
          textTransform: "uppercase",
          color: "black",
        }}
        digitBlockStyle={{ width: 30, height: 50, fontSize: 30 }}
        dividerStyle={{ color: "white", height: 1 }}
        separatorStyle={{ color: "red", size: "6px" }}
        duration={0.5}
      >
        <p className="pb-3 text-3xl font-semibold font-['Cinzel']">
          {" "}
          Alhamdulillah Majlis Selesai
        </p>
      </FlipClockCountdown>
    </motion.div>
  );
}

export default Countdown;
