import mongoose from "mongoose";
import appconfig from "../../dotenv.js";
const MONGODB_URI=appconfig.MONGODB_URI
console.log(MONGODB_URI);
const connectDB=async ()=>{
    mongoose.connection.on("connected",()=>{
        console.log("connected");
    });
    await mongoose.connect(MONGODB_URI);
}

export default connectDB