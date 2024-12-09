/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import { Spinner, Button } from "flowbite-react";
import { useParams } from "react-router-dom";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { toast } from "react-toastify";

const ViewGuestbookPage = () => {
  const { orderNumber } = useParams();

  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Column definitions
  const [columnDefs] = useState([
    {
      headerName: "#",
      valueGetter: "node.rowIndex + 1",
      sortable: false,
      filter: false,
      width: 50,
    },
    {
      field: "name",
      headerName: "Name",
      sortable: true,
      filter: true,
      flex: 1,
    },
    {
      field: "ucapan",
      headerName: "Guestbook",
      filter: true,
      flex: 3,
    },
    {
      headerName: "Delete",
      cellRenderer: (params) => (
        <Button
          onClick={() => handleDelete(params.data)}
          size="xs"
          color="failure"
        >
          Delete
        </Button>
      ),
      width: 95,
    },
  ]);

  const defaultColDef = {
    resizable: false,
  };

  // Fetch RSVP data
  useEffect(() => {
    fetchRSVPs();
  }, [orderNumber]);

  const fetchRSVPs = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/rsvp/list/${orderNumber}`);
      const { submissions, _id: rsvpId } = response.data; // Extract RSVP ID and submissions
      setRowData(
        submissions.map((submission) => ({
          ...submission,
          rsvpId, // Add RSVP ID to each submission for deletion
        }))
      );
    } catch (err) {
      console.error(err);
      setError("Failed to fetch RSVP submissions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (submission) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this RSVP?"
      );
      if (!confirmed) return;
      setLoading(true);
      await axios.delete(
        `/api/rsvp/delete/${submission.rsvpId}/${submission._id}`
      );
      toast.error("RSVP submission deleted successfully.", {
        autoClose: 2000,
        position: "top-center",
        closeOnClick: true,
      });
      fetchRSVPs(); // Refresh data after deletion
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete submission. Please try again.", {
        autoClose: 2000,
        position: "top-center",
        closeOnClick: true,
      });
    } finally {
      setLoading(false);
    }
  };

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
        <div>
          <Button onClick={() => fetchRSVPs()}>Refresh</Button>
        </div>
        <div className="overflow-x-auto">
          <div
            className="ag-theme-alpine"
            style={{ height: "600px", minWidth: "600px" }}
          >
            <AgGridReact
              rowData={rowData}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pagination={true}
              paginationPageSize={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewGuestbookPage;
