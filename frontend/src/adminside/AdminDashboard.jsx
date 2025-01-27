// AdminDashboard.js
import {  useNavigate } from "react-router-dom";


function AdminDashboard() {
  const navigate = useNavigate();


  return (
    <div className="min-h-screen flex flex-col items-center  bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        {/* Card for Upload Design */}
        <div
          className="bg-white shadow-lg rounded-lg p-6 cursor-pointer transform hover:scale-105 transition-transform"
          onClick={() => navigate("/admin/vieworder")}
        >
          <h2 className="text-2xl font-semibold mb-4 text-red-600">
            View Order
          </h2>
          <p className="text-gray-600">
            Go to the View Order page to view all orders
          </p>
        </div>
        {/* Card for Upload Design */}
        <div
          className="bg-white shadow-lg rounded-lg p-6 cursor-pointer transform hover:scale-105 transition-transform"
          onClick={() => navigate("/admin/upload")}
        >
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            Upload Design
          </h2>
          <p className="text-gray-600">
            Go to the upload page to add new wedding card designs.
          </p>
        </div>

        {/* Card for Upload Song */}
        <div
          className="bg-white shadow-lg rounded-lg p-6 cursor-pointer transform hover:scale-105 transition-transform"
          onClick={() => navigate("/admin/uploadsong")}
        >
          <h2 className="text-2xl font-semibold mb-4 text-green-600">
            Upload Song
          </h2>
          <p className="text-gray-600">
            Go to the upload page to add new songs or music files for wedding
            cards.
          </p>
        </div>
        {/* Card for View Design */}
        <div
          className="bg-white shadow-lg rounded-lg p-6 cursor-pointer transform hover:scale-105 transition-transform"
          onClick={() => navigate("/admin/viewdesign")}
        >
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
            View Design
          </h2>
          <p className="text-gray-600">
            Go to the view design page to view and manage wedding
            cards.
          </p>
        </div>
        {/* Manage Voucher */}
        <div
          className="bg-white shadow-lg rounded-lg p-6 cursor-pointer transform hover:scale-105 transition-transform"
          onClick={() => navigate("/admin/voucher")}
        >
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">
            Manage Voucher
          </h2>
          <p className="text-gray-600">
            Go to the manage voucher page to manage voucher.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
