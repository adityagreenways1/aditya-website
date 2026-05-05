import { Home, Building2, Factory, Droplet, Lightbulb, Waves, ArrowRight } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Home,
      title: 'Residential Solar Rooftop Systems',
      description: 'Clean energy for homes. Reduce electricity bills by 50-90% with customized rooftop solar installations.',
      features: [
        '3kW to 10kW systems available',
        'On-grid, off-grid, and hybrid options',
        'Government subsidy assistance',
        '30 years panel warranty',
        'Complete installation in 2-3 days'
      ],
      // use a query-based Unsplash image so it matches "residential rooftop solar"
      image: 'https://t4.ftcdn.net/jpg/05/19/44/59/360_F_519445978_PEPYf1rgopUdcN31HobzIVv8RAaoqNRE.jpg'
    },
    {
      icon: Building2,
      title: 'Commercial & Institutional Solar Projects',
      description: 'Solutions for offices, schools, hospitals, and commercial buildings. Lower operational costs significantly.',
      features: [
        '10kW to 100kW+ installations',
        'Customized energy solutions',
        'Quick ROI with tax benefits',
        'Professional project management',
        'Minimal business disruption'
      ],
      image: 'https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: Factory,
      title: 'Hotels, Hospitals & Industrial Plants',
      description: 'Power for factories and large facilities. Achieve energy independence with high-capacity solar systems.',
      features: [
        '100kW to MW scale installations',
        'Reduce power costs by 70%+',
        'Backup power solutions',
        'Customized system design',
        'Long-term service contracts'
      ],
      image: 'https://images.pexels.com/photos/356036/pexels-photo-356036.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      icon: Droplet,
      title: 'Solar Pump Sets for Farms',
      description: 'Sustainable irrigation solutions for agriculture. Eliminate diesel costs with solar-powered water pumps.',
      features: [
        '1HP to 10HP solar pumps',
        'Easy installation with quick setup',
        'Zero fuel costs',
        'Low maintenance',
        'Reliable water supply'
      ],
      image: 'https://www.lumesolar.com/wp-content/uploads/2024/10/india-farm-with-solar-powered-water-pump-scaled.jpg'
    },
    {
      icon: Lightbulb,
      title: 'Solar Street Lighting Systems',
      description: 'Illuminate streets and communities with solar-powered lighting. Automatic operation with zero electricity cost.',
      features: [
        'LED street lights with solar panels',
        'Auto on/off with light sensors',
        'Battery backup for all night',
        'Weather-resistant design',
        'Ideal for urban and rural areas'
      ],
      image: 'https://c1.wallpaperflare.com/preview/928/144/862/headlights-solar-energy-road-light-city.jpg'
    },
    {
      icon: Waves,
      title: 'Agrivoltaics Solar Systems',
      description: 'Combine renewable energy with agriculture. Generate solar power while growing crops underneath solar arrays for dual land use.',
      features: [
        'Solar panels + crop production',
        'Maximize land utilization efficiency',
        'Shade-tolerant crop varieties',
        'Reduced water evaporation',
        'Enhanced farm profitability'
      ],
      image: 'https://static.vecteezy.com/system/resources/previews/060/505/065/non_2x/a-greenhouse-with-solar-panels-surrounded-by-various-plants-and-greenery-photo.jpeg'
    },

  ];

  return (
    <div>
      {/* scrollToQuote defined inline in component */}
      {/* We'll attach onClick handlers to buttons to smoothly scroll to #quote */}
      <section id="services" className="pt-2 pb-8 sm:pb-12 md:pb-16 bg-gradient-to-br from-white to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#46614b] mb-3 sm:mb-4">
              Our Solar Solutions
            </h1>
            <div className="w-20 sm:w-24 h-1 bg-amber-500 mx-auto"></div>
          </div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            From residential rooftops to large industrial installations, we provide comprehensive solar solutions tailored to your energy needs
          </p>
        </div>
      </section>

      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-emerald-50 to-white">
        <div className="container mx-auto px-4">
          <div className="space-y-12 sm:space-y-16 md:space-y-20">
            {services.map((service, index) => (
              <div key={index} className={`grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center group ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6 group-hover:gap-5 transition-all">
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-3 sm:p-4 rounded-xl group-hover:from-[#46614b] group-hover:to-[#3d5340] transition-all duration-300 shadow-md flex-shrink-0">
                      <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#46614b] group-hover:text-white transition-colors" />
                    </div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-emerald-900 transition-colors">{service.title}</h2>
                  </div>
                  <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 sm:gap-3 hover:translate-x-1 transition-transform">
                        <div className="bg-[#46614b] rounded-full p-0.5 sm:p-1 mt-0.5 sm:mt-1 flex-shrink-0 group-hover:bg-amber-500 transition-colors">
                          <ArrowRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                        </div>
                        <p className="text-sm sm:text-base text-gray-700 group-hover:text-gray-900">{feature}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById('quote');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white px-5 sm:px-6 md:px-8 py-3 sm:py-4 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all font-semibold shadow-lg hover:shadow-xl hover:scale-105 transform duration-300 text-sm sm:text-base w-full sm:w-auto justify-center"
                  >
                    Get Quote for This Service
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl w-full h-48 sm:h-64 md:h-80 lg:h-96 relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = 'https://via.placeholder.com/800x450?text=Image+Unavailable';
                      }}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-[#46614b] via-[#527057] to-[#3d5340] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 w-48 h-48 sm:w-72 sm:h-72 bg-amber-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-amber-400 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Our Installation Process</h2>
            <p className="text-base sm:text-lg md:text-xl text-green-50 mb-8 sm:mb-12 px-4">
              A simple, hassle-free process from consultation to activation
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {[
                { step: '01', title: 'Site Survey', description: 'Free inspection and assessment' },
                { step: '02', title: 'System Design', description: 'Customized solar solution' },
                { step: '03', title: 'Installation', description: '2-3 days professional setup' },
                { step: '04', title: 'Activation', description: 'Grid connection and commissioning' }
              ].map((item, index) => (
                <div key={index} className="text-center group hover:scale-105 sm:hover:scale-110 transition-transform duration-300">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-400 mb-2 sm:mb-4 group-hover:text-amber-300 transition-colors">{item.step}</div>
                  <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm md:text-base text-green-50 group-hover:text-white transition-colors">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-[#3d5340] via-[#46614b] to-[#527057] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 1200 400">
            <circle cx="100" cy="100" r="80" fill="currentColor" />
            <circle cx="1100" cy="300" r="80" fill="currentColor" />
          </svg>
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Solar Journey?</h2>
          <p className="text-xl mb-8 text-green-50 max-w-2xl mx-auto">
            Get a personalized quote for your property and discover how much you can save with solar energy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('quote');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-xl hover:from-amber-600 hover:to-amber-700 transition-all font-semibold text-lg inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl hover:scale-105 transform duration-300"
            >
              Get Free Quote <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="tel:+919849218317"
              className="bg-white text-emerald-700 px-8 py-4 rounded-xl hover:bg-gray-50 transition-all font-semibold text-lg inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-2xl hover:scale-105 transform duration-300"
            >
              Call Us: +91 9849 218 317
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}