// The Server import at the top causes confusion; remove the parameter 'Server' from the function (should not take it).
// Also, 'method' in cors should be 'methods' (plural) as per socket.io docs.

// import { Server } from "socket.io";
// import Msg from '../models/messageModel.js';




import { Server } from "socket.io";
import mongoose from 'mongoose';
import Msg from '../models/messageModel.js';

export default function setupSocketServer(httpServer) {
const io=new Server(9000,{
    cors:{
        origin:"http://localhost:5173",
        methods: ["GET","POST"],
    },
});
io.on("connection",(socket)=>{
    console.log("a user connected",socket.id);
    socket.on("join",(userId)=>{
        socket.join(userId);
        console.log(`User${userId} joined the room`);
    });
    
    socket.on("send_message", (data) => {
        const { sender, receiver, content } = data;
        try {
            // Message is already saved via API call in the client.
            // Just broadcast it to the receiver.
            // We construct a temporary message object to emit immediately.
            const msgData = {
                sender,
                receiver,
                content,
                createdAt: new Date().toISOString()
            };
            io.to(receiver).emit('newMessage', msgData);
        }
        catch(err){
            console.log("Message sending execution failed");
            console.error(err);
        }
    });
    socket.on("disconnect",()=>{
        console.log("User Disconnected")
    });
});
return io;
}
