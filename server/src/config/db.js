import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()

const connectDB = async () => {
    console.log("Skipping MongoDB connection - running in-memory mode.");
    // No database connection needed
}

export default connectDB