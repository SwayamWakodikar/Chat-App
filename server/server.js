import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import connectDB from './src/config/db.js';
import setupSocketServer from './src/sockets/socket.js';
import authRoutes from './src/routes/authRoutes.js';
import messageRoutes from './src/routes/messagesRoutes.js';

// Connect to DB first, then start server
connectDB().then(() => {
    // Only verify socket options if needed, usually just running setupSocketServer() is enough
});

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json()); // Enable JSON parsing

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => {
    console.log("Backend is running ");
    res.send(`Backend is running on port ${port}`)
})

// Start the independent socket server (port 9000)
setupSocketServer();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})