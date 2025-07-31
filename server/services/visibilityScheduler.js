import schedule from 'node-schedule';
import Event from '../models/Event.js';

export const scheduleEventVisibility = async (eventId, scheduledDate) => {
  // Cancel any existing job for this event
  if (schedule.scheduledJobs[eventId]) {
    schedule.scheduledJobs[eventId].cancel();
  }

  // Schedule new visibility job
  schedule.scheduleJob(eventId, scheduledDate, async () => {
    try {
      await Event.findByIdAndUpdate(eventId, {
        'visibility.isVisible': true
      });
      console.log(`Event ${eventId} visibility updated at scheduled time`);
    } catch (error) {
      console.error(`Failed to update visibility for event ${eventId}:`, error);
    }
  });
};

// Initialize scheduler for all events with scheduled visibility
export const initializeVisibilityScheduler = async () => {
  try {
    const events = await Event.find({
      'visibility.isVisible': false,
      'visibility.scheduledFor': { $gt: new Date() }
    });

    events.forEach(event => {
      scheduleEventVisibility(event._id, event.visibility.scheduledFor);
    });
  } catch (error) {
    console.error('Failed to initialize visibility scheduler:', error);
  }
};