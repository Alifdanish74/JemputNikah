// import React from "react";
import { Button } from "@headlessui/react";
import Preview1 from "../assets/preview-1.png";
import Preview2 from "../assets/preview-2.png";
import Preview3 from "../assets/preview-3.png";

function PreviewDesign() {
  const previewcard = [
    {
      id: 1,
      name: "Floral 001",
      image: Preview1,
    },
    {
      id: 2,
      name: "Minimalist 001",
      image: Preview2,
    },
    {
      id: 3,
      name: "Luxury 001",
      image: Preview3,
    },
    {
      id: 4,
      name: "Floral 002",
      image: Preview1,
    },
  ];

  return (
    <div className="relative bg-slate-100 md:p-20 pb-28">
      <div className=" max-w-5xl max-h-5xl p-10 md:p-0 mx-auto bg-slate-100">
        <div>
          <div className=" mx-auto text-center pb-20">
            <h2 className="text-3xl font-bold text-gray-800">
              Pelbagai Pilihan Design
            </h2>
            <p className="text-lg text-gray-600 mt-4">
              Pilih design kad kahwin digital yang menepati dengan cita rasa
              anda
            </p>
          </div>

          {/* Preview Card */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ">
            {previewcard.map((item, index) => (
              <div key={index} className=" sm:max-w-xs mx-auto">
                <h5 className="text-lg md:text-xl mb-2 font-semibold tracking-tight text-gray-900 text-center">
                  {item.name}
                </h5>
                <div className="bg-white border border-gray-200 rounded-2xl shadow-lg">
                  <a href="#">
                    <img
                      className="mx-auto w-2/4 rounded-t-lg object-cover"
                      src={item.image}
                      alt="product image"
                    />
                  </a>

                  <div className="grid grid-cols-2 rounded-lg  bg-gray-50">
                    {/* <button className="w-1/3 text-black border border-black flex justify-center bg-white hover:bg-black hover:text-white font-medium rounded-lg text-sm md:text-base px-4 py-2.5 text-center">
                      Preview
                    </button>
                    <button className="w-1/3 text-white border border-blue-400 flex justify-center bg-blue-400 hover:bg-white hover:text-blue-500 font-medium rounded-lg text-sm md:text-base px-4 py-2.5 text-center">
                      Tempah
                    </button> */}
                    <div className="border-r py-2 w-full text-sm rounded-bl-xl border-black hover:bg-black hover:text-white">
                      <a href="" className="">
                        Preview
                      </a>
                    </div>
                    <div className="border-l py-2 rounded-br-xl text-sm text-white border-black bg-blue-400  hover:bg-black ">
                      <a href="" className="">
                        Tempah
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Button Lihat Semua Design */}
          <div className="pt-14">
            <Button
              href="#"
              className="rounded-full border border-blue-700 bg-sky-500 px-5 py-3 text-base text-white hover:bg-white hover:text-blue-500"
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
