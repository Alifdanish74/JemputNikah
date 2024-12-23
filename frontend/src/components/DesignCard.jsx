/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { Badge } from "../components/ui/badge";
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
    <div className="mb-4 sm:max-w-xs">
      <div className="rounded-lg border mx-auto border-gray-200 bg-white p-3 pt-0 shadow-xl">
        <div className="hidden">

        <Badge variant="default">{itemCategory}</Badge>
        </div>
        <div className="flex mx-auto mt-2  min-h-[220px] justify-center items-center">
          <img
            className="w-3/4 md:w-7/12 min-h-[180px] rounded-t-lg"
            src={itemImage}
            alt="product image"
          />
        </div>

        <h1 className="text-2xl font-bold leading-tight text-gray-900">
          {itemName}
        </h1>

        {/* Responsive Button Container */}
        <div className="mt-1 flex flex-col sm:flex-row items-center justify-between gap-4">
          <a
            type="button"
            href={`/preview/${itemName}`}
            target="_blank"
            className="inline-flex w-full sm:w-auto items-center gap-x-2 justify-center rounded-lg border-2 bg-white px-5 py-2.5 text-xs font-medium text-blue-600 hover:bg-blue-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-primary-300"
          >
            <FaRegEye />
            Preview
          </a>

          <Link
            type="button"
            to={`/kad-digital/tempah/${itemName}`}
            className="inline-flex w-full sm:w-auto items-center gap-x-2 justify-center rounded-lg bg-blue-700 px-5 py-2.5 text-xs font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-primary-300"
          >
            <MdOutlineShoppingCartCheckout />
            Tempah
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DesignCard;
