/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal } from "flowbite-react";
import mockup from "../../src/assets/phonemockupframe.png";

function DesignCardAdmin({ itemName, itemImage, itemCategory, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/admin/delete-design/${selectedItem}`);
      toast.error("Design deleted successfully!", {
        autoClose: 2000,
        position: "top-center",
        closeOnClick: true,
      });

      // Notify parent to remove the deleted item
      onDelete(selectedItem);

      setIsModalOpen(false);
    } catch (error) {
      toast.error("Error deleting design", {
        autoClose: 2000,
        position: "top-center",
        closeOnClick: true,
      });
      console.error(error);
      setIsModalOpen(false);
    }
  };

  const openModal = (itemName) => {
    setSelectedItem(itemName);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div>
      {/* Card Component */}
      <div className="sm:max-w-xs mx-auto">
        <h5 className="text-lg md:text-xl mb-2 font-semibold tracking-tight text-gray-900 text-center">
          {itemName}
        </h5>
        <h5 className="hidden text-lg md:text-xl mb-2 font-semibold tracking-tight text-gray-900 text-center">
          {itemCategory}
        </h5>
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg">
          {/* <img
            className="mx-auto w-2/4 rounded-t-lg object-cover my-2"
            src={itemImage}
            alt="product image"
          /> */}
          <div className="relative my-3 h-[200px] ">
            <img
              // className="absolute w-[91px] left-1/2 transform -translate-x-1/2 bottom-5 z-0"
              className="w-[100px] h-[200px] absolute left-1/2 top-1 transform -translate-x-1/2  z-0 rounded-2xl"
              src={itemImage}
              alt="item"
            />
            {/* Gambar phone */}
            <img
              className="absolute w-[100px]  h-[200px] top-1 left-1/2 transform -translate-x-1/2 bottom-5 z-0"
              // className="w-[200px] h-[200px] absolute left-1/2 transform -translate-x-1/2  z-0"
              src={mockup}
              alt="item"
            />
          </div>

          <div className="grid grid-cols-2 rounded-lg bg-gray-50">
            <div className="border-r py-2 w-full text-sm rounded-bl-xl border-black hover:bg-black hover:text-white">
              <a href="/preview-card" target="_blank">
                Preview
              </a>
            </div>
            <button
              onClick={() => openModal(itemName)}
              className="border-l py-2 rounded-br-xl text-sm text-black border-black bg-red-500 hover:bg-black hover:text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <Modal show={isModalOpen} onClose={closeModal}>
        <Modal.Header>Confirm Delete</Modal.Header>
        <Modal.Body>
          <p className="text-gray-700">
            Are you sure you want to delete the design <b>{selectedItem}</b>?
            This action cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            onClick={handleDelete}
          >
            Confirm
          </button>
          <button
            className="bg-gray-300 text-black py-2 px-4 rounded hover:bg-gray-400"
            onClick={closeModal}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default DesignCardAdmin;
