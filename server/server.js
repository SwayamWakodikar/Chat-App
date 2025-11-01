import express from 'express';
import 'dotenv/config';
// import axios from 'axios';
import cors from 'cors';
import User from './src/models/userModel.js'
import connectDB from './src/config/db.js';

connectDB()
const port=5000;
const app=express();
// app.use(cors);

app.get('/',(req,res)=>{
    console.log("Backend is running ");
})
app.listen(port,()=>{
    console.log("chal raha hai");
})