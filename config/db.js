const mongoose = require("mongoose");

/**
 * Connects to MongoDB using the MONGO_URI from environment variables.
 * Exits the process on failure so the server never starts in a broken state.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // These options are defaults in Mongoose 8+, listed for clarity
      serverSelectionTimeoutMS: 5000, // fail fast if DB is unreachable
    });

    console.log(`✅  MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌  MongoDB connection error: ${error.message}`);
    process.exit(1); // crash early – no DB, no service
  }
};

module.exports = connectDB;
