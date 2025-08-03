import axios from 'axios';
import { Event } from '../types';

const API_URL = 'http://localhost:5000/api';

const eventService = {
  getEvents: async (): Promise<Event[]> => {
    try {
      const response = await axios.get(`${API_URL}/events`);
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },
};

export default eventService;
