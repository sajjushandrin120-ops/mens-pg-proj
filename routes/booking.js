const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Room = require("../models/Room");
const Booking = require("../models/Booking");

// ── POST /api/bookings ──────────────────────────────────────────────────────
/**
 * Book a slot in a room.
 *
 * Business logic (atomic, protected against race conditions):
 *   1. Validate the room exists and is active.
 *   2. Confirm availableslots > 0.
 *   3. Atomically decrement availableslots by 1 using findOneAndUpdate
 *      with a $gt:0 guard — prevents double-booking under concurrent requests.
 *   4. Create the Booking document.
 *   5. Return the booking + updated room snapshot.
 *
 * Body params:
 *   roomId        – MongoDB ObjectId of the room
 *   tenantName    – full name of the tenant
 *   tenantPhone   – 10-digit Indian mobile number
 *   tenantEmail   – (optional) email
 *   checkInDate   – ISO date string
 *   remarks       – (optional) free text
 */
router.post("/", async (req, res, next) => {
  // Use a session for multi-document atomicity
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { roomId, tenantName, tenantPhone, tenantEmail, checkInDate, remarks } =
      req.body;

    // ── 1. Basic input validation ───────────────────────────────────────────
    if (!roomId || !tenantName || !tenantPhone || !checkInDate) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({
        success: false,
        message: "roomId, tenantName, tenantPhone, and checkInDate are required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ success: false, message: "Invalid roomId format" });
    }

    // ── 2. Atomic slot decrement (race-condition safe) ──────────────────────
    // findOneAndUpdate only matches when availableSlots > 0 (the $gt guard).
    // If two concurrent requests hit simultaneously, only one will match
    // and the other will receive null → 409 Conflict response.
    const updatedRoom = await Room.findOneAndUpdate(
      {
        _id: roomId,
        isActive: true,
        availableslots: { $gt: 0 }, // ← the atomic guard
      },
      {
        $inc: { availableslots: -1 }, // availableslots = availableslots - 1
      },
      {
        new: true,        // return the document AFTER update
        session,          // enroll in the transaction
        runValidators: true,
      }
    );

    // ── 3. Handle room-not-found / already-full ─────────────────────────────
    if (!updatedRoom) {
      // Distinguish between "room doesn't exist" and "room is full"
      const roomExists = await Room.findOne(
        { _id: roomId, isActive: true },
        null,
        { session }
      );

      await session.abortTransaction();
      session.endSession();

      if (!roomExists) {
        return res.status(404).json({ success: false, message: "Room not found" });
      }

      return res.status(409).json({
        success: false,
        message: "No available slots in this room. Please choose another room.",
      });
    }

    // ── 4. Create the Booking record ────────────────────────────────────────
    const [booking] = await Booking.create(
      [
        {
          room: roomId,
          tenantName: tenantName.trim(),
          tenantPhone,
          tenantEmail,
          checkInDate: new Date(checkInDate),
          remarks,
          status: "Confirmed",
        },
      ],
      { session }
    );

    // ── 5. Commit the transaction ────────────────────────────────────────────
    await session.commitTransaction();
    session.endSession();

    return res.status(201).json({
      success: true,
      message: "Room booked successfully!",
      data: {
        booking,
        room: {
          _id: updatedRoom._id,
          sharingType: updatedRoom.sharingType,
          price: updatedRoom.price,
          totalslots: updatedRoom.totalslots,
          availableslots: updatedRoom.availableslots, // already decremented
          occupancyStatus: updatedRoom.occupancyStatus,
        },
      },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
});

// ── GET /api/bookings ───────────────────────────────────────────────────────
// Returns all bookings (admin view), newest first
router.get("/", async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;

    const bookings = await Booking.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
});

// ── GET /api/bookings/:id ───────────────────────────────────────────────────
router.get("/:id", async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid booking ID" });
    }

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    next(error);
  }
});

// ── PATCH /api/bookings/:id/cancel ─────────────────────────────────────────
/**
 * Cancel a booking and restore the slot back to the room.
 * Uses the same atomic + session pattern.
 */
router.patch("/:id/cancel", async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ success: false, message: "Invalid booking ID" });
    }

    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, status: "Confirmed" },
      { status: "Cancelled" },
      { new: true, session }
    );

    if (!booking) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        success: false,
        message: "Booking not found or already cancelled",
      });
    }

    // Restore the slot – increment availableslots by 1 (bounded by totalSlots)
    const restoredRoom = await Room.findOneAndUpdate(
      {
        _id: booking.room,
        // Ensure we don't exceed totalslots (safety guard)
        $expr: { $lt: ["$availableslots", "$totalslots"] },
      },
      { $inc: { availableslots: 1 } },
      { new: true, session }
    );

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      success: true,
      message: "Booking cancelled and slot restored",
      data: { booking, room: restoredRoom },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
});

module.exports = router;
