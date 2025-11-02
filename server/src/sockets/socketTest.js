import { io } from "socket.io-client";

const socket = io("http://localhost:9000", {
  transports: ["websocket"], 
});

socket.on("connect", () => {
  console.log("✅ Connected to socket server:", socket.id);

  socket.emit("join", "user123");

  socket.emit("send_message", {
    sender: "user123",
    receiver: "user456",
    content: "Hello world",
    timestamps: new Date(),
  });
});

socket.on("newMessage", (msg) => {
  console.log("💬 New message received:", msg);
});

socket.on("disconnect", () => {
  console.log("❌ Disconnected");
});
