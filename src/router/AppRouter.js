import React from "react";
import Navbar from "../components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import FlightsList from "../pages/FlightsList";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flights" element={<FlightsList />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default AppRouter;
