import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useWeddingCard } from "../customhooks/WeddingCardContext";
import { useEffect } from "react";

function WeddingInfo() {
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

  function formatTo12Hour(time) {
    const [hour, minute] = time.split(":");
    const hourInt = parseInt(hour, 10);
    const period = hourInt >= 12 ? "PM" : "AM";
    const hour12 = hourInt % 12 || 12; // Convert to 12-hour format

    return `${hour12}:${minute} ${period}`;
  }
  return (
    <div className="flex flex-col text-black justify-center px-3 text-center items-center pb-8">
      <motion.div
        initial={{
          y: 100,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className=" mb-5 text-transform: uppercase"
      >
        {/* <p className="text-xl">
          اَلسَلامُ عَلَيْكُم وَرَحْمَةُ اَللهِ وَبَرَكاتُهُ
        </p> */}
        <p className="text-base">{weddingCard.mukadimah}</p>
      </motion.div>

      {!["LL", "PP"].includes(weddingCard.pihakMajlis) && (
        <div>
          <motion.div
            initial={{
              y: 100,
              opacity: 0,
            }}
            transition={{ duration: 1.2 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-transform: uppercase"
          >
            <p className=" text-xl  font-['Cinzel']">
              {" "}
              {weddingCard.namaBapaPengantin}{" "}
            </p>
          </motion.div>

          <motion.p
            initial={{
              y: 100,
              opacity: 0,
            }}
            transition={{ duration: 1.2 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl font-['Tangerine']"
          >
            &
          </motion.p>

          <motion.div
            initial={{
              y: 100,
              opacity: 0,
            }}
            transition={{ duration: 1.2 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4 text-transform: uppercase"
          >
            <p className=" text-xl  font-['Cinzel'] font-">
              {weddingCard.namaIbuPengantin}
            </p>
          </motion.div>
        </div>
      )}

      <motion.div
        initial={{
          y: 100,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-7 text-base font-['Libre']"
      >
        {/* <p>Dengan penuh kesyukuran kehadrat Illahi,</p>
        <p>kami mempersilakan</p>
        <p>Dato/Datin/Dr/Tuan/Puan/Encik/Cik</p>
        <p>ke walimatulurus anakanda kesayangan kami</p> */}
        {weddingCard.ucapanAluan}
      </motion.div>

      <motion.div
        initial={{
          y: 100,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-transform: uppercase"
      >
        <p className=" text-xl  font-['Cinzel']">
          {" "}
          {weddingCard.namaPenuhLelaki}{" "}
        </p>
        {["LL", "PP"].includes(weddingCard.pihakMajlis) && (
          <p className="text-xs font-light">
            Anakanda kepada {weddingCard.namaBapaPengantinL} &{" "}
            {weddingCard.namaIbuPengantinL}
          </p>
        )}
      </motion.div>

      <motion.p
        initial={{
          y: 100,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl font-['Tangerine']"
      >
        &
      </motion.p>

      <motion.div
        initial={{
          y: 100,
          opacity: 0,
        }}
        transition={{ duration: 1.2 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-4 text-transform: uppercase"
      >
        <p className=" text-xl  font-['Cinzel'] font-">
          {weddingCard.namaPenuhPerempuan}
        </p>
        {["LL", "PP"].includes(weddingCard.pihakMajlis) && (
          <p className="text-xs font-light">
            Anakanda kepada {weddingCard.namaBapaPengantinP} & {" "}
            {weddingCard.namaIbuPengantinP}
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{
          y: 140,
          opacity: 0,
        }}
        transition={{ duration: 1.5 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-normal"
      >
        <p>
          <b className="text-[#be822b]">Tarikh</b>
        </p>
        <p className="mb-4 ">
          {dayName}, {dayNumber} {month} {year}
        </p>
        <p>
          <b className="text-[#be822b]">Masa</b>
        </p>
        <p className="mb-4">
          {formatTo12Hour(weddingCard.majlisStart)}-{" "}
          {formatTo12Hour(weddingCard.majlisEnd)}
        </p>
        <p>
          <b className="text-[#be822b]">Tempat</b>
        </p>
        {/* <p> BIZMILLA @ GAMUDA GARDENS,</p>
        <p> Persiaran Gamuda Gardens,</p>
        <p className="mb-4"> 48050 Rawang, Selangor</p> */}
        {weddingCard.fullLocationMajlis}

        <p>
          <b className="text-[#be822b]">Aturan Majlis</b>
        </p>
        <p>
          {" "}
          {formatTo12Hour(weddingCard.eventTentativeTime1)}-{" "}
          {weddingCard.eventTentativeTitle1}
        </p>
        <p>
          {" "}
          {formatTo12Hour(weddingCard.eventTentativeTime2)}-{" "}
          {weddingCard.eventTentativeTitle2}
        </p>
        <p>
          {" "}
          {formatTo12Hour(weddingCard.eventTentativeTime3)}-{" "}
          {weddingCard.eventTentativeTitle3}
        </p>
        {weddingCard.eventTentativeTime4 && weddingCard.eventTentativeTime5 && (
          <>
            <p>
              {" "}
              {formatTo12Hour(weddingCard.eventTentativeTime4)}-{" "}
              {weddingCard.eventTentativeTitle4}
            </p>
            <p>
              {" "}
              {formatTo12Hour(weddingCard.eventTentativeTime5)}-{" "}
              {weddingCard.eventTentativeTitle5}
            </p>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default WeddingInfo;
