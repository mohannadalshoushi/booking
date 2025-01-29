import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HotelsList from "./components/HotelsList";
import HotelDetails from "./components/HotelDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HotelsList />} />
        <Route path="/hotel-details" element={<HotelDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
