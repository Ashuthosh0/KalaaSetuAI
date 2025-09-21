import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import { artists } from '../data/artists';

// Get top 6 artists by rating
const topArtists = artists
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 6);

const TopArtistsSection = () => {
  const navigate = useNavigate();

  const handleViewProfile = (artistId: string) => {
    navigate(`/artist/${artistId}`);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Top Rated Artists
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">

            Meet our highest-rated traditional artists with exceptional reviews and proven expertise in their crafts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topArtists.map((artist) => (
            <div
              key={artist.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group cursor-pointer"
            >
              <div className="relative overflow-hidden h-64">
                <img
                  src={artist.image}
                  alt={artist.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <div className="flex items-center space-x-1">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="text-sm font-semibold text-gray-800">{artist.rating}</span>
                    <span className="text-sm text-gray-600">({artist.reviewCount})</span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {artist.name}
                </h3>
                <p className="text-amber-600 font-semibold mb-3">
                  {artist.artForm}
                </p>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{artist.location}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {artist.specialties.slice(0, 2).map((specialty) => (
                    <span
                      key={specialty}
                      className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="text-2xl font-bold text-gray-900">
                    ₹{artist.price.toLocaleString()}
                    <span className="text-sm text-gray-600 font-normal">/session</span>
                  </div>
                  <button 
                    onClick={() => handleViewProfile(artist.id)}
                    className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors group-hover:translate-x-1 duration-300"
                  >
                    <span>View Profile</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => navigate('/all-artists')}
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center space-x-2 mx-auto"
          >
            <span>View All Artists</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopArtistsSection;