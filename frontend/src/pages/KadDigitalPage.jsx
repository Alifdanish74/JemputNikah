import { useEffect, useState } from "react";
import DesignCard from "../components/DesignCard";
import HeaderBackground from "../components/HeaderBackground";
import axios from "axios";
import LoadingWrapper from "../customhooks/LoadingWrapper"; // Import the reusable component

function KadDigitalPage() {
  const [designs, setDesigns] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // Track the selected category
  const [loading, setLoading] = useState(true); // Loading state

  // Filter the designs based on selected category
  const filteredDesigns = selectedCategory
    ? designs.filter((design) => design.category === selectedCategory)
    : designs;

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await axios.get("/api/admin/get-all-design");
        setDesigns(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching designs:", error);
      } finally {
        setLoading(false); // Ensure loading state is updated
      }
    };

    fetchDesigns();
  }, []);

  return (
    <div>
      {/* Use the LoadingWrapper Component */}
      <LoadingWrapper isLoading={loading}>
        {/* Header background */}
        <HeaderBackground H1="Kad Digital" P="Pilih design kad digital anda" />

        {/* Kad Digital Section */}
        <section className="bg-white py-8 antialiased md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div className="mx-auto max-w-5xl">
              <div className="pb-4 lg:flex lg:items-center lg:justify-between">
                <div className="mt-6 gap-4 space-y-4 sm:flex sm:items-center sm:space-y-0 lg:mt-0 lg:justify-end">
                  <select
                    id="category-filter"
                    value={selectedCategory} // Bind to selected category state
                    onChange={(e) => setSelectedCategory(e.target.value)} // Update selected category
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 sm:w-[144px]"
                  >
                    <option value="">All Categories</option>
                    <option value="Floral">Floral</option>
                    <option value="Minimalist">Minimalist</option>
                    <option value="Luxury">Luxury</option>
                    <option value="Motion">Motion</option>
                    <option value="Tradisional">Tradisional</option>
                    {/* <option value="Khat">Khat</option> */}
                    
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filteredDesigns.length > 0 ? (
                  filteredDesigns.map((item, index) => (
                    <DesignCard
                      key={index}
                      itemName={item.designName}
                      itemImage={item.imagepreview}
                      itemCategory={item.category}
                    />
                  ))
                ) : (
                  <p className="text-center col-span-full">
                    No designs found for this category.
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      </LoadingWrapper>
    </div>
  );
}

export default KadDigitalPage;
