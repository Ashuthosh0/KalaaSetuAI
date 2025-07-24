import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Calendar, MapPin, DollarSign, FileText } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Requirement {
  _id: string;
  title: string;
  description: string;
  role: string;
  location: string;
  compensation: number;
  compensationType: string;
  category: string;
  requirements: string[];
  status: string;
  createdAt: string;
}

const ClientRequirements = () => {
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequirements();
  }, []);

  const fetchRequirements = async () => {
    try {
      const response = await axios.get('/client/requirements');
      setRequirements(response.data.requirements);
    } catch (error) {
      console.error('Failed to fetch requirements:', error);
      toast.error('Failed to load requirements');
    } finally {
      setLoading(false);
    }
  };

  const getCompensationDisplay = (compensation: number, type: string) => {
    const amount = compensation.toLocaleString();
    switch (type) {
      case 'hourly': return `₹${amount}/hour`;
      case 'negotiable': return 'Negotiable';
      default: return `₹${amount}`;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-red-100 text-red-800';
      case 'paused': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/client/dashboard')}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to Dashboard</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">My Requirements</h1>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {requirements.length} posted
              </span>
            </div>
            <button
              onClick={() => navigate('/client/post-requirement')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Post New</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {requirements.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <FileText className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Requirements Posted</h3>
              <p className="text-gray-600 mb-6">
                You haven't posted any job requirements yet. Start by creating your first posting.
              </p>
              <button
                onClick={() => navigate('/client/post-requirement')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
              >
                <Plus size={20} />
                <span>Post Your First Requirement</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {requirements.map((requirement) => (
              <div key={requirement._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{requirement.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(requirement.status)}`}>
                        {requirement.status}
                      </span>
                    </div>
                    <p className="text-blue-600 font-semibold mb-2">{requirement.role}</p>
                    <p className="text-gray-700 mb-4 line-clamp-2">{requirement.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {getCompensationDisplay(requirement.compensation, requirement.compensationType)}
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium capitalize">
                      {requirement.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-gray-600 mb-4">
                  <div className="flex items-center">
                    <MapPin size={16} className="mr-1" />
                    <span className="text-sm">{requirement.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="mr-1" />
                    <span className="text-sm">Posted {new Date(requirement.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {requirement.requirements.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {requirement.requirements.slice(0, 3).map((req, index) => (
                        <li key={index} className="text-sm text-gray-700">{req}</li>
                      ))}
                      {requirement.requirements.length > 3 && (
                        <li className="text-sm text-gray-500">+{requirement.requirements.length - 3} more</li>
                      )}
                    </ul>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-600">
                    0 applications received
                  </div>
                  <div className="flex space-x-3">
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                      View Applications
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 font-medium text-sm">
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientRequirements;