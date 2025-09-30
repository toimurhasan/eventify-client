import React from "react";
import { Outlet } from "react-router";
import { Navbar } from "../components/Navbar";

export const RootLayout = () => {
  return (
    <>
      <nav>
        <Navbar></Navbar>
      </nav>
      <main>
        <Outlet></Outlet>
      </main>
    </>
  );
};
