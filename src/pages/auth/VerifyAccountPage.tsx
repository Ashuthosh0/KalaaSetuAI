import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import OTPVerificationModal from '../../components/auth/OTPVerificationModal';

const VerifyAccountPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClose = () => {
    if (user?.isVerified) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <OTPVerificationModal
        isOpen={true}
        onClose={handleClose}
      />
    </div>
  );
};

export default VerifyAccountPage;