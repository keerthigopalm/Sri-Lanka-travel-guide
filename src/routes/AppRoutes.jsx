import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Destinations from "../pages/Destinations/Destinations";
import Hotels from "../pages/Hotels/Hotels";
import Restaurants from "../pages/Restaurants/Restaurants";
import TravelTips from "../pages/TravelTips/TravelTips";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/hotels" element={<Hotels />} />
      <Route path="/restaurants" element={<Restaurants />} />
      <Route path="/travel-tips" element={<TravelTips />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default AppRoutes;