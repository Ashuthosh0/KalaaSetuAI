import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MapPin, ArrowRight } from 'lucide-react';

interface Artist {
  id: string;
  name: string;
  artForm: string;
  image: string;
  price: number;
  location: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
}

const topArtists: Artist[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    artForm: 'Bharatanatyam',
    image: 'https://images.pexels.com/photos/2050718/pexels-photo-2050718.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 5000,
    location: 'Chennai',
    rating: 4.9,
    reviewCount: 127,
    specialties: ['Classical Dance', 'Choreography', 'Teaching']
  },
  {
    id: '2',
    name: 'Ravi Kumar',
    artForm: 'Sitar',
    image: 'https://images.pexels.com/photos/4472044/pexels-photo-4472044.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 7500,
    location: 'Mumbai',
    rating: 4.8,
    reviewCount: 95,
    specialties: ['Classical Music', 'Compositions', 'Live Performance']
  },
  {
    id: '3',
    name: 'Anjali Patel',
    artForm: 'Hatha Yoga',
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 3000,
    location: 'Rishikesh',
    rating: 4.9,
    reviewCount: 203,
    specialties: ['Yoga Therapy', 'Meditation', 'Wellness']
  },
  {
    id: '4',
    name: 'Suresh Vishwakarma',
    artForm: 'Traditional Pottery',
    image: 'https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 4500,
    location: 'Jaipur',
    rating: 4.7,
    reviewCount: 78,
    specialties: ['Handicrafts', 'Pottery', 'Art Workshops']
  },
  {
    id: '5',
    name: 'Meera Krishnan',
    artForm: 'Kathak',
    image: 'https://images.pexels.com/photos/2050718/pexels-photo-2050718.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 6000,
    location: 'Delhi',
    rating: 4.8,
    reviewCount: 156,
    specialties: ['Classical Dance', 'Cultural Events', 'Training']
  },
  {
    id: '6',
    name: 'Arjun Mishra',
    artForm: 'Tabla',
    image: 'https://images.pexels.com/photos/4472044/pexels-photo-4472044.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: 5500,
    location: 'Varanasi',
    rating: 4.9,
    reviewCount: 112,
    specialties: ['Percussion', 'Accompaniment', 'Solo Performance']
  }
];

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
            Meet our highest-rated artists with exceptional reviews and proven expertise in their crafts
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