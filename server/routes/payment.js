import express from 'express';
import axios from 'axios';
import Event from '../models/Event.js';

const router = express.Router();

router.post('/initialize', async (req, res) => {
  try {
    const { eventId, email, firstName, lastName, amount, phone, quantity } = req.body;
    
    if (!eventId || !email || !firstName || !lastName || !amount) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields'
      });
    }

    const txRef = `TX-${Date.now()}`;
    
    const chapaPayload = {
      amount: String(amount),
      currency: 'ETB',
      email,
      first_name: firstName,
      last_name: lastName,
      tx_ref: txRef,
      callback_url: `${process.env.FRONTEND_URL}/payment/callback`,
      return_url: `${process.env.FRONTEND_URL}/payment/callback`,
      customization: {
        title: 'Event Ticket Payment',
        description: 'Payment for event registration'
      }
    };

    const response = await axios.post(
      'https://api.chapa.co/v1/transaction/initialize',
      chapaPayload,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    // Store payment intent in database
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({
        status: 'error',
        message: 'Event not found'
      });
    }

    event.payments.push({
      txRef,
      amount,
      status: 'pending',
      customerEmail: email,
      customerPhone: phone,
      quantity
    });

    await event.save();

    res.json({
      status: 'success',
      message: 'Payment initialized successfully',
      data: {
        checkout_url: response.data.data.checkout_url,
        reference: txRef
      }
    });
  } catch (error) {
    console.error('Payment initialization error:', error.response?.data || error.message);
    res.status(500).json({
      status: 'error',
      message: 'Payment initialization failed',
      error: error.response?.data || error.message
    });
  }
});

router.get('/verify/:txRef', async (req, res) => {
  try {
    const { txRef } = req.params;
    
    const response = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${txRef}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.CHAPA_SECRET_KEY}`
        }
      }
    );

    if (response.data.status === 'success') {
      // Update payment status in database
      const event = await Event.findOne({ 'payments.txRef': txRef });
      if (event) {
        const payment = event.payments.find(p => p.txRef === txRef);
        if (payment) {
          payment.status = 'success';
          await event.save();

          // Update available tickets
          event.tickets.available = Math.max(0, event.tickets.available - payment.quantity);
          await event.save();
        }
      }
    }

    res.json(response.data);
  } catch (error) {
    console.error('Payment verification error:', error.response?.data || error.message);
    res.status(500).json({
      status: 'error',
      message: 'Payment verification failed',
      error: error.response?.data || error.message
    });
  }
});

export default router;