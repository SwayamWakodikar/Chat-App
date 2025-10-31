import express from 'express';
import axios from 'axios';
import cors from 'cors';

app.use(cors);

app.get('/',(req,res)=>{
    console.log("Backend is running ");
})