import { useLocation } from "react-router-dom";
import AudioBar from "./component/AudioBar";
import Border from "./component/Border";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import Countdown from "./Countdown";
import DoaPage from "./DoaPage";
import Guestbook from "./Guestbook";
import MainContent from "./MainContent";
import WeddingInfo from "./WeddingInfo";
import { useWeddingCard } from "../customhooks/WeddingCardContext";
import { ToastContainer } from "react-toastify";
import { useEffect, useState, useCallback } from "react";
import Entrance from "./Entrance";
import ParticleComponent from "./component/ParticleComponent";
import PreviewWatermark from "./component/PreviewWatermark";
import EntrancePreview from "./EntrancePreview";
import MainContentPreview from "./MainContentPreview";
import CountdownPreview from "./CountdownPreview";
import WeddingInfoPreview from "./WeddingInfoPreview";
import GuestbookPreview from "./GuestbookPreview";
import DoaPagePreview from "./DoaPagePreview";
import FooterPreview from "./component/FooterPreview";
import EntranceJK00012 from "./EntranceJK00012";

function BaseWeddingCard() {
  const [showEntrance, setShowEntrance] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guestbookUpdated, setGuestbookUpdated] = useState(false);

  const location = useLocation(); // Get the current URL
  const { weddingCard, design, fetchDesign } = useWeddingCard(); // Access WeddingCardContext
  const designName = location.pathname.split("/preview/")[1]; // Extract designName from URL

  // Wrap fetchDesign in useCallback to prevent unnecessary re-renders
  const fetchDesignCallback = useCallback(() => {
    if (designName) {
      fetchDesign(designName);
    }
  }, [designName, fetchDesign]);

  useEffect(() => {
    fetchDesignCallback(); // Fetch design info dynamically if designName exists
  }, [fetchDesignCallback]);

  const handleGuestbookUpdate = () => {
    setGuestbookUpdated(true);
  };

  const handleEntranceClose = () => {
    setShowEntrance(false);
    setIsPlaying(true);
  };

  // const particlesColor = "#f9e4cc"; // Change this value dynamically

  const isPreview = location.pathname.includes("/weddingcardpreview"); // Correct usage of includes
  const isPreviewGeneral = location.pathname.includes(
    "/preview",
    "/preview/Bali"
  ); // Correct usage of includes
  const isJK00012 = location.pathname.includes("/JK00012");

  // Dynamic background style
  const backgroundStyle = {
    backgroundImage:
      designName && design
        ? `url(${design.imagebg})`
        : `url(${weddingCard?.designBgUrl || ""})`, // Fallback to weddingCard designUrl if available
    // backgroundSize: "cover",
    // backgroundPosition: "center",
    // backgroundRepeat: "no-repeat",
    // width: "100%",
    backgroundRepeat: "repeat-y",           // Repeat vertically
    backgroundSize: "cover",                 // Or try 'contain' for some designs
    backgroundPosition: "center",
    minHeight: "100vh",                     // Ensures at least viewport height
    width: "100%",     
  };

  return (
    <div className="main-div main-card h-screen overflow-auto overflow-x-hidden overflow-y-scroll no-scrollbar bg-white z-10"
    style={backgroundStyle}>
      {/* Dynamically set the page title */}

      {showEntrance ? (
        isPreviewGeneral ? (
          <EntrancePreview
            onClose={handleEntranceClose}
            setIsPlaying={setIsPlaying}
          />
        ) : isJK00012 ? (
          <EntranceJK00012 onClose={handleEntranceClose} setIsPlaying={setIsPlaying} />
        ) : (
          <Entrance onClose={handleEntranceClose} setIsPlaying={setIsPlaying} />
        )
      ) : (
        <>
          {isPreview && <PreviewWatermark />}

          <section id="particles">
            <ParticleComponent
              particleColor={`${weddingCard.designParticleColor}`}
            />

            {designName && design && (
              <ParticleComponent particleColor={`${design.particleColor}`} />
            )}
          </section>

          <section id="navbar" className="z-20">
            <Navbar
              onGuestbookUpdate={handleGuestbookUpdate}
              preview={isPreview}
            />
          </section>

          <ToastContainer />

          <section id="maincontent" className="relative">
            {isPreviewGeneral ? <MainContentPreview /> : <MainContent />}

            {/* <AnimatedComponent/> */}
          </section>
          <div className="pb-16" 
          // style={backgroundStyle}
          >
            <section id="audiobar" className="sticky -top-5 z-30 ">
              <AudioBar isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
            </section>

            <section id="weddinginfo" className="container mx-auto">
              {isPreviewGeneral ? <WeddingInfoPreview /> : <WeddingInfo />}
            </section>

            <section id="border">
              <Border />
            </section>

            {isPreviewGeneral ? (
              <section id="countdown">
                <CountdownPreview />
              </section>
            ) : (
              <section id="countdown">
                <Countdown />
              </section>
            )}

            <section id="border">
              <Border />
            </section>

            <section id="guestbook">
              {isPreviewGeneral ? (
                <GuestbookPreview />
              ) : (
                <Guestbook guestbookUpdated={guestbookUpdated} />
              )}
            </section>

            <section id="border-1">
              <Border />
            </section>

            <section id="doa">
              {isPreviewGeneral ? <DoaPagePreview /> : <DoaPage />}
            </section>

            {isPreviewGeneral ? <FooterPreview /> : <Footer />}
          </div>
        </>
      )}
    </div>
  );
}

export default BaseWeddingCard;
