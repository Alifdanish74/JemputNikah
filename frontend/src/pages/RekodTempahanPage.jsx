// import React from 'react'
// import Box from "@mui/material/Box";
// import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import HeaderBackground from "../components/HeaderBackground";
import { UserContext } from "../customhooks/UserContext";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { Badge } from "flowbite-react";
import { Button } from "flowbite-react";
import { MdPayment } from "react-icons/md";
import { FaRegPlayCircle, FaRegEdit } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa6";
import { RiContactsBook3Line } from "react-icons/ri";
import { MdOutlineDelete } from "react-icons/md";
// const columns = [
//   { field: "id", headerName: "No Tempahan" },
//   {
//     field: "tarikhTempahan",
//     headerName: "Tarikh Tempahan",
//   },
//   {
//     field: "tarikhMajlis",
//     headerName: "Tarikh Majlis",
//   },
//   {
//     field: "harga",
//     headerName: "Harga",
//   },
//   {
//     field: "paymentStatus",
//     headerName: "Status Bayaran",
//   },
//   {
//     field: "link",
//     headerName: "Link Kad",
//   },
//   {
//     field: "action",
//     headerName: "Tindakan",
//   },
// ];

// const rows = [
//   {
//     id: 1,
//     tarikhTempahan: "Snow",
//     tarikhMajlis: "Jon",
//     harga: "RM39",
//     paymentStatus: "Belum Bayar",
//     link: "",
//     action: "",
//   },
// ];

function RekodTempahanPage() {
  const { ready, user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders once `ready` is true and the `user` object is available
  useEffect(() => {
    if (ready && user) {
      const fetchOrders = async () => {
        try {
          const response = await axios.get(`/api/orders/user/${user.id}`); // Fetch orders by userId
          setOrders(response.data); // Set the fetched orders
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setLoading(false); // Stop loading
        }
      };
      fetchOrders();
    }
  }, [ready, user]);

  // If user is not ready or not logged in, redirect to login
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  if (loading) {
    return <div>Loading...</div>; // Show a loading state until the orders are fetched
  }

  return (
    <>
      <HeaderBackground H1="REKOD TEMPAHAN" P="" />
      <section className="bg-blue-50 py-16">
        <section className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5">
          <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
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
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-4 py-3 text-center border">
                        Order Number
                      </th>
                      <th scope="col" className="px-4 py-3 text-center border">
                        Created Date
                      </th>
                      <th scope="col" className="px-4 py-3 text-center border">
                        Amount
                      </th>
                      <th scope="col" className="px-4 py-3 text-center border">
                        Payment Status
                      </th>
                      <th scope="col" className="px-4 text-center py-3 border">
                        Card Link
                      </th>
                      <th scope="col" className="px-4 py-3 text-center border">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length > 0 ? (
                      orders.map((order) => (
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
                          <td className="px-4 py-3 border">RM {order.price}</td>

                          <td>
                            <div className="px-4 py-3 text-lg mx-auto items-center justify-center gap-x-4 flex">
                              <Badge
                                className="w-fit px-3 py-2 text-md uppercase font-bold"
                                color={
                                  order.paymentStatus === "paid"
                                    ? "success"
                                    : order.paymentStatus === "pending"
                                    ? "warning"
                                    : order.paymentStatus === "failed"
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
                                >
                                  {" "}
                                  <MdPayment className="mr-2 h-5 w-5" /> Bayar
                                </Button>
                              )}
                            </div>
                          </td>
                          <td className=" py-3 border">
                            <div className="flex-row lg:flex  gap-x-3 mx-auto items-center justify-center">
                              <Button size="xs" color="blue">
                                {" "}
                                <FaRegPlayCircle className="mr-2 h-5 w-5" />{" "}
                                Digital Card
                              </Button>

                              <Button size="xs" outline>
                                <FaRegCopy className="text-lg" />
                              </Button>
                            </div>
                          </td>
                          <td className=" py-3 border">
                            <div className="grid grid-cols-2 gap-y-2 items-center justify-center">
                              <div className="mx-auto items-center justify-center">
                                <Button size="xs" color="blue">
                                  {" "}
                                  <FaRegPlayCircle className="mr-2 h-5 w-5" />{" "}
                                  RSVP
                                </Button>
                              </div>
                              <div className="mx-auto items-center justify-center">
                                <Button size="xs" color="dark">
                                  {" "}
                                  <RiContactsBook3Line className="mr-2 h-5 w-5" />{" "}
                                  Guestbook
                                </Button>
                              </div>
                              <div className="mx-auto items-center justify-center">
                                <Button size="xs" color="warning">
                                  {" "}
                                  <FaRegEdit className="mr-2 h-5 w-5" /> Update
                                </Button>
                              </div>
                              <div className="mx-auto items-center justify-center">
                                <Button size="xs" color="failure">
                                  {" "}
                                  <MdOutlineDelete className="mr-2 h-5 w-5" />{" "}
                                  Delete
                                </Button>
                              </div>
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
    </>
  );
}

export default RekodTempahanPage;