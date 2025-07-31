import express from 'express';
<<<<<<< HEAD
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

=======
import mongoose from 'mongoose';
import cors from 'cors';
import eventRoutes from './routes/eventRoutes.js';
import { startEventScheduler } from './schedulers/eventScheduler.js';

const app = express();

>>>>>>> 34a2d352adaefa9df4bc1ecb6a50c8f0fdd37605
// Middleware
app.use(cors());
app.use(express.json());

<<<<<<< HEAD
// Routes
app.use('/api/payment', paymentRoutes);
app.use('/api/meeting', meetingRoutes);
app.use('/api/auth/v1', authRoutes); // Register authentication routes

const PORT = process.env.PORT || 5000;

// Setup video server with Socket.IO
const server = setupVideoServer(app);

server.listen(PORT, () => {
=======
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/eventmanagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Routes
app.use('/api', eventRoutes);

// Start scheduler
startEventScheduler();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
>>>>>>> 34a2d352adaefa9df4bc1ecb6a50c8f0fdd37605
  console.log(`Server running on port ${PORT}`);
});