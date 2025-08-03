// Existing types...

export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

export interface ApiResponse<T = any> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
}

export interface ApiError {
  code: string;
  message: string;
  statusCode: number;
  meta?: any;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface Event {
  id?: string;
  _id?: string; // Mongoose uses _id
  title: string;
  description: string;
  date: string;
  location: string;
  price: number;
  image: string;
  organizer: string;
  category: string;
  tickets: {
    available: number;
    total: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'organizer';
  events: Event[];
  status: 'active' | 'suspended';
  createdAt: string;
  updatedAt: string;
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy: string;
  sortDirection: 'asc' | 'desc';
}
export interface TicketType {
  name: string;
  price: number;
  quantity: number;
  description: string;
}

export interface EventFormData {
  basicInfo: {
    title: string;
    description: string;
    category: string;
    type: string;
    tags: string[];
  };
  dateTime: {
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    timezone: string;
  };
  location: {
    type: 'physical' | 'virtual';
    venue: string;
    address: string;
    city: string;
    virtualLink: string;
  };
  ticketing: {
    type: 'free' | 'paid';
    price: number;
    availableTickets: number;
    ticketTypes: TicketType[];
  };
  media: {
    bannerImage: string;
    logo: string;
  };
  additionalInfo: {
    agenda: { time: string; title: string; description: string }[];
    speakers: { name: string; bio: string; topic: string }[];
    sponsors: { name: string; level: string; logo?: string }[];
  };
  videoMeeting: {
    enableVideoMeeting: boolean;
    meetingId: string;
  };
}

// ... rest of the existing types