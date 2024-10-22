import { Button } from "flowbite-react";
import { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

// eslint-disable-next-line react/prop-types
function MoneyGiftSection({ onPrevious, onNext }) {
  const [imageUrl, setImageUrl] = useState(null); // To store preview of design image
  const [image, setImage] = useState(null);

  // Handle design image file selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file)); // Generate the image preview URL
    }
  };

  function removeImage() {
    setImageUrl(null);
  }

  console.log(image)
  return (
    <div className="my-8">
      <h1 className="mb-4 text-xl font-extrabold tracking-tight text-gray-900 sm:mb-6 leding-tight ">
        Maklumat Money Gift (tidak wajib)
      </h1>
      <form action="#">
        <div className="grid gap-5 my-6 sm:grid-cols-2">
          {/* Pihak Majlis */}
          <div>
            <label
              htmlFor="pihakmajlis"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Nama Bank
            </label>
            <select
              id="pihakmajlis"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5   "
            >
              <option selected="">Pilih bank</option>
              <option value="Maybank">Maybank</option>
              <option value="CIMB">CIMB</option>
              <option value="UOB">UOB</option>
              <option value="AmBank">AmBank</option>
            </select>
          </div>

          {/* Nombor akaun */}
          <div>
            <label
              htmlFor="accountnumber"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Nombor akaun bank
            </label>
            <input
              type="text"
              name="accountnumber"
              id="accountnumber"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5  "
              placeholder=""
              required=""
            />
          </div>

          {/* Gambar pasangan */}

          <div className="items-center justify-start">
            <label className="block text-sm font-medium text-gray-700">
              Kod QR
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImageChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
              />
              <FaUpload className="text-indigo-600 text-xl" />
            </div>
          </div>
          {/* Image Preview */}
          {imageUrl && (
            <div className=" flex items-center justify-end">
              <Button className="mx-auto" onClick={removeImage}>
                <MdCancel />
              </Button>
              <img
                src={imageUrl}
                alt="Design Preview"
                className="w-60 mx-auto h-60"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2">
          <div className="flex space-x-3 justify-start">
            <button
              type="button"
              onClick={onPrevious} // Call the onNext prop when the button is clicked
              className="w-1/2 text-white bg-gray-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 sm:py-3.5 text-center"
            >
              Previous: Majlis
            </button>
          </div>
          <div className="flex space-x-3 justify-end">
            <button
              type="button"
              onClick={onNext} // Call the onNext prop when the button is clicked
              className="w-1/2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 sm:py-3.5 text-center"
            >
              Next: RSVP
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MoneyGiftSection;
