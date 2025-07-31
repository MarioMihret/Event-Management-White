import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
<<<<<<< HEAD
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
=======
  date: { type: Date, required: true },
  location: String,
  meetingLink: String,
  attendees: { type: Number, default: 0 },
  maxAttendees: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  organizerId: { type: mongoose.Schema.Types.ObjectId, required: true },
  isVirtual: { type: Boolean, default: false },
  status: { 
    type: String, 
    enum: ['upcoming', 'ongoing', 'completed'], 
    default: 'upcoming' 
  },
  visibility: {
    isVisible: { type: Boolean, default: false },
    scheduledFor: { type: Date }
  },
  createdAt: { type: Date, default: Date.now }
>>>>>>> 34a2d352adaefa9df4bc1ecb6a50c8f0fdd37605
});

export default mongoose.model('Event', eventSchema);