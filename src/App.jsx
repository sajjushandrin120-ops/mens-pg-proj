// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RoomDetails from "./pages/RoomDetails";

// Simple fallback — no crash for unbuilt pages
function NotFound() {
  return (
    <div className="min-h-screen bg-[#0A0C10] flex flex-col items-center justify-center text-white gap-4">
      <h1 className="text-4xl font-bold text-yellow-500">404</h1>
      <p className="text-gray-400">This page doesn't exist yet.</p>
      <a href="/" className="text-yellow-500 underline hover:text-yellow-400">
        ← Back to Home
      </a>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        {/* Catch-all: ANY unmatched route renders NotFound */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;