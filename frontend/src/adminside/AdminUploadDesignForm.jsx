import { useState, useEffect } from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa";

import { MdCancel } from "react-icons/md";
import { toast } from "react-toastify";
import { Button } from "flowbite-react";
import { HexColorPicker } from "react-colorful";

function AdminUploadDesignForm() {
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageBg, setImageBg] = useState(null); // To store preview of design image
  const [imageBgUrl, setImageBgUrl] = useState(null); // To store preview of design image
  const [imagepreview, setImagePreview] = useState(null);
  const [imagepreviewUrl, setImagePreviewUrl] = useState(null); // To store preview of preview image
  const [designName, setDesignName] = useState("");
  const [particleColor, setParticleColor] = useState("#f9e4cc");
  const [fontColor, setFontColor] = useState("#000000");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const categories = ["Floral", "Luxury", "Tradisional", "Khat", "Minimalist"];

  useEffect(() => {
    if (category) {
      fetchDesignCount(category);
    }
  }, [category]);

  // Function to fetch the count of designs in the selected category
  const fetchDesignCount = async (selectedCategory) => {
    try {
      const response = await axios.get(`/api/admin/count/${selectedCategory}`);
      const count = response.data.count;

      // Generate the design name based on the count
      const nextNumber = (count + 1).toString().padStart(3, "0");
      setDesignName(`${selectedCategory}${nextNumber}`);
    } catch (error) {
      console.error("Error fetching design count", error);
      setErrorMessage("Error fetching design count");
    }
  };

  // Handle design image file selection and preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file)); // Generate the image preview URL
    }
  };
  // Handle design image bg file selection and preview
  const handleImageBgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageBg(file);
      setImageBgUrl(URL.createObjectURL(file)); // Generate the image preview URL
    }
  };

  // Handle preview image file selection and preview
  const handleimagepreviewChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(file);
      setImagePreviewUrl(URL.createObjectURL(file)); // Generate the image preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("designName", designName);
    formData.append("category", category);
    formData.append("image", image);
    formData.append("imagebg", imageBg);
    formData.append("imagepreview", imagepreview);
    formData.append("particleColor", particleColor);
    formData.append("fontColor", fontColor);

    try {
      const response = await axios.post("/api/admin/upload-design", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        setSuccessMessage("Design uploaded successfully!");
        toast.success("Design uploaded successfully!", {
          autoClose: 2000,
          position: "top-center",
          closeOnClick: true,
        });
        setErrorMessage("");
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      setErrorMessage("Error uploading design");
      toast.error("Error uploading design", {
        autoClose: 2000,
        position: "top-center",
        closeOnClick: true,
      });
      setSuccessMessage("");
      console.log(error);
    }

    // Reset form
    setCategory("");
    setImage(null);
    setImageUrl(null);
    setImageBg(null);
    setImageBgUrl(null);
    setImagePreview(null);
    setImagePreviewUrl(null);
    setDesignName("");
  };

  function removeImage() {
    setImageUrl(null);
  }
  function removeImageBg() {
    setImageBgUrl(null);
  }
  function removeimagepreview() {
    setImagePreviewUrl(null);
  }

  return (
    <div className="w-[90%] max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
        Upload Wedding Card Design
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Design Name (auto-generated) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Design Name
            </label>
            <input
              type="text"
              value={designName}
              disabled
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
            />
          </div>

          {/* Category Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Upload Design Image */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload Design Image
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
            {imageUrl && (
              <div className="mt-4">
                <Button className="mx-auto" onClick={removeImage}>
                  <MdCancel />
                </Button>
                <img
                  src={imageUrl}
                  alt="Design Preview"
                  className="w-60 mx-auto h-96"
                />
              </div>
            )}
          </div>

          {/* Upload Background Image */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload Background Image
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="file"
                accept="image/*"
                name="image"
                onChange={handleImageBgChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
              />
              <FaUpload className="text-indigo-600 text-xl" />
            </div>
            {imageBgUrl && (
              <div className="mt-4">
                <Button className="mx-auto" onClick={removeImageBg}>
                  <MdCancel />
                </Button>
                <img
                  src={imageBgUrl}
                  alt="Background Preview"
                  className="w-60 mx-auto h-96"
                />
              </div>
            )}
          </div>

          {/* Upload Preview Image */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload Preview Image
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="file"
                accept="image/*"
                name="imagepreview"
                onChange={handleimagepreviewChange}
                required
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
              />
              <FaUpload className="text-indigo-600 text-xl" />
            </div>
            {imagepreviewUrl && (
              <div className="mt-4">
                <Button className="mx-auto" onClick={removeimagepreview}>
                  <MdCancel />
                </Button>
                <img
                  src={imagepreviewUrl}
                  alt="Preview Image"
                  className="w-60 mx-auto h-96"
                />
              </div>
            )}
          </div>

          {/* Color Picker */}
          <div className="flex gap-5 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Particle Color
              </label>
              <HexColorPicker
                color={particleColor}
                onChange={setParticleColor}
                className="mt-1 w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Select Font Color
              </label>
              <HexColorPicker
                color={fontColor}
                onChange={setFontColor}
                className="mt-1 w-full"
              />
            </div>
          </div>
        </div>

        {/* Success/Error Messages */}
        {successMessage && (
          <p className="text-green-600 mb-4 text-center">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-600 mb-4 text-center">{errorMessage}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Upload Design
        </button>
      </form>
    </div>
  );
}

export default AdminUploadDesignForm;
