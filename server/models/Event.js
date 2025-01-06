import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
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
});

export default mongoose.model('Event', eventSchema);