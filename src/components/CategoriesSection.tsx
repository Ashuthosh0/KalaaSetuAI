import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
  count: number;
}

const categories: Category[] = [
  {
    id: 'dance',
    title: 'Classical Dance',
    description: 'Bharatanatyam, Kathak, Odissi, and more',
    image: 'https://images.pexels.com/photos/2050718/pexels-photo-2050718.jpeg?auto=compress&cs=tinysrgb&w=800',
    count: 250
  },
  {
    id: 'music',
    title: 'Indian Classical Music',
    description: 'Vocal, Sitar, Tabla, and instruments',
    image: 'https://images.pexels.com/photos/4472044/pexels-photo-4472044.jpeg?auto=compress&cs=tinysrgb&w=800',
    count: 180
  },
  {
    id: 'yoga',
    title: 'Yoga & Meditation',
    description: 'Traditional Hatha, Ashtanga, and spiritual practices',
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800',
    count: 320
  },
  {
    id: 'crafts',
    title: 'Traditional Crafts',
    description: 'Pottery, Painting, Textiles, and artwork',
    image: 'https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg?auto=compress&cs=tinysrgb&w=800',
    count: 150
  }
];

const CategoriesSection = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/${categoryId}`);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Art Categories
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the rich diversity of Indian classical arts and find the perfect artist for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {category.count}+ Artists
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors">
                  {category.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {category.description}
                </p>
                <div className="flex items-center text-amber-600 font-semibold group-hover:text-amber-700 transition-colors">
                  <span>Explore Artists</span>
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;