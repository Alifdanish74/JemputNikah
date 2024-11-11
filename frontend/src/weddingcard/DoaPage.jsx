import {motion} from 'framer-motion';
import { useWeddingCard } from '../customhooks/WeddingCardContext';
function DoaPage() {
  const { weddingCard, loading } = useWeddingCard();

  if (loading) return <p>Loading wedding card details...</p>;
  if (!weddingCard) return <p>Wedding card not found.</p>;
  return (
    // <div className="flex flex-col main-card h-[420px] w-[390px] text-black justify-center text-center items-center pt-4 pb-8 bg-doa_bg_image">
    <motion.div
      initial={{
        y: 100,
        opacity: 0,
      }}
      transition={{ duration: 1.2 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-20 text-center main-card text-black justify-center items-center background-doa bg-cover"
    >
      {/* <div className="px-16 py-20"> */}
      <p className=" text-center text-sm text-black font-light flex-wrap">
        {/* Ya Allah, berkatilah majlis perkahwinan ini, limpahkan baraqah dan
        rahmat kepada kedua mempelai ini, Kurniakanlah mereka zuriat yang soleh
        dan solehah. Kekalkanlah jodoh mereka di dunia dan di akhirat dan
        sempurnakanlah agama mereka dengan berkat ikatan ini. */}
        {weddingCard.doa}
      </p>
    </motion.div>
    // </div>
  );
}

export default DoaPage;
