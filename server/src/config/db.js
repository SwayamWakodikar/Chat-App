import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()
const MONGODB_URI=process.env.MONGO_URI;
const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("MongoDB connected successfully");
        });
        await mongoose.connect(MONGODB_URI);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        console.error("Please check your MONGO_URI in .env or ensure your local MongoDB is running.");
        process.exit(1);
    }
}

export default connectDB