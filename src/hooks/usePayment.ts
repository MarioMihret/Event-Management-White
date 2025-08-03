import axios from 'axios';
import { useState } from 'react';

interface PaymentData {
  eventId: string;
  email: string;
  firstName: string;
  lastName: string;
  amount: number;
  phone: string;
  quantity: number;
}

interface PaymentResponse {
  status: string;
  message: string;
  data: {
    checkout_url: string;
    reference: string;
  };
}

export function usePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initializePayment = async (data: PaymentData): Promise<PaymentResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/payment/initialize', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.status === 'error') {
        throw new Error(response.data.message);
      }

      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Payment initialization failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (txRef: string): Promise<any> => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/payment/verify/${txRef}`);

      if (response.data.status === 'error') {
        throw new Error(response.data.message);
      }

      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || 'Payment verification failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    initializePayment,
    verifyPayment,
    loading,
    error,
  };
}
