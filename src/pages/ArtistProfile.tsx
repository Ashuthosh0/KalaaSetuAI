import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MapPin, Clock, Award, BookOpen, Languages, CheckCircle } from 'lucide-react';
import { artists } from '../data/artists';

const ArtistProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const artist = artists.find(a => a.id === id);

  if (!artist) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Artist Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="text-amber-600 hover:text-amber-700 font-medium"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-amber-600 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Artist Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Profile */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-48 h-48 object-cover rounded-xl"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{artist.name}</h1>
                      <p className="text-xl text-amber-600 font-semibold mb-2">{artist.artForm}</p>
                      <div className="flex items-center space-x-4 text-gray-600">
                        <div className="flex items-center">
                          <MapPin size={16} className="mr-1" />
                          <span>{artist.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={16} className="mr-1" />
                          <span>{artist.experience} years experience</span>
                        </div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getAvailabilityColor(artist.availability)}`}>
                      {artist.availability}
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    <div className="flex items-center space-x-1 mr-4">
                      <Star className="text-yellow-400 fill-current" size={20} />
                      <span className="text-lg font-semibold text-gray-800">{artist.rating}</span>
                      <span className="text-gray-600">({artist.reviewCount} reviews)</span>
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-6">{artist.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {artist.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Education & Achievements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <BookOpen className="text-amber-600 mr-2" size={20} />
                  <h3 className="text-lg font-semibold text-gray-900">Education</h3>
                </div>
                <ul className="space-y-2">
                  {artist.education.map((edu, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                      <span className="text-gray-700">{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Award className="text-amber-600 mr-2" size={20} />
                  <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
                </div>
                <ul className="space-y-2">
                  {artist.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" size={16} />
                      <span className="text-gray-700">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center mb-4">
                <Languages className="text-amber-600 mr-2" size={20} />
                <h3 className="text-lg font-semibold text-gray-900">Languages</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {artist.languages.map((language) => (
                  <span
                    key={language}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  ₹{artist.price.toLocaleString()}
                </div>
                <div className="text-gray-600">per session</div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-medium">{artist.experience} years</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center">
                    <Star className="text-yellow-400 fill-current mr-1" size={16} />
                    <span className="font-medium">{artist.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <span className="text-gray-600">Reviews</span>
                  <span className="font-medium">{artist.reviewCount}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Availability</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(artist.availability)}`}>
                    {artist.availability}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                  Hire Now
                </button>
                <button className="w-full border border-amber-600 text-amber-600 hover:bg-amber-50 font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                  Send Message
                </button>
                <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                  Save to Favorites
                </button>
              </div>

              <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                <h4 className="font-medium text-amber-800 mb-2">Quick Response</h4>
                <p className="text-sm text-amber-700">
                  This artist typically responds within 2 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;