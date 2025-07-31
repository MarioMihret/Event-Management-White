import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { handleApiError } from './errorHandler';
import { logger } from './logger';
import toast from 'react-hot-toast';

class Api {
  private static instance: Api;
  private axiosInstance: AxiosInstance;
  private retryCount: number = 0;
  private maxRetries: number = 3;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  static getInstance(): Api {
    if (!Api.instance) {
      Api.instance = new Api();
    }
    return Api.instance;
  }

  private setupInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        logger.debug('API Request', {
          url: config.url,
          method: config.method,
          params: config.params,
        });
        
        return config;
      },
      (error) => {
        logger.error('Request Error', { error });
        return Promise.reject(error);
      }
    );

    this.axiosInstance.interceptors.response.use(
      (response) => {
        this.retryCount = 0;
        logger.debug('API Response', {
          url: response.config.url,
          status: response.status,
          data: response.data,
        });
        return response.data;
      },
      async (error) => {
        if (error.response) {
          // Server responded with error status
          if (error.response.status === 401) {
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            window.location.href = '/login';
            return Promise.reject(error);
          }
        } else if (error.request && this.retryCount < this.maxRetries) {
          // Network error, retry the request
          this.retryCount++;
          logger.warn(`Retrying request (${this.retryCount}/${this.maxRetries})`, {
            url: error.config.url,
          });
          
          await new Promise(resolve => setTimeout(resolve, 1000 * this.retryCount));
          return this.axiosInstance.request(error.config);
        }

        const appError = handleApiError(error);
        toast.error(appError.message);
        return Promise.reject(appError);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      return (await this.axiosInstance.get<T>(url, config)) as T;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      return (await this.axiosInstance.post<T>(url, data, config)) as T;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    try {
      return (await this.axiosInstance.put<T>(url, data, config)) as T;
    } catch (error) {
      throw handleApiError(error);
    }
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      return (await this.axiosInstance.delete<T>(url, config)) as T;
    } catch (error) {
      throw handleApiError(error);
    }
  }
}

export const api = Api.getInstance();