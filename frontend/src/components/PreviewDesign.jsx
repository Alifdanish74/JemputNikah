// import React from "react";
import DesignCard from "./DesignCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

function PreviewDesign() {
  const [designs, setDesigns] = useState([]);

  useEffect(() => {
    axios.get("/api/admin/get-top-design").then((response) => {
      setDesigns(response.data);
      console.log(response.data);
    });
  }, []);

  const navigate = useNavigate();

  function navigateToKadDigital() {
    navigate("/kad-digital");
  }

  return (
    <div className="relative bg-grey-50 md:p-20 lg:pb-16">
      <div className=" max-w-5xl max-h-5xl p-10 md:p-0 mx-auto bg-grey-50">
        <div>
          <motion.div
            initial={{
              y: -50,
              opacity: 0,
            }}
            transition={{ duration: 0.8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className=""
          >
            <div className=" mx-auto text-center pb-10">
              <h2 className="text-3xl font-bold text-gray-800">
                Pelbagai Pilihan Design
              </h2>
              <p className="text-lg text-gray-600 mt-4">
                Pilih design kad kahwin digital yang menepati dengan cita rasa
                anda
              </p>
            </div>
          </motion.div>
          {/* Preview Card */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 ">
            {designs.length > 0 &&
              designs.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }} // Adds staggered effect
                  viewport={{ once: true }}
                  className=""
                >
                  <DesignCard
                    key={index}
                    itemName={item.designName}
                    itemCategory={item.category}
                    itemImage={item.imagepreview}
                  />
                </motion.div>
              ))}
          </div>

          {/* Button Lihat Semua Design */}
          <div className="pt-5 flex items-center justify-center mx-auto">
            <Button
              onClick={navigateToKadDigital}
              className="rounded-full border  bg-sky-500 px-8 py-4 text-base text-white hover:bg-white hover:text-blue-500"
            >
              LIHAT SEMUA DESIGN <span aria-hidden="true">&rarr;</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewDesign;
