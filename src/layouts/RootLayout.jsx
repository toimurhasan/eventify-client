import React from "react";
import { Outlet } from "react-router";
import { Navbar } from "../components/Navbar";
import { ToastContainer } from "react-toastify";

export const RootLayout = () => {
  return (
    <>
      <nav>
        <Navbar></Navbar>
      </nav>
      <main>
        <Outlet></Outlet>
      </main>
      <ToastContainer />
    </>
  );
};
