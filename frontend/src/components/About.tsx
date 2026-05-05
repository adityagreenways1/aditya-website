import { useEffect, useState, useRef } from 'react';
import { Target, Eye, Award, ChevronLeft, ChevronRight } from 'lucide-react';

const getAssetPath = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

const LEGACY_ITEMS = [
  {
    title: "NIST Educational Campus",
    description:
      "Imparted quality education among youth for the past 25 years with a strong academic foundation and value-based learning.",
    highlight: "25 Years",
    subtitle: "Educational Excellence",
    images: ["/img/nc1.webp", "/img/nc2.webp", "/img/nc3.webp", "/img/nc4.webp"],
  },
  {
    title: "NIST Private ITI",
    description:
      "NIST Private ITI focuses on developing industry-ready technical skills through practical training. Students gain hands-on experience aligned with real-world industrial needs. Many graduates go on to work with Aditya Solar, contributing to its skilled workforce.",
    highlight: "Industry Ready",
    subtitle: "Technical Skill Development",
    images: ["/img/ni1.webp", "/img/ni2.webp", "/img/ni3.webp", "/img/ni4.webp"],
  },
  {
    title: "Hi-Tech ITI",
    description:
      "Hi-Tech ITI has been providing quality technical education with a strong focus on skill-based learning for the past 35 years. Students are trained to meet industry standards through practical exposure. Graduates become part of Aditya Solar, supporting its growth and trusted legacy.",
    highlight: "35 Years",
    subtitle: "Industry Standard Training",
    images: ["/img/hi1.webp", "/img/hi2.webp", "/img/hi3.webp", "/img/hi4.webp"],
  },
  {
    title: "Yeruvvaka Retail",
    description:
      "Supplier of naturally grown fruits and vegetables to housing communities, building strong supply chains while encouraging natural farming.",
    highlight: "Farm to Home",
    subtitle: "Natural Produce Network",
    images: ["/img/y1.webp", "/img/y2.webp", "/img/y3.webp", "/img/y4.webp"],
  },
  {
    title: "Nandanavanam Farming Community",
    description:
      "A sustainable eco-living model promoting green practices, self-reliance, and community-based agriculture.",
    highlight: "Eco Living",
    subtitle: "Sustainable Community",
    images: ["/img/n1.webp", "/img/n2.webp", "/img/n3.webp", "/img/n4.webp"],
  },
];

export default function App() {
  const [legacyImageIndex, setLegacyImageIndex] = useState(() =>
    LEGACY_ITEMS.map(() => 0)
  );
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setLegacyImageIndex((prev) =>
        LEGACY_ITEMS.map((item, i) => {
          const length = item.images.length;
          if (length === 0) return 0;
          return ((prev[i] ?? 0) + 1) % length;
        })
      );
    }, 3500);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
    };
  }, []);

  const navigateImage = (itemIndex: number, direction: "prev" | "next") => {
    setLegacyImageIndex((prev) => {
      const updated = [...prev];
      const total = LEGACY_ITEMS[itemIndex].images.length;
      const current = updated[itemIndex] ?? 0;

      if (total === 0) return updated;

      if (direction === "next") {
        updated[itemIndex] = (current + 1) % total;
      } else {
        updated[itemIndex] =
          (current - 1 + total) % total;
      }

      return updated;
    });
  };

  return (
    <section id="about" className="pt-2 pb-8 sm:pb-12 md:pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#46614b] mb-3 sm:mb-4">
            About Us
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-amber-500 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center mb-12 sm:mb-16">
          <div>
            <div className="rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden aspect-video">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/0e6hjUjo5c4?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&loop=1&playlist=0e6hjUjo5c4"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Aditya Green Ways Pvt. Ltd brings over <strong>35 years of collective industry expertise</strong> to the renewable energy sector.
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              We are one of the most trusted names in solar installations, delivering customized, high-performance solutions for both urban and rural customers.
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Our trained workforce and strong service backup ensure reliable performance and long-term support for every project we undertake.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-gradient-to-br from-[#f0f4f0] to-[#e8efe8] rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="bg-[#46614b] p-2.5 sm:p-3 rounded-full flex-shrink-0">
                <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#46614b] mb-2 sm:mb-3">Vision</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Empower villages with a robust solar ecosystem by training local youth in solar installation and maintenance.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="bg-amber-600 p-2.5 sm:p-3 rounded-full flex-shrink-0">
                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#46614b] mb-2 sm:mb-3">Mission</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Make solar energy affordable and transparent while creating skilled jobs and local opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 sm:mt-16 md:mt-20">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
              <Award className="w-7 h-7 sm:w-9 sm:h-9 text-amber-600" />
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#46614b]">Trusted Legacy</h3>
            </div>
            <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto">
              Aditya Green Ways builds on 35+ years of industry experience in sustainable ventures
            </p>
          </div>

          <div className="space-y-8 md:space-y-12">
            {LEGACY_ITEMS.map((item, index) => {
              return (
              <div
                key={item.title}
                className={`group relative rounded-2xl bg-white/80 backdrop-blur-md shadow-xl hover:shadow-2xl transition-all duration-500 p-4 md:p-8 hover:-translate-y-1 ${
                  index % 2 === 0
                    ? "md:flex md:items-center md:gap-8"
                    : "md:flex md:flex-row-reverse md:items-center md:gap-8"
                }`}
              >
                {/* Image Section */}
                <div className="relative w-full md:w-1/2 mb-4 md:mb-0">
                  <div className="relative h-48 md:h-80 overflow-hidden rounded-xl">
                    {item.images.map((image, imgIndex) => (
                      <img
                        key={image}
                        src={getAssetPath(image)}
                        alt={item.title}
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.onerror = null;
                          target.src = getAssetPath('/img/logo.png');
                        }}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                          (legacyImageIndex[index] ?? 0) === imgIndex
                            ? "opacity-100 scale-105"
                            : "opacity-0"
                        }`}
                        loading="lazy"
                      />
                    ))}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                    {/* Navigation */}
                    <div className="absolute bottom-2 right-2 md:bottom-3 md:right-3 flex gap-2">
                      <button
                        onClick={() => navigateImage(index, "prev")}
                        className="bg-white/90 hover:bg-white p-2 rounded-full shadow transition"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-4 h-4 text-gray-700" />
                      </button>
                      <button
                        onClick={() => navigateImage(index, "next")}
                        className="bg-white/90 hover:bg-white p-2 rounded-full shadow transition"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-4 h-4 text-gray-700" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 space-y-3 md:space-y-4">
                  <div className="inline-block bg-amber-500 text-white px-2 md:px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
                    {item.highlight}
                  </div>

                  <h3 className="text-xl md:text-3xl font-bold text-[#2f4f3e] group-hover:text-[#46614b] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-amber-600 font-medium text-xs md:text-sm uppercase tracking-wide">
                    {item.subtitle}
                  </p>

                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2">
                    <div className="h-1 w-12 bg-amber-500 rounded-full"></div>
                  </div>
                </div>
              </div>
            );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
