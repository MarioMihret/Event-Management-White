import Event from '../models/Event.js';

export const updateEventVisibility = async () => {
  const fiveMinutesAgo = new Date(Date.now() - 1 * 60 * 1000);
  
  try {
    await Event.updateMany(
      {
        createdAt: { $lte: fiveMinutesAgo },
        isVisible: false
      },
      {
        $set: { isVisible: true }
      }
    );
  } catch (error) {
    console.error('Error updating event visibility:', error);
  }
};