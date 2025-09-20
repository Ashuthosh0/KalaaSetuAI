import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Grid, List, Search } from 'lucide-react';
import FilterSidebar from '../components/FilterSidebar';
import ArtistCard from '../components/ArtistCard';
import { artists } from '../data/artists';
import { FilterState } from '../types';

const AllArtists = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 10000],
    location: [],
    experience: [],
    rating: 0,
    availability: [],
    specialties: []
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const filteredArtists = useMemo(() => {
    return artists.filter(artist => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = artist.name.toLowerCase().includes(query);
        const matchesArtForm = artist.artForm.toLowerCase().includes(query);
        const matchesLocation = artist.location.toLowerCase().includes(query);
        const matchesSpecialties = artist.specialties.some(specialty => 
          specialty.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesArtForm && !matchesLocation && !matchesSpecialties) {
          return false;
        }
      }
      
      // Price filter
      if (artist.price < filters.priceRange[0] || artist.price > filters.priceRange[1]) return false;
      
      // Location filter
      if (filters.location.length > 0 && !filters.location.includes(artist.location)) return false;
      
      // Experience filter
      if (filters.experience.length > 0) {
        const experienceMatch = filters.experience.some(exp => {
          switch (exp) {
            case '0-5 years': return artist.experience <= 5;
            case '5-10 years': return artist.experience > 5 && artist.experience <= 10;
            case '10-15 years': return artist.experience > 10 && artist.experience <= 15;
            case '15+ years': return artist.experience > 15;
            default: return false;
          }
        });
        if (!experienceMatch) return false;
      }
      
      // Rating filter
      if (filters.rating > 0 && artist.rating < filters.rating) return false;
      
      // Availability filter
      if (filters.availability.length > 0 && !filters.availability.includes(artist.availability)) return false;
      
      // Specialties filter
      if (filters.specialties.length > 0) {
        const hasSpecialty = filters.specialties.some(specialty => 
          artist.specialties.includes(specialty)
        );
        if (!hasSpecialty) return false;
      }
      
      return true;
    });
  }, [searchQuery, filters]);

  const handleHire = (artistId: string) => {
    console.log('Hire artist:', artistId);
  };

  const handleViewProfile = (artistId: string) => {
    navigate(`/artist/${artistId}`);
  };

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
              <h1 className="text-2xl font-bold text-gray-900">All Artists</h1>
              <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium">
                {filteredArtists.length} artists found
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-amber-100 text-amber-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-amber-100 text-amber-600' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, art form, location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <FilterSidebar
          filters={filters}
          onFiltersChange={setFilters}
          category="all"
        />

        {/* Main Content */}
        <div className="flex-1 p-6">
          {filteredArtists.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Grid size={64} className="mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No artists found</h3>
              <p className="text-gray-600">Try adjusting your search or filters to see more results.</p>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredArtists.map((artist) => (
                <ArtistCard
                  key={artist.id}
                  artist={artist}
                  onHire={handleHire}
                  onViewProfile={handleViewProfile}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllArtists;