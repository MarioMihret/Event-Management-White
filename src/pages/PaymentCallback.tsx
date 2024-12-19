import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { usePayment } from '../hooks/usePayment';
import { CheckCircle, XCircle, Loader } from 'lucide-react';

export default function PaymentCallback() {
  const [searchParams] = useSearchParams();
  const { verifyPayment } = usePayment();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const txRef = searchParams.get('tx_ref');
    
    if (!txRef) {
      setStatus('error');
      setMessage('Invalid payment reference');
      return;
    }

    const verifyTransaction = async () => {
      try {
        const response = await verifyPayment(txRef);
        
        if (response.status === 'success') {
          setStatus('success');
          setMessage('Payment successful! Your tickets have been reserved.');
          // Redirect to event details after 3 seconds
          setTimeout(() => {
            navigate('/events');
          }, 3000);
        } else {
          setStatus('error');
          setMessage('Payment verification failed. Please contact support.');
        }
      } catch (error) {
        setStatus('error');
        setMessage('An error occurred while verifying your payment.');
      }
    };

    verifyTransaction();
  }, [searchParams, verifyPayment, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        {status === 'loading' && (
          <>
            <Loader className="mx-auto h-12 w-12 text-indigo-600 animate-spin" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Verifying Payment
            </h2>
            <p className="mt-2 text-gray-600">
              Please wait while we confirm your payment...
            </p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="mx-auto h-12 w-12 text-green-600" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Payment Successful!
            </h2>
            <p className="mt-2 text-gray-600">{message}</p>
            <p className="mt-4 text-sm text-gray-500">
              Redirecting you back to events...
            </p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="mx-auto h-12 w-12 text-red-600" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">
              Payment Failed
            </h2>
            <p className="mt-2 text-gray-600">{message}</p>
            <button
              onClick={() => navigate('/events')}
              className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Return to Events
            </button>
          </>
        )}
      </div>
    </div>
  );
}