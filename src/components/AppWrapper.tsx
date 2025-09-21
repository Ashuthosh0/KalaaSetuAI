import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useChatBot } from '../contexts/ChatBotContext';
import Header from './Header';
import HeroSection from './HeroSection';
import CategoriesSection from './CategoriesSection';
import TopArtistsSection from './TopArtistsSection';
import Footer from './Footer';
import ChatBot from './ChatBot';
import ProtectedRoute from './auth/ProtectedRoute';
import ArtFormPage from '../pages/ArtFormPage';
import ArtistProfile from '../pages/ArtistProfile';
import FindWork from '../pages/FindWork';
import AllArtists from '../pages/AllArtists';
import Blogs from '../pages/Blogs';
import AboutUs from '../pages/AboutUs';
import LoginPage from '../pages/auth/LoginPage';
import VerifyAccountPage from '../pages/auth/VerifyAccountPage';
import ArtistApplicationPage from '../pages/artist/ArtistApplicationPage';
import ApplicationStatusPage from '../pages/artist/ApplicationStatusPage';
import ArtistUploadPage from '../pages/artist/ArtistUploadPage';
import ModeratorDashboard from '../pages/moderator/ModeratorDashboard';
import UnauthorizedPage from '../pages/UnauthorizedPage';
import ClientDashboard from '../pages/client/ClientDashboard';
import ClientPostRequirement from '../pages/client/ClientPostRequirement';
import ClientRequirements from '../pages/client/ClientRequirements';
import ClientHires from '../pages/client/ClientHires';
import ChatBotDemo from '../pages/ChatBotDemo';

const AppWrapper: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isChatBotVisible, toggleChatBot } = useChatBot();
  const location = useLocation();

  // Don't show chatbot on login page
  const shouldShowChatBot = location.pathname !== '/login';

  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={
          <>
            <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <HeroSection />
            <CategoriesSection />
            <TopArtistsSection />
            <Footer />
          </>
        } />
        
        {/* Public Routes */}
        <Route path="/traditional-arts" element={<ArtFormPage category="traditional-arts" title="Traditional Arts Artists" />} />
        <Route path="/poetry" element={<ArtFormPage category="poetry" title="Poetry & Literature Artists" />} />
        <Route path="/crafts" element={<ArtFormPage category="crafts" title="Traditional Craft Artists" />} />
        <Route path="/painting" element={<ArtFormPage category="painting" title="Traditional Painting Artists" />} />
        <Route path="/artist/:id" element={<ArtistProfile />} />
        <Route path="/all-artists" element={<AllArtists />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/chatbot-demo" element={<ChatBotDemo />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-account" element={<VerifyAccountPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        
        {/* Artist Routes */}
        <Route path="/artist-apply" element={
          <ProtectedRoute roles={['artist']} requireVerification={true} requireApplication={false}>
            <ArtistApplicationPage />
          </ProtectedRoute>
        } />
        <Route path="/artist/application-status" element={
          <ProtectedRoute roles={['artist']} requireVerification={true} requireApplication={false}>
            <ApplicationStatusPage />
          </ProtectedRoute>
        } />
        <Route path="/find-work" element={
          <ProtectedRoute roles={['artist']} requireVerification={true} requireApplication={false}>
            <FindWork />
          </ProtectedRoute>
        } />
        <Route path="/artist/upload-work" element={<ArtistUploadPage />} />
        
        {/* Moderator Routes */}
        <Route path="/moderator" element={
          <ProtectedRoute roles={['moderator']} requireVerification={true}>
            <ModeratorDashboard />
          </ProtectedRoute>
        } />
        
        {/* Client Routes */}
        <Route path="/client/dashboard" element={
          <ProtectedRoute roles={['client']} requireVerification={true}>
            <ClientDashboard />
          </ProtectedRoute>
        } />
        <Route path="/client/post-requirement" element={
          <ProtectedRoute roles={['client']} requireVerification={true}>
            <ClientPostRequirement />
          </ProtectedRoute>
        } />
        <Route path="/client/requirements" element={
          <ProtectedRoute roles={['client']} requireVerification={true}>
            <ClientRequirements />
          </ProtectedRoute>
        } />
        <Route path="/client/hires" element={
          <ProtectedRoute roles={['client']} requireVerification={true}>
            <ClientHires />
          </ProtectedRoute>
        } />
      </Routes>
      
      {/* ChatBot - Only show on non-login pages */}
      {shouldShowChatBot && (
        <ChatBot 
          isVisible={isChatBotVisible} 
          onToggle={toggleChatBot} 
        />
      )}
    </div>
  );
};

export default AppWrapper;
