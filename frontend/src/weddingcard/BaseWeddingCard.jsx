// import React from 'react'

import AudioBar from "./component/AudioBar";
import Border from "./component/Border";
import Footer from "./component/Footer";
// import { Border } from "./component/Border";
import Navbar from "./component/Navbar";
import Countdown from "./Countdown";
import DoaPage from "./DoaPage";
import Guestbook from "./Guestbook";
import MainContent from "./MainContent";
import WeddingInfo from "./WeddingInfo";
import { WeddingCardProvider } from "../customhooks/WeddingCardContext";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import Entrance from "./Entrance";

function BaseWeddingCard() {
  const [showEntrance, setShowEntrance] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [guestbookUpdated, setGuestbookUpdated] = useState(false);

  const handleGuestbookUpdate = () => {
    setGuestbookUpdated(true);
  };

  const handleEntranceClose = () => {
    setShowEntrance(false);
    setIsPlaying(true);
    console.log("audio", isPlaying);
  };

  return (
    <WeddingCardProvider>
      <div className="main-div main-card h-screen overflow-auto overflow-x-hidden overflow-y-scroll no-scrollbar bg-white z-10">
        {showEntrance ? (
          <Entrance onClose={handleEntranceClose} setIsPlaying={setIsPlaying} />
        ) : (
          // <AudioBar isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
          <>
            <section id="navbar" className="z-20">
              <Navbar onGuestbookUpdate={handleGuestbookUpdate} />
            </section>

            <ToastContainer />

            <section id="maincontent">
              <MainContent />
            </section>

            <section id="audiobar">
              <AudioBar isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
              {/* <AudioBar showEntrance={showEntrance} /> */}
            </section>

            <div className="pb-16 background-base">
              <section id="weddinginfo" className="container mx-auto">
                <WeddingInfo />
              </section>

              <section id="border">
                <Border />
              </section>

              <section id="countdown" className="">
                <Countdown />
              </section>

              <section id="border">
                <Border />
              </section>

              <section id=" guestbook">
                <Guestbook guestbookUpdated={guestbookUpdated} />
              </section>

              <section id="border-1">
                <Border />
              </section>

              <section id="doa">
                <DoaPage />
              </section>

              <Footer />
            </div>
          </>
        )}
      </div>
    </WeddingCardProvider>
  );
}

export default BaseWeddingCard;
