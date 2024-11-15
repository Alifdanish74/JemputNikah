/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, Navigate } from "react-router-dom";
import { Button, TextInput } from "flowbite-react";
import { UserContext } from "../customhooks/UserContext";

const AddWishlistPage = () => {
  const { orderNumber } = useParams(); // Get orderNumber from route params
  const { ready, user } = useContext(UserContext);

  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [wishlist, setWishlist] = useState([
    { productName: "", productUrl: "" },
  ]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch existing wishlist data by orderNumber
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`/api/wishlist/order/${orderNumber}`);
        const { address, phone, wishlist } = response.data || {};
        setAddress(address || ""); // Populate address field
        setPhone(phone || ""); // Populate phone field
        setWishlist(
          wishlist?.length > 0 ? wishlist : [{ productName: "", productUrl: "" }]
        ); // Populate wishlist or set default
      } catch (err) {
        console.error("Error fetching wishlist data:", err);
        setError("Failed to fetch existing wishlist data.");
      }
    };

    fetchWishlist();
  }, [orderNumber]);

  const handleWishlistChange = (index, field, value) => {
    const updatedWishlist = [...wishlist];
    updatedWishlist[index][field] = value;
    setWishlist(updatedWishlist);
  };

  const addWishlistItem = () => {
    if (wishlist.length < 10) {
      setWishlist([...wishlist, { productName: "", productUrl: "" }]);
    }
  };

  const removeWishlistItem = (index) => {
    const updatedWishlist = wishlist.filter((_, i) => i !== index);
    setWishlist(updatedWishlist);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`/api/wishlist/submit`, {
        orderNumber,
        address,
        phone,
        wishlist,
      });
      console.log("Wishlist submission successful:", response.data);
      alert("Wishlist submitted successfully!");
    } catch (err) {
      console.error("Error submitting wishlist:", err);
      setError("Failed to submit wishlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Redirect to login if user is not logged in
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-6">
          Add Wishlist
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-6">
            <label
              htmlFor="address"
              className="block text-gray-700 font-bold mb-2"
            >
              Address
            </label>
            <TextInput
              id="address"
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-bold mb-2"
            >
              Phone Number
            </label>
            <TextInput
              id="phone"
              type="text"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-700 mb-4">Wishlist</h3>
            {wishlist.map((item, index) => (
              <div key={index} className="flex items-center space-x-4 mb-4">
                <TextInput
                  type="text"
                  placeholder="Product Name"
                  value={item.productName}
                  onChange={(e) =>
                    handleWishlistChange(index, "productName", e.target.value)
                  }
                  required
                />
                <TextInput
                  type="text"
                  placeholder="Product URL"
                  value={item.productUrl}
                  onChange={(e) =>
                    handleWishlistChange(index, "productUrl", e.target.value)
                  }
                />
                <Button
                  size="xs"
                  color="failure"
                  onClick={() => removeWishlistItem(index)}
                >
                  Remove
                </Button>
              </div>
            ))}
            {wishlist.length < 10 && (
              <Button size="sm" onClick={addWishlistItem}>
                Add Wishlist Item
              </Button>
            )}
          </div>

          {error && <p className="text-red-500 font-semibold">{error}</p>}

          <div className="flex justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit Wishlist"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWishlistPage;
