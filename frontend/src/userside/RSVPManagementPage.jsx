/* eslint-disable react/prop-types */
import { useEffect, useState, useCallback, useMemo, useContext } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import { Spinner } from "flowbite-react";
import { Navigate, useParams } from "react-router-dom";
import { Modal, Button } from "flowbite-react";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS
import "ag-grid-community/styles/ag-theme-alpine.css"; // Theme CSS
import { UserContext } from "../customhooks/UserContext";
import { toast } from "react-toastify";

const RSVPManagementPage = () => {
  const { orderNumber } = useParams();
  const { ready, user } = useContext(UserContext);
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUcapan, setSelectedUcapan] = useState("");

  const openModal = (ucapan) => {
    setSelectedUcapan(ucapan || "No message provided");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUcapan("");
  };

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
      //   flex: 2,
    },
    {
      field: "phone",
      headerName: "Phone",
      sortable: true,
      filter: true,
      //   flex: 2,
    },
    {
      field: "timeslot",
      headerName: "Time Slot",
      sortable: true,
      filter: true,
      //   flex: 2,
    },
    {
      field: "pihak",
      headerName: "Pihak",
      sortable: true,
      filter: true,
      width: 150,
    },
    {
      field: "dewasa",
      headerName: "Adults",
      sortable: true,
      filter: "agNumberColumnFilter",
      width: 95,
    },
    {
      field: "kanak",
      headerName: "Kids",
      sortable: true,
      filter: "agNumberColumnFilter",
      width: 95,
    },
    {
      headerName: "Total",
      valueGetter: (params) => params.data.dewasa + params.data.kanak,
      sortable: true,
      filter: "agNumberColumnFilter",
      width: 95,
    },
    {
      field: "status",
      headerName: "Status",
      sortable: true,
      filter: true,
      //   flex: 1,
      cellStyle: (params) => ({
        color: params.value === "Hadir" ? "green" : "red",
        fontWeight: "bold",
      }),
      width: 120,
    },
    {
      headerName: "Ucapan",
      cellRenderer: (params) => (
        <Button onClick={() => openModal(params.data.ucapan)} size="xs">
          View
        </Button>
      ),
      width: 95,
    },
    {
      headerName: "Delete",
      cellRenderer: (params) => (
        <Button
          onClick={() => handleDelete(params.data.rsvpId, params.data._id)}
          size="xs"
          color="failure"
        >
          Delete
        </Button>
      ),
      width: 95,
    },
  ]);

  // Default column definitions
  const defaultColDef = {
    resizable: true,
    // flex: 1,
  };

  // Fetch RSVP data
  useEffect(() => {
    const fetchRSVPs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/rsvp/list/${orderNumber}`);
        const { submissions, _id: rsvpId } = response.data; // Extract RSVP ID and submissions
        console.log("API Response:", response.data);
        const updatedSubmissions = submissions.map((submission) => ({
          ...submission,
          rsvpId, // Attach the RSVP ID to each submission
        }));
        setRowData(updatedSubmissions); // Populate grid with submissions
      } catch (err) {
        console.error(err);
        setError("Failed to fetch RSVP submissions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRSVPs();
  }, [orderNumber]);

  // Delete RSVP Submission
  const handleDelete = async (rsvpId, submissionId) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this RSVP?"
      );
      if (!confirmed) return;
  
      await axios.delete(`/api/rsvp/delete/${rsvpId}/${submissionId}`);
      setRowData((prevData) =>
        prevData.filter((row) => row._id !== submissionId)
      );
      toast.error("RSVP submission deleted successfully.", {
        autoClose: 2000,
        position: "top-center",
        closeOnClick: true,
      });
    } catch (err) {
      console.error("Error deleting RSVP:", err);
      toast.error("Failed to delete RSVP submission. Please try again.", {
        autoClose: 2000,
        position: "top-center",
        closeOnClick: true,
      });
    }
  };
  

  // Handle row updates
  const onCellValueChanged = useCallback(async (params) => {
    try {
      const updatedRow = params.data;
      console.log("Updated Row:", updatedRow);

      // Make an API call to save the updated row (if required)
      // await axios.put(`/api/rsvp/update/${updatedRow._id}`, updatedRow);
    } catch (err) {
      console.error("Error updating RSVP:", err);
    }
  }, []);

  // Handle row selection
  const onRowSelected = useCallback((event) => {
    console.log("Selected Row:", event.node.data);
  }, []);

  // Calculate totals for Adults, Kids, Total Guests, and guests by Pihak
  const totals = useMemo(() => {
    if (!rowData || rowData.length === 0)
      return { adults: 0, kids: 0, total: 0, byPihak: {} };

    const byPihak = {};
    let adults = 0;
    let kids = 0;

    rowData.forEach((row) => {
      const { pihak, dewasa = 0, kanak = 0 } = row;

      // Skip rows where pihak is null or undefined
      if (!pihak) return;

      // Accumulate totals for adults and kids
      adults += dewasa;
      kids += kanak;

      // Group guests by 'pihak'
      if (!byPihak[pihak]) {
        byPihak[pihak] = { adults: 0, kids: 0, total: 0 };
      }

      // Add counts to the respective 'pihak'
      byPihak[pihak].adults += dewasa;
      byPihak[pihak].kids += kanak;
      byPihak[pihak].total += dewasa + kanak;
    });

    return {
      adults,
      kids,
      total: adults + kids,
      byPihak,
    };
  }, [rowData]); // Dependency: only recompute when `rowData` changes

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
            RSVP Management
          </h1>
          <p className="text-gray-500">
            Manage all RSVPs for this wedding card.
          </p>
          <div className="text-gray-700 mb-4">
            <p>
              <strong>Total Adults:</strong> {totals.adults}
            </p>
            <p>
              <strong>Total Kids:</strong> {totals.kids}
            </p>
            <p>
              <strong>Total Guests:</strong> {totals.total}
            </p>
          </div>
          <div>
            {Object.keys(totals.byPihak).map((pihak) => (
              <p key={pihak}>
                <strong>{pihak}:</strong> {totals.byPihak[pihak].total} guests
                (Adults: {totals.byPihak[pihak].adults}, Kids:{" "}
                {totals.byPihak[pihak].kids})
              </p>
            ))}
          </div>
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
            rowSelection="single" // Row selection type
            onRowSelected={onRowSelected} // Handle row selection
            onCellValueChanged={onCellValueChanged} // Handle cell editing
          />
        </div>
        {/* Modal for Viewing Ucapan */}
        <Modal show={isModalOpen} onClose={closeModal}>
          <Modal.Header>Ucapan</Modal.Header>
          <Modal.Body>
            <p className="text-gray-700 text-sm">{selectedUcapan}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default RSVPManagementPage;
