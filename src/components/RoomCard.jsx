// src/components/RoomCard.jsx
import React from "react";
import { Link } from "react-router-dom";
function Badge({ availableSlots }) {
  const label = availableSlots === 0 ? "Full" : availableSlots <= 2 ? "Limited" : "Available";
  const color = availableSlots === 0 ? "bg-red-500" : availableSlots <= 2 ? "bg-amber-500" : "bg-green-500";
  return (
    <span className={`${color} text-white text-xs font-bold px-2 py-0.5 rounded`}>
      {label}
    </span>
  );
}

function RoomCard({ room }) {
  // Safety guard: if room data is malformed, render nothing
  if (!room) return null;

  const badge =
    room.availableSlots === 0 ? "Full" :
    room.availableSlots <= 2 ? "Limited" : "Available";

  const badgeColor =
    badge === "Full"    ? "bg-red-500" :
    badge === "Limited" ? "bg-amber-500" : "bg-green-500";

  return (
    <div className="bg-[#1A1F2B] border border-[#252B38] rounded-xl overflow-hidden hover:border-yellow-500/30 hover:-translate-y-1 transition-all duration-300">
      <div className="relative">
        {/* Fallback if image URL is missing */}
        <img
          src={room.images?.[0] || "https://placehold.co/400x200/1A1F2B/white?text=No+Image"}
          alt={room.title}
          className="w-full h-44 object-cover"
        />
        <span className={`absolute top-3 left-3 ${badgeColor} text-white text-xs font-bold px-2 py-0.5 rounded`}>
          {badge}
        </span>
      </div>

      <div className="p-4">
        <h3 className="text-white font-semibold">{room.title}</h3>
        <p className="text-yellow-500 font-bold mt-1 text-lg">
          ₹{room.price?.toLocaleString("en-IN")}
          <span className="text-gray-400 text-xs font-normal"> /month</span>
        </p>
        {/* This Link is what navigates to /rooms/1, /rooms/2, etc. */}
        <Link
          to={`/rooms/${room.id}`}
          className="block text-center mt-3 bg-[#0D1117] border border-[#252B38] text-gray-300 font-semibold py-2 rounded text-sm hover:border-yellow-500/40 hover:text-yellow-500 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default RoomCard;