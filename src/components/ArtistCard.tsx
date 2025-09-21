import React from 'react';
import { Star, MapPin, Clock, User } from 'lucide-react';
import { Artist } from '../types';

interface ArtistCardProps {
  artist: Artist;
  onHire: (artistId: string) => void;
  onViewProfile: (artistId: string) => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onHire, onViewProfile }) => {

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'unavailable': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(artist.availability)}`}>
          {artist.availability}
        </div>
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
          <div className="flex items-center space-x-1">
            <Star className="text-yellow-400 fill-current" size={14} />
            <span className="text-sm font-semibold text-gray-800">{artist.rating}</span>
            <span className="text-xs text-gray-600">({artist.reviewCount})</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{artist.name}</h3>
            <p className="text-amber-600 font-semibold">{artist.artForm}</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-gray-900">₹{artist.price.toLocaleString()}</div>
            <div className="text-sm text-gray-600">per session</div>
          </div>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin size={16} className="mr-1" />
          <span className="text-sm">{artist.location}</span>
        </div>

        <div className="flex items-center text-gray-600 mb-4">
          <Clock size={16} className="mr-1" />
          <span className="text-sm">{artist.experience} years experience</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {artist.specialties.slice(0, 2).map((specialty) => (
            <span
              key={specialty}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs"
            >
              {specialty}
            </span>
          ))}
          {artist.specialties.length > 2 && (
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
              +{artist.specialties.length - 2} more
            </span>
          )}
        </div>

        <div className="flex space-x-3">
          <button
            onClick={() => onViewProfile(artist.id)}
            className="flex-1 border border-amber-600 text-amber-600 hover:bg-amber-50 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <User size={16} />
            <span>View Profile</span>
          </button>
          <button
            onClick={() => onHire(artist.id)}
            className="flex-1 bg-amber-600 hover:bg-amber-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Hire Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;