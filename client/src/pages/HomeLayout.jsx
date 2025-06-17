import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import ChatContainer from "./ChatContainer";

const HomeLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default HomeLayout;
