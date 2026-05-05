export default function Faq() {
  const faqs = [
    {
      q: 'How much can I save with solar?',
      a: 'Savings vary by usage and system size. Typical residential customers reduce monthly electricity bills by 50–90% depending on roof orientation, shading, and consumption patterns. We provide a free site survey and estimate to show expected savings over time.'
    },
    {
      q: 'Do you provide installation and service?',
      a: 'Yes — we provide end-to-end services including site survey, system design, procurement, installation, grid interconnection, commissioning, and optional annual maintenance contracts (AMC) with scheduled visits and performance checks.'
    },
    {
      q: 'Are government subsidies available?',
      a: 'Subsidies depend on the specific government scheme, state policies, and customer category (e.g., agriculture, residential). We evaluate eligibility during the survey and assist with paperwork and submission where applicable.'
    },
    {
      q: 'What warranties do you offer?',
      a: 'Warranties vary by product. Typical offerings include 10–12 year product warranties and 25+ year performance warranties for solar panels. In addition we offer workmanship guarantees and optional extended service plans.'
    }
    ,
    {
      q: 'Have a different question?',
      a: (
        <div className="space-y-3">
          <p>If your question is not listed here, our team is happy to help — please contact us and we will get back to you promptly.</p>
          <div>
            <button
              onClick={() => {
                const el = document.getElementById('contact');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 bg-amber-500 text-white px-4 py-2 rounded-lg hover:bg-amber-600 transition"
            >
              Contact Us
            </button>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="faq" className="pt-2 pb-8 sm:pb-12 md:pb-16 bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#46614b] mb-3 sm:mb-4">Frequently Asked Questions</h2>
          <p className="text-base sm:text-lg text-gray-600 px-4">Answers to common questions about our solar solutions and services.</p>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-3 sm:mt-4 rounded"></div>
        </div>

        <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
          {faqs.map((f, i) => (
            <details 
              key={i} 
              className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-100 hover:border-[#46614b]/20 group"
            >
              <summary className="font-semibold text-base sm:text-lg text-gray-900 cursor-pointer flex items-center justify-between">
                {f.q}
                <span className="text-[#46614b] group-open:rotate-180 transition-transform duration-300 ml-2 flex-shrink-0">▼</span>
              </summary>
              <div className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-700 leading-relaxed animate-fade-in">{typeof f.a === 'string' ? f.a : f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}