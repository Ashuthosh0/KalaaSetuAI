import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Menu, X } from 'lucide-react';

interface HeaderProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <button 
              onClick={() => navigate('/')}
              className="text-2xl font-bold text-amber-800 hover:text-amber-900 transition-colors"
            >
              KalaaSetu
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button 
              onClick={() => navigate('/all-artists')}
              className="text-gray-700 hover:text-amber-800 transition-colors font-medium"
            >
              Find Talent
            </button>
            <button 
              onClick={() => navigate('/find-work')}
              className="text-gray-700 hover:text-amber-800 transition-colors font-medium"
            >
              Find Work
            </button>
            <button 
              onClick={() => navigate('/blogs')}
              className="text-gray-700 hover:text-amber-800 transition-colors font-medium"
            >
              Blogs
            </button>
            <button 
              onClick={() => navigate('/about')}
              className="text-gray-700 hover:text-amber-800 transition-colors font-medium"
            >
              About Us
            </button>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex space-x-4">
            <button className="text-gray-700 hover:text-amber-800 transition-colors font-medium px-4 py-2">
              Log In
            </button>
            <button className="bg-amber-800 text-white hover:bg-amber-900 transition-colors font-medium px-6 py-2 rounded-lg">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-amber-800 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="py-4 space-y-4">
              <button 
                onClick={() => navigate('/all-artists')}
                className="block w-full text-left text-gray-700 hover:text-amber-800 transition-colors font-medium py-2"
              >
                Find Talent
              </button>
              <button 
                onClick={() => navigate('/find-work')}
                className="block w-full text-left text-gray-700 hover:text-amber-800 transition-colors font-medium py-2"
              >
                Find Work
              </button>
              <button 
                onClick={() => navigate('/blogs')}
                className="block w-full text-left text-gray-700 hover:text-amber-800 transition-colors font-medium py-2"
              >
                Blogs
              </button>
              <button 
                onClick={() => navigate('/about')}
                className="block w-full text-left text-gray-700 hover:text-amber-800 transition-colors font-medium py-2"
              >
                About Us
              </button>
              <div className="border-t pt-4 space-y-2">
                <button className="block w-full text-left text-gray-700 hover:text-amber-800 transition-colors font-medium py-2">
                  Log In
                </button>
                <button className="bg-amber-800 text-white hover:bg-amber-900 transition-colors font-medium px-6 py-2 rounded-lg w-full">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;