import { motion} from "framer-motion";

function WeddingInfo() {
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
        <p className="text-xl">
          اَلسَلامُ عَلَيْكُم وَرَحْمَةُ اَللهِ وَبَرَكاتُهُ
        </p>
        <p className="text-base">Salam Sejahtera</p>
      </motion.div>

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
        <p>Dengan penuh kesyukuran kehadrat Illahi,</p>
        <p>kami mempersilakan</p>
        <p>Dato/Datin/Dr/Tuan/Puan/Encik/Cik</p>
        <p>ke walimatulurus anakanda kesayangan kami</p>
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
        <p className=" text-xl  font-['Cinzel']"> Alif Danish Bin Arshad</p>
        <p className="text-xs font-light">
          Anakanda kepada Hj Arshad Bin Shaharuddin & Hjh Rohayu Binti Ayub
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
          {" "}
          Nur Iqkriany Binti Mohd Wera
        </p>
        <p className="text-xs font-light">
          Anakanda kepada Almarhum Mohd Wera Bin Darman & Nor Azean Binti Musa
        </p>
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
        <p className="mb-4 ">Sabtu, 10 August 2024</p>
        <p>
          <b className="text-[#be822b]">Masa</b>
        </p>
        <p className="mb-4"> 7:30 Petang - 11.00 Malam</p>
        <p>
          <b className="text-[#be822b]">Tempat</b>
        </p>
        <p> BIZMILLA @ GAMUDA GARDENS,</p>
        <p> Persiaran Gamuda Gardens,</p>
        <p className="mb-4"> 48050 Rawang, Selangor</p>

        <p>
          <b className="text-[#be822b]">Aturan Majlis</b>
        </p>
        <p> 7:30 PM - Majlis Bermula</p>
        <p> 8:30 PM - Ketibaan Pengantin</p>
        <p className="mb-4">11:00 PM - Majlis Berakhir</p>
      </motion.div>
    </div>
  );
}

export default WeddingInfo;
