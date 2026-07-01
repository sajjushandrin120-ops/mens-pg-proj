// src/pages/Home.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, MapPin, Wifi, Shield, Clock, Star, ChevronLeft, Phone, Mail, MapPinned } from "lucide-react";
import { useBooking } from "../context/BookingContext";
import FacilitiesSection from "../components/FacilitiesSection";

// ── Hero background (high-quality building shot) ─────────────────────────────
const HERO_BG =
  "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80";

// ── Testimonials (static) ────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: "Amit Sharma",  room: "2 Sharing Room", stars: 5, text: "Zion PG feels like home. Great environment and supportive management." },
  { name: "Rohit Verma",  room: "3 Sharing Room", stars: 5, text: "Clean rooms, good facilities and pocket-friendly. Highly recommended!" },
  { name: "Vikash Gupta", room: "1 Sharing Room", stars: 5, text: "The best PG I have stayed in. Safe, comfortable and convenient." },
];

// ── Why Choose section ───────────────────────────────────────────────────────
const WHY_ITEMS = [
  { icon: MapPin,  title: "Prime Location",      desc: "Located in safe and accessible areas." },
  { icon: Shield,  title: "Affordable Prices",   desc: "Best in class rooms at affordable prices." },
  { icon: Clock,   title: "Hassle Free Booking", desc: "Easy online booking and quick move-in." },
  { icon: Wifi,    title: "Trusted & Secure",    desc: "Your safety and comfort are our priority." },
];

// ── Availability badge helper ─────────────────────────────────────────────────
function Badge({ availableSlots }) {
  if (availableSlots === 0)  return <span className="badge bg-red-500">Full</span>;
  if (availableSlots <= 2)   return <span className="badge bg-amber-500">Limited</span>;
  return <span className="badge bg-green-500">Available</span>;
}

// ── Room card ────────────────────────────────────────────────────────────────
function RoomCard({ room }) {
  return (
    <div className="bg-[#1A1F2B] border border-[#252B38] rounded-xl overflow-hidden
                    hover:border-yellow-500/30 hover:-translate-y-1
                    transition-all duration-300 flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={room.images?.[0] || "https://placehold.co/400x220/1A1F2B/white?text=Room"}
          alt={room.title}
          className="w-full h-44 object-cover hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge availableSlots={room.availableSlots} />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-white font-semibold text-sm md:text-base">{room.title}</h3>
        <p className="text-yellow-500 font-bold text-lg mt-1">
          ₹{room.price?.toLocaleString("en-IN")}
          <span className="text-gray-500 text-xs font-normal"> /month</span>
        </p>

        {/* This is the fully functional View Details link */}
        <Link
          to={`/rooms/${room.id}`}
          className="mt-auto pt-3 block text-center bg-[#0D1117] border border-[#252B38]
                     text-gray-300 text-sm font-bold py-2.5 rounded
                     hover:border-yellow-500/50 hover:text-yellow-500 transition-all"
        >
          VIEW DETAILS
        </Link>
      </div>
    </div>
  );
}

// ── Room option card (the grid below hero) ────────────────────────────────────
function RoomOptionCard({ room }) {
  const beds = { "1 Sharing": 1, "2 Sharing": 2, "3 Sharing": 3, "4 Sharing": 4 };
  const count = beds[room.sharingType] || 1;

  return (
    <div className="bg-[#141820] border border-[#252B38] rounded-xl p-5 text-center
                    hover:border-yellow-500/30 hover:-translate-y-1 transition-all duration-300">
      {/* Bed icons */}
      <div className="flex justify-center gap-1 mb-3">
        {Array.from({ length: count }).map((_, i) => (
          <svg key={i} viewBox="0 0 24 24" className="w-7 h-7" fill="#F5A623">
            <rect x="2" y="11" width="20" height="8" rx="2" />
            <rect x="3" y="6"  width="7"  height="6" rx="1" />
          </svg>
        ))}
      </div>
      <h4 className="text-white font-bold text-sm">{room.sharingType}</h4>
      <p className="text-gray-400 text-xs mt-1 mb-2">{room.description?.slice(0, 45)}…</p>
      <p className="text-yellow-500 font-extrabold text-base">
        ₹{room.price?.toLocaleString("en-IN")}
        <span className="text-gray-500 text-xs font-normal"> /month</span>
      </p>
      <Link
        to={`/rooms/${room.id}`}
        className="mt-3 block border border-[#252B38] text-gray-300 text-xs font-bold py-2 rounded
                   hover:border-yellow-500/50 hover:text-yellow-500 transition"
      >
        VIEW ROOMS
      </Link>
    </div>
  );
}

