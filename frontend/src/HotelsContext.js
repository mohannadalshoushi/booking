import React, { createContext, useState, useContext } from "react";

// Create the context
const HotelsContext = createContext();

// Provider component
export const HotelsProvider = ({ children }) => {
  const [selectedHotel, setSelectedHotel] = useState(null);

  return (
    <HotelsContext.Provider value={{ selectedHotel, setSelectedHotel }}>
      {children}
    </HotelsContext.Provider>
  );
};

// Custom hook for consuming the context
export const useHotels = () => {
  return useContext(HotelsContext);
};
