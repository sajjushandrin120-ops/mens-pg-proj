// src/context/BookingContext.jsx
import React, { createContext, useContext, useState } from "react";

const roomsInitialData = [
  {
    id: 1,
    title: "Single Room",
    sharingType: "1 Sharing",
    price: 7500,
    totalSlots: 4,
    availableSlots: 2,
    description: "Perfect for privacy and comfort. Spacious room with all modern amenities.",
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80",
    ],
    facilities: ["ac", "wifi", "bathroom", "studyTable", "wardrobe"],
  },
  {
    id: 2,
    title: "Double Room",
    sharingType: "2 Sharing",
    price: 6500,
    totalSlots: 8,
    availableSlots: 5,
    description: "Ideal for friends. Shared comfort without compromising on space.",
    images: [
      "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&q=80",
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&q=80",
    ],
    facilities: ["wifi", "bathroom", "wardrobe"],
  },
  {
    id: 3,
    title: "Triple Room",
    sharingType: "3 Sharing",
    price: 5500,
    totalSlots: 12,
    availableSlots: 0,
    description: "Affordable group living with all shared essentials covered.",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    ],
    facilities: ["wifi", "bathroom"],
  },
  {
    id: 4,
    title: "4-Sharing Room",
    sharingType: "4 Sharing",
    price: 4500,
    totalSlots: 16,
    availableSlots: 9,
    description: "Best for savings. Budget-friendly with every essential included.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    ],
    facilities: ["wifi", "bathroom", "ac"],
  },
];

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [rooms, setRooms] = useState(roomsInitialData);

  // Decrements availableSlots by 1 for the given room id
  const bookRoom = (roomId) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId && room.availableSlots > 0
          ? { ...room, availableSlots: room.availableSlots - 1 }
          : room
      )
    );
  };

  return (
    <BookingContext.Provider value={{ rooms, bookRoom }}>
      {children}
    </BookingContext.Provider>
  );
}

// Custom hook — import this anywhere you need rooms or bookRoom
export function useBooking() {
  return useContext(BookingContext);
}