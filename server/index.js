import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import eventRoutes from './routes/eventRoutes.js';
import { startEventScheduler } from './schedulers/eventScheduler.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

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
  console.log(`Server running on port ${PORT}`);
});