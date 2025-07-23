import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface OTPVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OTPVerificationModal: React.FC<OTPVerificationModalProps> = ({ isOpen, onClose }) => {
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const { verifyOTP, resendOTP, user } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<{ otp: string }>();

  useEffect(() => {
    if (isOpen && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [isOpen, countdown]);

  const onSubmit = async (data: { otp: string }) => {
    try {
      await verifyOTP(data.otp);
      reset();
      onClose();
    } catch (error) {
      // Error is handled in AuthContext
    }
  };

  const handleResendOTP = async () => {
    try {
      await resendOTP();
      setCountdown(60);
      setCanResend(false);
    } catch (error) {
      // Error is handled in AuthContext
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Verify Your Account</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-amber-600" size={32} />
            </div>
            <p className="text-gray-600">
              We've sent a verification code to{' '}
              <span className="font-semibold">{user?.email}</span>
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter 6-digit code
              </label>
              <input
                {...register('otp', {
                  required: 'OTP is required',
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: 'OTP must be 6 digits'
                  }
                })}
                type="text"
                maxLength={6}
                className="w-full px-4 py-3 text-center text-2xl font-mono border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                placeholder="000000"
              />
              {errors.otp && (
                <p className="mt-1 text-sm text-red-600">{errors.otp.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              {isSubmitting ? 'Verifying...' : 'Verify Account'}
            </button>
          </form>

          <div className="text-center mt-6">
            {canResend ? (
              <button
                onClick={handleResendOTP}
                className="text-amber-600 hover:text-amber-700 font-semibold"
              >
                Resend Code
              </button>
            ) : (
              <p className="text-gray-600">
                Resend code in <span className="font-semibold">{countdown}s</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationModal;