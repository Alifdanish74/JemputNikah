/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Button, Modal, TextInput } from "flowbite-react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { IoMdRemoveCircleOutline } from "react-icons/io";

const AddWishlistPage = () => {
  const { orderNumber } = useParams();

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);

  const [currentWishlistItem, setCurrentWishlistItem] = useState(null);

  // Confirmation modal state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

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
        // Add more keys if needed
      } = response.data || {};

      setAddress(address || "");
      setPhone(phone || "");

      const items = [];
      if (wishlistProduct1) items.push(wishlistProduct1);
      if (wishlistProduct2) items.push(wishlistProduct2);
      if (wishlistProduct3) items.push(wishlistProduct3);

      setWishlistItems(
        items.map((item) => ({
          ...item,
          productImage: item.productImage || null,
        }))
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

  // Open the wishlist modal for a new item
  const handleAddWishlistItem = () => {
    setCurrentWishlistItem({
      productName: "",
      productUrl: "",
      productImage: null,
      bookingStatus: "Available",
    });
    setIsWishlistModalOpen(true);
  };

  // Open the wishlist modal for editing an existing item
  const handleEditWishlistItem = (index) => {
    setCurrentWishlistItem({ ...wishlistItems[index], index });
    setIsWishlistModalOpen(true);
  };

  // Save the wishlist item and close the modal
  const handleSaveWishlistItem = () => {
    if (currentWishlistItem.index !== undefined) {
      // Update existing item
      setWishlistItems((prev) =>
        prev.map((item, idx) =>
          idx === currentWishlistItem.index ? currentWishlistItem : item
        )
      );
    } else {
      // Add new item
      setWishlistItems((prev) => [...prev, currentWishlistItem]);
    }
    setIsWishlistModalOpen(false);
  };

  // Delete a wishlist item

  // Submit all wishlist items
  const handleSubmitWishlist = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("orderNumber", orderNumber);
      formData.append("address", address);
      formData.append("phone", phone);

      // Ensure only valid items are submitted
      wishlistItems.forEach((item, index) => {
        const productIndex = index + 1; // Maintain 1-based indexing
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
      fetchWishlist(); // Refresh data
    } catch (err) {
      console.error("Error submitting wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  // Open the confirmation modal for deletion
  const handleDeleteConfirmation = (index) => {
    setDeleteIndex(index);
    setIsDeleteModalOpen(true);
  };

  // Confirm deletion
  const handleConfirmDelete = async () => {
    if (deleteIndex === null) return;

    try {
      const productIndex = deleteIndex + 1; // API expects 1-based index
      await axios.delete(`/api/wishlist/delete/${orderNumber}/${productIndex}`);
      setWishlistItems((prev) => prev.filter((_, i) => i !== deleteIndex));
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
    } finally {
      setIsDeleteModalOpen(false);
      setDeleteIndex(null);
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
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <p className="my-2 block text-md border border-black bg-gray-100 font-medium text-gray-700">
                  {item.productName}
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product URL
                </label>
                {item.productUrl ? (
                  <button
                    onClick={() => window.open(item.productUrl, "_blank")}
                    className="mt-2 text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none"
                  >
                    Link to product URL
                  </button>
                ) : (
                  <p className="text-gray-500 italic">No URL provided</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Image
                </label>
                {item.productImage && (
                  <img
                    src={
                      typeof item.productImage === "string"
                        ? item.productImage
                        : URL.createObjectURL(item.productImage)
                    }
                    alt="Wishlist Item"
                    className="w-40 h-auto mx-auto mb-2 rounded-md"
                  />
                )}
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
              <div className="absolute top-2 right-2 flex space-x-2">
                <Button
                  size="xs"
                  color="warning"
                  onClick={() => handleEditWishlistItem(index)}
                >
                  Edit
                </Button>
                <Button
                  size="xs"
                  color="failure"
                  onClick={() => handleDeleteConfirmation(index)}
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
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <TextInput
                  type="text"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <TextInput
                  type="text"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                // handleSubmitWishlist(); // Trigger the submission
                setIsAddressModalOpen(false); // Close the modal
              }}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Wishlist Modal */}
        <Modal
          show={isWishlistModalOpen}
          onClose={() => setIsWishlistModalOpen(false)}
        >
          <Modal.Header>
            {currentWishlistItem?.index !== undefined
              ? "Edit Wishlist Item"
              : "Add Wishlist Item"}
          </Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name
                </label>
                <TextInput
                  type="text"
                  placeholder="Enter product name"
                  value={currentWishlistItem?.productName || ""}
                  onChange={(e) =>
                    setCurrentWishlistItem((prev) => ({
                      ...prev,
                      productName: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product URL
                </label>
                <TextInput
                  type="text"
                  placeholder="Enter product URL"
                  value={currentWishlistItem?.productUrl || ""}
                  onChange={(e) =>
                    setCurrentWishlistItem((prev) => ({
                      ...prev,
                      productUrl: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setCurrentWishlistItem((prev) => ({
                      ...prev,
                      productImage: e.target.files[0],
                    }))
                  }
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleSaveWishlistItem}>Save</Button>
          </Modal.Footer>
        </Modal>
        {/* Delete Confirmation Modal */}
        <Modal
          show={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
        >
          <Modal.Header>Confirm Deletion</Modal.Header>
          <Modal.Body>
            <p className="text-gray-700">
              Are you sure you want to delete this wishlist item? This action
              cannot be undone.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              color="failure"
              onClick={handleConfirmDelete}
              className="mr-2"
            >
              Yes, Delete
            </Button>
            <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AddWishlistPage;
