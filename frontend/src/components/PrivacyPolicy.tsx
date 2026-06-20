import React, { useEffect } from 'react';

const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    document.title = 'Privacy Policy | Aditya Greenways Pvt. Ltd.';

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'Learn how Aditya Greenways Pvt. Ltd. collects, uses, and protects your personal information.');

    return () => {
      // Optionally leave title/meta as-is or restore previous values if needed
    };
  }, []);

  return (
    <main className="min-h-screen bg-white">
      <section className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <div className="text-gray-700">
          <h1 className="text-3xl font-black text-gray-950">Privacy Policy</h1>
          <p className="text-xs text-gray-500 mt-1 mb-6">Last Updated: June 2026</p>

          <h2 className="text-xl font-black text-gray-950 mt-5 mb-3">Introduction</h2>
          <p className="text-sm leading-relaxed mb-4">
            Aditya Greenways Pvt. Ltd. ("we", "our", or "us") is committed to protecting
            your privacy. This Privacy Policy explains how we collect, use, and protect
            the information you provide through our website and lead generation forms.
          </p>

          <h2 className="text-xl font-black text-gray-950 mt-5 mb-3">Information We Collect</h2>
          <p className="text-sm mb-2">We may collect the following information:</p>
          <ul className="list-disc ml-6 space-y-1 text-sm mb-4">
            <li>Name</li>
            <li>Phone Number</li>
            <li>Email Address</li>
            <li>City / Location</li>
            <li>Any information voluntarily submitted through our forms</li>
          </ul>

          <h2 className="text-xl font-black text-gray-950 mt-5 mb-3">How We Use Your Information</h2>
          <p className="text-sm mb-2">We use your information to:</p>
          <ul className="list-disc ml-6 space-y-1 text-sm mb-4">
            <li>Respond to your enquiries</li>
            <li>Provide solar consultation and quotations</li>
            <li>Schedule site visits</li>
            <li>Provide customer support</li>
            <li>Send updates regarding our solar products and services</li>
          </ul>

          <h2 className="text-xl font-black text-gray-950 mt-5 mb-3">Information Sharing</h2>
          <p className="text-sm leading-relaxed mb-4">
            We do not sell, rent, or trade your personal information to third parties.
            Information may only be shared with authorized employees, service providers,
            or when required by law.
          </p>

          <h2 className="text-xl font-black text-gray-950 mt-5 mb-3">Data Security</h2>
          <p className="text-sm leading-relaxed mb-4">
            We implement reasonable security measures to protect your information from
            unauthorized access, disclosure, or misuse.
          </p>

          <h2 className="text-xl font-black text-gray-950 mt-5 mb-3">Your Rights</h2>
          <p className="text-sm leading-relaxed mb-4">
            You may request access, correction, or deletion of your personal information
            by contacting us using the details below.
          </p>

          <h2 className="text-xl font-black text-gray-950 mt-5 mb-3">Contact Us</h2>
          <p className="text-sm leading-relaxed mb-4">
            Aditya Greenways Pvt. Ltd.<br />
            Email: <a href="mailto:contact@adityagreenways.com" className="text-amber-600 font-medium">contact@adityagreenways.com</a><br />
            Phone: <a href="tel:+919849218317" className="text-amber-600 font-medium">+91 98492 18317</a><br />
            Website: <a href="https://www.adityagreenways.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 font-medium">https://www.adityagreenways.com</a>
          </p>

          <h2 className="text-xl font-black text-gray-950 mt-5 mb-3">Changes to this Policy</h2>
          <p className="text-sm leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes will be
            posted on this page.
          </p>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
