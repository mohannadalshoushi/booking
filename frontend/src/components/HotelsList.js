
import React, { useEffect, useState } from "react";
import { useHotels } from "../HotelsContext";
import { useNavigate } from "react-router-dom";

const HotelsList = () => {
  const [hotels, setHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State to track search input
  const { setSelectedHotel } = useHotels();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/hotels");
        const data = await response.json();
        setHotels(data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };
    fetchData();
  }, []);

  const handleCardClick = (hotel) => {
    setSelectedHotel(hotel);
    navigate("/hotel-details");
  };

  // Filter hotels based on search term
  const filteredHotels = hotels.filter((hotel) =>
    hotel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Hotels List</h1>
      <input
        type="text"
        placeholder="Search for a hotel..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "10px", width: "100%", marginBottom: "20px" }}
      />
      {filteredHotels.length > 0 ? (
        <ul>
          {filteredHotels.map((hotel) => (
            <li
              key={hotel.id}
              onClick={() => handleCardClick(hotel)}
              style={{ cursor: "pointer" }}
            >
              <h2>{hotel.name}</h2>
              <p>{hotel.description.substring(0, 50)}...</p>
              <img src={hotel.image} alt={hotel.name} width="300" />
            </li>
          ))}
        </ul>
      ) : (
        <p>No hotels found.</p>
      )}
    </div>
  );
};

export default HotelsList;
