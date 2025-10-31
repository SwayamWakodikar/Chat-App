import mongoose from "mongoose";
// import dotenv from 'dotenv';
// dotenv.config()
const MONGODB_URI=process.env.MONGO_URI;
const connectDB=async ()=>{         
    mongoose.connection.on("connected",()=>{
        console.log("connected");
    });
    await mongoose.connect(MONGODB_URI);
}

export default connectDB