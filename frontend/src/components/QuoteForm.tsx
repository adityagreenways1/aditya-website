"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Calculator } from "lucide-react";
import SuccessModal from "./SuccessModal";

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    service_type: "",
    property_type: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await emailjs.send(
        "service_lj1qa3b",       // ✅ EmailJS Service ID
        "template_rpp5t62",      // ✅ EmailJS Template ID
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          location: formData.location,
          property_type: formData.property_type,
          service_type: formData.service_type,
          details: formData.message,
        },
        "v4ZI05yMBHa5WkDmZ"      // ✅ EmailJS Public Key
      );

      setShowModal(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        location: "",
        service_type: "",
        property_type: "",
        message: "",
      });
    } catch (err: any) {
      setError(
        err?.text
          ? `Failed to submit: ${err.text}`
          : "Failed to submit. Please try again."
      );
      console.error("EmailJS error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="quote"
      className="relative pt-2 pb-8 sm:pb-12 md:pb-16 bg-gradient-to-br from-[#3d5340] via-[#4f6a55] to-[#5c7b63] overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-12 -right-12 sm:-top-24 sm:-right-24 h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-amber-400/30 blur-3xl"></div>
        <div className="absolute -bottom-12 -left-12 sm:-bottom-24 sm:-left-24 h-48 w-48 sm:h-72 sm:w-72 rounded-full bg-amber-300/30 blur-3xl"></div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
            <Calculator className="w-8 h-8 sm:w-10 sm:h-10 text-amber-400" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              Get Free Quote
            </h2>
          </div>
          <div className="w-20 sm:w-24 h-1 bg-amber-400 mx-auto mb-4 sm:mb-6"></div>
            <p className="text-base sm:text-lg md:text-xl text-green-50/95 px-4">
            Let us help you find the perfect solar solution
          </p>
        </div>

        {/* Form Box */}
          <div className="bg-white/95 backdrop-blur rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)] border border-white/60">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  pattern="[A-Za-z ]+"
                  title="Name can contain only letters and spaces"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  inputMode="numeric"
                  pattern="\d{10}"
                  maxLength={10}
                  title="Phone number must be exactly 10 digits"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">
                Location (City/Town) *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="e.g., Visakhapatnam, Hyderabad"
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">
                  Property Type *
                </label>
                <select
                  name="property_type"
                  value={formData.property_type}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                >
                  <option value="">Select property type</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Industrial">Industrial</option>
                  <option value="Agricultural">Agricultural</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">
                  Service Type *
                </label>
                <select
                  name="service_type"
                  value={formData.service_type}
                  onChange={handleChange}
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
                >
                  <option value="">Select service</option>
                  <option value="Rooftop Solar">Rooftop Solar</option>
                  <option value="Solar Water Heating">
                    Solar Water Heating
                  </option>
                  <option value="Solar Pump">Solar Pump</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1.5 sm:mb-2 text-sm sm:text-base">
                Additional Details
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                placeholder="Tell us about your requirements, average electricity bill, etc."
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm sm:text-base"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#46614b] via-[#5c7b63] to-[#3d5340] hover:from-[#3d5340] hover:via-[#4f6a55] hover:to-[#2f4232] text-white py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition shadow-lg hover:shadow-2xl disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Request Free Consultation"}
            </button>

            <p className="text-xs sm:text-sm text-gray-600 text-center px-2">
              By submitting this form, you agree to be contacted by our team
              regarding your solar needs.
            </p>
          </form>
        </div>
      </div>

      {/* Success Popup */}
      <SuccessModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Quote Request Submitted Successfully!"
        greeting={`Your quote request has been received!\n\nOur solar experts will analyze your requirements and contact you within 24 hours.\n\nBest regards,\nAditya Greenways Team`}
      />
    </section>
  );
}
