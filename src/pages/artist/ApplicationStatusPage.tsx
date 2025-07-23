import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, XCircle, FileText, User, Calendar } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

interface Application {
  id: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  reviewedAt?: string;
  rejectionReason?: string;
  applicationData: {
    gender: string;
    address: {
      street: string;
      city: string;
      state: string;
      pincode: string;
    };
    category: string;
    experience: number;
    introduction?: string;
  };
}

const ApplicationStatusPage = () => {
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchApplicationStatus();
  }, []);

  const fetchApplicationStatus = async () => {
    try {
      const response = await axios.get('/artist/application-status');
      setApplication(response.data.application);
    } catch (error) {
      console.error('Failed to fetch application status:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-500" size={24} />;
      case 'approved':
        return <CheckCircle className="text-green-500" size={24} />;
      case 'rejected':
        return <XCircle className="text-red-500" size={24} />;
      default:
        return <Clock className="text-gray-500" size={24} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Your application is under review. We will notify you once it has been processed.';
      case 'approved':
        return 'Congratulations! Your application has been approved. You can now access all artist features.';
      case 'rejected':
        return 'Unfortunately, your application was not approved. Please see the reason below and feel free to reapply.';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Application Found</h2>
          <p className="text-gray-600 mb-6">You haven't submitted an artist application yet.</p>
          <button
            onClick={() => navigate('/artist-apply')}
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Submit Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-amber-800 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Application Status</h1>
            <p className="text-amber-100 mt-2">
              Track the progress of your artist application
            </p>
          </div>

          {/* Status Card */}
          <div className="px-8 py-6">
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <div className="flex items-center space-x-4 mb-4">
                {getStatusIcon(application.status)}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Application {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </h2>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                    {application.status.toUpperCase()}
                  </span>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                {getStatusMessage(application.status)}
              </p>
              <div className="text-sm text-gray-600">
                <p>Submitted: {new Date(application.submittedAt).toLocaleDateString()}</p>
                {application.reviewedAt && (
                  <p>Reviewed: {new Date(application.reviewedAt).toLocaleDateString()}</p>
                )}
              </div>
            </div>

            {/* Rejection Reason */}
            {application.status === 'rejected' && application.rejectionReason && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold text-red-800 mb-2">Rejection Reason</h3>
                <p className="text-red-700">{application.rejectionReason}</p>
                <div className="mt-4">
                  <button
                    onClick={() => navigate('/artist-apply')}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Reapply
                  </button>
                </div>
              </div>
            )}

            {/* Application Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <User className="mr-2 text-amber-600" size={20} />
                  Personal Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Name:</span>
                    <p className="text-gray-900">{user?.firstName} {user?.lastName}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Gender:</span>
                    <p className="text-gray-900 capitalize">{application.applicationData.gender}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Address:</span>
                    <p className="text-gray-900">
                      {application.applicationData.address.street}<br />
                      {application.applicationData.address.city}, {application.applicationData.address.state} {application.applicationData.address.pincode}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Calendar className="mr-2 text-amber-600" size={20} />
                  Professional Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Category:</span>
                    <p className="text-gray-900 capitalize">{application.applicationData.category}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-500">Experience:</span>
                    <p className="text-gray-900">{application.applicationData.experience} years</p>
                  </div>
                  {application.applicationData.introduction && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">Introduction:</span>
                      <p className="text-gray-900">{application.applicationData.introduction}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 pt-6 border-t flex space-x-4">
              <button
                onClick={() => navigate('/')}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Back to Home
              </button>
              {application.status === 'approved' && (
                <button
                  onClick={() => navigate('/find-work')}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Find Work
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationStatusPage;