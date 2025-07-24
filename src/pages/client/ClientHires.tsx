import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Calendar, User, Eye } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Hire {
  _id: string;
  artist: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  requirement?: {
    _id: string;
    title: string;
    category: string;
  };
  status: string;
  hiredAt: string;
  notes?: string;
}

const ClientHires = () => {
  const [hires, setHires] = useState<Hire[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchHires();
  }, []);

  const fetchHires = async () => {
    try {
      const response = await axios.get('/client/hires');
      setHires(response.data.hires);
    } catch (error) {
      console.error('Failed to fetch hires:', error);
      toast.error('Failed to load hires');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/client/dashboard')}
              className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Dashboard</span>
            </button>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-2xl font-bold text-gray-900">My Hires</h1>
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              {hires.length} artists hired
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {hires.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-lg p-12">
              <Users className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Artists Hired</h3>
              <p className="text-gray-600 mb-6">
                You haven't hired any artists yet. Browse our talented artists to find the perfect match for your projects.
              </p>
              <button
                onClick={() => navigate('/all-artists')}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2 mx-auto"
              >
                <Users size={20} />
                <span>Find Artists</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hires.map((hire) => (
              <div key={hire._id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center">
                    <User className="text-purple-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">
                      {hire.artist.firstName} {hire.artist.lastName}
                    </h3>
                    <p className="text-gray-600 text-sm">{hire.artist.email}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(hire.status)}`}>
                    {hire.status}
                  </span>
                </div>

                {hire.requirement && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 mb-1">Project:</p>
                    <p className="text-sm text-gray-700">{hire.requirement.title}</p>
                    <span className="inline-block mt-1 bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs capitalize">
                      {hire.requirement.category}
                    </span>
                  </div>
                )}

                <div className="flex items-center text-gray-600 mb-4">
                  <Calendar size={16} className="mr-2" />
                  <span className="text-sm">Hired on {new Date(hire.hiredAt).toLocaleDateString()}</span>
                </div>

                {hire.notes && (
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-900 mb-1">Notes:</p>
                    <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">{hire.notes}</p>
                  </div>
                )}

                <div className="flex space-x-3">
                  <button
                    onClick={() => navigate(`/artist/${hire.artist._id}`)}
                    className="flex-1 flex items-center justify-center space-x-2 border border-purple-600 text-purple-600 hover:bg-purple-50 font-medium py-2 px-4 rounded-lg transition-colors"
                  >
                    <Eye size={16} />
                    <span>View Profile</span>
                  </button>
                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientHires;