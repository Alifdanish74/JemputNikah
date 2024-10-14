// import React from "react";
import { TbAirBalloon } from "react-icons/tb";
import Paris from "../assets/paris.png";
import { Button } from "@headlessui/react";

import { IoReceiptOutline } from "react-icons/io5";
import { BiMoneyWithdraw } from "react-icons/bi";
import { PiClockCountdownBold } from "react-icons/pi";
import { GrGallery } from "react-icons/gr";
import { SlLocationPin } from "react-icons/sl";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaMusic } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";
import { MdOutlineLocalPhone } from "react-icons/md";
import { CiGift } from "react-icons/ci";
import { FaFilePdf } from "react-icons/fa6";

function PakejSection() {
  return (
    <>
      <section className="bg-blue-50">
        <div className="py-8 px-4 mx-auto max-w-5xl lg:py-16 lg:px-6">
          <div className="max-w-5xl mx-auto text-center pb-10">
            <h2 className="text-3xl font-bold text-gray-800">
              Pakej Yang Ditawarkan
            </h2>
            <p className="text-lg text-gray-600 mt-4">
              Dapatkan kad kahwin digital yang terbaik untuk majlis terindah
              anda.
            </p>
          </div>

          <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-6 lg:space-y-0">
            {/* Pakej 1 */}
            <div className="flex flex-col py-5 px-20 border-x-4 border-y-8 border-purple-400 mx-auto text-center text-gray-900 bg-white rounded-lg shadow ">
              <h3 className="mb-4 text-2xl font-semibold"> BALI ❤️</h3>

              <div className="flex justify-center items-baseline mb-4">
                <span className="mr-2 text-5xl font-extrabold">RM39</span>
              </div>

              <ul role="list" className="mb-8 space-y-2 text-left">
                <li className="flex items-center justify-left mx-auto gap-2">
                  <MdOutlineLocalPhone />
                  <span>Contact</span>
                </li>
                <li className="flex items-center justify-left mx-auto gap-2">
                  <SlLocationPin />
                  <span>Location</span>
                </li>
                <li className="flex items-center justify-left mx-auto gap-2">
                  <FaRegCalendarAlt />
                  <span>Calendar</span>
                </li>
                <li className="flex items-center justify-left mx-auto gap-2">
                  <FaMusic />
                  <span>Music</span>
                </li>
                <li className="flex items-center justify-left mx-auto gap-2">
                  <FaBookOpen />
                  <span>Guestbook</span>
                </li>
                <li className="flex items-center justify-left mx-auto gap-2">
                  <GrGallery />
                  <span>Gallery</span>
                </li>
                <li className="flex items-center justify-left mx-auto gap-2">
                  <PiClockCountdownBold />
                  <span>Countdown</span>
                </li>
              </ul>
              <Button
                href="#"
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Preview
              </Button>
            </div>
            {/* Pakej 2 */}
            <div className="flex flex-col py-5 px-20  mx-auto text-center border-x-4 border-y-8 border-red-400 text-gray-900 bg-white rounded-lg  shadow ">
              <div className="flex mx-auto">
                <h3 className="mb-4 text-2xl font-semibold">ISTANBUL</h3>
                <h1 className="text-3xl text-orange-600">
                  <TbAirBalloon />
                </h1>
              </div>

              <div className="flex justify-center items-baseline mb-4">
                <span className="mr-2 text-5xl font-extrabold">RM59</span>
              </div>

              <ul role="list" className="mb-8 space-y-2 text-left">
                <li className="flex items-center justify-left mx-auto gap-2">
                  <MdOutlineLocalPhone />
                  <span>Contact</span>
                </li>
                <li className="flex items-center justify-left mx-auto gap-2">
                  <SlLocationPin />
                  <span>Location</span>
                </li>
                <li className="flex items-center justify-left mx-auto gap-2">
                  <FaRegCalendarAlt />
                  <span>Calendar</span>
                </li>
                <li className="flex items-center justify-left mx-auto gap-2">
                  <FaMusic />
                  <span>Music</span>
                </li>
                <li className="flex items-center justify-left mx-auto gap-2">
                  <FaBookOpen />
                  <span>Guestbook</span>
                </li>
                <li className="flex items-center justify-left mx-auto gap-2">
                  <GrGallery />
                  <span>Gallery</span>
                </li>
                <li className="flex items-center justify-left mx-auto gap-2">
                  <PiClockCountdownBold />
                  <span>Countdown</span>
                </li>

                <ul className="text-lg space-y-2">
                  <h3 className="font-semibold underline text-center text-gray-600">
                    Extra Features
                  </h3>

                  <li className="flex items-center justify-left mx-auto gap-2 font-bold underline">
                    <IoReceiptOutline />
                    <span>RSVP</span>
                  </li>
                  <li className="flex items-center justify-left mx-auto gap-2 font-bold underline">
                    <BiMoneyWithdraw />
                    <span>Money Gift</span>
                  </li>
                </ul>
              </ul>
              <Button
                href="#"
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Preview
              </Button>
            </div>
            {/* Pakej 3 */}
            <div className="flex flex-col py-5 px-20 border-x-4 border-y-8 border-yellow-400  mx-auto text-center text-gray-900 bg-white rounded-lg shadow ">
              <div className="flex item mx-auto gap-1">
                <h3 className="mb-4 text-2xl font-semibold">PARIS</h3>
                <img className="w-8 h-8 mx-auto" src={Paris} alt="" />
              </div>

              <div className="flex justify-center items-baseline mb-4">
                <span className="mr-2 text-5xl font-extrabold">RM79</span>
              </div>

              <ul role="list" className="mb-8 space-y-2 text-left">
                <li className="flex items-center justify-left mx-auto gap-2">
                  <MdOutlineLocalPhone />
                  <span>Contact</span>
                </li>
                <li className="flex items-center justify-left mx-auto gap-2">
                  <SlLocationPin />
                  <span>Location</span>
                </li>
                <li className="flex items-center justify-left mx-auto gap-2">
                  <FaRegCalendarAlt />
                  <span>Calendar</span>
                </li>
                <li className="flex items-center justify-left mx-auto gap-2">
                  <FaMusic />
                  <span>Music</span>
                </li>
                <li className="flex items-center justify-left mx-auto gap-2">
                  <FaBookOpen />
                  <span>Guestbook</span>
                </li>
                <li className="flex items-center justify-left mx-auto gap-2">
                  <GrGallery />
                  <span>Gallery</span>
                </li>
                <li className="flex items-center justify-left mx-auto gap-2">
                  <PiClockCountdownBold />
                  <span>Countdown</span>
                </li>
                <ul className="text-lg space-y-2">
                  <h3 className="font-semibold underline  text-center text-gray-600">
                    Extra Features
                  </h3>

                  <li className="flex items-center  justify-left mx-auto gap-2 font-bold underline">
                    <IoReceiptOutline />
                    <span>RSVP</span>
                  </li>
                  <li className="flex items-center justify-left mx-auto gap-2 font-bold underline">
                    <BiMoneyWithdraw />
                    <span>Money Gift</span>
                  </li>
                  <li className="flex items-center justify-left mx-auto gap-2 font-bold underline">
                    <CiGift />
                    <span>Wishlist (10)</span>
                  </li>
                  <li className="flex items-center justify-left mx-auto gap-2 font-bold underline">
                    <FaFilePdf />
                    <span>PDF version</span>
                  </li>
                </ul>
              </ul>
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

export default PakejSection;
