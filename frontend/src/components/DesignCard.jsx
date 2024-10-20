/* eslint-disable react/prop-types */
// import React from "react";

function DesignCard({key, itemName, itemImage, itemCategory}) {
  return (
    <div>
      <div key={key} className=" sm:max-w-xs mx-auto">
        <h5 className="text-lg md:text-xl mb-2 font-semibold tracking-tight text-gray-900 text-center">
          {itemName}
        </h5>
        <h5 className="hidden text-lg md:text-xl mb-2 font-semibold tracking-tight text-gray-900 text-center">
          {itemCategory}
        </h5>
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg">
          <a href="#">
            <img
              className="mx-auto w-2/4 rounded-t-lg object-cover"
              src={"http://localhost:4000/" + itemImage}
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
            <div className="border-r py-2 w-full  text-sm rounded-bl-xl border-black hover:bg-black hover:text-white">
              <a href="" className="">
                Preview
              </a>
            </div>
            <div className="border-l py-2 rounded-br-xl text-sm text-white border-black bg-sky-500  hover:bg-black ">
              <a href="" className="">
                Tempah
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesignCard;
