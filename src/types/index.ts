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

// ... rest of the existing types