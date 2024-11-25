import { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { Button, Modal, TextInput, Pagination } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast } from "react-toastify";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

import {  useNavigate } from "react-router-dom";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

function AdminViewOrder() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(20);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);


  const navigate = useNavigate();

  // const [gridApi, setGridApi] = useState(null);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`/api/orders`, {
          params: { page: currentPage, search: searchQuery, itemsPerPage },
        });
        setOrders(response.data.orders || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Error fetching orders", {
          autoClose: 2000,
          position: "top-center",
          closeOnClick: true,
        });
      }
    };
    fetchOrders();
  }, [searchQuery, currentPage]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Confirm delete modal
  const confirmDelete = (id) => {
    setOrderToDelete(id);
    setIsModalOpen(true);
  };

  // Delete order
  const handleDelete = async () => {
    if (!orderToDelete) return;
    try {
      await axios.delete(`/api/orders/deletebyid/${orderToDelete}`);
      setOrders(orders.filter((order) => order._id !== orderToDelete));
      toast.success("Order deleted successfully", {
        autoClose: 2000,
        position: "top-center",
        closeOnClick: true,
      });
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Error deleting order", {
        autoClose: 2000,
        position: "top-center",
        closeOnClick: true,
      });
    } finally {
      setIsModalOpen(false);
      setOrderToDelete(null);
    }
  };

  // Redirect to update order page
  const handleUpdate = (weddingCardId) => {
    navigate(`/admin/update-order/${weddingCardId}`);
  };

  // Define column definitions for ag-grid
  const columnDefs = [
    { headerName: "#", valueGetter: "node.rowIndex + 1", width: 50 },
    { field: "orderNumber", headerName: "Order Number", sortable: true },
    { field: "userId.name", headerName: "User Name", sortable: true },
    { field: "userId.phone", headerName: "User Contact", sortable: true },
    {
      field: "price",
      headerName: "Price",
      sortable: true,
      valueFormatter: (params) => `RM${params.value.toFixed(2)}`,
    },
    {
      field: "paymentStatus",
      headerName: "Status",
      cellRenderer: (params) => (
        <span
          className={`px-3 py-1 rounded-full text-white ${
            params.value === "paid"
              ? "bg-green-600"
              : params.value === "deleted"
              ? "bg-red-600"
              : "bg-yellow-400"
          }`}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "createdAt",
      headerName: "Created At",
      valueFormatter: (params) =>
        new Date(params.value).toLocaleDateString("en-GB"),
    },
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <div className="flex space-x-2">
          <Button
            size="xs"
            color="warning"
            onClick={() => handleUpdate(params.data.weddingCardId)}
          >
            <FaEdit className="mr-2" /> Update
          </Button>
          <Button
            size="xs"
            color="failure"
            onClick={() => confirmDelete(params.data._id)}
          >
            <FaTrash className="mr-2" /> Delete
          </Button>
        </div>
      ),
    },
  ];

  const defaultColDef = {
    resizable: true,
  };


  return (
    <div className="w-full p-4 sm:p-8 bg-gray-100 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Order Dashboard</h2>

      {/* Search Bar */}
      <div className="flex mb-6">
        <TextInput
          placeholder="Search by order number"
          value={searchQuery}
          onChange={handleSearchChange}
          className="mr-4 flex-grow"
        />
        <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
      </div>

      {/* Orders Table */}
      <div
        className="ag-theme-alpine"
        style={{ height: 500, width: "100%", marginBottom: "1rem" }}
      >
        <AgGridReact
          rowData={orders}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
          paginationPageSize={itemsPerPage}
        />
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
        totalPages={totalPages}
        className="flex justify-center"
      />

      {/* Delete Confirmation Modal */}
      <Modal
        show={isModalOpen}
        size="md"
        onClose={() => setIsModalOpen(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400" />
            <h3 className="mb-5 text-lg font-normal text-gray-500">
              Are you sure you want to delete this order?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                Yes, I&apos;m sure
              </Button>
              <Button color="gray" onClick={() => setIsModalOpen(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default AdminViewOrder;
