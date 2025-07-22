import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Users, Award, Globe } from 'lucide-react';

const AboutUs = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: Users, label: 'Active Artists', value: '2,500+' },
    { icon: Award, label: 'Successful Projects', value: '10,000+' },
    { icon: Globe, label: 'Cities Covered', value: '50+' },
    { icon: Heart, label: 'Happy Clients', value: '5,000+' }
  ];

  const team = [
    {
      name: 'Arjun Mehta',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Classical music enthusiast with 15+ years in tech, passionate about preserving Indian arts.'
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Artist Relations',
      image: 'https://images.pexels.com/photos/2050718/pexels-photo-2050718.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Former Bharatanatyam performer turned advocate for artist empowerment and fair compensation.'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Technology Director',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'IIT graduate with expertise in building scalable platforms for creative communities.'
    },
    {
      name: 'Meera Nair',
      role: 'Cultural Advisor',
      image: 'https://images.pexels.com/photos/2050718/pexels-photo-2050718.jpeg?auto=compress&cs=tinysrgb&w=400',
      bio: 'Renowned art historian and curator, ensuring authenticity in our cultural representations.'
    }
  ];

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
            <h1 className="text-2xl font-bold text-gray-900">About Us</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-600 to-amber-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6">Bridging Tradition with Opportunity</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            KalaaSetu is India's premier platform connecting classical art practitioners with opportunities, 
            preserving our rich cultural heritage while empowering artists to build sustainable careers.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We believe that India's classical arts are not just cultural treasures but living, breathing 
                traditions that deserve to thrive in the modern world. Our mission is to create a sustainable 
                ecosystem where traditional artists can find meaningful work, fair compensation, and global recognition.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Through technology and community building, we're making it easier than ever for clients to 
                discover authentic talent while providing artists with the tools and opportunities they need 
                to build successful careers in their chosen art forms.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3807871/pexels-photo-3807871.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Classical Indian Arts"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h3>
            <p className="text-lg text-gray-600">
              Numbers that reflect our commitment to the classical arts community
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-amber-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={24} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at KalaaSetu
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-amber-50 transition-colors">
              <div className="bg-amber-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart size={24} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Authenticity</h4>
              <p className="text-gray-600">
                We honor the traditional roots and authentic practices of classical Indian arts, 
                ensuring cultural integrity in every interaction.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-amber-50 transition-colors">
              <div className="bg-amber-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users size={24} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Community</h4>
              <p className="text-gray-600">
                We foster a supportive community where artists can connect, collaborate, 
                and grow together while preserving their artistic heritage.
              </p>
            </div>
            <div className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-amber-50 transition-colors">
              <div className="bg-amber-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award size={24} />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">Excellence</h4>
              <p className="text-gray-600">
                We maintain the highest standards in our platform, services, and artist curation 
                to ensure exceptional experiences for all users.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Passionate individuals dedicated to empowering India's classical arts community
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h4 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h4>
                <p className="text-amber-600 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-amber-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold mb-6">Join Our Mission</h3>
          <p className="text-xl mb-8 opacity-90">
            Whether you're an artist looking to showcase your talent or someone seeking authentic classical arts experiences, 
            we invite you to be part of our growing community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/dance')}
              className="bg-white text-amber-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Find Artists
            </button>
            <button 
              onClick={() => navigate('/find-work')}
              className="border-2 border-white text-white hover:bg-white hover:text-amber-600 font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              Join as Artist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;