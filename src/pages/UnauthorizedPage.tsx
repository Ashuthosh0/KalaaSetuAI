import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="bg-red-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="text-red-600" size={48} />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          You don't have permission to access this page. Please contact an administrator if you believe this is an error.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center space-x-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Go Back</span>
          </button>
          <div>
            <button
              onClick={() => navigate('/')}
              className="text-amber-600 hover:text-amber-700 font-semibold"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;