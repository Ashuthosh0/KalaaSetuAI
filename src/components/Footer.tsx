import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-amber-400 mb-4">KalaaSetu</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Connecting India's classical art masters with those who appreciate and seek their expertise. 
              Preserving tradition through modern connections.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Find Talent</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Find Work</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">How It Works</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Success Stories</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Pricing</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Classical Dance</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Indian Music</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Yoga & Meditation</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Traditional Crafts</a></li>
              <li><a href="#" className="text-gray-300 hover:text-amber-400 transition-colors">Art Workshops</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-amber-400" />
                <span className="text-gray-300">hello@kalaaselv.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-amber-400" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-amber-400" />
                <span className="text-gray-300">Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 KalaaSelv. All rights reserved. Preserving Indian Classical Arts.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;