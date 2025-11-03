import express from 'express';
import 'dotenv/config';
// import axios from 'axios';
import cors from 'cors';
import http from 'http';
import User from './src/models/userModel.js'
import connectDB from './src/config/db.js';
import setupSocketServer from './src/sockets/socket.js';

connectDB()
const port=5000;
const app=express();
app.use(cors());

app.get('/',(req,res)=>{
    console.log("Backend is running ");
    res.send(`Backend is running on port ${port}`)
})
const httpServer = http.createServer(app);
setupSocketServer(httpServer);
httpServer.listen(port,()=>{
    console.log(`chal raha hai on ${port}`);
})