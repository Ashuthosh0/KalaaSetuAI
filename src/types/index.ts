export interface Artist {
  id: string;
  name: string;
  artForm: string;
  category: string;
  image: string;
  price: number;
  location: string;
  rating: number;
  reviewCount: number;
  specialties: string[];
  experience: number;
  description: string;
  availability: 'available' | 'busy' | 'unavailable';
  languages: string[];
  education: string[];
  achievements: string[];
}

export interface Job {
  id: string;
  title: string;
  description: string;
  role: string;
  location: string;
  compensation: number;
  compensationType: 'fixed' | 'hourly' | 'negotiable';
  category: string;
  requirements: string[];
  duration: string;
  postedDate: string;
  deadline: string;
  employer: string;
  employerRating: number;
}

export interface FilterState {
  priceRange: [number, number];
  location: string[];
  experience: string[];
  rating: number;
  availability: string[];
  specialties: string[];
}