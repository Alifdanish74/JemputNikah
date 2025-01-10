import axios from "axios";
// import { Modal } from "flowbite-react";
import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../customhooks/UserContext";

const PaymentPage = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  // const [modalOpen, setModalOpen] = useState(false);
  // const [paymentLink, setPaymentLink] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, ready } = useContext(UserContext);
  const { orderNumber } = useParams();
  const [order, setOrder] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (ready && user) {
      setEmail(user.email || ""); // Set email from user
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
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchOrders();
    }
  }, [orderNumber]);

  // const fixedAmount = order?.price || 1; // Use order price or fallback
  const fixedAmount =  1; // Use order price or fallback

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
        amount: fixedAmount,
      });

      if (response.data.paymentUrl) {
        // Navigate to payment link in the same tab
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

  const checkPaymentStatus = async () => {
    try {
      const response = await axios.get(`/api/payment/status/${orderNumber}`);
      if (response.data.status === "paid") {
        navigate("/payment-success"); // Redirect to payment success page
      }
    } catch (error) {
      console.error("Error checking payment status:", error);
    }
  };

  useEffect(() => {
    // Poll for payment status after redirection
    const interval = setInterval(() => {
      checkPaymentStatus();
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96">
        <h2 className="text-center text-2xl font-bold mb-4">Make a Payment</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              readOnly
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Phone
            </label>
            <input
              type="text"
              value={phone}
              readOnly
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Order Number
            </label>
            <input
              type="text"
              value={description}
              readOnly
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Amount
            </label>
            <p className="text-gray-800 font-bold">RM {fixedAmount}</p>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
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
