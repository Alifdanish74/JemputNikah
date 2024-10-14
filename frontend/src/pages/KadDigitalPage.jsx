// import React from 'react'

import { kadDigital } from "../assets/kad-digital-data";
import HeaderBackground from "../components/HeaderBackground";

function KadDigitalPage() {
  return (
    <div>
      {/* Header background */}
      <HeaderBackground H1="Kad Digital" P="Pilih design kad digital anda" />

      {/* Kad Digital Section */}
      <section className="bg-white py-8 antialiased md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="mx-auto max-w-5xl">
            <div className="pb-4 lg:flex lg:items-center lg:justify-between">
              <div className="mt-6 gap-4 space-y-4 sm:flex sm:items-center sm:space-y-0 lg:mt-0 lg:justify-end">
                <select
                  id="order-type"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500  sm:w-[144px]"
                >
                  <option selected>Categories</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="denied">Denied</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {kadDigital.map((item, index) => (
                <div key={index} className=" md:max-w-xs  mx-auto pb-2">
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

            <nav
              className="mt-2 flex items-center justify-center sm:mt-8"
              aria-label="Page navigation example"
            >
              <ul className="flex h-8 items-center -space-x-px text-sm">
                <li>
                  <a
                    href="#"
                    className="ms-0 flex h-8 items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
                  >
                    <span className="sr-only">Previous</span>
                    <svg
                      className="h-4 w-4 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m15 19-7-7 7-7"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
                  >
                    1
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
                  >
                    2
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    aria-current="page"
                    className="z-10 flex h-8 items-center justify-center border border-primary-300 bg-primary-50 px-3 leading-tight text-primary-600 hover:bg-primary-100 hover:text-primary-700 "
                  >
                    3
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
                  >
                    ...
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex h-8 items-center justify-center border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
                  >
                    100
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="flex h-8 items-center justify-center rounded-e-lg border border-gray-300 bg-white px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 "
                  >
                    <span className="sr-only">Next</span>
                    <svg
                      className="h-4 w-4 rtl:rotate-180"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m9 5 7 7-7 7"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-24 px-52"></section>
    </div>
  );
}

export default KadDigitalPage;
