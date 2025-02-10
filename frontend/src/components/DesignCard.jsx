/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
// import { FaRegEye } from "react-icons/fa";
// import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { Badge } from "../components/ui/badge";
// import ImageDisplay from "../../src/assets/tradisional001.png";
import mockup from "../../src/assets/phonemockupframe.png";
function DesignCard({ itemName, itemImage, itemCategory }) {
  return (
    // <div className="sm:max-w-xs mx-auto w-full px-4">
    //   {/* Item Name */}
    //   <h5 className="text-base sm:text-lg md:text-xl font-semibold tracking-tight text-gray-900 text-center">
    //     {itemName}
    //   </h5>
    //   {/* Item Category */}
    //   <h5 className="hidden sm:block text-sm sm:text-base md:text-lg font-medium tracking-tight text-gray-500 text-center">
    //     {itemCategory}
    //   </h5>
    //   {/* Card */}
    //   <div className="bg-white border border-gray-200 rounded-2xl shadow-lg flex flex-col justify-between max-h-[240px] min-w-[120px]">
    //     {/* Image */}
    //     <div className="flex items-center justify-center sm:max-h-[170px] min-h-[170px]">
    //       <img
    //         className="w-3/4 md:w-2/4 sm:h-[160px] rounded-t-lg"
    //         src={itemImage}
    //         alt="product image"
    //       />
    //     </div>

    //     {/* Buttons */}
    //     <div className="grid grid-cols-2 rounded-lg bg-gray-50">
    //       <a
    //         href={`/preview/${itemName}`}
    //         target="_blank"
    //         className="border-r py-2 text-sm sm:text-base text-center border-black rounded-bl-xl hover:bg-black hover:text-white"
    //       >
    //         Preview
    //       </a>
    //       <Link
    //         to={`/kad-digital/tempah/${itemName}`}
    //         className="border-l py-2 text-sm sm:text-base text-center text-white rounded-br-xl border-black bg-sky-500 hover:bg-black"
    //       >
    //         Tempah
    //       </Link>
    //     </div>
    //   </div>

    // </div>
    // <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
    // ----------------------------------------------------------------------------------------------
    // <div className="mb-4 sm:max-w-xs sm:min-w-xs">
    //   <div className="rounded-lg border mx-auto border-gray-200 bg-white p-3 pt-0 shadow-xl">
    //     <div className="hidden">
    //       <Badge variant="default">{itemCategory}</Badge>
    //     </div>

    //     {/* Responsive Image Container */}
    //     <div className="flex mx-auto mt-2 h-[180px] sm:h-[220px] justify-center items-center">
    //       <img
    //         className="w-3/4 sm:w-2/4 md:w-7/12 max-h-full rounded-t-lg object-contain"
    //         src={itemImage}
    //         alt="product image"
    //       />
    //     </div>

    //     <h1 className="text-lg sm:text-xl font-bold leading-tight text-gray-900 mt-2 text-center">
    //       {itemName}
    //     </h1>

    //     {/* Responsive Button Container */}
    //     <div className="mt-3 grid grid-cols-2 items-center justify-center">
    //       <div>
    //         <a
    //           type="button"
    //           href={`/preview/${itemName}`}
    //           target="_blank"
    //           className="inline-flex items-center rounded-lg border-2 bg-white px-3 py-1 text-xs sm:text-sm font-medium text-blue-600 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-primary-300"
    //         >
    //           <FaRegEye />
    //           Preview
    //         </a>
    //       </div>

    //       <div>
    //         <Link
    //           type="button"
    //           to={`/kad-digital/tempah/${itemName}`}
    //           className="inline-flex items-center rounded-lg bg-blue-700 px-3 py-1 text-xs sm:text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
    //         >
    //           <MdOutlineShoppingCartCheckout />
    //           Tempah
    //         </Link>
    //       </div>
    //     </div>

    //   </div>
    // </div>
    <div className="relative mb-4 mx-auto w-full  bg-white rounded-lg shadow-md">
      {/* Image Container */}
      <div className="relative  h-[200px] ">
        {/* gambar design */}
        <img
          // className="absolute w-[91px] left-1/2 transform -translate-x-1/2 bottom-5 z-0"
          className="w-[100px] h-[200px] absolute left-1/2 top-1 transform -translate-x-1/2  z-0 rounded-2xl"
          src={itemImage}
          alt="item"
        />
        {/* Gambar phone */}
        <img
          className="absolute w-[100px]  h-[200px] top-1 left-1/2 transform -translate-x-1/2 bottom-5 z-0"
          // className="w-[200px] h-[200px] absolute left-1/2 transform -translate-x-1/2  z-0"
          src={mockup}
          alt="item"
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
