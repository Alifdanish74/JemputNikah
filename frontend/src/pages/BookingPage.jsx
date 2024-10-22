import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../customhooks/UserContext";
import axios from "axios";
import PengantinSection from "../components/BookingComponent/PengantinSection";
import MajlisSection from "../components/BookingComponent/MajlisSection";
import RSVPSection from "../components/BookingComponent/RSVPSection";
import MoneyGiftSection from "../components/BookingComponent/MoneyGiftSection";
import LainLainSection from "../components/BookingComponent/LainLainSection";

function BookingPage() {
  const { designName } = useParams(); // Get the design name from the URL
  const { ready } = useContext(UserContext);
  const [design, setDesign] = useState(null); // To store the fetched design data
  const [loading, setLoading] = useState(true); // To show a loading state
  const [activeSection, setActiveSection] = useState("Pengantin");

  // Fetch design details based on designName
  useEffect(() => {
    const fetchDesign = async () => {
      try {
        const response = await axios.get(
          `/api/admin/get-design-byname/${designName}`
        ); // Call the new API
        setDesign(response.data); // Set the design data
      } catch (error) {
        console.error("Error fetching design:", error);
      } finally {
        setLoading(false); // Stop loading once the data is fetched
      }
    };

    fetchDesign();
  }, [designName]);

  console.log("Design: ", design);

  if (loading || !ready) {
    return <p>Loading design...</p>;
  }

  if (!design) {
    return <p>Design not found</p>;
  }

  // Function to handle the section change
  const handleSectionChange = (section) => {
    setActiveSection(section); // Update the active section state
  };

  const renderContent = () => {
    switch (activeSection) {
      case "Pengantin":
        return <PengantinSection onNext={() => handleSectionChange("Majlis")} />;
      case "Majlis":
        return <MajlisSection onPrevious={() => handleSectionChange("Pengantin")} onNext={() => handleSectionChange("MoneyGift")} />;
      case "MoneyGift":
        return <MoneyGiftSection onPrevious={() => handleSectionChange("Majlis")} onNext={() => handleSectionChange("RSVP")} />; // Pass onNext prop to change section
      case "RSVP":
        return <RSVPSection onPrevious={() => handleSectionChange("MoneyGift")} onNext={() => handleSectionChange("Lain-lain")} />;
      case "Lain-lain":
        return <LainLainSection onPrevious={() => handleSectionChange("RSVP")}/>;
      default:
        return <div>Hello, please select a section!</div>;
    }
  };

  return (
    <div className="min-h-screen ">
      {/* <div className="w-1/2 h-screen">
        <h1>BookingPage: {designName}</h1>
        <p>Booking for: {user?.name}</p>
        <p>image preview : {design.designName}</p>

        
        <img
          className="mx-auto w-1/6 h-1/6 rounded-t-lg object-cover"
          src={`http://localhost:4000/${design.imagepreview}`}  // Use the preview image
          alt={`${designName} preview`}
        />
      </div> */}
      <section className="py-8 bg-white  lg:pb-20">
        <div className="lg:flex">
          {/* Left side */}
          <div className=" w-full max-w-lg mx-auto p-12 lg:h-screen lg:block bg-blue-600">
            <div className="flex items-center mb-4 space-x-4">
              <a
                href="#"
                className="inline-flex items-center text-sm font-medium text-blue-100 hover:text-white"
              >
                <svg
                  className="w-6 h-6 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Go back
              </a>
            </div>
            <div className="block p-8 text-white rounded-lg bg-red-500">
              <h3 className="mb-1 text-2xl font-semibold">{designName}</h3>
              <p className="mb-4 font-light text-blue-100 sm:text-lg">
                Category: {design.category}
              </p>
              <img
                className="mx-auto w-3/4 h-3/4 rounded-t-lg object-cover"
                src={`http://localhost:4000/${design.imagepreview}`} // Use the preview image
                alt={`${designName} preview`}
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-start mx-auto  px-4 md:px-8 xl:px-0">
            <div className="w-full">
              {/* Navigation */}
              <ol className="flex items-center my-6 text-sm font-medium text-center text-gray-500  lg:mb-4 sm:text-base">
                {/* Pengantin Header */}
                <li
                  className={`flex items-center sm:after:content-[''] after:w-12 after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 ${
                    activeSection === "Pengantin" ? "text-blue-600" : ""
                  }`}
                >
                  <button onClick={() => handleSectionChange("Pengantin")}>
                    <div className="flex items-center sm:block after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200">
                      {activeSection === "Pengantin" ? (
                        <svg
                          className="w-4 h-4 mr-2 sm:mb-2 sm:w-6 sm:h-6 sm:mx-auto"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      ) : (
                        <div className="mr-2 sm:mb-2 sm:mx-auto">1</div>
                      )}
                      Pengantin
                    </div>
                  </button>
                </li>

                {/* Majlis Header */}
                <li
                  className={`flex items-center after:content-[''] after:w-12 after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 ${
                    activeSection === "Majlis" ? "text-blue-600" : ""
                  }`}
                >
                  <button onClick={() => handleSectionChange("Majlis")}>
                    <div className="flex items-center sm:block after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200">
                      {activeSection === "Majlis" ? (
                        <svg
                          className="w-4 h-4 mr-2 sm:mb-2 sm:w-6 sm:h-6 sm:mx-auto"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      ) : (
                        <div className="mr-2 sm:mb-2 sm:mx-auto">2</div>
                      )}
                      Majlis
                    </div>
                  </button>
                </li>

                {/* MoneyGift Header */}
                <li
                  className={`flex items-center after:content-[''] after:w-12 after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 ${
                    activeSection === "MoneyGift" ? "text-blue-600" : ""
                  }`}
                >
                  <button onClick={() => handleSectionChange("MoneyGift")}>
                    <div className="flex items-center sm:block after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200">
                      {activeSection === "MoneyGift" ? (
                        <svg
                          className="w-4 h-4 mr-2 sm:mb-2 sm:w-6 sm:h-6 sm:mx-auto"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      ) : (
                        <div className="mr-2 sm:mb-2 sm:mx-auto">3</div>
                      )}
                      MoneyGift
                    </div>
                  </button>
                </li>

                {/* RSVP Header */}
                <li
                  className={`flex items-center after:content-[''] after:w-12 after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 ${
                    activeSection === "RSVP" ? "text-blue-600" : ""
                  }`}
                >
                  <button onClick={() => handleSectionChange("RSVP")}>
                    <div className="flex items-center sm:block after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200">
                      {activeSection === "RSVP" ? (
                        <svg
                          className="w-4 h-4 mr-2 sm:mb-2 sm:w-6 sm:h-6 sm:mx-auto"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      ) : (
                        <div className="mr-2 sm:mb-2 sm:mx-auto">4</div>
                      )}
                      RSVP
                    </div>
                  </button>
                </li>

                {/* Other Header */}
                <li
                  className={`flex items-center sm:block ${
                    activeSection === "Lain-lain" ? "text-blue-600" : ""
                  }`}
                >
                  <button onClick={() => handleSectionChange("Lain-lain")}>
                    {activeSection === "Lain-lain" ? (
                      <svg
                        className="w-4 h-4 mr-2 sm:mb-2 sm:w-6 sm:h-6 sm:mx-auto"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    ) : (
                      <div className="mr-2 sm:mb-2 sm:mx-auto">5</div>
                    )}
                    Lain-lain
                  </button>
                </li>
              </ol>
              <div className="section-content">{renderContent()}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BookingPage;
