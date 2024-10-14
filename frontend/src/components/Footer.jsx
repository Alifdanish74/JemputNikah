// import React from 'react'
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";

function Footer() {
  return (
    <footer className="p-4 bg-white sm:p-6 dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="https://flowbite.com" className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-8"
                alt="FlowBite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                Jemput Nikah
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Hubungi Kami
              </h2>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-center gap-2 text-sm">
                  <CiLocationOn />
                  <span>Puchong, Malaysia</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <MdOutlineMail />
                  <span>info@jemputkahwin@gmail.com</span>
                </li>
              </ul>
            </div>
            <div className="text-left mx-auto">
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                SITE MAP
              </h2>
              <ul className="text-gray-600  ">
                <li>
                  <a href="/#" className="hover:underline ">
                    Utama
                  </a>
                </li>
                <li>
                  <a href="/#" className="hover:underline">
                    Kad Digital
                  </a>
                </li>
                <li>
                  <a href="/#" className="hover:underline">
                    Pakej
                  </a>
                </li>
                <li>
                  <a href="/#" className="hover:underline">
                    Tutorial
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Legal
              </h2>
              <ul className="text-gray-600 ">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms &amp; Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center ">
            Hak Cipta Terpelihara © 2024
            <a href="https://flowbite.com" className="hover:underline">
              Jemput Kahwin™
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
