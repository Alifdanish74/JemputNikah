import  { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUpload } from 'react-icons/fa';

function AdminUploadForm() {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [designName, setDesignName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const categories = ['Floral', 'Luxury', 'Tradisional', 'Khat', 'Minimalist'];



  useEffect(() => {
    if (category) {
      fetchDesignCount(category);
    }
  }, [category]);

//   Function to fetch the count of designs in the selected category
  const fetchDesignCount = async (selectedCategory) => {
    try {
      const response = await axios.get(`/api/admin/count/${selectedCategory}`);
      const count = response.data.count;

      // Generate the design name based on the count
      const nextNumber = (count + 1).toString().padStart(3, '0');
      setDesignName(`${selectedCategory} ${nextNumber}`);
    } catch (error) {
      console.error('Error fetching design count', error);
      setErrorMessage('Error fetching design count');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('designName', designName);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const response = await axios.post('/api/admin/upload-design', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.status === 201) {
        setSuccessMessage('Design uploaded successfully!');
        setErrorMessage('');
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      setErrorMessage('Error uploading design');
      setSuccessMessage('');
      console.log(error);
    }
    setCategory("");
    setDescription('');
    setImage(null);
    setDesignName('');
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Upload Wedding Card Design</h2>

      <form onSubmit={handleSubmit}>
        {/* Design Name (auto-generated) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Design Name</label>
          <input
            type="text"
            value={designName}
            disabled
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Category Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg"
          >
            <option value="" disabled>Select category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
            placeholder="Enter design description"
          ></textarea>
        </div>

        {/* Upload Image */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Upload Image</label>
          <div className="flex items-center space-x-3">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
            />
            <FaUpload className="text-indigo-600 text-xl" />
          </div>
        </div>

        {successMessage && <p className="text-green-600 mb-4">{successMessage}</p>}
        {errorMessage && <p className="text-red-600 mb-4">{errorMessage}</p>}

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

export default AdminUploadForm;
