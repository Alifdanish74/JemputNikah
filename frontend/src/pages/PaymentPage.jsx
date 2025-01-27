import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../customhooks/UserContext";

const PaymentPage = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [voucher, setVoucher] = useState("");
  const [discount, setDiscount] = useState(0);
  const [voucherError, setVoucherError] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, ready } = useContext(UserContext);
  const { orderNumber } = useParams();
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  const [order, setOrder] = useState();

  useEffect(() => {
    if (ready && user) {
      setEmail(user.email || "");
    }
  }, [ready, user]);

  useEffect(() => {
    if (orderNumber) {
      const fetchOrders = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`/api/orders/order/${orderNumber}`);
          setOrder(response.data);
          setPhone(response.data.weddingCardId?.orderphone || "");
          setDescription(orderNumber);
          setTotalAmount(response.data.price || 1); // Set total amount
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [orderNumber]);

  const validateVoucher = async () => {
    try {
      const response = await axios.post("/api/vouchers/validate", { code: voucher });
      if (response.data.valid) {
        const discountPercentage = response.data.discount; // Discount as a percentage
        const discountAmount = (order.price * discountPercentage) / 100; // Calculate discount amount
        const updatedTotalAmount = order.price - discountAmount; // Calculate the new total amount
        setDiscount(discountAmount);
        setVoucherError("");
        setTotalAmount(updatedTotalAmount); // Update total amount

      } else {
        setVoucherError("Invalid or expired voucher code.");
        setDiscount(0);
        setTotalAmount(order.price); // Reset total amount
      }
    } catch (error) {
      console.error("Error validating voucher:", error);
      setVoucherError("Error validating voucher. Please try again.");
    }
  };

  const handleSubmit = async () => {
    if (!email || !description || !phone) {
      setError("All fields are required!");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("/api/payment/create-payment", {
        email,
        phone,
        description,
        amount: totalAmount,
      });

      if (response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl;
      } else {
        setError("Failed to create payment. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4">
      <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-2xl">
        <h2 className="text-center text-3xl font-extrabold text-gray-800 mb-6">
          Complete Your Payment
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="space-y-6"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              readOnly
              className="block w-full mt-2 p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            />
          </div>
  
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              id="phone"
              type="text"
              value={phone}
              readOnly
              className="block w-full mt-2 p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            />
          </div>
  
          <div>
            <label
              htmlFor="order-number"
              className="block text-sm font-medium text-gray-700"
            >
              Order Number
            </label>
            <input
              id="order-number"
              type="text"
              value={description}
              readOnly
              className="block w-full mt-2 p-3 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
            />
          </div>
  
          <div>
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
            >
              Amount to Pay
            </label>
            <p
              id="amount"
              className="mt-2 p-3 bg-gray-100 rounded-lg border border-gray-300 text-gray-800 font-semibold"
            >
              RM {totalAmount.toFixed(2)}
            </p>
          </div>
  
          {/* Voucher Section */}
          <div>
            <label
              htmlFor="voucher"
              className="block text-sm font-medium text-gray-700"
            >
              Voucher Code
            </label>
            <div className="flex mt-2">
              <input
                id="voucher"
                type="text"
                value={voucher}
                onChange={(e) => setVoucher(e.target.value)}
                placeholder="Enter voucher code"
                className="w-full p-3 rounded-l-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
              />
              <button
                type="button"
                onClick={validateVoucher}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Apply
              </button>
            </div>
            {voucherError && (
              <p className="text-red-500 text-sm mt-2">{voucherError}</p>
            )}
            {discount > 0 && (
              <p className="text-green-500 text-sm mt-2">
                Discount Applied: RM {discount.toFixed(2)}
              </p>
            )}
          </div>
  
          {error && <p className="text-red-500 text-sm">{error}</p>}
  
          <button
            type="submit"
            className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled={loading || !order}
          >
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default PaymentPage;
