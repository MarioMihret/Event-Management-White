import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

export const createEvent = async (eventData: any) => {
  const response = await api.post('/events', eventData);
  return response.data;
};

export const getVisibleEvents = async () => {
  const response = await api.get('/events');
  return response.data;
};