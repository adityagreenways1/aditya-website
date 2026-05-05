import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Instagram, Youtube } from 'lucide-react';
import emailjs from '@emailjs/browser';
import SuccessModal from './SuccessModal';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_uqnnsje';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_qy6gdiw';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'v4ZI05yMBHa5WkDmZ';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const nextValue = name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value;

    setFormData({ ...formData, [name]: nextValue });
    setFieldErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const name = formData.name.trim();
    const email = formData.email.trim();
    const phone = formData.phone.trim();
    const message = formData.message.trim();

    const nextErrors = { name: '', email: '', phone: '', message: '' };

    if (!name) {
      nextErrors.name = 'Name is required.';
    } else if (!/^[A-Za-z .'-]+$/.test(name)) {
      nextErrors.name = 'Name can contain letters, spaces, dots, apostrophes, and hyphens only.';
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!/^\d{10}$/.test(phone)) {
      nextErrors.phone = 'Phone number must be exactly 10 digits.';
    }

    if (!message) {
      nextErrors.message = 'Message is required.';
    } else if (message.length < 10) {
      nextErrors.message = 'Message should be at least 10 characters.';
    }

    setFieldErrors(nextErrors);
    return !Object.values(nextErrors).some(Boolean);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
        },
        EMAILJS_PUBLIC_KEY
      );

      setShowModal(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setFieldErrors({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error(err);
      setError('Failed to submit. Please try again or call us directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="pt-2 pb-8 sm:pb-12 md:pb-16 bg-gradient-to-br from-emerald-50 to-amber-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#46614b] mb-3 sm:mb-4">
            Contact Us Now
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-amber-500 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-700 px-4">
            Get in touch with our solar experts
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">

          {/* LEFT INFO */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg">
            <h3 className="text-xl sm:text-2xl font-bold text-[#46614b] mb-4 sm:mb-6">Our Offices</h3>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex gap-3 sm:gap-4">
                <MapPin className="text-[#46614b] flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
                <p className="text-sm sm:text-base">
                  <strong>Visakhapatnam</strong><br />
                  Mantripalem, Anakapalli, AP – 531019
                </p>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <MapPin className="text-[#46614b] flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
                <p className="text-sm sm:text-base">
                  <strong>Hyderabad</strong><br />
                  Kondapur – 500084
                </p>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <Phone className="text-[#46614b] flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
                <p className="text-sm sm:text-base">
                  +91 9849 218 317<br />
                  +91 9849 384 709<br />
                  +91 9281 059 433
                </p>
              </div>

              <div className="flex gap-3 sm:gap-4">
                <Mail className="text-[#46614b] flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6" />
                <p className="text-sm sm:text-base break-all">contact@adityagreenways.com</p>
              </div>

              <div className="flex items-center gap-2 sm:gap-3">
                <a
                  href="https://www.facebook.com/share/1JHauDJSHb/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-amber-50 text-[#46614b] border border-amber-100 hover:bg-[#46614b] hover:text-white hover:border-[#46614b] transition shadow-sm hover:shadow-lg"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://www.instagram.com/adityagreenways1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-amber-50 text-[#46614b] border border-amber-100 hover:bg-[#46614b] hover:text-white hover:border-[#46614b] transition shadow-sm hover:shadow-lg"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href="https://www.youtube.com/@adityagreenways"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-amber-50 text-[#46614b] border border-amber-100 hover:bg-[#46614b] hover:text-white hover:border-[#46614b] transition shadow-sm hover:shadow-lg"
                  aria-label="YouTube"
                >
                  <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg">
            <h3 className="text-xl sm:text-2xl font-bold text-[#46614b] mb-4 sm:mb-6">
              Send us a Message
            </h3>

            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name *"
                required
                autoComplete="name"
                pattern="[A-Za-z .'-]+"
                title="Name can contain letters, spaces, dots, apostrophes, and hyphens"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg text-sm sm:text-base"
              />
              {fieldErrors.name && <p className="text-red-600 text-xs sm:text-sm">{fieldErrors.name}</p>}

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email (optional)"
                autoComplete="email"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg text-sm sm:text-base"
              />
              {fieldErrors.email && <p className="text-red-600 text-xs sm:text-sm">{fieldErrors.email}</p>}

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone *"
                required
                inputMode="numeric"
                pattern="\d{10}"
                maxLength={10}
                autoComplete="tel"
                title="Phone number must be exactly 10 digits"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg text-sm sm:text-base"
              />
              {fieldErrors.phone && <p className="text-red-600 text-xs sm:text-sm">{fieldErrors.phone}</p>}

              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message *"
                required
                rows={4}
                minLength={10}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border rounded-lg text-sm sm:text-base"
              />
              {fieldErrors.message && <p className="text-red-600 text-xs sm:text-sm">{fieldErrors.message}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#46614b] via-[#5c7b63] to-[#3d5340] hover:from-[#3d5340] hover:via-[#4f6a55] hover:to-[#2f4232] text-white py-3 sm:py-4 rounded-lg flex justify-center items-center gap-2 transition shadow-lg hover:shadow-2xl text-sm sm:text-base font-semibold"
              >
                {loading ? 'Sending...' : 'Send Message'}
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Contact Submitted Successfully!"
        greeting="Thank you for contacting Aditya Greenways. We will get back to you within 24 hours."
      />
    </section>
  );
}
