import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { createServer } from 'http';
import connectDB from './src/config/db.js';
import setupSocketServer from './src/sockets/socket.js';
import authRoutes from './src/routes/authRoutes.js';
import messageRoutes from './src/routes/messagesRoutes.js';

connectDB().then(() => {
    // DB connected
});

const port = process.env.PORT || 5000;
const app = express();
const httpServer = createServer(app);

app.use(cors());
app.use(express.json()); // Enable JSON parsing

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => {
    console.log("Backend is running ");
    res.send(`Backend is running on port ${port}`)
})

// Attach socket to the same httpServer
setupSocketServer(httpServer);

httpServer.listen(port, () => {
    console.log(`Server (HTTP + Socket) running on port ${port}`);
})