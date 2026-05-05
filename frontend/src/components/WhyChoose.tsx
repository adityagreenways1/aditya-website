import {
  IndianRupee,
  Zap,
  Leaf,
  Home,
  Battery,
  Award,
  Users,
  Clock,
  Shield,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';

export default function WhyChoose() {
  const benefits = [
    {
      icon: IndianRupee,
      title: 'Lower Electricity Bills',
      description: 'Save on your monthly energy costs. Slash bills by 50-90%.',
    },
    {
      icon: Leaf,
      title: 'Renewable & Sustainable',
      description: 'Clean, green energy source that never runs out.',
    },
    {
      icon: Zap,
      title: 'Energy Independence',
      description: 'Reduce reliance on the grid and avoid rising electricity costs.',
    },
    {
      icon: Home,
      title: 'Boosts Property Value',
      description: "Increase your property's market value.",
    },
    {
      icon: Battery,
      title: 'Reliable Power',
      description: 'Use battery backup systems for uninterrupted energy.',
    },
    {
      icon: Award,
      title: 'Government Incentives',
      description: 'Enjoy subsidies & tax benefits under PM Surya Ghar Yojana.',
    },
  ];

  const reasons = [
    {
      icon: CheckCircle,
      title: 'Customized Solutions',
      description: 'Residential, commercial, industrial, and agriculture.',
    },
    {
      icon: Award,
      title: 'Government-Approved Vendor',
      description: 'Under PM Surya Ghar Yojana.',
    },
    {
      icon: Zap,
      title: 'On-Grid, Off-Grid & Hybrid Systems',
      description: 'With battery backup for 24x7 power.',
    },
    {
      icon: Clock,
      title: 'Quick & Hassle-Free Installation',
      description: 'From site survey to commissioning.',
    },
    {
      icon: IndianRupee,
      title: 'Transparent Pricing',
      description: 'No hidden charges, complete cost clarity.',
    },
    {
      icon: Shield,
      title: '30 Years Panel Warranty',
      description: 'Peace of mind for decades.',
    },
    {
      icon: Users,
      title: 'Skilled Local Technicians',
      description: 'Quick installations and reliable support.',
    },
    {
      icon: TrendingUp,
      title: '35 Years of Industry Experience',
      description: 'Trusted legacy in sustainable ventures.',
    },
  ];

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-white via-emerald-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#46614b] mb-3 sm:mb-4">
            Why Switch to Solar?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4 px-4">Discover the benefits of clean, renewable energy</p>
          <div className="w-20 sm:w-24 h-1 bg-amber-500 mx-auto rounded"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16 md:mb-20">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-amber-50/50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 border border-[#46614b]/10 hover:border-[#46614b]/30 group cursor-pointer"
              >
                <div className="bg-white rounded-full w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mb-3 sm:mb-4 group-hover:bg-[#46614b] transition-all duration-300">
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#46614b] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#46614b] mb-2 group-hover:text-[#3d5340]">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-700">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-[#46614b] via-[#527057] to-[#3d5340] rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 mb-8 sm:mb-12 shadow-2xl overflow-hidden relative">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-amber-300 rounded-full -mr-32 -mt-32 sm:-mr-48 sm:-mt-48"></div>
          </div>
          <div className="relative z-10">
            <img
              src="https://images.pexels.com/photos/433308/pexels-photo-433308.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Solar panels"
              className="w-full h-40 sm:h-48 md:h-64 object-cover rounded-xl sm:rounded-2xl mb-6 sm:mb-8 shadow-xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#46614b] mb-3 sm:mb-4">
            Why Choose Aditya Green Ways?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4 px-4">35+ years of trust and excellence in solar solutions</p>
          <div className="w-20 sm:w-24 h-1 bg-amber-500 mx-auto rounded"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="bg-white border-2 border-[#46614b]/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:border-[#46614b]/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="bg-gradient-to-br from-amber-50 to-amber-100 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mb-3 sm:mb-4 group-hover:from-[#46614b] group-hover:to-[#3d5340] transition-all flex-shrink-0">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[#46614b] group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-[#46614b] mb-1.5 sm:mb-2 group-hover:text-[#3d5340]">
                  {reason.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-700">{reason.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-12 sm:mt-16 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-l-4 border-amber-500 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-5 text-6xl sm:text-7xl md:text-9xl font-bold text-amber-600">✓</div>
          <p className="text-base sm:text-lg text-gray-800 font-semibold relative z-10">
            <span className="text-[#46614b]">Our Promise:</span> Solar is not just technology for us—it is trust, service, and sustainability. Your energy independence is our mission.
          </p>
        </div>
      </div>
    </section>
  );
}
