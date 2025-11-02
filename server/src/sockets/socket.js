// The Server import at the top causes confusion; remove the parameter 'Server' from the function (should not take it).
// Also, 'method' in cors should be 'methods' (plural) as per socket.io docs.

// import { Server } from "socket.io";
// import Msg from '../models/messageModel.js';



import { Server } from "socket.io";
// import { createServer, Server } from "http";
import Msg from '../models/messageModel.js';
// const server=createServer();
export default function setupSocketServer() {
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
