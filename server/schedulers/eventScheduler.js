import { scheduleJob } from 'node-schedule';
import { updateEventVisibility } from '../services/eventVisibilityService.js';

// Run every minute to check for events that need to be made visible
export const startEventScheduler = () => {
  scheduleJob('* * * * *', async () => {
    await updateEventVisibility();
  });
};