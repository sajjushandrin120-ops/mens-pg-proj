const mongoose = require("mongoose");

/**
 * Room Schema
 * Represents a room type available at Zion's Men's PG.
 *
 * sharingType  – e.g. "Single", "Double", "Triple", "4-Sharing"
 * price        – monthly rent in INR
 * totalslots   – maximum occupancy for this room type
 * availableslots – real-time count of open beds (decremented on booking)
 */
const roomSchema = new mongoose.Schema(
  {
    sharingType: {
      type: String,
      required: [true, "Sharing type is required"],
      enum: {
        values: ["Single", "Double", "Triple", "4-Sharing"],
        message: "sharingType must be Single, Double, Triple, or 4-Sharing",
      },
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },

    totalslots: {
      type: Number,
      required: [true, "Total slots are required"],
      min: [1, "Total slots must be at least 1"],
    },

    //availableslots: {
     // type: Number,
      //required: [true, "Available slots are required"],
      //min: [0, "Available slots cannot be negative"],
      //validate: {
        //validator: function (value) {
          // availableslots must never exceed totalslots
          //return value <= this.totalslots;
        //},
       // message: "Available slots cannot exceed total slots",
      //},
    //},

    amenities: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },

    isActive: {
      type: Boolean,
      default: true, // soft-delete flag; inactive rooms won't appear in listings
    },
  },
  {
    timestamps: true, // adds createdAt & updatedAt automatically
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ── Virtual: human-readable occupancy status ────────────────────────────────
roomSchema.virtual("occupancyStatus").get(function () {
  if (this.availableslots === 0) return "Full";
  if (this.availableslots === this.totalslots) return "Vacant";
  return "Partially Occupied";
});

// ── Index for fast queries by sharing type ──────────────────────────────────
roomSchema.index({ sharingType: 1 });
roomSchema.index({ availableslots: 1 });

module.exports = mongoose.model("Room", roomSchema);
