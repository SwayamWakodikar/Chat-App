import express from 'express';
import axios from 'axios';
import cors from 'cors';
import User from './src/models/userModel'
app.use(cors);

app.get('/',(req,res)=>{
    console.log("Backend is running ");
})