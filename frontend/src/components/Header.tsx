import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'scheme', label: 'Benefits' },
    { id: 'services', label: 'Services' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      if (mobileMenuOpen) {
        setMobileMenuOpen(false);
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 200);
      } else {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-lg shadow-lg z-50 transition-all duration-300">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          <div className="flex items-center space-x-2 cursor-pointer group" onClick={() => scrollToSection('home')}>
            <Logo className="text-amber-500 group-hover:scale-110 transition-transform" size="large" />
            <div>
              <h1 className="text-lg md:text-xl font-bold text-[#4C604D]">
                ADITYA GREENWAYS
              </h1>
              <p className="text-xs text-gray-600 hidden sm:block">
                Switch to Solar, Stay Future ready
              </p>
            </div>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-700 hover:text-[#46614b] font-medium transition-all duration-300 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#46614b] group-hover:w-full transition-all duration-300"></span>
              </button>
            ))}
            <button
              onClick={() => scrollToSection('quote')}
              className="bg-[#46614b] text-white px-6 py-2.5 rounded-full hover:bg-[#3d5340] transition-all duration-300 hover:shadow-lg hover:scale-105 font-semibold"
            >
              Get Quote
            </button>
          </div>

          <button
            className="md:hidden text-gray-700 hover:text-[#46614b] transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left py-2.5 px-3 text-gray-700 hover:text-[#46614b] hover:bg-amber-50/50 font-medium rounded-lg transition-all"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('quote')}
              className="block w-full text-left py-2.5 px-4 bg-[#4C604D] text-white rounded-lg hover:bg-[#4C604D] font-semibold transition-all"
            >
              Get Quote
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
