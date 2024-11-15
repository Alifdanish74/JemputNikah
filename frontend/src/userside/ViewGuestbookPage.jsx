/* eslint-disable react/prop-types */
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import { Spinner } from "flowbite-react";
import { Navigate, useParams } from "react-router-dom";


import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // Theme CSS
import { UserContext } from "../customhooks/UserContext";

const ViewGuestbookPage = () => {
  const { orderNumber } = useParams();
  const { ready, user } = useContext(UserContext);
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  // Column definitions
  const [columnDefs] = useState([
    {
      headerName: "#", // Index column
      valueGetter: "node.rowIndex + 1", // Calculate index
      sortable: false,
      filter: false,
      width: 50,
    },
    {
      field: "name",
      headerName: "Name",
      sortable: true,
      filter: true,
      flex:1
    },
    {
        field: "ucapan",
        headerName: "Guestbook",
        filter: true,
        flex:3
    },
  ]);

  // Default column definitions
  const defaultColDef = {
    resizable: true,
  };

  // Fetch RSVP data
  useEffect(() => {
    const fetchRSVPs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/rsvp/list/${orderNumber}`);
        const { submissions } = response.data; // Extract submissions
        console.log("API Response:", response.data);
        setRowData(submissions || []); // Populate grid with submissions
      } catch (err) {
        console.error(err);
        setError("Failed to fetch RSVP submissions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRSVPs();
  }, [orderNumber]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 font-semibold">{error}</p>
      </div>
    );
  }

  // If user is not ready or not logged in, redirect to login
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Guestbook View
          </h1>
          <p className="text-gray-500">
            View all messages from the RSVP guestbook.
          </p>
        </div>
        <div
          className="ag-theme-alpine"
          style={{ height: "600px", width: "100%" }}
        >
          <AgGridReact
            rowData={rowData} // Data for rows
            columnDefs={columnDefs} // Column definitions
            defaultColDef={defaultColDef} // Default column properties
            pagination={true} // Enable pagination
            paginationPageSize={10} // Rows per page
          />
        </div>
        {/* Modal for Viewing Ucapan */}
      </div>
    </div>
  );
};

export default ViewGuestbookPage;
