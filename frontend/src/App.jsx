import { Routes, Route } from "react-router";
import "./App.css";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import BaseWeddingCard from "./weddingcard/BaseWeddingCard";
import ScrollToTopButton from "./components/ScrollToTopButton";
import KadDigitalPage from "./pages/KadDigitalPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { useLocation } from "react-router-dom";
import PakejPage from "./pages/PakejPage";

function App() {
  const location = useLocation();
  const noHeaderFooterRoutes = ["/preview-card"]; // Add routes where you don't want the Header and Footer

  const showHeaderFooter = !noHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
      {showHeaderFooter && <Header />}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/preview-card" element={<BaseWeddingCard />} />
          <Route path="/kad-digital" element={<KadDigitalPage />} />
          <Route path="/pakej" element={<PakejPage />} />
        </Route>
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      {showHeaderFooter && <Footer />}
      <ScrollToTopButton />
    </>
  );
}

export default App;
