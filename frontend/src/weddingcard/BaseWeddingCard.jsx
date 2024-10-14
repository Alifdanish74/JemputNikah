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

function BaseWeddingCard() {
  return (
    <div className="main-div main-card h-screen overflow-auto overflow-y-scroll no-scrollbar bg-white z-10">
      <>
        <section id="navbar" className="z-20">
          <Navbar />
        </section>

        <section id="maincontent">
          <MainContent />
        </section>

        <section id="audiobar">
          <AudioBar />
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
            <Guestbook />
          </section>

          <section id="border-1">
            <Border />
          </section>

          <section id="doa">
            <DoaPage/>
          </section>

          <Footer/>
        </div>
      </>
    </div>
  );
}

export default BaseWeddingCard;
