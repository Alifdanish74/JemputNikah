import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUpload } from "react-icons/fa";
import { Button } from "flowbite-react";
import { MdCancel } from "react-icons/md";

function AdminUploadPromoForm() {
  const [promo, setPromo] = useState("");
  const [promoId, setPromoId] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch existing promo data
  useEffect(() => {
    const fetchPromo = async () => {
      try {
        const response = await axios.get("api/promos/get-promo");
        if (response.data && response.data.length > 0) {
          const promoData = response.data[0];
          setPromo(promoData.promoDescription || "");
          setImageUrl(promoData.image || null);
          setPromoId(promoData._id); // Set the promoId for updating
        }
      } catch (error) {
        console.error("Error fetching promo:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPromo();
  }, []);
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImageUrl(URL.createObjectURL(file)); // Generate the image preview URL
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("promoDescription", promo);
    if (image) {
      formData.append("image", image); // Only include the image if it's changed
    }
  
    try {
      if (promoId) {
        // If a promo exists, update it
        const response = await axios.put(`/api/promos/update-promo/${promoId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        if (response.status === 200) {
          setSuccessMessage("Promo updated successfully!");
          toast.success("Promo updated successfully!", {
            autoClose: 2000,
            position: "top-center",
            closeOnClick: true,
          });
        } else {
          throw new Error("Update failed");
        }
      } else {
        // If no promo exists, create a new one
        const response = await axios.post("/api/promos/upload-promo", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
  
        if (response.status === 201) {
          setSuccessMessage("Promo uploaded successfully!");
          toast.success("Promo uploaded successfully!", {
            autoClose: 2000,
            position: "top-center",
            closeOnClick: true,
          });
        } else {
          throw new Error("Upload failed");
        }
      }
    } catch (error) {
      setErrorMessage("Error uploading promo");
      toast.error("Error uploading promo", {
        autoClose: 2000,
        position: "top-center",
        closeOnClick: true,
      });
      console.error(error);
    }
  
    // Reset form
    setPromo("");
    setImage(null);
    setImageUrl(null);
  };
  

  const removeImage = () => {
    setImageUrl(null);
  };

  return (
    <div className="w-[90%] max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
        Upload Promotion
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading promo data...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Promo */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Promo Description
              </label>
              <textarea
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
                placeholder="Enter promo description"
              />
            </div>

            {/* Upload Promo Image */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Upload Promo Image
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="file"
                  accept="image/*"
                  name="image"
                  onChange={handleImageChange}
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
                    alt="Promo Preview"
                    className="w-60 mx-auto h-60"
                  />
                </div>
              )}
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
            Upload Promo
          </button>
        </form>
      )}
    </div>
  );
}

export default AdminUploadPromoForm;
