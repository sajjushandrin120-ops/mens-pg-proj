// src/pages/RoomDetails.jsx
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Wifi, Snowflake, Bath, BookOpen, Archive } from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { useAuth } from "../context/AuthContext";

const FACILITY_MAP = {
  wifi:       { label: "WiFi",              Icon: Wifi },
  ac:         { label: "Air Conditioning",  Icon: Snowflake },
  bathroom:   { label: "Attached Bathroom", Icon: Bath },
  studyTable: { label: "Study Table",       Icon: BookOpen },
  wardrobe:   { label: "Wardrobe",          Icon: Archive },
};

function RoomDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { rooms, bookRoom } = useBooking();
  const { user } = useAuth();

  const room = rooms.find((r) => r.id === Number(id));
  const [activeImg, setActiveImg] = useState(0);
  const [booked, setBooked] = useState(false);

  if (!room) return (
    <div className="min-h-screen bg-[#0A0C10] flex items-center justify-center text-white">
      <div className="text-center">
        <p className="text-lg mb-4">Room not found.</p>
        <Link to="/" className="text-yellow-500 hover:underline">← Back to Home</Link>
      </div>
    </div>
  );

  const isFull = room.availableSlots === 0;

  const handleBook = () => {
    if (!user) { navigate("/login"); return; }
    bookRoom(room.id);  // updates global context — Home page badge updates too
    setBooked(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0C10] px-6 py-10 text-white">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-yellow-500 mb-8 text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Rooms
      </Link>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">

        {/* Image gallery */}
        <div>
          <div className="rounded-xl overflow-hidden border border-[#252B38]">
            <img
              src={room.images[activeImg]}
              alt={room.title}
              className="w-full h-72 object-cover"
            />
          </div>

          {room.images.length > 1 && (
            <div className="flex gap-3 mt-3">
              {room.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition
                    ${activeImg === i ? "border-yellow-500" : "border-[#252B38] opacity-60 hover:opacity-100"}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info panel */}
        <div>
          <h1 className="text-3xl font-bold">{room.title}</h1>
          <p className="text-gray-400 mt-1 text-sm">{room.sharingType}</p>

          <p className="text-yellow-500 text-3xl font-bold mt-4">
            ₹{room.price.toLocaleString("en-IN")}
            <span className="text-gray-400 text-sm font-normal"> /month</span>
          </p>

          <p className="text-gray-300 mt-4 text-sm leading-relaxed">{room.description}</p>

          {/* Facilities */}
          <div className="mt-6">
            <h3 className="font-semibold text-sm text-gray-200 mb-3">Facilities</h3>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              {room.facilities.map((key) => {
                const f = FACILITY_MAP[key];
                if (!f) return null;
                return (
                  <div key={key} className="flex items-center gap-2 text-gray-300 text-sm">
                    <f.Icon className="w-4 h-4 text-yellow-500" strokeWidth={1.8} />
                    {f.label}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Availability */}
          <div className="mt-6 flex items-center gap-3">
            <span className={`text-xs font-bold px-3 py-1 rounded ${isFull ? "bg-red-500" : "bg-green-500"}`}>
              {isFull ? "Occupied" : "Vacant"}
            </span>
            <span className="text-gray-400 text-sm">
              {room.availableSlots} of {room.totalSlots} slots available
            </span>
          </div>

          {/* Booking button */}
          <button
            onClick={handleBook}
            disabled={isFull || booked}
            className="mt-6 bg-yellow-500 text-black font-bold px-8 py-3 rounded
                       hover:bg-yellow-400 transition
                       disabled:bg-[#252B38] disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            {booked ? "✓ Booking Confirmed!" : isFull ? "Fully Booked" : "Book Now"}
          </button>

          {!user && !isFull && (
            <p className="text-gray-500 text-xs mt-2">
              You'll be asked to login before booking.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default RoomDetails;