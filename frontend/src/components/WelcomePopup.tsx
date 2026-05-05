import { X, Sparkles, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface WelcomePopupProps {
  onClose: () => void;
}

export default function WelcomePopup({ onClose }: WelcomePopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  const scrollToQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleClose();

    setTimeout(() => {
      const el = document.getElementById('quote');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 400);
  };

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? 'bg-black/50 backdrop-blur-sm' : 'bg-black/0'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden transition-all duration-300 transform ${
          isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
        }`}
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-400/40 blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-300/40 blur-3xl"></div>
        <div className="bg-gradient-to-r from-[#2f4232] via-[#46614b] to-[#6c8a72] p-4 sm:p-6 pb-6 sm:pb-8 relative overflow-hidden">
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 pointer-events-auto text-white/80 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center mb-3 sm:mb-4">
              <div className="bg-gradient-to-br from-amber-400 to-yellow-300 rounded-full p-2.5 sm:p-3 shadow-lg animate-pulse">
                <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-2 drop-shadow-sm">
              Welcome to Aditya Greenways!
            </h2>

            <p className="text-amber-50 text-xs sm:text-sm">
              Your Trusted Solar Energy Partner
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <p className="text-sm sm:text-base text-gray-700 text-center mb-4 sm:mb-6 leading-relaxed">
            Switch to clean, renewable solar energy and start saving on your electricity bills today!
          </p>

          <div className="space-y-2.5 sm:space-y-3 mb-4 sm:mb-6">
            {[
              'Government subsidies up to 40% available',
              '25+ years warranty on solar panels',
              'Save 50-90% on electricity bills',
              'Quick installation in 2-3 days'
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <p className="text-gray-700 text-sm">{benefit}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            <button
              type="button"
              onClick={scrollToQuote}
              className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-white py-3 sm:py-3.5 px-4 sm:px-6 rounded-xl text-sm sm:text-base font-semibold hover:from-amber-500 hover:via-amber-600 hover:to-amber-700 transition-all shadow-lg hover:shadow-2xl hover:scale-105 transform duration-300"
            >
              Get Free Consultation
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="w-full bg-gray-100 text-gray-700 py-2.5 sm:py-3 px-4 sm:px-6 rounded-xl text-sm sm:text-base font-semibold hover:bg-gray-200 transition-all"
            >
              Continue Exploring
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-3 sm:mt-4">
            Join thousands of happy customers already saving with solar energy
          </p>
        </div>
      </div>
    </div>
  );
}
