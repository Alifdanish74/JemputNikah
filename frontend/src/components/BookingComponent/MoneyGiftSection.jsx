/* eslint-disable react/prop-types */
// MoneyGiftSection.jsx
import { Button } from "flowbite-react";
import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import { MdCancel } from "react-icons/md";

function MoneyGiftSection({
  onPrevious,
  onNext,
  formData,
  handleFormDataChange,
  handleQrCodeFileChange
}) {
  const [imageUrl, setImageUrl] = useState(null);

// MoneyGiftSection.jsx
const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setImageUrl(URL.createObjectURL(file)); // Generate preview URL
    handleQrCodeFileChange(file); // Pass file to parent component as `File` object
  }
};



  const removeImage = () => {
    setImageUrl(null);
    handleQrCodeFileChange(null); // Clear file in parent
  };

  return (
    <div className="my-8">
      <h1 className="mb-4 text-xl font-extrabold tracking-tight text-gray-900 sm:mb-6 leading-tight">
        Maklumat Money Gift (tidak wajib)
      </h1>
      <form>
        {/* Bank name input */}
        <div className="grid gap-5 my-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="pihakmajlis"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nama Bank
            </label>
            <select
              id="pihakmajlis"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={formData.bankName}
              onChange={(e) => handleFormDataChange("bankName", e.target.value)}
            >
              <option value="">Pilih bank</option>
              <option value="Maybank">Maybank</option>
              <option value="CIMB">CIMB</option>
              <option value="UOB">UOB</option>
              <option value="AmBank">AmBank</option>
            </select>
          </div>

          {/* Account number input */}
          <div>
            <label
              htmlFor="accountnumber"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nombor akaun bank
            </label>
            <input
              type="text"
              id="accountnumber"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
              value={formData.accountNumber}
              onChange={(e) =>
                handleFormDataChange("accountNumber", e.target.value)
              }
            />
          </div>

          {/* QR Code image upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Kod QR
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
              />
              <FaUpload className="text-indigo-600 text-xl" />
            </div>
          </div>

          {/* QR Code image preview */}
          {imageUrl && (
            <div className="flex items-center justify-end">
              <Button onClick={removeImage}>
                <MdCancel />
              </Button>
              <img
                src={imageUrl}
                alt="QR Code Preview"
                className="w-60 h-60 mx-auto"
              />
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="grid grid-cols-2">
          <div className="flex space-x-3 justify-start">
            <button
              type="button"
              onClick={onPrevious}
              className="text-white bg-gray-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-3xl px-5 py-2.5 sm:py-3.5 text-center"
            >
              <HiOutlineArrowNarrowLeft />
            </button>
          </div>
          <div className="flex space-x-3 justify-end">
            <button
              type="button"
              onClick={onNext}
              className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-3xl px-5 py-2.5 sm:py-3.5 text-center"
            >
              <HiOutlineArrowNarrowRight />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MoneyGiftSection;
