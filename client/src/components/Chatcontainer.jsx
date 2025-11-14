import React from "react";
// import {Server, Socket} from "socket.io";
import {io} from "socket.io-client";
const Chatcontainer = () => {
const socket = io("http://localhost:9000", {
  transports: ["websocket"], 
});

socket.on("connect", () => {
  console.log("Connected to socket server:", socket.id);

  socket.emit("join", "user123");

  socket.emit("send_message", {
    sender: "user123",
    receiver: "user456",
    content: "Hello world",
    timestamps: new Date(),
  });
});
  return (
    <div className="flex ">
      Chat-Container
    </div>
  );
};
export default Chatcontainer;
