/* eslint-disable react/prop-types */
import { FiLink } from "react-icons/fi";
import { FaRegBookmark } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";

const ProductCard = ({
  imageSrc,
  title,
  itemLink,
  onConfirmBook,
  isBooked,
  number,
}) => {
  return (
    <div className="flex items-center border rounded-lg p-4 my-2 bg-white shadow-md">
      <div className="flex-shrink-0 mr-4">
        <img
          src={imageSrc}
          alt="Product Image"
          width={80}
          height={80}
          className="rounded"
        />
      </div>
      <div className="flex-grow">
        <h3 className="text-base text-balance text-center font-normal text-gray-800">
          {number}) {title}
        </h3>
        <div className="mt-4 flex space-x-4 text-sm font-semibold justify-center items-center">
          {!isBooked ? (
            <>
              <button className="flex items-center bg-gray-100 text-gray-800 px-3 py-2 rounded hover:bg-green-300 transition-colors">
                <a
                  href={itemLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <FiLink className="mr-2" />
                  Link
                </a>
              </button>
              <button
                onClick={() => onConfirmBook(title, imageSrc)} // Pass title and imageSrc
                className="flex items-center bg-gray-100 text-gray-800 px-3 py-2 rounded hover:bg-green-300 transition-colors"
              >
                <FaRegBookmark className="mr-2" />
                Tempah
              </button>
            </>
          ) : (
            <button className="flex items-center bg-green-400 text-gray-800 px-3 py-2 rounded hover:bg-gray-200 transition-colors">
              <a
                href={itemLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                <SiTicktick className="mr-2" />
                Telah Ditempah
              </a>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
