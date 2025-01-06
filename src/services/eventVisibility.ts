import { Event } from '../types/event';

export const updateEventVisibility = async (eventId: string, visibility: Event['visibility']) => {
  try {
    const response = await fetch(`/api/events/${eventId}/visibility`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(visibility),
    });
    return response.json();
  } catch (error) {
    console.error('Failed to update event visibility:', error);
    throw error;
  }
};