import { Server } from "socket.io";
// import { createServer, Server } from "http";
import Msg from '../models/messageModel.js';
// const server=createServer();
export default function setupSocketServer(Server) {
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
        console.log(`User${userId} joined the room`);
    });
    
    socket.on("send_message",async (data)=>{
        const{sender,receiver,content,timestaps}=data;
        try{
            const newMsg=new Msg({sender,receiver,content,timestaps});
            await newMsg.save();
            io.to(receiver).emit('newMessage',newMsg)
        }
        catch(err){
            console.log("Message not sent");
        }
    });
    socket.on("disconnect",()=>{
        console.log("User Disconnected")
    });
});
return io;
}
