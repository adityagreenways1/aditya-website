import { useEffect, useState } from 'react';
import { ArrowRight, Phone, ChevronLeft, ChevronRight } from 'lucide-react';

export default function App() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  const slides = [
    {
      image: '/img/h1.webp',
      title: 'Turn Sunlight',
      titleHighlight: 'Into Savings',
      subtitle: 'Complete Solar Solutions',
      description: 'Clean. Smart. Sustainable.'
    },
    {
      image: '/img/h2.webp',
      title: 'Power Your Future',
      titleHighlight: 'With Solar Energy',
      subtitle: 'Residential & Commercial Solutions',
      description: 'Reliable. Efficient. Cost-Effective.'
    },
    {
      image: '/img/h3.webp',
      title: 'Go Green',
      titleHighlight: 'Save More',
      subtitle: 'Premium Solar Panel Installation',
      description: 'Eco-Friendly. Professional. Trusted.'
    },
    {
      image: '/img/h4.webp',
      title: 'Energy Independence',
      titleHighlight: 'Starts Here',
      subtitle: 'Complete End-to-End Service',
      description: 'Installation. Maintenance. Support.'
    }
  ];

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  useEffect(() => {
    setAnimateIn(false);
    const timer = setTimeout(() => setAnimateIn(true), 200);
    return () => clearTimeout(timer);
  }, [index]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 3000);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  const scrollToQuote = () => {
    const element = document.getElementById('quote');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentSlide = slides[index];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-amber-50 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 bg-cover ${slide.image.includes('s1.png') ? '' : 'bg-top'} transition-all duration-1000 ${index === i ? 'opacity-60 scale-100' : 'opacity-0 scale-95'}`}
            style={{ 
              backgroundImage: `url('${slide.image}')`,
              backgroundPosition: slide.image.includes('s1.png') ? 'center 65%' : undefined
            }}
          />
        ))}

        <button
          aria-label="Previous slide"
          onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)}
          className={`absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow z-20 transition-all duration-700 ${
            animateIn ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          aria-label="Next slide"
          onClick={() => setIndex((i) => (i + 1) % slides.length)}
          className={`absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow z-20 transition-all duration-700 ${
            animateIn ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className={`absolute left-1/2 -translate-x-1/2 bottom-6 flex gap-2 z-20 transition-all duration-700 ${
          animateIn ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}>
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${index === i ? 'bg-amber-500' : 'bg-white/60'}`}
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-32 w-full">
        <div className="text-center">
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-[#46614b] mb-6 leading-tight transition-all duration-700 px-2 ${
              animateIn ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
            }`}
          >
            {currentSlide.title}
            <br />
            <span className="text-amber-600">{currentSlide.titleHighlight}</span>
          </h1>

          <p
            className={`text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#46614b] mb-4 font-medium transition-all duration-700 delay-100 px-2 ${
              animateIn ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
            }`}
          >
            {currentSlide.subtitle}
          </p>

          <p
            className={`text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-8 max-w-3xl mx-auto transition-all duration-700 delay-150 px-4 ${
              animateIn ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
            }`}
          >
            {currentSlide.description}
          </p>

          <div
            className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-8 sm:mb-12 transition-all duration-700 delay-300 px-4 max-w-xl mx-auto ${
              animateIn ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
            }`}
          >
            <button
              onClick={scrollToQuote}
              className="group bg-[#46614b] text-white px-5 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold hover:bg-[#3d4d3e] transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2 w-full sm:w-auto"
            >
              <span>Get Free Consultation</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="tel:+919849218317"
              className="bg-white text-[#46614b] px-5 sm:px-6 md:px-8 py-3 sm:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold hover:bg-gray-50 transition-all border-2 border-[#46614b] shadow-lg flex items-center justify-center space-x-2 w-full sm:w-auto"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Call Now</span>
            </a>
          </div>

          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-8 max-w-4xl mx-auto transition-all duration-1000 delay-700 px-4 ${
              animateIn ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
            }`}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-md hover:shadow-xl transition-shadow">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#46614b]">35+</p>
              <p className="text-xs sm:text-sm md:text-base text-gray-700">Years Experience</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-md hover:shadow-xl transition-shadow">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#46614b]">25+</p>
              <p className="text-xs sm:text-sm md:text-base text-gray-700">Years Panel Warranty</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-md hover:shadow-xl transition-shadow">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#46614b]">100%</p>
              <p className="text-xs sm:text-sm md:text-base text-gray-700">Clean Energy</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-md hover:shadow-xl transition-shadow">
              <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#46614b]">Govt</p>
              <p className="text-xs sm:text-sm md:text-base text-gray-700">Approved</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
