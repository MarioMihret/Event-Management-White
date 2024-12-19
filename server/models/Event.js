import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  organizer: { type: String, required: true },
  tickets: {
    available: { type: Number, required: true },
    total: { type: Number, required: true }
  },
  payments: [{
    txRef: String,
    amount: Number,
    status: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending'
    },
    customerEmail: String,
    customerPhone: String,
    quantity: Number,
    createdAt: { type: Date, default: Date.now }
  }]
});

export default mongoose.model('Event', eventSchema);