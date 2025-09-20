import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Preserving Classical Indian Dance in the Digital Age',
    excerpt: 'Exploring how traditional art forms like Bharatanatyam and Kathak are adapting to modern platforms while maintaining their authentic essence.',
    content: 'Classical Indian dance forms have been passed down through generations, carrying with them centuries of cultural heritage and spiritual significance. In today\'s digital world, these ancient art forms face both challenges and opportunities...',
    author: 'Dr. Meera Krishnan',
    date: '2025-01-10',
    readTime: '5 min read',
    image: 'https://images.pexels.com/photos/2050718/pexels-photo-2050718.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Dance'
  },
  {
    id: '2',
    title: 'The Healing Power of Indian Classical Music',
    excerpt: 'Understanding how ragas and traditional melodies contribute to mental wellness and therapeutic healing in modern healthcare.',
    content: 'Indian classical music has long been recognized for its therapeutic properties. The intricate system of ragas, each with its unique emotional and spiritual qualities, offers profound healing benefits...',
    author: 'Pandit Ravi Shankar',
    date: '2025-01-08',
    readTime: '7 min read',
    image: 'https://images.pexels.com/photos/4472044/pexels-photo-4472044.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Music'
  },
  {
    id: '3',
    title: 'Yoga Beyond Asanas: The Philosophy of Ancient Practice',
    excerpt: 'Delving into the deeper philosophical aspects of yoga that extend far beyond physical postures to encompass a complete way of life.',
    content: 'While yoga has gained global popularity primarily through its physical aspects, the true essence of this ancient practice encompasses much more than asanas...',
    author: 'Swami Ananda Saraswati',
    date: '2025-01-05',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Yoga'
  },
  {
    id: '4',
    title: 'Reviving Traditional Crafts: A Modern Renaissance',
    excerpt: 'How contemporary artists are breathing new life into age-old craft traditions while creating sustainable livelihoods.',
    content: 'Traditional Indian crafts represent millennia of artistic evolution, cultural expression, and skilled craftsmanship. In recent years, there has been a remarkable renaissance...',
    author: 'Artisan Collective',
    date: '2025-01-03',
    readTime: '4 min read',
    image: 'https://images.pexels.com/photos/1193743/pexels-photo-1193743.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Crafts'
  },
  {
    id: '5',
    title: 'Building a Sustainable Career in Classical Arts',
    excerpt: 'Practical guidance for artists on creating financially viable careers while staying true to traditional art forms.',
    content: 'Many talented classical artists struggle to balance their passion for traditional arts with the practical need for financial stability. This comprehensive guide explores...',
    author: 'KalaaSetu Editorial Team',
    date: '2025-01-01',
    readTime: '8 min read',
    image: 'https://images.pexels.com/photos/3807871/pexels-photo-3807871.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Career'
  },
  {
    id: '6',
    title: 'The Role of Gurus in Classical Art Education',
    excerpt: 'Examining the traditional guru-shishya relationship and its relevance in contemporary art education.',
    content: 'The guru-shishya parampara (teacher-student tradition) has been the cornerstone of Indian classical art education for centuries. This sacred relationship...',
    author: 'Prof. Lakshmi Nair',
    date: '2024-12-28',
    readTime: '6 min read',
    image: 'https://images.pexels.com/photos/2050718/pexels-photo-2050718.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Education'
  }
];

const Blogs = () => {
  const navigate = useNavigate();

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
            <h1 className="text-2xl font-bold text-gray-900">Blogs & Insights</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Explore the World of Classical Arts</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Discover insights, stories, and wisdom from masters of Indian classical arts, crafts, and spiritual practices.
          </p>
        </div>
      </div>

      {/* Blog Posts */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative overflow-hidden h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <User size={14} className="mr-1" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <button className="text-amber-600 hover:text-amber-700 font-semibold transition-colors">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Newsletter Signup */}
      <div className="bg-amber-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h3>
          <p className="text-gray-600 mb-8">
            Subscribe to our newsletter for the latest insights on classical arts, artist spotlights, and industry trends.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
            <button className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;