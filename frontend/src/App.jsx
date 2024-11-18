import { Routes, Route } from "react-router";
import "./App.css";
import "./fonts.css";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import BaseWeddingCard from "./weddingcard/BaseWeddingCard";
import ScrollToTopButton from "./components/ScrollToTopButton";
import KadDigitalPage from "./pages/KadDigitalPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import axios from "axios";
import { useLocation } from "react-router-dom";
import PakejPage from "./pages/PakejPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./customhooks/UserContext";
import AdminUploadPage from "./adminside/AdminUploadDesignPage";
import BookingPage from "./pages/BookingPage";
import RekodTempahanPage from "./pages/RekodTempahanPage";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import AdminUploadSong from "./adminside/AdminUploadSongPage";
import AdminDashboard from "./adminside/AdminDashboard";
import AdminViewOrder from "./adminside/AdminViewOrderPage";
import AdminUpdateOrderPage from "./adminside/AdminUpdateOrderPage";
import RSVPManagementPage from "./userside/RSVPManagementPage";
import ViewGuestbookPage from "./userside/ViewGuestbookPage";
import AddWishlistPage from "./userside/AddWishlistPage";
import NotFound from "./pages/NotFound";
import LoadingWrapper from "./customhooks/LoadingWrapper";
import { useEffect, useState } from "react";
// import WeddingCardPreview from "./pages/WeddingCardPreview";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
// axios.defaults.baseURL = "https://jemput-nikah-backend.vercel.app";
// axios.defaults.baseURL = "https://jemput-nikah-backend.vercel.app";
axios.defaults.withCredentials = true;
function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false); // Global loading state
  const excludeHeaderFooterPaths = [
    "/preview-card",
    "/weddingcardpreview",
    // Base path for weddingcard preview
  ];

  // Check if the current pathname starts with any excluded path
  const showHeaderFooter = !excludeHeaderFooterPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  useEffect(() => {
    // Example: Simulate global loading for data fetching
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1500); // Simulate initial loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
    <LoadingWrapper isLoading={loading}>
      <UserContextProvider>
        {showHeaderFooter && <Header />}
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/preview-card" element={<BaseWeddingCard />} />
            <Route path="/kad-digital" element={<KadDigitalPage />} />
            {/* Route for creating a new wedding card booking */}
            <Route
              path="/kad-digital/tempah/:designName"
              element={<BookingPage />}
            />
            {/* Route for editing an existing wedding card booking */}
            <Route
              path="/kad-digital/tempah/:designName/:weddingCardId"
              element={<BookingPage />}
            />

            <Route path="/pakej" element={<PakejPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/tempahan" element={<RekodTempahanPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/weddingcardpreview/:designName/:tajukMajlis/:orderNumber"
              element={<BaseWeddingCard />}
            />
            {/* ADMIN SIDE */}
            <Route path="/admin/upload" element={<AdminUploadPage />} />
            <Route path="/admin/uploadsong" element={<AdminUploadSong />} />
            <Route path="/admin/vieworder" element={<AdminViewOrder />} />
            <Route path="/admin/update-order/:weddingCardId" element={<AdminUpdateOrderPage />} />
            {/* ADMIN SIDE */}

            {/* USER SIDE */}
            <Route path="/tempahan/rsvp/:orderNumber" element={<RSVPManagementPage />} />
            <Route path="/tempahan/guestbook/:orderNumber" element={<ViewGuestbookPage />} />
            <Route path="/tempahan/wishlist/:orderNumber" element={<AddWishlistPage />} />
            {/* USER SIDE */}
          </Route>
          <Route path="*" element={<NotFound/>} />
        </Routes>
        {showHeaderFooter && <Footer />}
        <ScrollToTopButton />
      </UserContextProvider>
      </LoadingWrapper>
    </>
  );
}

export default App;
