const mongoose = require("mongoose");

/**
 * Booking Schema
 * Every successful booking creates one document here and decrements
 * the corresponding Room's availableslots atomically.
 */
const bookingSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: [true, "Room reference is required"],
    },

    tenantName: {
      type: String,
      required: [true, "Tenant name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    tenantPhone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"],
    },

    tenantEmail: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },

    checkInDate: {
      type: Date,
      required: [true, "Check-in date is required"],
    },

    status: {
      type: String,
      enum: ["Confirmed", "Cancelled", "Pending"],
      default: "Confirmed",
    },

    remarks: {
      type: String,
      trim: true,
      maxlength: [300, "Remarks cannot exceed 300 characters"],
    },
  },
  {
    timestamps: true,
  }
);

// Populate room details automatically when querying bookings
bookingSchema.pre(/^find/, function (next) {
  this.populate("room", "sharingType price totalslots availableslots");
  next();
});

module.exports = mongoose.model("Booking", bookingSchema);
