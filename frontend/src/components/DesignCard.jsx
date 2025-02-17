/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
// import { FaRegEye } from "react-icons/fa";
// import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { Badge } from "../components/ui/badge";
// import ImageDisplay from "../../src/assets/tradisional001.png";
import mockup from "../../src/assets/phonemockupframe.png";
function DesignCard({ itemName, itemImage, itemCategory }) {
  return (

    <div className="relative mb-4 mx-auto w-full border-2 border-stone-300 bg-blue-50 rounded-lg shadow-md">
      {/* Image Container */}
      <div className="relative  h-[180px] md:h-[200px] ">
        {/* gambar design */}
        <img
          // className="absolute w-[91px] left-1/2 transform -translate-x-1/2 bottom-5 z-0"
          className="w-[90px] h-[170px] md:w-[90px] md:h-[200px] absolute left-1/2 top-1 transform -translate-x-1/2  z-0 rounded-2xl"
          src={itemImage}
          alt="item"
          loading="lazy" 
        />
        {/* Gambar phone */}
        <img
          className="absolute w-[100px] h-[180px] md:w-[100px] md:h-[200px] top-1 left-1/2 transform -translate-x-1/2 bottom-5 z-0"
          // className="w-[200px] h-[200px] absolute left-1/2 transform -translate-x-1/2  z-0"
          src={mockup}
          alt="item"
          loading="lazy" 
        />
      </div>

      <h1 className="text-lg sm:text-xl font-bold pt-2 leading-tight text-gray-900 text-center">
        {itemName}
      </h1>

      <div className="hidden">
        <Badge variant="default">{itemCategory}</Badge>
      </div>

      {/* Buttons Container */}
      <div className="flex mt-1 justify-center ">
        <a
          className="flex mx-auto items-center md:gap-2 rounded-l-lg border border-r-gray-200 border-gray-200 justify-center w-full text-center bg-white hover:bg-gray-300 text-blue-600 text-sm font-medium py-2  focus:outline-none focus:ring-2 focus:ring-blue-300"
          href={`/preview/${itemName}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* <FaRegEye /> */}
          Preview
        </a>
        <Link
          className="flex mx-auto items-center md:gap-2 rounded-r-lg border border-l-gray-200 border-gray-200 justify-center w-full text-center bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium py-2  focus:outline-none focus:ring-2 focus:ring-blue-300"
          type="button"
          to={`/kad-digital/tempah/${itemName}`}
        >
          {/* <MdOutlineShoppingCartCheckout /> */}
          Tempah
        </Link>
      </div>
    </div>
  );
}

export default DesignCard;
