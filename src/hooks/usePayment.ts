<<<<<<< HEAD
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
=======
import { useState } from 'react';
import { PaymentMethod } from '../types/payment';
import { initiateChapaPayment, initiateCBEBirrPayment } from '../utils/payment';

export const usePayment = (amount: number) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('chapa');

  const handlePayment = async () => {
    try {
      if (selectedMethod === 'chapa') {
        await initiateChapaPayment(amount);
      } else if (selectedMethod === 'cbe-birr') {
        await initiateCBEBirrPayment(amount);
      }
    } catch (error) {
      console.error('Payment failed:', error);
>>>>>>> 34a2d352adaefa9df4bc1ecb6a50c8f0fdd37605
    }
  };

  return {
<<<<<<< HEAD
    initializePayment,
    verifyPayment,
    loading,
    error,
  };
}
=======
    selectedMethod,
    setSelectedMethod,
    handlePayment
  };
};
>>>>>>> 34a2d352adaefa9df4bc1ecb6a50c8f0fdd37605
