// AdminUpdateOrderPage.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, TextInput, Label } from "flowbite-react";
import { toast } from "react-toastify";

function AdminUpdateOrderPage() {
  const { weddingCardId } = useParams(); // Fetch ID from the URL
  const navigate = useNavigate();
  const [weddingCardData, setWeddingCardData] = useState(null);
  const [editableFields, setEditableFields] = useState({}); // Track editability of fields
  const [loading, setLoading] = useState(true);

  // Fetch wedding card details on mount
  useEffect(() => {
    const fetchWeddingCard = async () => {
      try {
        const response = await axios.get(`/api/wedding-cards/${weddingCardId}`);
        setWeddingCardData(response.data);

        // Initialize all fields as non-editable
        const initialEditableState = Object.keys(response.data).reduce(
          (acc, key) => ({ ...acc, [key]: false }),
          {}
        );
        setEditableFields(initialEditableState);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching wedding card data:", error);
        toast.error("Error fetching wedding card data", {
          autoClose: 2000,
          position: "top-center",
          closeOnClick: true,
        });
        setLoading(false);
      }
    };
    fetchWeddingCard();
  }, [weddingCardId]);

  // Handle input change for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWeddingCardData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Toggle field editability
  const toggleEditField = (key) => {
    setEditableFields((prevState) => ({
      ...prevState,
      [key]: !prevState[key], // Toggle the edit state
    }));
  };

  // Handle form submission to update wedding card data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/wedding-cards/${weddingCardId}`, weddingCardData);
      toast.success("Wedding card updated successfully!", {
        autoClose: 2000,
        position: "top-center",
        closeOnClick: true,
      });
      navigate("/admin/vieworder"); // Redirect to orders page after update
    } catch (error) {
      console.error("Error updating wedding card:", error);
      toast.error("Error updating wedding card", {
        autoClose: 2000,
        position: "top-center",
        closeOnClick: true,
      });
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4 bg-white rounded shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">
        Update Wedding Card Details
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Iterate through weddingCardData fields for form inputs */}
        {Object.entries(weddingCardData).map(
          ([key, value]) =>
            key !== "qrCode" && // Exclude image field
            key !== "gallery" && (
              <div key={key} className="flex items-center space-x-4">
                <div className="flex-grow">
                  <Label
                    htmlFor={key}
                    value={key.replace(/([A-Z])/g, " $1").toUpperCase()}
                  />
                  <TextInput
                    id={key}
                    name={key}
                    value={value}
                    onChange={handleInputChange}
                    placeholder={`Enter ${key}`}
                    disabled={!editableFields[key]} // Disable input if not editable
                  />
                </div>
                <Button
                  color={editableFields[key] ? "failure" : "warning"}
                  onClick={() => toggleEditField(key)}
                >
                  {editableFields[key] ? "Lock" : "Edit"}
                </Button>
              </div>
            )
        )}

        <Button type="submit" color="success" className="w-full">
          Save Changes
        </Button>
      </form>
    </div>
  );
}

export default AdminUpdateOrderPage;
