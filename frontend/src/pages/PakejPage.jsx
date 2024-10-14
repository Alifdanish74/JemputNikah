// import React from "react";
import { Button } from "@headlessui/react";
import HeaderBackground from "../components/HeaderBackground";
import PakejSection from "../components/PakejSection";

function PakejPage() {
  return (
    <>
      <HeaderBackground H1="PAKEJ KAD KAHWIN DIGITAL" P="" />
      <section className="bg-blue-50 pb-16">
        <PakejSection />
        <div className="flex py-8 px-4 mx-auto max-w-5xl lg:py-16 lg:px-6 space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-6 lg:space-y-0">
          {/* Add on 1 */}
          <div className="px-4  mx-auto max-w-5xl lg:px-6 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-6 lg:space-y-0">
            <div className="flex flex-col py-5 px-16 border-x-4 border-y-8 border-green-400 mx-auto text-center text-gray-900 bg-white rounded-lg shadow ">
              <h3 className="mb-4 text-2xl font-semibold"> PDF</h3>
              <h3 className="mb-4 text-xl font-semibold whitespace-nowrap">
                {" "}
                PDF Add On
              </h3>

              <div className="flex justify-center items-baseline mb-4">
                <span className="mr-2 text-3xl font-extrabold whitespace-nowrap">
                  + RM39
                </span>
              </div>
              <Button
                href="#"
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Preview
              </Button>
            </div>
          </div>
          {/* Add on 2 */}
          <div className="px-4  mx-auto max-w-5xl lg:px-6 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-6 lg:space-y-0">
            <div className="flex flex-col py-5 px-10 border-x-4 border-y-8 border-sky-400 mx-auto text-center text-gray-900 bg-white rounded-lg shadow ">
              <h3 className="mb-4 text-2xl font-semibold"> CUSTOM</h3>
              <h3 className="mb-4 text-xl font-semibold whitespace-nowrap">
                Upload Own Design
              </h3>

              <div className="flex justify-center items-baseline mb-4">
                <span className="mr-2 text-3xl font-extrabold whitespace-nowrap">
                  + RM39
                </span>
              </div>
              <Button
                href="#"
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Preview
              </Button>
            </div>
          </div>
          {/* Add on 3 */}
          <div className="px-4  mx-auto max-w-5xl lg:px-6 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-6 lg:space-y-0">
            <div className="flex flex-col py-5 px-10 border-x-4 border-y-8 border-stone-400 mx-auto text-center text-gray-900 bg-white rounded-lg shadow ">
              <h3 className="mb-4 text-2xl font-semibold"> CUSTOM</h3>
              <h3 className="mb-4 text-xl font-semibold whitespace-nowrap">
                We Design for You
              </h3>

              <div className="flex justify-center items-baseline mb-4">
                <span className="mr-2 text-3xl font-extrabold whitespace-nowrap">
                  + RM39
                </span>
              </div>
              <Button
                href="#"
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Preview
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default PakejPage;
