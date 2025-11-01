import { Socket } from "socket.io";
import { createServer, Server } from "http";

const server=createServer()
const io=new Server(9000,{
    cors:{
        origin:"http://localhost:5173/",
        method: ["GET","POST"],
    },
});
io.on("connection",(socket)=>{
    console.log("a user connected",socket.id);
    socket.on("join",(userId)=>{
        socket.join(userId);
    });
    
    
});