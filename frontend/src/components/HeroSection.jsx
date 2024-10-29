// import React from 'react'
// import { Link } from 'react-router-dom'
import { Button } from "@headlessui/react";
import MockupImage from "../assets/phone-mockup.png";
import { featureicons } from "./featureicons";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="relative bg-gradient-to-b h-fit from-pink-300 to-blue-50">
      {/* <section className="overflow-scroll"> */}
      <div className="flex flex-col lg:flex-row lg:items-stretch">
        {/* column left */}
        <div className="flex items-center justify-center w-full lg:order-2 lg:w-7/12">
          <div className="h-full px-4 pt-24 pb-16 sm:px-6 lg:px-24 2xl:px-32 lg:pt-40 lg:pb-14">
            <div className="flex flex-col justify-between flex-1 h-fit">
              <div>
                <h1 className="text-4xl uppercase font-bold text-black sm:text-6xl xl:text-7xl">
                  Kad Jemputan <br />
                  Kahwin Digital
                </h1>
                <p className="mt-6 text-base text-black sm:text-xl">
                  Jemputan majlis alaf baru! Kini lebih mudah dan teratur
                </p>
                <div className="mx-auto p-6">
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                    {featureicons.map((feature, index) => (
                      <div key={index} className="">
                        <div
                          className={`w-16 h-16 ${feature.bgColor} flex mx-auto items-center justify-center rounded-full ${feature.textColor} text-3xl`}
                        >
                          {feature.icon}
                        </div>
                        <span className="mt-2 block text-sm font-semibold whitespace-nowrap">
                          {feature.title}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <Button
                  target="blank"
                  title=""
                  className="inline-flex rounded-full border border-sky-500 items-center px-6 py-5 text-base font-semibold text-white transition-all duration-200 bg-sky-500 mt-9 hover:bg-white hover:text-blue-400"
                  role="button"
                  onClick={() => {
                    navigate("/kad-digital")
                  }}
                >
                  {" "}
                  Tempah Sekarang{" "}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* column right */}

        <div className="relative w-full justify-center items-center overflow-hidden lg:w-5/12 lg:order-1">
          {/* <div className="lg:absolute lg:justify-center lg:items-center">  */}
          <img className="w-2/4 md:w-3/4 mx-auto" src={MockupImage} alt="" />
          {/* </div> */}
        </div>
      </div>
      {/* </section> */}
    </div>
  );
}

export default HeroSection;
