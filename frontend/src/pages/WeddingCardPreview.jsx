import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

// eslint-disable-next-line react/prop-types, no-unused-vars
function WeddingCardPreview() {
  const { designName, tajukMajlis, orderNumber } = useParams(); // Get all URL parameters
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeddingCard = async () => {
      try {
        const response = await axios.get(`/api/orders/order/${orderNumber}`);
        setOrderData(response.data);
        console.log("Wedding card data:", response.data); // Set the fetched wedding card data
      } catch (error) {
        console.error("Error fetching wedding card:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeddingCard();
  }, [designName, tajukMajlis, orderNumber]);

  if (loading) return <p>Loading wedding card details...</p>;
  if (!orderData) return <p>Wedding card not found.</p>;
  // Render wedding card information

  const { weddingCardId: weddingCard } = orderData;

  return (
    <div className="min-h-screen p-8 bg-blue-100">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
        <h1 className="text-3xl font-extrabold mb-4">{tajukMajlis}</h1>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Pengantin Lelaki</h2>
          <p className="text-gray-600">{weddingCard?.namaPenuhLelaki}</p>
          <p className="text-gray-600">{weddingCard?.namaPendekLelaki}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Pengantin Perempuan</h2>
          <p className="text-gray-600">{weddingCard?.namaPenuhPerempuan}</p>
          <p className="text-gray-600">{weddingCard?.namaPendekPerempuan}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Maklumat Majlis</h2>
          <p className="text-gray-600">Tarikh: {weddingCard?.tarikhMajlis}</p>
          <p className="text-gray-600">
            Masa: {weddingCard?.majlisStart} - {weddingCard?.majlisEnd}
          </p>
          <p className="text-gray-600">Lokasi: {weddingCard?.locationMajlis}</p>
        </div>
        {weddingCard?.qrCode && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Money Gift</h2>
            <img
              src={`https://jemput-nikah-backend.vercel.app/${weddingCard.qrCode}`}
              alt="QR Code"
              className="w-32 h-32 mx-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default WeddingCardPreview;
