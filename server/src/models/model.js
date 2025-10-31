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
            required,
        }
    }
},{timestamps:true})

export default mongoose.model("User",userSchema)