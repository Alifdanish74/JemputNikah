// import React from 'react'

import { Outlet } from "react-router-dom";
// import Header from "./components/Header";

function Layout() {
  return (
    <div className="">
      {/* <Header /> */}
      <Outlet />
    </div>
  );
}

export default Layout;
