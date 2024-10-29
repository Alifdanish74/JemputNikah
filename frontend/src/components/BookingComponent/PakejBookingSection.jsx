// import React from 'react'
import Paris from "../../assets/paris.png";
import { FaBookOpen, FaMusic, FaRegCalendarAlt } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { MdOutlineLocalPhone } from "react-icons/md";
import { PiClockCountdownBold } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import { TbAirBalloon } from "react-icons/tb";
import { FcPlus } from "react-icons/fc";
import { Button } from "flowbite-react";

// eslint-disable-next-line react/prop-types
function PakejSection({ onPakejChange, handleFormDataChange }) {
  return (
    <div className="my-8">
      <h1 className="mb-4 text-xl font-extrabold tracking-tight text-gray-900 sm:mb-6 leding-tight ">
        Sila Pilih Pakej
      </h1>
      {/* Pakej Bali */}
      <div className="bg-white rounded-lg border shadow my-4 lg:grid lg:grid-cols-3 ">
        <div className="col-span-2 m-3">
          <h2 className="mb-1 text-2xl font-bold text-gray-900 ">BALI ❤️</h2>

          <div className=" mt-4 lg:mt-6 ">
            <ul
              role="list"
              className=" gap-y-3 grid grid-cols-4  justify-center"
            >
              <div className=" flex mx-auto">
                <li className="flex items-center  gap-2">
                  <MdOutlineLocalPhone />
                  <span>Contact</span>
                </li>
              </div>
              <div className=" flex mx-auto">
                <li className="flex items-center justify-left mx-auto gap-2">
                  <SlLocationPin />
                  <span>Location</span>
                </li>
              </div>
              <div className=" flex mx-auto">
                <li className="flex items-center justify-left mx-auto gap-2">
                  <FaRegCalendarAlt />
                  <span>Calendar</span>
                </li>
              </div>
              <div className=" flex mx-auto">
                <li className="flex items-center justify-left mx-auto gap-2">
                  <FaMusic />
                  <span>Music</span>
                </li>
              </div>
              <div className=" flex mx-auto">
                <li className="flex items-center justify-left mx-auto gap-2">
                  <FaBookOpen />
                  <span>Guestbook</span>
                </li>
              </div>
              <div className=" flex mx-auto">
                <li className="flex items-center justify-left mx-auto gap-2">
                  <GrGallery />
                  <span>Gallery</span>
                </li>
              </div>
              <div className=" flex mx-auto">
                <li className="flex items-center justify-left mx-auto gap-2">
                  <PiClockCountdownBold />
                  <span>Countdown</span>
                </li>
              </div>
            </ul>
          </div>
        </div>
        <div className="flex text-center bg-gray-50 px-6 py-2 lg:px-8 lg:py-4 ">
          <div className="self-center w-full">
            <div className="text-5xl m-4 font-extrabold text-gray-900 ">
              RM39
            </div>
            <Button
              href="#"
              size="xs"
              className="flex justify-center  text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-bue-200 font-medium rounded-lg  px-5 py-2.5 text-center"
              onClick={() => {
                handleFormDataChange("pakej", "Bali");
                handleFormDataChange("price", "39");
                onPakejChange("Bali");
              }}
            >
              Select
            </Button>
          </div>
        </div>
      </div>
      {/* Pakej Istanbul */}
      <div className="bg-white rounded-lg border shadow lg:grid lg:grid-cols-3 ">
        <div className="col-span-2 m-3">
          <div className="flex  justify-center mx-auto">
            <h3 className="mb-4 text-2xl font-bold">ISTANBUL</h3>
            <h1 className="text-3xl text-orange-600">
              <TbAirBalloon />
            </h1>
          </div>

          <div>
            <ul
              role="list"
              className=" gap-y-3 grid grid-cols-4  justify-center"
            >
              <div className=" flex mx-auto">
                <li className="flex items-center  gap-2">
                  <MdOutlineLocalPhone />
                  <span>Contact</span>
                </li>
              </div>
              <div className=" flex mx-auto">
                <li className="flex items-center justify-left mx-auto gap-2">
                  <SlLocationPin />
                  <span>Location</span>
                </li>
              </div>
              <div className=" flex mx-auto">
                <li className="flex items-center justify-left mx-auto gap-2">
                  <FaRegCalendarAlt />
                  <span>Calendar</span>
                </li>
              </div>
              <div className=" flex mx-auto">
                <li className="flex items-center justify-left mx-auto gap-2">
                  <FaMusic />
                  <span>Music</span>
                </li>
              </div>
              <div className=" flex mx-auto">
                <li className="flex items-center justify-left mx-auto gap-2">
                  <FaBookOpen />
                  <span>Guestbook</span>
                </li>
              </div>
              <div className=" flex mx-auto">
                <li className="flex items-center justify-left mx-auto gap-2">
                  <GrGallery />
                  <span>Gallery</span>
                </li>
              </div>
              <div className=" flex mx-auto">
                <li className="flex items-center justify-left mx-auto gap-2">
                  <PiClockCountdownBold />
                  <span>Countdown</span>
                </li>
              </div>
            </ul>

            <ul
              role="list"
              className=" gap-y-4 mt-3 grid grid-cols-2 justify-center"
            >
              <li className="flex items-center justify-left mx-auto gap-2 font-bold underline">
                <span className="text-lg flex mx-auto items-center justify-center">
                  {" "}
                  <FcPlus />
                  &nbsp;RSVP
                </span>
              </li>
              <li className="flex items-center justify-left mx-auto gap-2 font-bold underline">
                <span className="text-lg flex mx-auto items-center justify-center">
                  {" "}
                  <FcPlus />
                  &nbsp;Money Gift
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex text-center bg-gray-50 px-6 py-2 lg:px-8 lg:py-4 ">
          <div className="self-center w-full">
            <div className="text-5xl m-4 font-extrabold text-gray-900 ">
              RM59
            </div>
            <Button
              href="#"
              size="xs"
              className="flex justify-center  text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-bue-200 font-medium rounded-lg  px-5 py-2.5 text-center"
              onClick={() => {
                handleFormDataChange("pakej", "Istanbul");
                handleFormDataChange("price", "59");
                onPakejChange("Istanbul");
              }}
            >
              Select
            </Button>
          </div>
        </div>
      </div>
      {/* Pakej Paris */}
      <div className="bg-white my-4 rounded-lg border shadow lg:grid lg:grid-cols-3 ">
        <div className="col-span-2 my-3">
          <div className="flex  justify-center mx-auto">
            <h3 className="mb-4 text-2xl items-end font-bold">PARIS</h3>
            <img className="w-8 h-8 inset-y-3 " src={Paris} alt="" />
          </div>

          <div>
            <ul
              role="list"
              className=" gap-y-3 grid grid-cols-4  justify-center"
            >
              <div className=" flex mx-auto">
                <li className="flex items-center  gap-2">
                  <MdOutlineLocalPhone />
                  <span>Contact</span>
                </li>
              </div>
              <div className=" flex mx-auto">
                <li className="flex items-center justify-left mx-auto gap-2">
                  <SlLocationPin />
                  <span>Location</span>
                </li>
              </div>
              <div className=" flex mx-auto">
                <li className="flex items-center justify-left mx-auto gap-2">
                  <FaRegCalendarAlt />
                  <span>Calendar</span>
                </li>
              </div>
              <div className=" flex mx-auto">
                <li className="flex items-center justify-left mx-auto gap-2">
                  <FaMusic />
                  <span>Music</span>
                </li>
              </div>
              <div className=" flex mx-auto">
                <li className="flex items-center justify-left mx-auto gap-2">
                  <FaBookOpen />
                  <span>Guestbook</span>
                </li>
              </div>
              <div className=" flex mx-auto">
                <li className="flex items-center justify-left mx-auto gap-2">
                  <GrGallery />
                  <span>Gallery</span>
                </li>
              </div>
              <div className=" flex mx-auto">
                <li className="flex items-center justify-left mx-auto gap-2">
                  <PiClockCountdownBold />
                  <span>Countdown</span>
                </li>
              </div>
            </ul>

            <ul
              role="list"
              className=" gap-y-4 mt-3 grid grid-cols-4 justify-evenly"
            >
              <li className="flex items-center justify-left mx-auto gap-2 font-bold underline">
                <span className="text-lg flex mx-auto items-center justify-center">
                  {" "}
                  <FcPlus />
                  &nbsp;RSVP
                </span>
              </li>
              <li className="flex items-center justify-left mx-auto gap-2 font-bold underline">
                <span className="text-lg flex mx-auto items-center justify-center">
                  {" "}
                  <FcPlus />
                  &nbsp;Money Gift
                </span>
              </li>
              <li className="flex items-center justify-left mx-auto gap-2 font-bold underline">
                <span className="text-lg flex mx-auto items-center justify-center">
                  {" "}
                  <FcPlus />
                  &nbsp;Wishlist (10)
                </span>
              </li>
              <li className="flex items-center justify-left mx-auto gap-2 font-bold underline">
                <span className="text-lg flex mx-auto items-center justify-center">
                  {" "}
                  <FcPlus />
                  &nbsp;PDF Version
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex text-center bg-gray-50 px-6 py-2 lg:px-8 lg:py-4 ">
          <div className="self-center w-full">
            <div className="text-5xl m-4 font-extrabold text-gray-900 ">
              RM79
            </div>
            <Button
              href="#"
              size="xs"
              className="flex justify-center  text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-bue-200 font-medium rounded-lg  px-5 py-2.5 text-center"
              onClick={() => {
                handleFormDataChange("pakej", "Paris");
                handleFormDataChange("price", "79");
                onPakejChange("Paris");
              }}
            >
              Select
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PakejSection;
