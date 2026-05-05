import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Blogs from './components/Blogs';
import BlogDetail from './components/BlogDetail';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Scheme from './components/Scheme';
import Faq from './components/Faq';
import WhyChoose from './components/WhyChoose';
import ContactForm from './components/ContactForm';
import QuoteForm from './components/QuoteForm';
import Footer from './components/Footer';
import WelcomePopup from './components/WelcomePopup';
// Blog imports removed

const Home = () => (
  <>
    <Hero />
    <About />
    <div id="scheme">
      <Scheme />
    </div>
    <Services />
    <WhyChoose />
    <div id="faq">
      <Faq />
    </div>
    <div id="blogs">
      <Blogs />
    </div>
    <QuoteForm />
    <ContactForm />
  </>
);



import { useEffect } from 'react';

// BlogDetailsRoute removed

const App: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 7000); // 7 seconds delay
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
      </Routes>
      <Footer />
      {showPopup && <WelcomePopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default App;