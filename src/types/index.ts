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
  id: string;
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
  role: 'user' | 'admin';
}
// ... rest of the existing types