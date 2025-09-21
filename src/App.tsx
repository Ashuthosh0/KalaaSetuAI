import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CategoriesSection from './components/CategoriesSection';
import TopArtistsSection from './components/TopArtistsSection';
import Footer from './components/Footer';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ArtFormPage from './pages/ArtFormPage';
import ArtistProfile from './pages/ArtistProfile';
import FindWork from './pages/FindWork';
import AllArtists from './pages/AllArtists';
import Blogs from './pages/Blogs';
import AboutUs from './pages/AboutUs';
import LoginPage from './pages/auth/LoginPage';
import VerifyAccountPage from './pages/auth/VerifyAccountPage';
import ArtistApplicationPage from './pages/artist/ArtistApplicationPage';
import ApplicationStatusPage from './pages/artist/ApplicationStatusPage';
import ModeratorDashboard from './pages/moderator/ModeratorDashboard';
import UnauthorizedPage from './pages/UnauthorizedPage';
import ClientDashboard from './pages/client/ClientDashboard';
import ClientPostRequirement from './pages/client/ClientPostRequirement';
import ClientRequirements from './pages/client/ClientRequirements';
import ClientHires from './pages/client/ClientHires';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-white">
          <Toaster position="top-right" />
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
            <Route path="/dance" element={<ArtFormPage category="dance" title="Classical Dance Artists" />} />
            <Route path="/music" element={<ArtFormPage category="music" title="Classical Music Artists" />} />
            <Route path="/yoga" element={<ArtFormPage category="yoga" title="Yoga & Meditation Instructors" />} />
            <Route path="/crafts" element={<ArtFormPage category="crafts" title="Traditional Craft Artists" />} />
            <Route path="/artist/:id" element={<ArtistProfile />} />
            <Route path="/all-artists" element={<AllArtists />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/about" element={<AboutUs />} />
            
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
        </div>
      </Router>


{/* import { BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ChatBotProvider } from './contexts/ChatBotContext';
import AppWrapper from './components/AppWrapper';

function App() {
  return (
    <AuthProvider>
      <ChatBotProvider>
        <Router>
          <Toaster position="top-right" />
          <AppWrapper />
        </Router>
      </ChatBotProvider>

  );
} */}
    </AuthProvider>)}

export default App;