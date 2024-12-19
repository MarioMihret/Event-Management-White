import express from 'express';
import { Server } from 'socket.io';
import http from 'http';

const router = express.Router();

export const setupVideoServer = (app) => {
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-room', (roomId) => {
      socket.join(roomId);
      socket.to(roomId).emit('participant-joined', socket.id);
      
      socket.on('disconnect', () => {
        socket.to(roomId).emit('participant-left', socket.id);
      });
    });
  });

  return server;
};

export default router;