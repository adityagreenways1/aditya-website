import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
import PrivacyPolicy from './components/PrivacyPolicy';
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
    <QuoteForm />
    <ContactForm />
  </>
);

const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};


// BlogDetailsRoute removed

const App: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [pendingScrollId, setPendingScrollId] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 7000); // 7 seconds delay
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;

      const data = event.data as unknown;
      if (!data || typeof data !== 'object') return;

      const type = (data as { type?: unknown }).type;
      if (type !== 'NAVIGATE_TO_QUOTE') return;

      setPendingScrollId('quote');
      if (location.pathname !== '/') {
        navigate('/');
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [navigate, location.pathname]);

  useEffect(() => {
    if (!pendingScrollId) return;
    if (location.pathname !== '/') return;

    const scrollNow = () => {
      const el = document.getElementById(pendingScrollId);
      if (!el) return false;
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return true;
    };

    if (scrollNow()) {
      setPendingScrollId(null);
      return;
    }

    const t = window.setTimeout(() => {
      if (scrollNow()) {
        setPendingScrollId(null);
      }
    }, 250);

    return () => window.clearTimeout(t);
  }, [pendingScrollId, location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50" style={{ overflowX: "clip" }}>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/blogs"
          element={
            <div className="pt-24">
              <Blogs />
            </div>
          }
        />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route
          path="/privacy-policy"
          element={
            <div className="pt-24">
              <PrivacyPolicy />
            </div>
          }
        />
      </Routes>
      <Footer />
      {showPopup && <WelcomePopup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default App;