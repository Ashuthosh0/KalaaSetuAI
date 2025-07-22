import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CategoriesSection from './components/CategoriesSection';
import TopArtistsSection from './components/TopArtistsSection';
import Footer from './components/Footer';
import ArtFormPage from './pages/ArtFormPage';
import ArtistProfile from './pages/ArtistProfile';
import FindWork from './pages/FindWork';
import AllArtists from './pages/AllArtists';
import Blogs from './pages/Blogs';
import AboutUs from './pages/AboutUs';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
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
          <Route path="/dance" element={<ArtFormPage category="dance" title="Classical Dance Artists" />} />
          <Route path="/music" element={<ArtFormPage category="music" title="Classical Music Artists" />} />
          <Route path="/yoga" element={<ArtFormPage category="yoga" title="Yoga & Meditation Instructors" />} />
          <Route path="/crafts" element={<ArtFormPage category="crafts" title="Traditional Craft Artists" />} />
          <Route path="/artist/:id" element={<ArtistProfile />} />
          <Route path="/find-work" element={<FindWork />} />
          <Route path="/all-artists" element={<AllArtists />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;