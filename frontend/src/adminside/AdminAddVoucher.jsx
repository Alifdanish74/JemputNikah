import { useState, useEffect } from "react";
import { Datepicker } from "flowbite-react";
import axios from "axios";

const AdminVoucherManager = () => {
  const [vouchers, setVouchers] = useState([]);
  const [formData, setFormData] = useState({
    code: "",
    discount: "",
    expires: "",
    quantity: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch vouchers on component mount
  useEffect(() => {
    fetchVouchers();
  }, []);

  // Fetch all vouchers
  const fetchVouchers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/vouchers");
      setVouchers(response.data);
    } catch (err) {
      console.error("Error fetching vouchers:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission to create a voucher
  const handleCreateVoucher = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.code ||
      !formData.discount ||
      !formData.expires ||
      !formData.quantity
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      await axios.post("/api/vouchers/create", formData);
      fetchVouchers(); // Refresh the voucher list
      setFormData({ code: "", discount: "", expires: "", quantity: "" }); // Clear form
    } catch (err) {
      console.error("Error creating voucher:", err);
      setError("Failed to create voucher. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle voucher deletion
  const handleDeleteVoucher = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`/api/vouchers//delete/${id}`);
      fetchVouchers(); // Refresh the voucher list
    } catch (err) {
      console.error("Error deleting voucher:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen max-w-6xl items-center justify-center mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Vouchers</h1>

      {/* Voucher Creation Form */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Create New Voucher
        </h2>
        <form
          onSubmit={handleCreateVoucher}
          className="bg-white p-6 shadow-md rounded-lg"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Code
            </label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., WELCOME20"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Discount (%)
            </label>
            <input
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., 20"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Expires
            </label>
            <Datepicker
              title="Voucher Expire Date"
              minDate={new Date()}
              showTodayButton={false}
              value={
                formData.expires ? new Date(formData.expires) : new Date()
              }
              onChange={(date) => setFormData({ ...formData, expires: date.toISOString() })}
              // className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="e.g., 20"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Voucher"}
          </button>
        </form>
      </div>

      {/* Voucher List */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Existing Vouchers
        </h2>
        <div className="bg-white shadow-md rounded-lg">
          {loading ? (
            <p className="p-4 text-center text-gray-500">Loading...</p>
          ) : vouchers.length === 0 ? (
            <p className="p-4 text-center text-gray-500">No vouchers found.</p>
          ) : (
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Code
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Discount
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Expires
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                    Quantity
                  </th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {vouchers.map((voucher) => (
                  <tr key={voucher._id} className="border-b">
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {voucher.code}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {voucher.discount}%
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {new Date(voucher.expires).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800">
                      {voucher.quantity}
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleDeleteVoucher(voucher._id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminVoucherManager;
