const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

// ── GET /api/rooms ──────────────────────────────────────────────────────────
// Returns all active rooms. Optionally filter by ?sharingType=Double
router.get("/", async (req, res, next) => {
  try {
    const filter = { isActive: true };
    if (req.query.sharingType) {
      filter.sharingType = req.query.sharingType;
    }

    const rooms = await Room.find(filter).sort({ price: 1 });

    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms
    });
  } catch (error) {
    next(error);
  }
});

// ── GET /api/rooms/:id ──────────────────────────────────────────────────────
router.get("/:id", async (req, res, next) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room || !room.isActive) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({ success: true, data: room });
  } catch (error) {
    next(error);
  }
});

// ── POST /api/rooms ─────────────────────────────────────────────────────────
// Seed / admin: create a new room type
router.post("/", async (req, res, next) => {
  try {
    const { sharingType, price, totalslots, amenities, description } = req.body;

    const room = await Room.create({
      sharingType,
      price,
      totalslots,
      availableslots: totalslots, // starts fully empty
      amenities,
      description,
    });

    res.status(201).json({ success: true, data: room });
  } catch (error) {
    next(error);
  }
});

// ── PATCH /api/rooms/:id ────────────────────────────────────────────────────
// Admin: update room details (not availableslots directly – that's bookings)
router.patch("/:id", async (req, res, next) => {
  try {
    // Prevent manual tampering of availableslots via this route
    delete req.body.availableslots;

    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    res.status(200).json({ success: true, data: room });
  } catch (error) {
    next(error);
  }
});

// ── DELETE /api/rooms/:id ───────────────────────────────────────────────────
// Soft-delete: sets isActive = false
router.delete("/:id", async (req, res, next) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    res.status(200).json({ success: true, message: "Room deactivated successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
