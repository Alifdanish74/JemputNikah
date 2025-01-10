import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extract BillCode and Status from the URL
    const billCode = searchParams.get("billcode");
    const status = searchParams.get("status_id");

    if (billCode && status) {
      setPaymentStatus({
        billCode,
        status: status === "1" ? "Successful" : "Failed",
      });
    } else {
      setPaymentStatus(null);
    }

    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
      <div className="bg-white p-6 shadow-lg rounded-lg w-96">
        <h1
          className={`text-xl font-bold text-center mb-4 ${
            paymentStatus?.status === "Successful"
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {paymentStatus?.status === "Successful"
            ? "Payment Successful"
            : "Payment Failed"}
        </h1>
        {paymentStatus ? (
          <div>
            <div className="flex mx-auto justify-center">
              <p className="text-center">Your payment status is: &nbsp; </p>
              <p
                className={`text-center mb-4 ${
                  paymentStatus?.status === "Successful"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                <strong>{paymentStatus?.status}</strong>
              </p>
            </div>
            <p className="text-gray-600 text-sm mb-4 text-center">
              Bill Code: <strong>{paymentStatus.billCode}</strong>
            </p>
          </div>
        ) : (
          <p className="text-red-500 text-center">Invalid payment details</p>
        )}
        <div className="text-center">
          <a
            href="/tempahan"
            className="inline-block px-6 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