// ── Testimonial card ──────────────────────────────────────────────────────────
function TestimonialCard({ t }) {
  return (
    <div className="bg-[#1A1F2B] border border-[#252B38] rounded-xl p-5 flex-shrink-0 w-72">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 rounded-full bg-yellow-500/20 border border-yellow-500/40
                        flex items-center justify-center text-yellow-500 font-bold text-sm">
          {t.name[0]}
        </div>
        <div>
          <p className="text-white text-sm font-semibold">{t.name}</p>
          <p className="text-gray-400 text-xs">{t.room}</p>
        </div>
      </div>
      <p className="text-gray-300 text-sm leading-relaxed">"{t.text}"</p>
      <div className="flex gap-0.5 mt-3">
        {Array.from({ length: t.stars }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
        ))}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
//  HOME PAGE
// ═══════════════════════════════════════════════════════════════════════════════
function Home() {
  const { rooms } = useBooking();
  const navigate = useNavigate();

  // Search bar state
  const [search, setSearch] = useState({ location: "", sharing: "", date: "" });
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/rooms");
  };

  // Testimonial pagination
  const prevT = () => setTestimonialIdx((i) => Math.max(i - 1, 0));
  const nextT = () => setTestimonialIdx((i) => Math.min(i + 1, TESTIMONIALS.length - 1));

  return (
    <div className="bg-[#0A0C10] min-h-screen font-sans">

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[580px] flex items-center overflow-hidden">
        {/* Background building image */}
        <img
          src={HERO_BG}
          alt="Zion PG Building"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark overlay gradient — left heavy so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0C10] via-[#0A0C10]/80 to-[#0A0C10]/20" />

        {/* Hero content */}
        <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full py-20">
          <div className="max-w-lg">
            <h1 className="font-extrabold text-white leading-[1.05] tracking-tight"
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
              COMFORT.
              <br />
              <span className="text-yellow-500">CONVENIENCE.</span>
              <br />
              CARE.
            </h1>
            <p className="text-gray-300 mt-3 text-base md:text-lg">A Home Away From Home.</p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mt-5 text-xs text-gray-300">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-yellow-500" /> Safe & Secure Environment
              </span>
              <span className="flex items-center gap-1.5">
                <Wifi className="w-3.5 h-3.5 text-yellow-500" /> Clean & Hygienic Rooms
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-yellow-500" /> 24/7 Support
              </span>
            </div>

            <Link
              to="/#rooms"
              className="inline-flex items-center gap-2 mt-7 bg-yellow-500 text-black
                         font-extrabold text-sm px-7 py-3.5 rounded
                         hover:bg-yellow-400 transition shadow-xl shadow-yellow-500/25"
            >
              BOOK YOUR ROOM <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ── Search bar — overlapping the hero bottom ── */}
        <form
          onSubmit={handleSearch}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-20
                     w-[92%] max-w-4xl bg-white rounded-xl shadow-2xl
                     grid grid-cols-1 md:grid-cols-4 gap-0 overflow-hidden"
        >
          <div className="flex flex-col px-5 py-4 border-b md:border-b-0 md:border-r border-gray-200">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Location</label>
            <input
              type="text"
              placeholder="Enter Location"
              value={search.location}
              onChange={(e) => setSearch({ ...search, location: e.target.value })}
              className="text-sm text-gray-700 outline-none placeholder-gray-300"
            />
          </div>
          <div className="flex flex-col px-5 py-4 border-b md:border-b-0 md:border-r border-gray-200">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Sharing Type</label>
            <select
              value={search.sharing}
              onChange={(e) => setSearch({ ...search, sharing: e.target.value })}
              className="text-sm text-gray-700 outline-none bg-transparent"
            >
              <option value="">Select Sharing</option>
              <option>1 Sharing</option>
              <option>2 Sharing</option>
              <option>3 Sharing</option>
              <option>4 Sharing</option>
            </select>
          </div>
          <div className="flex flex-col px-5 py-4 border-b md:border-b-0 md:border-r border-gray-200">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Check-In Date</label>
            <input
              type="date"
              value={search.date}
              onChange={(e) => setSearch({ ...search, date: e.target.value })}
              className="text-sm text-gray-700 outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-[#0D1117] text-white font-extrabold text-sm tracking-wider
                       px-6 py-4 hover:bg-yellow-500 hover:text-black transition-all"
          >
            SEARCH ROOMS
          </button>
        </form>
      </section>

      {/* spacer for the search bar overflow */}
      <div className="h-16 bg-[#0A0C10]" />

      {/* ══ ROOM OPTIONS (icon grid) ═════════════════════════════════════════ */}
      <section className="py-16 px-6 md:px-12 bg-[#0A0C10]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-white text-lg md:text-xl font-extrabold tracking-wide mb-1">ROOM OPTIONS</h2>
          <div className="h-0.5 w-10 bg-yellow-500 mb-8" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(rooms || []).map((room) => (
              <RoomOptionCard key={room.id} room={room} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/rooms"
              className="border border-[#252B38] text-gray-300 text-sm font-bold px-8 py-3 rounded
                         hover:border-yellow-500/40 hover:text-yellow-500 transition"
            >
              VIEW ALL ROOMS
            </Link>
          </div>
        </div>
      </section>

      {/* ══ WHY CHOOSE US ═══════════════════════════════════════════════════ */}
      <section className="py-16 px-6 md:px-12 bg-[#0D1117]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-white text-lg md:text-xl font-extrabold tracking-wide mb-1">
            WHY CHOOSE ZION MEN'S PG?
          </h2>
          <div className="h-0.5 w-10 bg-yellow-500 mb-8" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {WHY_ITEMS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex flex-col items-start gap-3 p-5 bg-[#141820] border border-[#252B38] rounded-xl">
                <div className="w-10 h-10 rounded-full bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-yellow-500" strokeWidth={1.8} />
                </div>
                <h4 className="text-white font-bold text-sm">{title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FACILITIES ══════════════════════════════════════════════════════ */}
      <FacilitiesSection />

      {/* ══ EXPLORE ROOMS (live from context) ═══════════════════════════════ */}
      <section id="rooms" className="py-16 px-6 md:px-12 bg-[#0A0C10]">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-white text-lg md:text-xl font-extrabold tracking-wide">EXPLORE OUR ROOMS</h2>
            <Link to="/rooms" className="text-yellow-500 text-xs font-bold hover:underline tracking-wider">
              VIEW ALL
            </Link>
          </div>
          <div className="h-0.5 w-10 bg-yellow-500 mb-8" />

          {!rooms || rooms.length === 0 ? (
            <p className="text-gray-400 text-sm">No rooms available right now.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {rooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ══ TESTIMONIALS ════════════════════════════════════════════════════ */}
      <section className="py-16 px-6 md:px-12 bg-[#0D1117]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-white text-lg md:text-xl font-extrabold tracking-wide mb-1">WHAT OUR RESIDENTS SAY</h2>
          <div className="h-0.5 w-10 bg-yellow-500 mb-8" />

          <div className="flex items-center gap-4">
            <button
              onClick={prevT}
              disabled={testimonialIdx === 0}
              className="w-8 h-8 rounded-full border border-[#252B38] flex items-center justify-center
                         text-gray-400 hover:border-yellow-500/40 hover:text-yellow-500 transition disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex gap-4 overflow-hidden flex-1">
              {TESTIMONIALS.slice(testimonialIdx, testimonialIdx + 3).map((t, i) => (
                <TestimonialCard key={i} t={t} />
              ))}
            </div>

            <button
              onClick={nextT}
              disabled={testimonialIdx >= TESTIMONIALS.length - 1}
              className="w-8 h-8 rounded-full border border-[#252B38] flex items-center justify-center
                         text-gray-400 hover:border-yellow-500/40 hover:text-yellow-500 transition disabled:opacity-30"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════════════════ */}
      <footer className="bg-[#080A0E] border-t border-[#252B38] pt-14 pb-6 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg viewBox="0 0 40 40" className="w-7 h-7">
                <path d="M3 30L13 14L19 24L24 16L37 30H3Z" fill="#F5A623" />
              </svg>
              <div className="leading-none">
                <p className="text-white font-extrabold text-sm tracking-widest">ZION</p>
                <p className="text-yellow-500 text-[8px] tracking-[0.3em]">MEN'S PG</p>
              </div>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              Comfort, Convenience, Care.<br />A Home Away From Home.
            </p>
            <div className="flex gap-3 mt-4">
             <div className="flex gap-3">
  <Phone className="w-5 h-5 text-gray-400 hover:text-yellow-500" />
  <Mail className="w-5 h-5 text-gray-400 hover:text-yellow-500" />
</div>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h5 className="text-white font-bold text-xs tracking-widest mb-4">QUICK LINKS</h5>
            <ul className="space-y-2.5">
              {["Home", "About Us", "Rooms", "Facilities", "Gallery", "Contact"].map((l) => (
                <li key={l}>
                  <Link to={l === "Home" ? "/" : `/${l.toLowerCase().replace(" ", "")}`}
                    className="text-gray-400 text-xs hover:text-yellow-500 transition">{l}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-white font-bold text-xs tracking-widest mb-4">CONTACT INFO</h5>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400 text-xs">
                <Phone className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0" />
                +91 79048 53893
              </li>
              <li className="flex items-center gap-2 text-gray-400 text-xs">
                <Mail className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0" />
                zionmenspg@gmail.com
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-xs">
                <MapPinned className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0 mt-0.5" />
                123, Green Park, Your City, India – 110001
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h5 className="text-white font-bold text-xs tracking-widest mb-4">NEWSLETTER</h5>
            <p className="text-gray-400 text-xs mb-3">Subscribe to get updates and offers</p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-[#141820] border border-[#252B38] rounded px-3 py-2.5 text-white text-xs
                           placeholder-gray-500 focus:outline-none focus:border-yellow-500/50"
              />
              <button className="bg-yellow-500 text-black text-xs font-extrabold py-2.5 rounded hover:bg-yellow-400 transition">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#252B38] pt-5 flex flex-col md:flex-row items-center justify-between gap-2 text-[11px] text-gray-500">
          <p>© 2024 Zion Men's PG. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-yellow-500 transition">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-500 transition">Terms & Conditions</a>
          </div>
        </div>
      </footer>

      {/* Global badge utility (Tailwind needs these classes defined in a real element) */}
      <style>{`.badge { @apply absolute top-3 left-3 text-white text-xs font-bold px-2 py-0.5 rounded; }`}</style>
    </div>
  );
}

export default Home;
