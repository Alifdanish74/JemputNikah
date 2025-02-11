import { useEffect, useState } from "react";
import axios from "axios";
import LoadingWrapper from "../customhooks/LoadingWrapper"; // Import the reusable component
import DesignCardAdmin from "./DesignCardAdmin";

function AdminViewDesign() {
  const [designs, setDesigns] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // Track the selected category
  const [loading, setLoading] = useState(true); // Loading state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/admin/get-all-design`, {
          params: { category: selectedCategory || undefined, page },
        });

        if (response.data && response.data.designs) {
          setDesigns(response.data.designs);
          setTotalPages(response.data.totalPages || 1);
        } else {
          setDesigns([]);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Error fetching designs:", error);
        setDesigns([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, [selectedCategory, page]);

  // Handle category filtering
  const filteredDesigns = selectedCategory
    ? designs.filter((design) => design.category === selectedCategory)
    : designs;

  // Remove a design from the designs state after deletion
  const removeDesign = (designName) => {
    setDesigns((prevDesigns) =>
      prevDesigns.filter((design) => design.designName !== designName)
    );
  };

  return (
    <div>
      {/* Use the LoadingWrapper Component */}
      <LoadingWrapper isLoading={loading}>
        {/* Header background */}

        {/* Kad Digital Section */}
        <section className="bg-white py-8 antialiased md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div className="mx-auto max-w-5xl">
              <div className="pb-4 lg:flex lg:items-center lg:justify-between">
                <div className="mt-6 gap-4 space-y-4 sm:flex sm:items-center sm:space-y-0 lg:mt-0 lg:justify-end">
                  <select
                    id="category-filter"
                    value={selectedCategory} // Bind to selected category state
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setPage(1); // Reset to first page when category changes
                    }}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 sm:w-[144px]"
                  >
                    <option value="">All Categories</option>
                    <option value="Floral">Floral</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Tradisional">Tradisional</option>
                    <option value="Khat">Khat</option>
                    <option value="Minimalist">Minimalist</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {filteredDesigns.length > 0 ? (
                  filteredDesigns.map((item, index) => (
                    <DesignCardAdmin
                      key={index}
                      itemName={item.designName}
                      itemImage={item.imagepreview}
                      itemCategory={item.category}
                      onDelete={removeDesign} // Pass the removeDesign function
                    />
                  ))
                ) : (
                  <p className="text-center col-span-full">
                    No designs found for this category.
                  </p>
                )}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-4">
                  <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className={`px-4 py-2 border rounded ${
                      page === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-blue-500"
                    }`}
                  >
                    Previous
                  </button>
                  <span className="text-lg">{`Page ${page} of ${totalPages}`}</span>
                  <button
                    onClick={() =>
                      setPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={page === totalPages}
                    className={`px-4 py-2 border rounded ${
                      page === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-blue-500"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
      </LoadingWrapper>
    </div>
  );
}

export default AdminViewDesign;
