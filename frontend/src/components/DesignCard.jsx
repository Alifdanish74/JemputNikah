/* eslint-disable react/prop-types */
// import React from "react";

import { Link } from "react-router-dom";

function DesignCard({  itemName, itemImage, itemCategory }) {
  return (
    <div>
      <div className=" sm:max-w-xs mx-auto">
        <h5 className="text-lg md:text-xl mb-2 font-semibold tracking-tight text-gray-900 text-center">
          {itemName}
        </h5>
        <h5 className="hidden text-lg md:text-xl mb-2 font-semibold tracking-tight text-gray-900 text-center">
          {itemCategory}
        </h5>
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg">
          <img
            className="mx-auto w-2/4 rounded-t-lg object-cover my-2"
            src={itemImage}
            // src={"http://localhost:4000/uploads/PreviewFloral001.png" }
            alt="product image"
          />

          <div className="grid grid-cols-2 rounded-lg  bg-gray-50">
            <div className="border-r py-2 w-full  text-sm rounded-bl-xl border-black hover:bg-black hover:text-white">
              <a href={`/preview/${itemName}`} target="_blank" className="">
                Preview
              </a>
            </div>
            <Link to={`/kad-digital/tempah/${itemName}`} className="">
              <div className="border-l py-2 rounded-br-xl text-sm text-white border-black bg-sky-500  hover:bg-black ">
                Tempah
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DesignCard;
