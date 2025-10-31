import mongoose from 'mongoose';
const userSchema=new mongoose.Schema({
    user:{
        email:{
            type:String,
            required:true,
        },
        name: {
            type:String,
            requried:true,
        },
        password: {
            type:String,
            required:true,
        }
    }
},{timestamps:true})
const User=mongoose.model("User",userSchema)
export default User