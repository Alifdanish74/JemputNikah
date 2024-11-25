/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import PreviewDesign from "../components/PreviewDesign";
import FeaturesSection from "../components/FeatureSection";
import PakejSection from "../components/PakejSection";
import Footer from "../components/Footer";
// import WhatsAppButton from "../components/WhatsappButton";

function HomePage() {
  return (
    <div>
      <HeroSection />
      <PreviewDesign />
      <FeaturesSection />
      <PakejSection />
      
    </div>
  );
}

export default HomePage;
