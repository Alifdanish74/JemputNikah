/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button, Modal, TextInput } from "flowbite-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IoMdRemoveCircleOutline } from "react-icons/io";

const AddWishlistPage = () => {
  const { orderNumber } = useParams();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [wishlistItems, setWishlistItems] = useState([
    {
      productName: "",
      productUrl: "",
      productImage: null,
      bookingStatus: "Available",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // Fetch existing wishlist data
  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/wishlist/order/${orderNumber}`);
      const {
        address,
        phone,
        wishlistProduct1,
        wishlistProduct2,
        wishlistProduct3,
      } = response.data || {};

      setAddress(address || "");
      setPhone(phone || "");

      const items = [];
      if (wishlistProduct1) items.push(wishlistProduct1);
      if (wishlistProduct2) items.push(wishlistProduct2);
      if (wishlistProduct3) items.push(wishlistProduct3);

      setWishlistItems(
        items.length > 0
          ? items.map((item) => ({
              ...item,
              productImage: item.productImage || null, // Retain the URL if productImage is a URL
            }))
          : [
              {
                productName: "",
                productUrl: "",
                productImage: null,
                bookingStatus: "Available",
              },
            ]
      );
    } catch (err) {
      console.error("Error fetching wishlist data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [orderNumber]);

  // Handle input changes
  const handleWishlistChange = (index, field, value) => {
    setWishlistItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  // Add a new wishlist item
  const handleAddWishlistItem = () => {
    if (wishlistItems.length < 10) {
      setWishlistItems((prev) => [
        ...prev,
        {
          productName: "",
          productUrl: "",
          productImage: null,
          bookingStatus: "Available",
        },
      ]);
    } else {
      alert("You can only add up to 10 wishlist items.");
    }
  };

  // Delete a wishlist item
  const handleDeleteWishlistItem = async (index) => {
    const productIndex = index + 1; // 1-based index for API
    try {
      await axios.delete(`/api/wishlist/delete/${orderNumber}/${productIndex}`);
      setWishlistItems((prev) =>
        prev
          .filter((_, i) => i !== index)
          .map((item, idx) => ({
            ...item,
            id: `wishlistProduct${idx + 1}`, // Reassign consistent ids after deletion
          }))
      );
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
    }
  };

  // Remove an unsaved wishlist item
  const handleRemoveWishlistItem = (index) => {
    setWishlistItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit or update wishlist
  const handleSubmitWishlist = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("orderNumber", orderNumber);
      formData.append("address", address);
      formData.append("phone", phone);

      wishlistItems.forEach((item, index) => {
        const productIndex = index + 1; // Ensure positional mapping
        formData.append(`wishlistproductname${productIndex}`, item.productName);
        formData.append(`wishlistproducturl${productIndex}`, item.productUrl);

        if (item.productImage instanceof File) {
          formData.append(`wishlistImage${productIndex}`, item.productImage);
        } else if (typeof item.productImage === "string" && item.productImage) {
          formData.append(`existingImage${productIndex}`, item.productImage);
        }
      });

      await axios.post(`/api/wishlist/upload-wishlist`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Wishlist submitted successfully!");
      fetchWishlist(); // Refresh data after submission
    } catch (err) {
      console.error("Error submitting wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Wishlist Management
        </h1>

        <div className="flex justify-center mb-4 space-x-4">
          <Button onClick={() => setIsAddressModalOpen(true)}>
            Address Details
          </Button>
          <Button onClick={handleAddWishlistItem}>+ Add Wishlist Item</Button>
        </div>
        <div>
          <Button onClick={() => fetchWishlist()}>Refresh</Button>
        </div>
        {/* Submit Button */}
        <div className="flex justify-end mb-4">
          <Button
            color="warning"
            onClick={handleSubmitWishlist}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Wishlist"}
          </Button>
        </div>

        {/* Wishlist Form */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {wishlistItems.map((item, index) => (
            <div
              key={index}
              className={`p-4 border rounded-md shadow-md relative ${
                item.bookingStatus === "Booked" ? "bg-green-300" : "bg-white"
              }`}
            >
              <h2 className="text-lg font-semibold mb-4">
                Wishlist Item {index + 1}
              </h2>
              <div>
                <label
                  htmlFor={`wishlistproductname${index}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Name
                </label>
                <TextInput
                  id={`wishlistproductname${index}`}
                  type="text"
                  placeholder="Enter product name"
                  value={item.productName}
                  onChange={(e) =>
                    handleWishlistChange(index, "productName", e.target.value)
                  }
                />
              </div>
              <div>
                <label
                  htmlFor={`wishlistproducturl${index}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Product URL
                </label>
                <TextInput
                  id={`wishlistproducturl${index}`}
                  type="text"
                  placeholder="Enter product URL"
                  value={item.productUrl}
                  onChange={(e) =>
                    handleWishlistChange(index, "productUrl", e.target.value)
                  }
                />
              </div>
              <div>
                <label
                  htmlFor={`wishlistImage${index}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Image
                </label>
                {typeof item.productImage === "string" && item.productImage && (
                  <img
                    src={item.productImage}
                    alt="Wishlist Item"
                    className="w-40 h-auto mx-auto mb-2 rounded-md"
                  />
                )}
                <input
                  id={`wishlistImage${index}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handleWishlistChange(
                      index,
                      "productImage",
                      e.target.files[0]
                    )
                  }
                />
              </div>
              <div className="mt-4">
                <p className="text-sm">
                  <strong>Status:</strong> {item.bookingStatus}
                </p>
                {item.bookingStatus === "Booked" && (
                  <>
                    <p className="text-sm">
                      <strong>Booked By:</strong> {item.bookingName}
                    </p>
                    <p className="text-sm">
                      <strong>Phone:</strong> {item.bookingPhoneNumber}
                    </p>
                  </>
                )}
              </div>
              <div className="absolute top-2 left-2 flex space-x-2">
                <Button
                  size="xs"
                  color="failure"
                  onClick={() => handleRemoveWishlistItem(index)}
                >
                  <IoMdRemoveCircleOutline />
                </Button>
              </div>
              <div className="absolute top-2 right-2 flex space-x-2">
                <Button
                  size="xs"
                  color="failure"
                  onClick={() => handleDeleteWishlistItem(index)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Address Modal */}
        <Modal
          show={isAddressModalOpen}
          onClose={() => setIsAddressModalOpen(false)}
        >
          <Modal.Header>Update Address</Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <TextInput
                  id="address"
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <TextInput
                  id="phone"
                  type="text"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => setIsAddressModalOpen(false)}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AddWishlistPage;
