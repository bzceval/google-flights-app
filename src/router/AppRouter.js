import React from "react";
import Navbar from "../components/Navbar";
import { BrowserRouter } from "react-router-dom";
import Footer from "../components/Footer";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
