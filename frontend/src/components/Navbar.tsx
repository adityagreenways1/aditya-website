import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

type NavItem =
  | { id: string; label: string; type: 'anchor'; href: string }
  | { id: string; label: string; type: 'link'; to: string };

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', type: 'anchor', href: '#home' },
  { id: 'about', label: 'About', type: 'anchor', href: '#about' },
  { id: 'scheme', label: 'Benefits', type: 'anchor', href: '#scheme' },
  { id: 'services', label: 'Services', type: 'anchor', href: '#services' },
  { id: 'faq', label: 'FAQ', type: 'anchor', href: '#faq' },
  { id: 'blog', label: 'Blog', type: 'anchor', href: '#blogs' },
  { id: 'contact', label: 'Contact', type: 'anchor', href: '#contact' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Helper to handle anchor navigation from any page
  const handleAnchorNav = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault();
    const sectionId = href.replace('#', '');
    if (location.pathname !== '/') {
      navigate('/', { replace: false });
      // Wait for navigation, then scroll
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-lg shadow-lg z-50 transition-all duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <Link to="/" className="flex items-center space-x-2 group">
            <Logo className="text-amber-500 group-hover:scale-110 transition-transform" size="large" />
            <div>
              <h1 className="text-lg md:text-xl font-bold text-[#4C604D]">ADITYA GREENWAYS</h1>
              <p className="text-xs text-gray-600 hidden sm:block">Switch to Solar, Stay Future ready</p>
            </div>
          </Link>
          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              item.type === 'link' ? (
                <Link
                  key={item.id}
                  to={item.to}
                  className={`text-gray-700 hover:text-[#46614b] font-medium transition-all duration-300 relative group ${location.pathname === item.to ? 'text-[#46614b] font-bold' : ''}`}
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#46614b] group-hover:w-full transition-all duration-300"></span>
                </Link>
              ) : (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={e => handleAnchorNav(e, item.href)}
                  className="text-gray-700 hover:text-[#46614b] font-medium transition-all duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#46614b] group-hover:w-full transition-all duration-300"></span>
                </a>
              )
            ))}
            <a
              href="/#quote"
              className="bg-[#46614b] text-white px-6 py-2.5 rounded-full hover:bg-[#3d5340] transition-all duration-300 hover:shadow-lg hover:scale-105 font-semibold"
            >
              Get Quote
            </a>
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700 focus:outline-none">
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-lg mt-2 py-4 px-6 flex flex-col space-y-4">
            {navItems.map((item) => (
              item.type === 'link' ? (
                <Link
                  key={item.id}
                  to={item.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-700 hover:text-[#46614b] font-medium transition-all duration-300"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={e => { setMobileMenuOpen(false); handleAnchorNav(e, item.href); }}
                  className="text-gray-700 hover:text-[#46614b] font-medium transition-all duration-300"
                >
                  {item.label}
                </a>
              )
            ))}
            <a
              href="/#quote"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-[#46614b] text-white px-6 py-2.5 rounded-full hover:bg-[#3d5340] transition-all duration-300 hover:shadow-lg hover:scale-105 font-semibold"
            >
              Get Quote
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
