import { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../customhooks/UserContext";
import axios from "axios";
import PengantinSection from "../components/BookingComponent/PengantinSection";
import MajlisSection from "../components/BookingComponent/MajlisSection";
import RSVPSection from "../components/BookingComponent/RSVPSection";
import MoneyGiftSection from "../components/BookingComponent/MoneyGiftSection";
import LainLainSection from "../components/BookingComponent/LainLainSection";
import PakejSection from "../components/BookingComponent/PakejBookingSection";
import { GrCatalog } from "react-icons/gr";
import { GiDiamondRing } from "react-icons/gi";
import { MdEventAvailable } from "react-icons/md";
import { BiMoneyWithdraw, BiListPlus } from "react-icons/bi";
import { IoReceiptOutline } from "react-icons/io5";

function BookingPage() {
  const { designName } = useParams(); // Get the design name from the URL
  const { ready, user } = useContext(UserContext);
  const [design, setDesign] = useState(null); // To store the fetched design data
  const [loading, setLoading] = useState(true); // To show a loading state
  const [activeSection, setActiveSection] = useState("Pakej");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // Fetch design details based on designName
  useEffect(() => {
    const fetchDesign = async () => {
      try {
        const response = await axios.get(
          `/api/admin/get-design-byname/${designName}`
        ); // Call the new API
        setDesign(response.data); // Set the design data
        console.log("Fetch design details: ", response.data);
      } catch (error) {
        console.error("Error fetching design:", error);
      } finally {
        setLoading(false); // Stop loading once the data is fetched
      }
    };

    fetchDesign();
  }, [designName]);

  //   To handle pakej filterations
  const [selectedPakej, setSelectedPakej] = useState("Istanbul");
  // Function to handle pakej change
  const handlePakejChange = (pakej) => {
    setSelectedPakej(pakej);
    handleSectionChange("Pengantin");
    // Update selected pakej class based on user selection
  };

  // To handle form data for all pages
  const [formData, setFormData] = useState({
    // user
    // Pakej
    pakej: "Istanbul",
    designId: "",
    designName: "",
    price: "",
    // design: design._id,
    // Pengantin Section
    pihakMajlis: "L",
    jenisFont: "",
    namaPenuhLelaki: "",
    namaPendekLelaki: "",
    namaPenuhPerempuan: "",
    namaPendekPerempuan: "",
    namaPenuhPasangan1: "",
    namaPenuhPasangan2: "",
    namaPendekPasangan1: "",
    namaPendekPasangan2: "",
    namaBapaPengantin: "",
    namaIbuPengantin: "",
    namaBapaPengantinL: "",
    namaIbuPengantinL: "",
    namaBapaPengantinP: "",
    namaIbuPengantinP: "",
    gambarPengantin: null,
    // Majlis Sections
    tajukMajlis: "Walimatulurus",
    mukadimah: "Assalamualaikum Wbt & Salam Sejahtera",
    ucapanAluan:
      "Dengan penuh kesyukuran kehadrat Ilahi,\n kami mempersilakan Dato'/Datin/Dr/Tuan/Puan/Encik/Cik \nke walimatulurus anakanda kesayangan kami",
    tarikhMajlis: "",
    majlisStart: "10:00",
    majlisEnd: "16:00",
    locationMajlis: "",
    fullLocationMajlis: "",
    googleMapsLink: "",
    wazeLink: "",
    emergencyContacts1: "",
    emergencyNumber1: "",
    emergencyContacts2: "",
    emergencyNumber2: "",
    emergencyContacts3: "",
    emergencyNumber3: "",
    emergencyContacts4: "",
    emergencyNumber4: "",
    eventTentativeTime1: "10:00",
    eventTentativeTitle1: "Majlis Bermula",
    eventTentativeTime2: "12:30",
    eventTentativeTitle2: "Ketibaan Pengantin",
    eventTentativeTime3: "16:00",
    eventTentativeTitle3: "Majlis Tamat",
    eventTentativeTime4: "",
    eventTentativeTitle4: "",
    eventTentativeTime5: "",
    eventTentativeTitle5: "",
    // Money gift info
    bankName: "",
    accountNumber: "",
    qrCode: "",
    // RSVP info
    maxInvitations: "",
    maxInvitationsDewasa: "",
    maxInvitationsKids: "",
    maxDate: "",
    labelSlot1: "",
    maxSlot1: "",
    fromSlot1: "",
    toSlot1: "",
    labelSlot2: "",
    maxSlot2: "",
    fromSlot2: "",
    toSlot2: "",
    labelSlot3: "",
    maxSlot3: "",
    fromSlot3: "",
    toSlot3: "",
    // Lain-lain info
    bgSong: "",
    gallery1: "",
    gallery2: "",
    gallery3: "",
  });
  // Function to handle the form data changes in child components
  const handleFormDataChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Update formData when user is ready and user data is available
  useEffect(() => {
    if (ready && user) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        user: user._id, // Set user._id once the user data is available
      }));
    }
  }, [ready, user]); // This effect runs when `user` or `ready` changes

  // Update formData when design is fetched
  useEffect(() => {
    if (design) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        designId: design._id,
        designName: design.designName, // Set design._id once the design is fetched
      }));
    }
  }, [design]); // This effect runs when `design` changes

  // Function to validate form fields for the current section
  const validateSection = () => {
    const newErrors = {};

    if (activeSection === "Pengantin") {
      if (!formData.namaPenuhLelaki) {
        newErrors.namaPenuhLelaki = "Nama penuh pengantin lelaki is required";
      }
      if (!formData.namaPendekLelaki) {
        newErrors.namaPendekLelaki = "Nama pendek pengantin lelaki is required";
      }
      if (!formData.namaPenuhPerempuan) {
        newErrors.namaPenuhPerempuan =
          "Nama penuh pengantin perempuan is required";
      }
      if (!formData.namaPendekPerempuan) {
        newErrors.namaPendekPerempuan =
          "Nama pendek pengantin perempuan is required";
      }
      if (formData.pihakMajlis === "P" || formData.pihakMajlis === "L") {
        if (!formData.namaBapaPengantin) {
          newErrors.namaBapaPengantin = "Nama bapa pengantin is required";
        }
        if (!formData.namaIbuPengantin) {
          newErrors.namaIbuPengantin = "Nama ibu pengantin is required";
        }
      }
      // Add more checks here based on your requirements
      if (formData.pihakMajlis === "D") {
        if (!formData.namaPenuhPasangan1) {
          newErrors.namaPenuhPasangan1 = "Nama penuh pasangan is required";
        }
        if (!formData.namaPendekPasangan1) {
          newErrors.namaPendekPasangan1 = "Nama pendek pasangan is required";
        }
        if (!formData.namaPenuhPasangan2) {
          newErrors.namaPenuhPasangan2 = "Nama penuh pasangan is required";
        }
        if (!formData.namaPendekPasangan2) {
          newErrors.namaPendekPasangan2 = "Nama pendek pasangan is required";
        }
      }
      if (formData.pihakMajlis === "LL" || formData.pihakMajlis === "PP") {
        if (!formData.namaBapaPengantinL) {
          newErrors.namaBapaPengantinL = "Nama bapa pengantin is required";
        }
        if (!formData.namaIbuPengantinL) {
          newErrors.namaIbuPengantinL = "Nama ibu pengantin is required";
        }
        if (!formData.namaBapaPengantinP) {
          newErrors.namaBapaPengantinP = "Nama bapa pengantin is required";
        }
        if (!formData.namaIbuPengantinP) {
          newErrors.namaIbuPengantinP = "Nama ibu pengantin is required";
        }
      }
    }

    // Add validations for other sections as necessary
    if (activeSection === "Majlis") {
      // Example: Add validation for Majlis section fields
      if (!formData.tajukMajlis)
        newErrors.tajukMajlis = "Tajuk Majlis is required";
      // Add more Majlis validation logic here...
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle final form submission
  async function handleSubmit(ev) {
    ev.preventDefault();
    console.log("Final form data:", formData);
    // Submit the final data
    await axios.post("/api/wedding-cards", formData);
    alert("BOOKING IS DONE! PLEASE COMPLETE YOUR PAYMENT!");
    navigate("/tempahan");
  }

  //   console.log("Design: ", design);
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  if (loading || !ready) {
    return <p>Loading design...</p>;
  }

  if (!design) {
    return <p>Design not found</p>;
  }

  // Function to handle the section change
  const handleSectionChange = (section) => {
    if (validateSection()) {
      setActiveSection(section); // Only change section if the form is valid
    }
  };

  const renderContent = () => {
    switch (activeSection) {
      case "Pakej":
        return (
          <PakejSection
            onPakejChange={handlePakejChange}
            formData={formData}
            handleFormDataChange={handleFormDataChange}
             // Pass errors to child component
          />
        );
      case "Pengantin":
        return (
          <PengantinSection
            onNext={() => handleSectionChange("Majlis")}
            formData={formData}
            handleFormDataChange={handleFormDataChange}
            errors={errors}
          />
        );
      case "Majlis":
        return (
          <MajlisSection
            onPrevious={() => handleSectionChange("Pengantin")}
            onNext={() => handleSectionChange("MoneyGift")}
            formData={formData}
            handleFormDataChange={handleFormDataChange}
          />
        );
      case "MoneyGift":
        return (
          <MoneyGiftSection
            onPrevious={() => handleSectionChange("Majlis")}
            onNext={() => handleSectionChange("RSVP")}
            formData={formData}
            handleFormDataChange={handleFormDataChange}
          />
        ); // Pass onNext prop to change section
      case "RSVP":
        return (
          <RSVPSection
            onPrevious={() => handleSectionChange("MoneyGift")}
            onNext={() => handleSectionChange("Lain-lain")}
            formData={formData}
            handleFormDataChange={handleFormDataChange}
          />
        );
      case "Lain-lain":
        return (
          <LainLainSection
            onPrevious={() => handleSectionChange("RSVP")}
            formData={formData}
            handleFormDataChange={handleFormDataChange}
            submit={handleSubmit}
          />
        );
      default:
        return <div>Hello, please select a section!</div>;
    }
  };

  const sections = [
    { name: "Pakej", label: "Pakej", index: <GrCatalog /> },
    { name: "Pengantin", label: "Pengantin", index: <GiDiamondRing /> },
    { name: "Majlis", label: "Majlis", index: <MdEventAvailable /> },
    { name: "MoneyGift", label: "MoneyGift", index: <BiMoneyWithdraw /> },
    { name: "RSVP", label: "RSVP", index: <IoReceiptOutline /> },
    { name: "Lain-lain", label: "Lain-lain", index: <BiListPlus /> },
  ];

  // Filter out MoneyGift and RSVP if selectedPakej is 'Bali'
  const filteredSections = sections.filter((section) => {
    if (
      selectedPakej === "Bali" &&
      (section.name === "MoneyGift" || section.name === "RSVP")
    ) {
      return false; // Exclude MoneyGift and RSVP when Bali is selected
    }
    return true; // Include all other sections
  });

  return (
    <div className="min-h-screen ">
      <section className="py-8 bg-blue-100  lg:pb-20">
        <div className="lg:flex ">
          {/* Left side */}
          <div className=" w-full rounded-2xl bg-white max-w-lg mx-auto lg:h-screen lg:block">
            {/* <div className="flex items-center mb-4 space-x-4">
              <a
                href="#"
                className="inline-flex items-center text-sm font-medium text-black hover:text-white"
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
            </div> */}
            <div className="block p-8 text-black rounded-lg">
              <img
                className="mx-auto w-3/4 h-3/4 rounded-t-lg object-cover"
                src={`http://localhost:4000/${design.imagepreview}`} // Use the preview image
                alt={`${designName} preview`}
              />
              <h3 className="mb-1 text-4xl font-semibold">{designName}</h3>
              <p className="mb-4 font-light text-black sm:text-lg">
                Category: {design.category}
              </p>
              <div className="grid grid-cols-2">
                <p>Selected Package: {selectedPakej}</p>{" "}
                {/* Display the selected package */}
                <p>Pihak Majlis: {formData.pihakMajlis}</p>{" "}
                <p>ID: {design._id}</p> <p>price: {formData.price}</p>{" "}
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="flex bg-white rounded-2xl items-start mx-auto  px-4 md:px-8 xl:px-10">
            <div className="w-full">
              {/* Navigation */}
              <ol className="flex items-center my-6 text-sm font-medium text-center text-gray-500 lg:mb-4 sm:text-base">
                {filteredSections.map((section) => (
                  <li
                    key={section.name}
                    className={`flex  items-center sm:after:content-[''] after:w-12 after:h-1 after:border-b after:border-gray-300 after:border-1 after:hidden sm:after:inline-block after:mx-6 ${
                      activeSection === section.name ? "text-blue-600" : ""
                    }`}
                  >
                    <button onClick={() => handleSectionChange(section.name)}>
                      <div className="flex items-center sm:block after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200">
                        {activeSection === section.name ? (
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
                          <div className="mr-2 justify-center flex sm:mb-2 sm:mx-auto">
                            {section.index}
                          </div>
                        )}
                        {section.label}
                      </div>
                    </button>
                  </li>
                ))}
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
