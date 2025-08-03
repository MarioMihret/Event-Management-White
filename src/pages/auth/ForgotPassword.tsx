import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Loader, ArrowLeft, Building, Shield } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function ForgotPassword() {
  const { requestPasswordReset } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await requestPasswordReset(email);
      setSubmitted(true);
      toast.success('Password reset instructions sent to your email');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset instructions');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Check your email
            </h2>
            <p className="text-gray-600 mb-6">
              We've sent password reset instructions to <span className="font-medium">{email}</span>
            </p>
            <p className="text-sm text-gray-500 mb-8">
              Didn't receive the email? Check your spam folder or try again.
            </p>
            <Link
              to="/login"
              className="inline-flex items-center justify-center w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto rounded-2xl shadow-xl overflow-hidden bg-white md:flex">
        {/* Left side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="text-center md:text-left mb-8">
            <Link to="/" className="inline-flex items-center text-indigo-600 font-bold text-2xl">
              <Building className="w-8 h-8 mr-2" />
              <span>EventFlow</span>
            </Link>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Reset Password
            </h2>
            <p className="mt-2 text-gray-600">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative">
                <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 mr-3 animate-spin" />
                    Sending Instructions...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5 mr-2" />
                    Send Reset Instructions
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <Link
              to="/login"
              className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to sign in
            </Link>
          </div>
        </div>

        {/* Right side - Visual */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-700 p-12">
          <div className="h-full flex flex-col justify-center items-center text-white">
            <div className="text-center">
              <Shield className="w-20 h-20 mx-auto mb-8 opacity-80" />
              <h3 className="text-3xl font-bold mb-4">Secure Password Reset</h3>
              <p className="text-lg opacity-90 mb-8">
                We'll help you get back into your account safely and securely.
              </p>
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Secure email verification</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Quick and easy process</span>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Account protection guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}