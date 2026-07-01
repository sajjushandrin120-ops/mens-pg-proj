// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const NAV_LINKS = [
  { label: "HOME",       to: "/" },
  { label: "ABOUT",      to: "/about" },
  { label: "ROOMS",      to: "/#rooms" },
  { label: "FACILITIES", to: "/#facilities" },
  { label: "GALLERY",    to: "/gallery" },
  { label: "CONTACT",    to: "/#contact" },
];

export default function Navbar({ onLoginClick }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Smooth-scroll for hash links instead of hard navigating
  const handleNavClick = (e, to) => {
    if (to.startsWith("/#")) {
      e.preventDefault();
      setMenuOpen(false);
      // If already on home page, just scroll
      if (location.pathname === "/") {
        const el = document.getElementById(to.replace("/#", ""));
        el?.scrollIntoView({ behavior: "smooth" });
      } else {
        // Navigate home then scroll after render
        window.location.href = to;
      }
    } else {
      setMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0A0C10]/96 backdrop-blur-md border-b border-[#252B38] shadow-lg">
      <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-16 md:h-[72px]">

        {/* ── Logo ── */}
        <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
          <svg viewBox="0 0 40 40" className="w-8 h-8" aria-hidden>
            <path d="M3 30L13 14L19 24L24 16L37 30H3Z" fill="#F5A623" />
            <path d="M3 30L13 14L17 21L22 30H3Z" fill="#C8860D" opacity="0.6" />
          </svg>
          <div className="leading-none select-none">
            <p className="text-white font-extrabold text-[15px] tracking-[0.18em]">ZION</p>
            <p className="text-yellow-500 text-[8px] tracking-[0.32em] -mt-0.5">MEN'S PG</p>
          </div>
        </Link>

        {/* ── Desktop nav ── */}
        <div className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map(({ label, to }) => {
            const isActive =
              to === "/" ? location.pathname === "/"
              : location.pathname.startsWith(to.replace("/#", "/").split("/")[1] || "/");
            return (
              <Link
                key={label}
                to={to}
                onClick={(e) => handleNavClick(e, to)}
                className={`text-[11px] font-bold tracking-[0.12em] transition-colors pb-0.5 ${
                  isActive
                    ? "text-yellow-500 border-b border-yellow-500"
                    : "text-gray-300 hover:text-yellow-400"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        {/* ── Auth + CTA ── */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-gray-400 text-xs">
                Hi, <span className="text-yellow-500 font-semibold">{user.name}</span>
              </span>
              <button
                onClick={logout}
                className="border border-[#252B38] text-gray-300 text-xs font-bold
                           px-4 py-2 rounded hover:border-yellow-500/40 hover:text-yellow-500 transition"
              >
                LOGOUT
              </button>
            </>
          ) : (
            <button
              onClick={onLoginClick}
              className="border border-yellow-500/60 text-yellow-500 text-xs font-bold
                         px-4 py-2 rounded hover:bg-yellow-500/10 transition"
            >
              LOGIN
            </button>
          )}

          {/* Book Now — scrolls to #rooms, no 404 */}
          <button
            onClick={(e) => {
              const el = document.getElementById("rooms");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              } else {
                window.location.href = "/#rooms";
              }
            }}
            className="bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-extrabold
                       tracking-wider px-5 py-2.5 rounded transition shadow-md shadow-yellow-500/20"
          >
            BOOK NOW
          </button>
        </div>

        {/* ── Mobile hamburger ── */}
        <button
          className="lg:hidden text-gray-300 hover:text-white transition"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* ── Mobile drawer ── */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0D1117] border-t border-[#252B38] px-5 py-5 flex flex-col gap-4">
          {NAV_LINKS.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              onClick={(e) => handleNavClick(e, to)}
              className="text-gray-300 text-sm font-bold hover:text-yellow-500 transition"
            >
              {label}
            </Link>
          ))}
          <div className="flex gap-3 pt-3 border-t border-[#252B38]">
            {user ? (
              <button onClick={() => { logout(); setMenuOpen(false); }}
                className="flex-1 border border-[#252B38] text-gray-300 text-sm font-bold py-2.5 rounded">
                LOGOUT
              </button>
            ) : (
              <button onClick={() => { onLoginClick(); setMenuOpen(false); }}
                className="flex-1 border border-yellow-500/60 text-yellow-500 text-sm font-bold py-2.5 rounded">
                LOGIN
              </button>
            )}
            <button
              onClick={() => {
                setMenuOpen(false);
                document.getElementById("rooms")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="flex-1 bg-yellow-500 text-black text-sm font-extrabold py-2.5 rounded"
            >
              BOOK NOW
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
