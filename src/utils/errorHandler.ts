import { AxiosError } from 'axios';
import { logger } from './logger';
import toast from 'react-hot-toast';

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 500,
    public meta?: any
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const handleApiError = (error: unknown): AppError => {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof AxiosError) {
    const statusCode = error.response?.status || 500;
    let message = error.response?.data?.message || error.message;
    const code = `API_ERROR_${statusCode}`;

    // Customize error messages for common scenarios
    if (!error.response) {
      message = 'Unable to connect to the server. Please check your internet connection.';
    } else if (statusCode === 401) {
      message = 'Your session has expired. Please log in again.';
    } else if (statusCode === 403) {
      message = 'You do not have permission to perform this action.';
    } else if (statusCode === 404) {
      message = 'The requested resource was not found.';
    } else if (statusCode >= 500) {
      message = 'An unexpected error occurred. Please try again later.';
    }
    
    logger.error('API Error', {
      statusCode,
      message,
      code,
      url: error.config?.url,
      method: error.config?.method,
    });

    return new AppError(message, code, statusCode);
  }

  const message = error instanceof Error ? error.message : 'An unexpected error occurred';
  logger.error('Unexpected Error', { error });
  
  return new AppError(message, 'UNKNOWN_ERROR');
};

export const showErrorNotification = (error: AppError) => {
  let message = error.message;

  switch (error.code) {
    case 'AUTH_REQUIRED':
      message = 'Please log in to continue';
      break;
    case 'PERMISSION_DENIED':
      message = 'You don\'t have permission to perform this action';
      break;
    case 'NETWORK_ERROR':
      message = 'Unable to connect to the server. Please check your internet connection';
      break;
    case 'API_ERROR_401':
      message = 'Your session has expired. Please log in again';
      break;
    case 'API_ERROR_403':
      message = 'Access denied. You don\'t have permission for this action';
      break;
    case 'API_ERROR_404':
      message = 'The requested resource could not be found';
      break;
    case 'API_ERROR_500':
      message = 'An unexpected server error occurred. Please try again later';
      break;
  }

  toast.error(message);
};