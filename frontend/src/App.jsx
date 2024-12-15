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
import AdminViewDesign from "./adminside/AdminViewDesign";
import ProtectedRoute from "./customhooks/ProtectedRoute";
import { WeddingCardProvider } from "./customhooks/WeddingCardContext";
// import ContactUs from "./pages/ContactUs";
// import WeddingCardPreview from "./pages/WeddingCardPreview";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
// axios.defaults.baseURL = "https://jemput-nikah-backend.vercel.app";
// axios.defaults.baseURL = "https://jemput-nikah-backend.vercel.app";
function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false); // Global loading state
  const excludeHeaderFooterPaths = [
    "/preview",
    "/weddingcardpreview",
    "/weddingcard",
    "/pakejpreview",
    // Base path for weddingcard preview
  ];

  // Check if the current pathname starts with any excluded path
  const showHeaderFooter = !excludeHeaderFooterPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  useEffect(() => {
    // Example: Simulate global loading for data fetching
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500); // Simulate initial loading
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingWrapper isLoading={loading}>
        <UserContextProvider>
          <WeddingCardProvider>
            {showHeaderFooter && <Header />}
            <ToastContainer />
            <Routes>
              {/* PUBLIC ROUTES */}
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route
                  path="/preview/:designName"
                  element={<BaseWeddingCard />}
                />
                <Route path="/kad-digital" element={<KadDigitalPage />} />
                <Route path="/pakej" element={<PakejPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                {/* <Route path="/contact" element={<ContactUs />} /> */}

                <Route
                  path="/weddingcardpreview/:hashtag/:orderNumber"
                  element={<BaseWeddingCard />}
                />
                <Route
                  path="/weddingcard/:hashtag/:orderNumber"
                  element={<BaseWeddingCard />}
                />
                <Route
                  path="/pakejpreview/:pakej"
                  element={<BaseWeddingCard />}
                />

                {/* PROTECTED ROUTE -----------------------------------------------------------------------*/}

                {/* Route for creating a new wedding card booking */}
                <Route
                  path="/kad-digital/tempah/:designName"
                  element={
                    <ProtectedRoute>
                      <BookingPage />
                    </ProtectedRoute>
                  }
                />
                {/* Route for editing an existing wedding card booking */}
                <Route
                  path="/kad-digital/tempah/:designName/:weddingCardId"
                  element={
                    <ProtectedRoute>
                      <BookingPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route path="/tempahan" element={<RekodTempahanPage />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* ADMIN SIDE */}
                <Route
                  path="/admin/upload"
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <AdminUploadPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/uploadsong"
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <AdminUploadSong />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/vieworder"
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <AdminViewOrder />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/viewdesign"
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <AdminViewDesign />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/update-order/:weddingCardId"
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <AdminUpdateOrderPage />
                    </ProtectedRoute>
                  }
                />
                {/* ADMIN SIDE */}

                {/* USER SIDE */}
                <Route
                  path="/tempahan/rsvp/:orderNumber/:_id"
                  element={
                    <ProtectedRoute>
                      <RSVPManagementPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tempahan/guestbook/:orderNumber/:_id"
                  element={
                    <ProtectedRoute>
                      <ViewGuestbookPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/tempahan/wishlist/:orderNumber/:_id"
                  element={
                    <ProtectedRoute>
                      <AddWishlistPage />
                    </ProtectedRoute>
                  }
                />
                {/* USER SIDE */}
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            {showHeaderFooter && <Footer />}
            <ScrollToTopButton />
          </WeddingCardProvider>
        </UserContextProvider>
      </LoadingWrapper>
    </>
  );
}

export default App;
