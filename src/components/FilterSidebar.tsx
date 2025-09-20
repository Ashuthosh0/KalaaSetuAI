import React from 'react';
import { FilterState } from '../types';
import { Slider } from './Slider';

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  category: string;
}

const locations = ['Mumbai', 'Delhi', 'Chennai', 'Bangalore', 'Kolkata', 'Jaipur', 'Pune', 'Kochi', 'Varanasi', 'Rishikesh', 'Patna', 'Bhubaneswar', 'Mysore'];

const experienceLevels = ['0-5 years', '5-10 years', '10-15 years', '15+ years'];

const availabilityOptions = ['available', 'busy', 'unavailable'];

const specialtiesByCategory = {
  all: ['Classical Dance', 'Choreography', 'Teaching', 'Cultural Events', 'Traditional Performances', 'Workshops', 'Temple Performances', 'Classical Music', 'Compositions', 'Live Performance', 'Percussion', 'Accompaniment', 'Solo Performance', 'Vocal Music', 'Wind Instruments', 'Fusion Music', 'Recording', 'Yoga Therapy', 'Meditation', 'Wellness', 'Pranayama', 'Philosophy', 'Alignment', 'Therapeutic Yoga', 'Props Usage', 'Handicrafts', 'Pottery', 'Art Workshops', 'Traditional Painting', 'Wall Art', 'Wood Carving', 'Sculptures', 'Furniture Design', 'Handloom', 'Silk Weaving', 'Traditional Textiles'],
  dance: ['Classical Dance', 'Choreography', 'Teaching', 'Cultural Events', 'Traditional Performances', 'Workshops', 'Temple Performances'],
  music: ['Classical Music', 'Compositions', 'Live Performance', 'Percussion', 'Accompaniment', 'Solo Performance', 'Vocal Music', 'Wind Instruments', 'Fusion Music', 'Recording'],
  yoga: ['Yoga Therapy', 'Meditation', 'Wellness', 'Pranayama', 'Philosophy', 'Alignment', 'Therapeutic Yoga', 'Props Usage'],
  crafts: ['Handicrafts', 'Pottery', 'Art Workshops', 'Traditional Painting', 'Wall Art', 'Teaching', 'Wood Carving', 'Sculptures', 'Furniture Design', 'Handloom', 'Silk Weaving', 'Traditional Textiles']
};

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFiltersChange, category }) => {
  const handlePriceChange = (value: [number, number]) => {
    onFiltersChange({ ...filters, priceRange: value });
  };

  const handleLocationChange = (location: string) => {
    const newLocations = filters.location.includes(location)
      ? filters.location.filter(l => l !== location)
      : [...filters.location, location];
    onFiltersChange({ ...filters, location: newLocations });
  };

  const handleExperienceChange = (experience: string) => {
    const newExperience = filters.experience.includes(experience)
      ? filters.experience.filter(e => e !== experience)
      : [...filters.experience, experience];
    onFiltersChange({ ...filters, experience: newExperience });
  };

  const handleAvailabilityChange = (availability: string) => {
    const newAvailability = filters.availability.includes(availability)
      ? filters.availability.filter(a => a !== availability)
      : [...filters.availability, availability];
    onFiltersChange({ ...filters, availability: newAvailability });
  };

  const handleSpecialtyChange = (specialty: string) => {
    const newSpecialties = filters.specialties.includes(specialty)
      ? filters.specialties.filter(s => s !== specialty)
      : [...filters.specialties, specialty];
    onFiltersChange({ ...filters, specialties: newSpecialties });
  };

  const handleRatingChange = (rating: number) => {
    onFiltersChange({ ...filters, rating });
  };

  const clearFilters = () => {
    onFiltersChange({
      priceRange: [0, 10000],
      location: [],
      experience: [],
      rating: 0,
      availability: [],
      specialties: []
    });
  };

  const specialties = specialtiesByCategory[category as keyof typeof specialtiesByCategory] || [];

  return (
    <div className="w-80 bg-white border-r border-gray-200 p-6 overflow-y-auto h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-amber-600 hover:text-amber-700 font-medium"
        >
          Clear All
        </button>
      </div>

      {/* Price Range */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-900 mb-4">Price Range (₹)</h4>
        <Slider
          min={0}
          max={10000}
          step={500}
          value={filters.priceRange}
          onChange={handlePriceChange}
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>₹{filters.priceRange[0].toLocaleString()}</span>
          <span>₹{filters.priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Location */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-900 mb-4">Location</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {locations.map((location) => (
            <label key={location} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.location.includes(location)}
                onChange={() => handleLocationChange(location)}
                className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <span className="ml-2 text-sm text-gray-700">{location}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Experience */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-900 mb-4">Experience</h4>
        <div className="space-y-2">
          {experienceLevels.map((level) => (
            <label key={level} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.experience.includes(level)}
                onChange={() => handleExperienceChange(level)}
                className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <span className="ml-2 text-sm text-gray-700">{level}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-900 mb-4">Minimum Rating</h4>
        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 3.0].map((rating) => (
            <label key={rating} className="flex items-center">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() => handleRatingChange(rating)}
                className="border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <span className="ml-2 text-sm text-gray-700">{rating}+ Stars</span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-900 mb-4">Availability</h4>
        <div className="space-y-2">
          {availabilityOptions.map((availability) => (
            <label key={availability} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.availability.includes(availability)}
                onChange={() => handleAvailabilityChange(availability)}
                className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <span className="ml-2 text-sm text-gray-700 capitalize">{availability}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Specialties */}
      <div className="mb-8">
        <h4 className="font-medium text-gray-900 mb-4">Specialties</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {specialties.map((specialty) => (
            <label key={specialty} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.specialties.includes(specialty)}
                onChange={() => handleSpecialtyChange(specialty)}
                className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <span className="ml-2 text-sm text-gray-700">{specialty}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;