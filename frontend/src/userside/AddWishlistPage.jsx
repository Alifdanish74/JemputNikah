/* eslint-disable react/prop-types */
import {  useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Modal, TextInput } from "flowbite-react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

const AddWishlistPage = () => {
  const { orderNumber } = useParams(); // Get orderNumber from route params


  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false);
  const [newWishlistItem, setNewWishlistItem] = useState({
    productName: "",
    productUrl: "",
  });

  // Fetch existing wishlist data
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/wishlist/order/${orderNumber}`);
        const { address, phone, wishlist } = response.data || {};
        setAddress(address || "");
        setPhone(phone || "");
        setWishlist(wishlist || []);
      } catch (err) {
        console.error("Error fetching wishlist data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, [orderNumber]);

  // Add wishlist item
  const handleAddWishlistItem = () => {
    setWishlist((prev) => [...prev, newWishlistItem]);
    setNewWishlistItem({ productName: "", productUrl: "" });
    setIsWishlistModalOpen(false);
  };

  // Handle saving address and phone
  const handleSaveAddress = () => {
    setIsAddressModalOpen(false);
  };

  // Submit wishlist
  const handleSubmitWishlist = async () => {
    setLoading(true);
    try {
      await axios.post(`/api/wishlist/submit`, {
        orderNumber,
        address,
        phone,
        wishlist,
      });
      alert("Wishlist submitted successfully!");
    } catch (err) {
      console.error("Error submitting wishlist:", err);
    } finally {
      setLoading(false);
    }
  };

  // Column definitions for ag-grid
  const columnDefs = [
    { headerName: "#", valueGetter: "node.rowIndex + 1", width: 50 },
    { field: "productName", headerName: "Product Name", sortable: true },
    { field: "productUrl", headerName: "Product URL", sortable: true },
    { field: "bookingName", headerName: "Reserver", sortable: true },
    {
      field: "bookingPhoneNumber",
      headerName: "Reserver's phone",
      sortable: true,
    },
    { field: "bookingStatus", headerName: "Status", sortable: true },
  ];

  // Redirect to login if user is not logged in


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
          <Button onClick={() => setIsWishlistModalOpen(true)}>
            Add Wishlist
          </Button>
        </div>
        {/* Submit Button */}
        <div className="flex justify-end mb-4">
          <Button color="warning" onClick={handleSubmitWishlist} disabled={loading}>
            {loading ? "Submitting..." : "Submit Wishlist"}
          </Button>
        </div>

        {/* Wishlist Table */}
        <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
          <AgGridReact
            rowData={wishlist}
            columnDefs={columnDefs}
            // defaultColDef={defaultColDef}
            pagination={true}
            paginationPageSize={10}
          />
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
            <Button onClick={handleSaveAddress}>Save</Button>
            <Button color="gray" onClick={() => setIsAddressModalOpen(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Wishlist Modal */}
        <Modal
          show={isWishlistModalOpen}
          onClose={() => setIsWishlistModalOpen(false)}
        >
          <Modal.Header>Add Wishlist Item</Modal.Header>
          <Modal.Body>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Name
                </label>
                <TextInput
                  id="productName"
                  type="text"
                  placeholder="Enter product name"
                  value={newWishlistItem.productName}
                  onChange={(e) =>
                    setNewWishlistItem((prev) => ({
                      ...prev,
                      productName: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <label
                  htmlFor="productUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product URL
                </label>
                <TextInput
                  id="productUrl"
                  type="text"
                  placeholder="Enter product URL"
                  value={newWishlistItem.productUrl}
                  onChange={(e) =>
                    setNewWishlistItem((prev) => ({
                      ...prev,
                      productUrl: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleAddWishlistItem}>Add</Button>
            <Button color="gray" onClick={() => setIsWishlistModalOpen(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AddWishlistPage;
