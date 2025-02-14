import {motion} from 'framer-motion';
import { useWeddingCard } from '../customhooks/WeddingCardContext';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
function DoaPagePreview() {
  const { design, fetchDesign } = useWeddingCard();
  const { designName } = useParams(); // Extract designName from the URL

  useEffect(() => {
    if (designName) {
      fetchDesign(designName); // Fetch design info when the component loads
    }
  }, [designName, fetchDesign]);

  // if (loading) return <p>Loading wedding card details...</p>;
  // if (!weddingCard) return <p>Wedding card not found.</p>;
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
      className="p-20 text-center main-card  justify-center items-center background-doa bg-cover"
      style={{ color: design.fontColor || "#000000" }}
    >
      {/* <div className="px-16 py-20"> */}
      <p className=" text-center text-sm  font-light flex-wrap">
        Ya Allah, berkatilah majlis perkahwinan ini, limpahkan baraqah dan
        rahmat kepada kedua mempelai ini, Kurniakanlah mereka zuriat yang soleh
        dan solehah. Kekalkanlah jodoh mereka di dunia dan di akhirat dan
        sempurnakanlah agama mereka dengan berkat ikatan ini.
        {/* {weddingCard.doa} */}
      </p>
    </motion.div>
    // </div>
  );
}

export default DoaPagePreview;
