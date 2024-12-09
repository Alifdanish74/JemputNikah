/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function DesignCard({ itemName, itemImage, itemCategory }) {
  return (
    <div className="sm:max-w-xs mx-auto w-full px-4">
      {/* Item Name */}
      <h5 className="text-base sm:text-lg md:text-xl mb-2 font-semibold tracking-tight text-gray-900 text-center">
        {itemName}
      </h5>
      {/* Item Category */}
      <h5 className="hidden sm:block text-sm sm:text-base md:text-lg mb-2 font-medium tracking-tight text-gray-500 text-center">
        {itemCategory}
      </h5>
      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg flex flex-col justify-between max-h-[240px]">
        {/* Image */}
        <div className="flex items-center justify-center max-h-[190px]">
          <img
            className="w-3/4 sm:w-2/4  rounded-t-lg"
            src={itemImage}
            alt="product image"
          />
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 rounded-lg bg-gray-50">
          <a
            href={`/preview/${itemName}`}
            target="_blank"
            className="border-r py-2 text-sm sm:text-base text-center border-black rounded-bl-xl hover:bg-black hover:text-white"
          >
            Preview
          </a>
          <Link
            to={`/kad-digital/tempah/${itemName}`}
            className="border-l py-2 text-sm sm:text-base text-center text-white rounded-br-xl border-black bg-sky-500 hover:bg-black"
          >
            Tempah
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DesignCard;
