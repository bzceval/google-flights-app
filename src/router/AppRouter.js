import { CircularProgress } from "@mui/material";
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const Navbar = lazy(() => import("../components/Navbar"));
const Footer = lazy(() => import("../components/Footer"));
const Home = lazy(() => import("../pages/Home"));
const FlightsList = lazy(() => import("../pages/FlightsList"));

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<CircularProgress />}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flights" element={<FlightsList />} />
        </Routes>
        <Footer />
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;
