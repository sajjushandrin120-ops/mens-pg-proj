/**
 * ╔══════════════════════════════════════════════════════════╗
 *   Zion's Men's PG  –  Express API Server
 *   Entry point: server.js
 * ╚══════════════════════════════════════════════════════════╝
 */

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

// ── Route imports ────────────────────────────────────────────────────────────
const roomRoutes = require("./routes/rooms");
const bookingRoutes = require("./routes/booking");

// ── Connect to MongoDB ───────────────────────────────────────────────────────
connectDB();

// ── App initialisation ───────────────────────────────────────────────────────
const app = express();

// ── CORS ─────────────────────────────────────────────────────────────────────
const allowedOrigins = [
  "http://localhost:5000", // React dev server
  "http://localhost:5177", // Vite dev server
  process.env.FRONTEND_URL, // production frontend URL (set in .env)
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow Postman / server-to-server (no origin) or whitelisted origins
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS policy: origin ${origin} is not allowed`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ── Body parsers ─────────────────────────────────────────────────────────────
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

// ── Health check ─────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Zion's Men's PG API is running 🏠",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ── API Routes ────────────────────────────────────────────────────────────────
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);

// ── 404 handler for unmatched routes ─────────────────────────────────────────
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

// ── Global error handler (must be LAST) ──────────────────────────────────────
app.use(errorHandler);

// ── Start server ──────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `🚀  Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`
  );
});

// ── Graceful shutdown on unhandled errors ────────────────────────────────────
process.on("unhandledRejection", (err) => {
  console.error(`💥  Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

process.on("uncaughtException", (err) => {
  console.error(`💥  Uncaught Exception: ${err.message}`);
  process.exit(1);
});

module.exports = app; // exported for testing
