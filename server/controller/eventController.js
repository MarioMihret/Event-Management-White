import Event from '../models/Event.js';
import logger from '../utils/logger.js';

// Get all events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (error) {
    logger.error('Error fetching events:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
