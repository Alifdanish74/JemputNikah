/* eslint-disable react/prop-types */
// MoneyGiftSection.jsx
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
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
  handleQrCodeFileChange,
  errors,
}) {
  const [imageUrl, setImageUrl] = useState(null);
  const [toggleDisable, setToggleDisable] = useState(false);

  const handleToggle = () => {
    const newState = !toggleDisable; // Determine the new state
    setToggleDisable(newState); // Update the toggleDisable state
    handleFormDataChange("moneyGiftDisabled", newState); // Update formData dynamically
  };

  useEffect(() => {
    setToggleDisable(formData.moneyGiftDisabled || false);
  }, [formData.moneyGiftDisabled]);

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
        Maklumat Money Gift
      </h1>

      <div className="flex justify-start">
        <label className="inline-flex  items-center cursor-pointer">
          <span className="mx-3 text-sm font-medium text-gray-900">
            Disable Money Gift Feature
          </span>
          <input
            checked={toggleDisable} // Sync with toggleDisable state
            onChange={handleToggle}
            type="checkbox"
            value=""
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>

      <span className="block mt-2 text-sm">
        {toggleDisable ? (
          <div className="my-4 p-3 bg-yellow-100 border border-yellow-300 text-yellow-800 rounded-md">
            <p className="text-sm font-semibold">
              This feature is currently disabled. Please switch the toggle to
              enable and access its functionality.
            </p>
          </div>
        ) : (
          <form>
            {/* Bank name input */}
            <div className="grid gap-5 my-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="namabank"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Nama Bank
                </label>
                <select
                  id="namabank"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={formData.bankName}
                  onChange={(e) =>
                    handleFormDataChange("bankName", e.target.value)
                  }
                >
                  <option value="">Pilih bank</option>
                  <option value="Maybank Berhad">Maybank Berhad</option>
                  <option value="CIMB Bank Berhad">CIMB Bank Berhad</option>
                  <option value="CIMB Islamic Bank Berhad">
                    CIMB Islamic Bank Berhad
                  </option>
                  <option value="Bank Islam Malaysia Berhad">
                    Bank Islam Malaysia Berhad
                  </option>
                  <option value="Affin Bank Berhad">Affin Bank Berhad</option>
                  <option value="Affin Islamic Bank Berhad">
                    Affin Islamic Bank Berhad
                  </option>
                  <option value="Alliance Bank Malaysia Berhad">
                    Alliance Bank Malaysia Berhad
                  </option>
                  <option value="Alliance Islamic Bank Malaysia Berhad">
                    Alliance Islamic Bank Malaysia Berhad
                  </option>
                  <option value="Al-Rajhi Banking &amp; Investment Corporation (Malaysia) Berhad">
                    Al-Rajhi Banking &amp; Investment Corporation (Malaysia)
                    Berhad
                  </option>
                  <option value="AmBank (M) Berhad">AmBank (M) Berhad</option>

                  <option value="Bank Kerjasama Rakyat Malaysia Berhad">
                    Bank Kerjasama Rakyat Malaysia Berhad
                  </option>
                  <option value="Bank Muamalat Malaysia Berhad">
                    Bank Muamalat Malaysia Berhad
                  </option>
                  <option value="Bank of China (Malaysia) Berhad">
                    Bank of China (Malaysia) Berhad
                  </option>
                  <option value="Bank Pertanian Malaysia Berhad (Agrobank)">
                    Bank Pertanian Malaysia Berhad (Agrobank)
                  </option>
                  <option value="Bank Simpanan Nasional">
                    Bank Simpanan Nasional
                  </option>

                  <option value="Citibank Berhad">Citibank Berhad</option>
                  <option value="Hong Leong Bank Berhad">
                    Hong Leong Bank Berhad
                  </option>
                  <option value="Hong Leong Islamic Bank Berhad">
                    Hong Leong Islamic Bank Berhad
                  </option>
                  <option value="HSBC Amanah Malaysia Berhad">
                    HSBC Amanah Malaysia Berhad
                  </option>
                  <option value="HSBC Bank Malaysia Berhad">
                    HSBC Bank Malaysia Berhad
                  </option>
                  <option value="Industrial and Commercial Bank of China (Malaysia) Berhad">
                    Industrial and Commercial Bank of China (Malaysia) Berhad
                  </option>
                  <option value="Kuwait Finance House">
                    Kuwait Finance House
                  </option>

                  <option value="GX Bank">GX Bank</option>
                  <option value="MBSB Bank Berhad">MBSB Bank Berhad</option>
                  <option value="OCBC Bank (Malaysia) Berhad">
                    OCBC Bank (Malaysia) Berhad
                  </option>
                  <option value="Public Bank Berhad">Public Bank Berhad</option>
                  <option value="RHB Bank Berhad">RHB Bank Berhad</option>
                  <option value="RHB Islamic Bank Berhad">
                    RHB Islamic Bank Berhad
                  </option>
                  <option value="Standard Chartered Bank Malaysia Berhad">
                    Standard Chartered Bank Malaysia Berhad
                  </option>
                  <option value="Sumitomo Mitsui Banking Corporation Malaysia Berhad">
                    Sumitomo Mitsui Banking Corporation Malaysia Berhad
                  </option>
                  <option value="United Overseas Bank (Malaysia) Berhad">
                    United Overseas Bank (Malaysia) Berhad
                  </option>
                </select>
                {errors.bankName && (
                  <p className="text-red-500 text-sm">{errors.bankName}</p>
                )}
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
                {errors.accountNumber && (
                  <p className="text-red-500 text-sm">{errors.accountNumber}</p>
                )}
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
          </form>
        )}
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
      </span>
    </div>
  );
}

export default MoneyGiftSection;
