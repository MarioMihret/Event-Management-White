import express from 'express';
import Event from '../models/Event.js';
import { scheduleEventVisibility } from '../services/visibilityScheduler.js';

const router = express.Router();

// Create new event
router.post('/events', async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      visibility: {
        isVisible: req.body.visibility?.isVisible || false,
        scheduledFor: req.body.visibility?.scheduledFor
      }
    });
    
    await event.save();

    // If visibility is scheduled, set up the scheduler
    if (!event.visibility.isVisible && event.visibility.scheduledFor) {
      await scheduleEventVisibility(event._id, event.visibility.scheduledFor);
    }

    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find({}).sort({ date: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update event visibility
router.patch('/events/:id/visibility', async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { visibility: req.body },
      { new: true }
    );

    if (req.body.scheduledFor) {
      await scheduleEventVisibility(event._id, req.body.scheduledFor);
    }

    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;