import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Room from './models/Room.js';
import { rooms } from './data/rooms.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB(); // Ithu oru thadava dhaan irukkanum

const importData = async () => {
  try {
    await Room.deleteMany();
    await Room.insertMany(rooms);
    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();