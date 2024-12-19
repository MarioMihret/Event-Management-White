import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import paymentRoutes from './routes/payment.js';
import meetingRoutes, { setupVideoServer } from './routes/meeting.js';
import authRoutes from './routes/routes.js'; // Adjust based on your actual file structure // Adjusted import for authentication routes

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/payment', paymentRoutes);
app.use('/api/meeting', meetingRoutes);
app.use('/api/auth/v1', authRoutes); // Register authentication routes

const PORT = process.env.PORT || 5000;

// Setup video server with Socket.IO
const server = setupVideoServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});