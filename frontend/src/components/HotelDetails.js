
import React from "react";
import { useHotels } from "../HotelsContext";
import { useNavigate } from "react-router-dom";

const HotelDetails = () => {
  const { selectedHotel } = useHotels();
  const navigate = useNavigate();

  if (!selectedHotel) {
    return (
      <div>
        <p>No hotel selected. Go back to the list!</p>
        <button onClick={() => navigate("/")}>Back to List</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>{selectedHotel.name}</h1>
      <p><strong>Description:</strong> {selectedHotel.description}</p>
      <p><strong>Location:</strong> {selectedHotel.location}</p>
      <img src={selectedHotel.image} alt={selectedHotel.name} width="400" />
      <br />
      <button onClick={() => navigate("/")}>Back to Hotels</button>
    </div>
  );
};

export default HotelDetails;

