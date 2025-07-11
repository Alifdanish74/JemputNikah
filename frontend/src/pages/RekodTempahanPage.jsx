// import React from 'react'
// import Box from "@mui/material/Box";
// import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import HeaderBackground from "../components/HeaderBackground";
import { UserContext } from "../customhooks/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Badge, Button, Modal } from "flowbite-react";
import { MdPayment } from "react-icons/md";
import { FaRegPlayCircle, FaRegEdit } from "react-icons/fa";
import { CiGift } from "react-icons/ci";
import { IoPeople } from "react-icons/io5";
import { RiContactsBook3Line } from "react-icons/ri";
import { MdOutlineDelete } from "react-icons/md";
import CopyToClipboardButton from "../customhooks/CopyToClipboard";
import LoadingWrapper from "../customhooks/LoadingWrapper"; // Import the reusable component
import { toast } from "react-toastify";

function RekodTempahanPage() {
  const { ready, user } = useContext(UserContext);

  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedOrderId, setSelectedOrderId] = useState(null); // State for the selected order ID
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  //   console.log("USER ID:", user._id);
  useEffect(() => {
    if (ready && user) {
      const user_id = user._id;

      // Delay execution by 1 second (1000 ms)
      const timeoutId = setTimeout(() => {
        const fetchOrders = async () => {
          try {
            const response = await axios.get(`/api/orders/user/${user_id}`); // Fetch orders by userId
            setOrders(response.data); // Set the fetched orders
            console.log("Orders fetched: ", response.data);
            setLoading(false); // Stop loading
          } catch (error) {
            console.error("Error fetching orders:", error);
          } finally {
            setLoading(false); // Stop loading
          }
        };
        fetchOrders();
      }, 500);

      // Clear timeout if dependencies change before 1 second
      return () => clearTimeout(timeoutId);
    }
  }, [ready, user]);

  // Function to delete the selected order
  const handleDelete = async () => {
    if (!selectedOrderId) return;
    try {
      const token = localStorage.getItem("jwtToken"); 
      const response = await axios.delete(
        `/api/orders/delete/${selectedOrderId}`,
        // {
        //   withCredentials: true, // If using cookies for authentication
        // }
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      //   alert(response.data.message);
      toast.success(response.data.message, {
        autoClose: 2000,
        position: "top-center",
        closeOnClick: true,
      });
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== selectedOrderId)
      );
      setIsModalOpen(false); // Close the modal after deletion
    } catch (error) {
      console.error("Error deleting order and wedding card:", error);
      toast.error(
        "Failed to delete order and wedding card. Please try again.",
        {
          autoClose: 2000,
          position: "top-center",
          closeOnClick: true,
        }
      );
    }
  };

  const openModal = (orderId) => {
    setSelectedOrderId(orderId); // Set the order ID for deletion
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedOrderId(null); // Clear the selected order ID
  };

  // If user is not ready or not logged in, redirect to login
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  const formatDateToReadable = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    return date.toLocaleDateString('ms-MY', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };
  
  

  return (
    <>
      <LoadingWrapper isLoading={loading}>
        <HeaderBackground H1="REKOD TEMPAHAN" P="" />
        <section className="bg-blue-50 py-16">
          <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
            <div className="mx-auto max-w-full px-4 lg:px-10">
              <div className="bg-white dark:bg-gray-800 relative px-6 shadow-md sm:rounded-lg overflow-hidden">
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                  <div className="w-full md:w-1/2">
                    <form className="flex items-center">
                      <label htmlFor="simple-search" className="sr-only">
                        Search
                      </label>
                      <div className="relative w-full">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <input
                          type="text"
                          id="simple-search"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                          placeholder="Search"
                          required=""
                        />
                      </div>
                    </form>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm table-auto text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3 text-center border"
                        >
                          Order Number
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-center border"
                        >
                          Created Date
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-center border"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-center border"
                        >
                          Package
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-center border"
                        >
                          Payment Status
                        </th>
                        <th
                          scope="col"
                          className="px-4 text-center py-3 border"
                        >
                          Card Link
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-center border"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.length > 0 ? (
                        orders
                          .filter((order) => order.paymentStatus !== "deleted")
                          .map((order) => (
                            <tr
                              key={order._id}
                              className="border dark:border-gray-700"
                            >
                              <th
                                scope="row"
                                className="px-4 py-3 border font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {order.orderNumber}
                              </th>
                              <td className="px-4 py-3 border">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </td>
                              <td className="px-4 py-3 border">
                                RM {order.price}
                              </td>
                              <td className="px-4 py-3 border">
                                {order.weddingCardId?.pakej || "N/A"}
                              </td>

                              <td>
                                <div className="px-4 py-3 text-lg mx-auto items-center justify-center gap-x-4 flex">
                                  <Badge
                                    className="w-fit px-3 py-2 text-md uppercase font-bold"
                                    color={
                                      order.paymentStatus === "paid"
                                        ? "success"
                                        : order.paymentStatus === "pending"
                                        ? "warning"
                                        : order.paymentStatus === "deleted"
                                        ? "failure"
                                        : "default" // Default color for any other status
                                    }
                                  >
                                    {order.paymentStatus}
                                  </Badge>

                                  {order.paymentStatus === "pending" && (
                                    <Button
                                      className="flex items-center"
                                      size="sm"
                                      color="success"
                                      onClick={() =>
                                        navigate(
                                          `/payment/${order.orderNumber}/${order._id}`
                                        )
                                      }
                                    >
                                      {" "}
                                      <MdPayment className="mr-2 h-5 w-5" />{" "}
                                      Bayar
                                    </Button>
                                  )}
                                </div>
                              </td>
                              {/* PREVIEW CARD ONLY */}
                              <td className=" py-3 border">
                                <div className="flex-row lg:flex  gap-x-3 mx-auto items-center justify-center">
                                  {order.paymentStatus !== "paid" && (
                                    <div className="bg-blue-600 border rounded-xl mx-auto flex">
                                      <a
                                        href={`/weddingcardpreview/${order.weddingCardId?.hashtag}/${order.orderNumber}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-white text-center hover:underline p-2 flex"
                                      >
                                        {" "}
                                        <FaRegPlayCircle className="mx-auto h-5 w-5" />{" "}
                                        Preview Card
                                      </a>
                                    </div>
                                  )}
                                </div>
                                {order.paymentStatus === "paid" && (
                                  <>
                                    {/* ACTUAL CARD */}
                                    <div className="flex-row lg:flex my-2 gap-x-3 mx-auto items-center justify-center">
                                      <div className="bg-blue-600 border rounded-xl mx-auto flex">
                                        <a
                                          href={`/weddingcard/${order.weddingCardId?.hashtag}/${order.orderNumber}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex text-white text-center hover:underline p-2"
                                        >
                                          {" "}
                                          <FaRegPlayCircle className="mx-auto h-5 w-5 " />{" "}
                                          Digital Card
                                        </a>
                                      </div>
                                      {/* hello {order.weddingCardId} */}

                                      <CopyToClipboardButton
                                          content={`👰🏻‍♀🤵🏻UNDANGAN WALIMATUL URUS 🤍

‎بِسۡـــــــــمِ ٱللهِ ٱلرَّحۡـمَـٰنِ ٱلرَّحِـــــــيمِ
‎السَّلاَمُ عَلَيْكُمْ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ

Bismillahirrahmanirrahim.
Assalamualaikum W.B.T & Salam Sejahtera.

Dengan penuh kesyukuran ke hadrat Ilahi, kami sekeluarga ingin menjemput Tuan/Puan/Saudara/Saudari ke majlis perkahwinan anakkanda kami:

${order.weddingCardId?.namaPenuhLelaki}
                     &
${order.weddingCardId?.namaPenuhPerempuan}

🗓 Pada ${formatDateToReadable(order.weddingCardId?.tarikhMajlis)}

🏠 Bertempat di :
${order.weddingCardId?.locationMajlis}

⏰ Pada jam : ${order.weddingCardId?.majlisStart} - ${order.weddingCardId?.majlisEnd}

✉ RSVP : Bagi tetamu yang hadir, sila isi RSVP sebelum ${formatDateToReadable(order.weddingCardId?.maxDate)}

Link RSVP 👉🏻 https://www.jemputkahwin.com.my/weddingcard/${order.weddingCardId?.hashtag}/${order.orderNumber}

Semoga dengan kehadiran Tuan/Puan/Saudara/Saudari akan lebih menyerikan dan memberkati majlis yang bakal berlangsung nanti.
Doakan kelancaran dan segala urusan kami dipermudahkan.`}
/>

                                    </div>
                                  </>
                                )}
                              </td>
                              

                              <td className=" py-3 border min-w-[250px] ">
                                <div className="grid grid-cols-2 gap-y-2 items-center justify-center">
                                  <div className="mx-auto items-center justify-center">
                                    <Button
                                      size="xs"
                                      color="warning"
                                      onClick={() =>
                                        navigate(
                                          `/kad-digital/tempah/${order.weddingCardId?.designName}/${order.weddingCardId?._id}`,
                                          { state: { order } }
                                        )
                                      } // Pass order to BookingPage
                                    >
                                      {" "}
                                      <FaRegEdit className="mr-2 h-5 w-5" />{" "}
                                      Update
                                    </Button>
                                  </div>
                                  {order.weddingCardId?.pakej !== "Bali" &&
                                    order.paymentStatus === "paid" && (
                                      <>
                                        <div className="mx-auto items-center justify-center">
                                          <Button
                                            size="xs"
                                            color="blue"
                                            onClick={() =>
                                              navigate(
                                                `/tempahan/rsvp/${order.orderNumber}/${order._id}`,
                                                {
                                                  state: { order },
                                                }
                                              )
                                            }
                                          >
                                            {" "}
                                            <IoPeople className="mr-2 h-5 w-5" />{" "}
                                            RSVP
                                          </Button>
                                        </div>
                                      </>
                                    )}
                                  <div className="mx-auto items-center justify-center">
                                    <Button
                                      size="xs"
                                      color="dark"
                                      onClick={() =>
                                        navigate(
                                          `/tempahan/guestbook/${order.orderNumber}/${order._id}`,
                                          {
                                            state: { order },
                                          }
                                        )
                                      }
                                    >
                                      {" "}
                                      <RiContactsBook3Line className="mr-2 h-5 w-5" />{" "}
                                      Guestbook
                                    </Button>
                                  </div>

                                  <div className="mx-auto items-center justify-center">
                                    <Button
                                      size="xs"
                                      color="failure"
                                      onClick={() => openModal(order._id)}
                                    >
                                      {" "}
                                      <MdOutlineDelete className="mr-2 h-5 w-5" />{" "}
                                      Delete
                                    </Button>
                                  </div>
                                  {order.weddingCardId?.pakej === "Paris" &&
                                    order.paymentStatus === "paid" && (
                                      <div className="mx-auto items-center justify-center">
                                        <Button
                                          size="xs"
                                          color="purple"
                                          onClick={() =>
                                            navigate(
                                              `/tempahan/wishlist/${order.orderNumber}/${order._id}`,
                                              {
                                                state: { order },
                                              }
                                            )
                                          }
                                        >
                                          {" "}
                                          <CiGift className="mr-2 h-5 w-5" />{" "}
                                          Wishlist
                                        </Button>
                                      </div>
                                    )}
                                </div>
                              </td>
                            </tr>
                          ))
                      ) : (
                        <tr>
                          <td
                            colSpan="4"
                            className="px-4 py-3 border text-center"
                          >
                            No Orders Found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <nav
                  className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
                  aria-label="Table navigation"
                >
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Showing
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {" "}
                      1-10{" "}
                    </span>
                    of
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {" "}
                      {orders.length}{" "}
                    </span>
                  </span>
                  {/* Add Pagination Controls here if needed */}
                </nav>
              </div>
            </div>
          </section>
        </section>

        {/* Confirmation Modal */}
        <Modal show={isModalOpen} onClose={closeModal}>
          <Modal.Header>Confirm Deletion</Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this order and its wedding card?
            This action cannot be undone.
          </Modal.Body>
          <Modal.Footer>
            <Button color="failure" onClick={handleDelete}>
              Yes, Delete
            </Button>
            <Button color="gray" onClick={closeModal}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </LoadingWrapper>
    </>
  );
}

export default RekodTempahanPage;
