import { useEffect, useState } from "react";
import DesignCard from "../components/DesignCard";
import HeaderBackground from "../components/HeaderBackground";
import axios from "axios";
import LoadingWrapper from "../customhooks/LoadingWrapper"; // Import the reusable component

function KadDigitalPage() {
  const [designs, setDesigns] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // Track the selected category
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Track pagination
  const [totalPages, setTotalPages] = useState(1);

  // Fetch designs when the page or category changes
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

  return (
    <div>
      <LoadingWrapper isLoading={loading}>
        <HeaderBackground H1="Kad Digital" P="Pilih design kad digital anda" />

        <section className="bg-white py-8 antialiased md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div className="mx-auto max-w-5xl">
              <div className="pb-4 lg:flex lg:items-center lg:justify-between">
                <div className="mt-6 gap-4 space-y-4 sm:flex sm:items-center sm:space-y-0 lg:mt-0 lg:justify-end">
                  <select
                    id="category-filter"
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setPage(1); // Reset to first page when category changes
                    }}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 sm:w-[144px]"
                  >
                    <option value="">All Categories</option>
                    <option value="Floral">Floral</option>
                    <option value="Minimalist">Minimalist</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Motion">Motion</option>
                    <option value="Tradisional">Tradisional</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {designs.length > 0 ? (
                  designs.map((item, index) => (
                    <DesignCard
                      key={index}
                      itemName={item.designName}
                      itemImage={item.imagepreview}
                      itemCategory={item.category}
                    />
                  ))
                ) : (
                  <p className="text-center col-span-full">No designs found for this category.</p>
                )}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-4">
                  <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                    className={`px-4 py-2 border rounded ${page === 1 ? "text-gray-400 cursor-not-allowed" : "text-blue-500"}`}
                  >
                    Previous
                  </button>
                  <span className="text-lg">{`Page ${page} of ${totalPages}`}</span>
                  <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                    className={`px-4 py-2 border rounded ${page === totalPages ? "text-gray-400 cursor-not-allowed" : "text-blue-500"}`}
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

export default KadDigitalPage;
