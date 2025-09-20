import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, DollarSign, Clock, Star, Filter, Search, AlertCircle, CheckCircle } from 'lucide-react';
import { jobs } from '../data/jobs';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const FindWork = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [compensationFilter, setCompensationFilter] = useState('');
  const [applicationStatus, setApplicationStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'artist') {
      checkApplicationStatus();
    } else {
      setLoading(false);
    }
  }, [user]);

  const checkApplicationStatus = async () => {
    try {
      const response = await axios.get('/artist/application-status');
      setApplicationStatus(response.data.application.status);
    } catch (error: any) {
      if (error.response?.status === 404) {
        // No application found
        setApplicationStatus('none');
      } else {
        console.error('Error checking application status:', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !locationFilter || job.location === locationFilter;
    const matchesCategory = !categoryFilter || job.category === categoryFilter;
    const matchesCompensation = !compensationFilter || 
      (compensationFilter === 'low' && job.compensation < 5000) ||
      (compensationFilter === 'medium' && job.compensation >= 5000 && job.compensation < 50000) ||
      (compensationFilter === 'high' && job.compensation >= 50000);
    
    return matchesSearch && matchesLocation && matchesCategory && matchesCompensation;
  });

  const getCompensationDisplay = (job: any) => {
    const amount = job.compensation.toLocaleString();
    switch (job.compensationType) {
      case 'hourly': return `₹${amount}/hour`;
      case 'negotiable': return 'Negotiable';
      default: return `₹${amount}`;
    }
  };

  const getDaysAgo = (dateString: string) => {
    const posted = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - posted.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays === 1 ? '1 day ago' : `${diffDays} days ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  // Show application status message for artists
  if (user?.role === 'artist' && applicationStatus !== 'approved') {
    const getStatusContent = () => {
      switch (applicationStatus) {
        case 'none':
          return {
            icon: <AlertCircle className="text-amber-500" size={64} />,
            title: 'Complete Your Artist Application',
            message: 'To access work opportunities, you need to complete your artist application first.',
            actionText: 'Complete Application',
            actionPath: '/artist-apply'
          };
        case 'pending':
          return {
            icon: <Clock className="text-yellow-500" size={64} />,
            title: 'Application Under Review',
            message: 'Your artist application is currently being reviewed. You\'ll be able to access opportunities once it\'s approved.',
            actionText: 'Check Application Status',
            actionPath: '/artist/application-status'
          };
        case 'rejected':
          return {
            icon: <AlertCircle className="text-red-500" size={64} />,
            title: 'Application Needs Attention',
            message: 'Your application was not approved. Please review the feedback and reapply.',
            actionText: 'View Feedback',
            actionPath: '/artist/application-status'
          };
        default:
          return {
            icon: <AlertCircle className="text-gray-500" size={64} />,
            title: 'Application Required',
            message: 'Please complete your artist application to access work opportunities.',
            actionText: 'Apply Now',
            actionPath: '/artist-apply'
          };
      }
    };

    const statusContent = getStatusContent();

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-gray-600 hover:text-amber-600 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to Home</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">Find Work</h1>
            </div>
          </div>
        </div>

        {/* Status Message */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="mb-6">
              {statusContent.icon}
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {statusContent.title}
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {statusContent.message}
            </p>
            <div className="space-y-4">
              <button
                onClick={() => navigate(statusContent.actionPath)}
                className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                {statusContent.actionText}
              </button>
            </div>
          </div>
        </div>
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
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-gray-600 hover:text-amber-600 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to Home</span>
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-2xl font-bold text-gray-900">Find Work</h1>
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                {filteredJobs.length} opportunities
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
            </div>
            
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="">All Locations</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Rishikesh">Rishikesh</option>
              <option value="Patna">Patna</option>
            </select>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="">All Categories</option>
              <option value="dance">Dance</option>
              <option value="music">Music</option>
              <option value="yoga">Yoga</option>
              <option value="crafts">Crafts</option>
            </select>

            <select
              value={compensationFilter}
              onChange={(e) => setCompensationFilter(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            >
              <option value="">All Budgets</option>
              <option value="low">Under ₹5,000</option>
              <option value="medium">₹5,000 - ₹50,000</option>
              <option value="high">₹50,000+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={64} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
            <p className="text-gray-600">Try adjusting your search criteria to see more results.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1 lg:mr-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{job.title}</h3>
                        <div className="flex items-center space-x-4 text-gray-600 mb-3">
                          <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-sm font-medium">
                            {job.role}
                          </span>
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-1" />
                            <span className="text-sm">{job.location}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock size={16} className="mr-1" />
                            <span className="text-sm">{job.duration}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {getCompensationDisplay(job)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {job.compensationType === 'fixed' ? 'Fixed Price' : 'Hourly Rate'}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4 leading-relaxed">{job.description}</p>

                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        {job.requirements.map((req, index) => (
                          <li key={index} className="text-sm">{req}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Posted {getDaysAgo(job.postedDate)}</span>
                        <span>•</span>
                        <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
                        <span>•</span>
                        <div className="flex items-center">
                          <Star className="text-yellow-400 fill-current mr-1" size={14} />
                          <span>{job.employerRating} employer rating</span>
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <button className="border border-amber-600 text-amber-600 hover:bg-amber-50 font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                          Save Job
                        </button>
                        <button className="bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200">
                          Apply Now
                        </button>
                      </div>
                    </div>
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

export default FindWork;