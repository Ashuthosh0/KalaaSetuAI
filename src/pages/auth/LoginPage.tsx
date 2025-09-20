import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoginModal from '../../components/auth/LoginModal';
import RegisterModal from '../../components/auth/RegisterModal';

const LoginPage = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (user) {
      // Redirect based on user role and status
      if (user.role === 'moderator') {
        navigate('/moderator');
      } else if (user.role === 'artist' && !user.hasCompletedApplication) {
        navigate('/artist-apply');
      } else if (user.role === 'client') {
        navigate('/client/dashboard');
      } else {
        navigate(from);
      }
    }
  }, [user, navigate, from]);

  const handleSwitchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <LoginModal
        isOpen={showLogin}
        onClose={handleClose}
        onSwitchToRegister={handleSwitchToRegister}
      />
      <RegisterModal
        isOpen={showRegister}
        onClose={handleClose}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </div>
  );
};

export default LoginPage;