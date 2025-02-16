/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import PreviewDesign from "../components/PreviewDesign";
import FeaturesSection from "../components/FeatureSection";
import PakejSection from "../components/PakejSection";
import Footer from "../components/Footer";
import FAQ from "../components/FAQ";
import { Helmet } from "react-helmet-async";
// import WhatsAppButton from "../components/WhatsappButton";

function HomePage() {
  return (
    <>
      <Helmet>
        <title>Jemput Kahwin - Kad Jemputan Digital</title>
        <meta
          name="description"
          content="Tempah kad jemputan digital eksklusif untuk majlis perkahwinan anda dengan Jemput Kahwin."
        />
        <meta
          name="keywords"
          content="kad kahwin, kad kawin, digital wedding card, kad kahwin digital, kad kawin digital, kad jemputan digital, kad kahwin murah, kad jemputan kahwin, kahwinnow, kad digital kahwinnow, kahwinnow digital card, digital kad, digital invitation, jemputan, contoh kad kahwin, kad undangan digital"
        />
        <meta name="author" content="Jemput Kahwin" />

        <meta
          property="og:title"
          content="Jemput Kahwin - Kad Jemputan Digital"
        />
        <meta
          property="og:description"
          content="Tempah kad jemputan digital dengan pelbagai design yang menarik."
        />
        <meta
          property="og:image"
          content="https://jemputkahwin.com.my/assets/phone-mockup-removebg-CFus9G_1.png"
        />
        <meta property="og:url" content="https://jemputkahwin.com.my/" />
        <meta property="og:type" content="website" />

        {/* Twitter Card for Sharing */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Jemput Kahwin - Kad Jemputan Digital"
        />
        <meta
          name="twitter:description"
          content="Tempah kad jemputan digital eksklusif untuk majlis perkahwinan anda."
        />
        <meta
          name="twitter:image"
          content="https://jemputkahwin.com.my//assets/popup.png"
        />
      </Helmet>
      <div>
        <HeroSection />
        <PreviewDesign />
        <FeaturesSection />
        <PakejSection />
        <FAQ />
      </div>
    </>
  );
}

export default HomePage;
