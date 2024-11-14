// AdminViewOrder.jsx
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TextInput,
  Pagination,
  Badge,
  Modal,
} from "flowbite-react";
import { FaTrash, FaEdit } from "react-icons/fa"; // Import FaEdit for the Update icon
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { toast } from "react-toastify";
import { UserContext } from "../customhooks/UserContext";
import { Navigate, useNavigate } from "react-router-dom"; // Import useNavigate

function AdminViewOrder() {
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const { ready, user } = useContext(UserContext);
  const navigate = useNavigate(); // Initialize navigate for redirecting

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
        toast.error("Error fetching orders");
        setOrders([]);
      }
    };
    fetchOrders();
  }, [searchQuery, currentPage]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const confirmDelete = (id) => {
    setOrderToDelete(id);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (!orderToDelete) return;

    try {
      await axios.delete(`/api/orders/${orderToDelete}`);
      setOrders(orders.filter((order) => order._id !== orderToDelete));
      toast.success("Order deleted successfully");
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Error deleting order");
    } finally {
      setIsModalOpen(false);
      setOrderToDelete(null);
    }
  };

  const handleUpdate = (weddingCardId) => {
    // Redirect to AdminUpdateOrderPage with the weddingCardId
    navigate(`/admin/update-order/${weddingCardId}`);
  };

  if (!ready) return "Loading";

  if ((ready && !user) || !user?.isAdmin) {
    return <Navigate to={"/"} />;
  }

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
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <Table.Head>
            <Table.HeadCell>Order Number</Table.HeadCell>
            <Table.HeadCell>User Name</Table.HeadCell>
            <Table.HeadCell>User Contact</Table.HeadCell>
            <Table.HeadCell>Price</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Created At</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {orders.map((order) => (
              <Table.Row key={order._id}>
                <Table.Cell>{order.orderNumber}</Table.Cell>
                <Table.Cell>{order.userId?.name || "Unknown"}</Table.Cell>
                <Table.Cell>{order.userId?.phone || "Unknown"}</Table.Cell>
                <Table.Cell>RM{order.price.toFixed(2)}</Table.Cell>
                <Table.Cell>
                  <Badge
                    className="w-fit px-3 py-2 text-md uppercase font-bold"
                    color={
                      order.paymentStatus === "paid"
                        ? "success"
                        : order.paymentStatus === "failed"
                        ? "failure"
                        : "warning"
                    }
                  >
                    {order.paymentStatus}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  {new Date(order.createdAt).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  <Button
                    color="warning"
                    onClick={() => handleUpdate(order.weddingCardId)}
                  >
                    <FaEdit className="mr-2" /> Update
                  </Button>
                  <Button
                    color="failure"
                    onClick={() => confirmDelete(order._id)}
                  >
                    <FaTrash className="mr-2" /> Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination
          currentPage={currentPage}
          onPageChange={(page) => setCurrentPage(page)}
          totalPages={totalPages}
        />
      </div>

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
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this order?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                {"Yes, I'm sure"}
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
