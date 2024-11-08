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
import AdminUploadPage from "./adminside/AdminUploadPage";
import BookingPage from "./pages/BookingPage";
import RekodTempahanPage from "./pages/RekodTempahanPage";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import AdminUploadSong from "./adminside/AdminUploadSongPage";
import AdminDashboard from "./adminside/AdminDashboard";
// import WeddingCardPreview from "./pages/WeddingCardPreview";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;
function App() {
  const location = useLocation();
  const excludeHeaderFooterPaths = [
    "/preview-card",
    "/weddingcardpreview", // Base path for weddingcard preview
  ];

  // Check if the current pathname starts with any excluded path
  const showHeaderFooter = !excludeHeaderFooterPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      <UserContextProvider>
        
        {showHeaderFooter && <Header />}
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/preview-card" element={<BaseWeddingCard />} />
            <Route path="/kad-digital" element={<KadDigitalPage />} />
            <Route
              path="/kad-digital/tempah/:designName"
              element={<BookingPage />}
            />
            <Route path="/pakej" element={<PakejPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin/upload" element={<AdminUploadPage />} />
            <Route path="/admin/uploadsong" element={<AdminUploadSong />} />
            <Route path="/tempahan" element={<RekodTempahanPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/weddingcardpreview/:designName/:tajukMajlis/:orderNumber"
              element={<BaseWeddingCard />}
            />
          </Route>
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
        {showHeaderFooter && <Footer />}
        <ScrollToTopButton />
      </UserContextProvider>
    </>
  );
}

export default App;
