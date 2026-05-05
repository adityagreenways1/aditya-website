import { CheckCircle, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function Scheme() {
  const [inputType, setInputType] = useState<'bill' | 'units'>('bill');
  const [bill, setBill] = useState<number>(1920);
  const [units, setUnits] = useState<number>(240);

  /* ===== CONSTANTS ===== */
  const UNIT_RATE = 8;
  const UNITS_PER_KW = 1440;
  const ROOF_PER_KW = 80;
  const RESIDENTIAL_COST_TABLE: Record<number, number> = {
    1: 80000,
    2: 160000,
    3: 210000,
  };
  const EXTRA_KW_COST = 70000; // estimate beyond 3 kW based on 3 kW reference

  // Currency formatter (Indian locale)
  const formatINR = (amount: number) =>
    new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(Math.round(amount));

  /* ===== CALCULATIONS ===== */
  const monthlyUnits = inputType === 'bill' ? bill / UNIT_RATE : units;
  const yearlyUnits = monthlyUnits * 12;
  const solarCapacity = monthlyUnits > 0 ? Math.max(1, Math.ceil(yearlyUnits / UNITS_PER_KW)) : 0;
  const annualSavings = monthlyUnits > 0 ? monthlyUnits * UNIT_RATE * 12 : 0;

  const roofSpace = solarCapacity * ROOF_PER_KW;
  const priceBefore = solarCapacity <= 3
    ? RESIDENTIAL_COST_TABLE[solarCapacity] ?? solarCapacity * 80000
    : RESIDENTIAL_COST_TABLE[3] + (solarCapacity - 3) * EXTRA_KW_COST;

  // Subsidy slabs (Residential only):
  // 1 kW → Rs 30,000
  // 2 kW → Rs 60,000
  // 3 kW → Rs 78,000 (maximum subsidy)
  // Above 3 kW → Rs 78,000 only (capped)
  const subsidy = solarCapacity >= 3 ? 78000 : solarCapacity === 2 ? 60000 : solarCapacity === 1 ? 30000 : 0;
  const finalCost = Math.max(priceBefore - subsidy, 0);

  const scrollToQuote = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('quote');
    if (!el) return;
    const header = document.querySelector('header') as HTMLElement | null;
    const offset = header ? header.offsetHeight + 8 : 88;
    const y = el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <div>
      {/* ================= PM SURYA GHAR YOJANA BENEFITS (UNCHANGED) ================= */}
      <section id="scheme" className="pt-2 pb-8 sm:pb-12 md:pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#46614b] mb-3 sm:mb-4">
                PM Surya Ghar Yojana Benefits
              </h2>
              <div className="w-20 sm:w-24 h-1 bg-amber-500 mx-auto"></div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12">
              <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6">
                The Government of India offers substantial subsidies to encourage residential solar adoption. As an approved vendor, we handle all the paperwork and subsidy processing for you.
              </p>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">For 1 kW System</p>
                  <p className="text-2xl sm:text-3xl font-bold text-[#46614b] mb-1">Rs 30,000</p>
                  <p className="text-xs text-gray-500">subsidy</p>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">For 2kW System</p>
                  <p className="text-2xl sm:text-3xl font-bold text-[#46614b] mb-1">Rs 60,000</p>
                  <p className="text-xs text-gray-500">subsidy</p>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-md">
                  <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">For 3 & Above System</p>
                  <p className="text-2xl sm:text-3xl font-bold text-[#46614b] mb-1">Rs 78,000</p>
                  <p className="text-xs text-gray-500">subsidy</p>
                </div>
              </div>
              <div className="space-y-2 sm:space-y-3">
                {[
                  'Zero paperwork hassle – we handle everything',
                  'Direct benefit transfer to your bank account',
                  'Fast approval process',
                  'Additional state government subsidies may apply',
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600 flex-shrink-0" />
                    <p className="text-sm sm:text-base text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SOLAR CALCULATOR (REPLACED SECTION) ================= */}
      <section className="pt-2 pb-8 sm:pb-10 md:pb-12 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-4 sm:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#46614b] mb-3 sm:mb-4">
              Calculate Your Solar Savings
            </h2>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-amber-50 rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 md:p-12">
            {/* INPUT TYPE TOGGLE */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 justify-center">
              <button
                onClick={() => setInputType('bill')}
                className={`px-4 sm:px-6 py-2.5 sm:py-2 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                  inputType === 'bill'
                    ? 'bg-[#46614b] text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-[#46614b]/20 hover:border-[#46614b]/40'
                }`}
              >
                By Bill Amount (Rs)
              </button>
              <button
                onClick={() => setInputType('units')}
                className={`px-4 sm:px-6 py-2.5 sm:py-2 rounded-lg font-semibold transition-all text-sm sm:text-base ${
                  inputType === 'units'
                    ? 'bg-[#46614b] text-white shadow-lg'
                    : 'bg-white text-gray-700 border-2 border-[#46614b]/20 hover:border-[#46614b]/40'
                }`}
              >
                By Units (kWh)
              </button>
            </div>

            

            {/* INPUT */}
            <div className="flex justify-center mb-10">
              <div className="w-full max-w-sm">
                {inputType === 'bill' ? (
                  <div>
                    <label className="block text-sm font-semibold text-[#46614b] mb-2">
                      Monthly Electricity Bill (Rs)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={bill || ''}
                      onChange={(e) => setBill(e.target.value === '' ? 0 : Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#46614b]/20 text-lg font-semibold
                                 focus:ring-2 focus:ring-[#46614b]/50 focus:border-[#46614b] focus:outline-none"
                    />
                    {bill === 0 && (
                      <p className="text-sm text-amber-600 mt-2">
                        Please enter your monthly electricity bill
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-semibold text-[#46614b] mb-2">
                      Monthly Electricity Units (kWh)
                    </label>
                    <input
                      type="number"
                      min={0}
                      value={units || ''}
                      onChange={(e) => setUnits(e.target.value === '' ? 0 : Number(e.target.value))}
                      className="w-full px-4 py-3 rounded-xl border-2 border-[#46614b]/20 text-lg font-semibold
                                 focus:ring-2 focus:ring-[#46614b]/50 focus:border-[#46614b] focus:outline-none"
                    />
                    {units === 0 && (
                      <p className="text-sm text-amber-600 mt-2">
                        Please enter your monthly electricity units
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* RESULT CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-12">
              <ResultCard title="Required Solar Capacity" value={`${solarCapacity} kW`} />
              <ResultCard title="Annual Energy Generation" value={`${Math.round(yearlyUnits)} Units`} />
              <ResultCard title="Annual Savings" value={`Rs ${formatINR(annualSavings)}`} />
              <ResultCard title="Roof Space Required" value={`${roofSpace} Sqft`} />
            </div>

            {/* COST */}
            <div className="bg-white rounded-2xl p-6 md:p-8 mb-10 shadow-lg">
              <div className="grid md:grid-cols-3 gap-6">
                <CostCard title="Price (Before Subsidy)" value={`Rs ${formatINR(priceBefore)}`} />
                <CostCard title="Government Subsidy" value={`-Rs ${formatINR(subsidy)}`} final />
                <CostCard title="Effective Cost" value={`Rs ${formatINR(finalCost)}`} highlight />
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">
                Subsidy applied as per PM Surya Ghar (Residential): Rs 30,000 for 1 kW, Rs 60,000 for 2 kW, Rs 78,000 for 3 kW and above (capped).
              </p>
            </div>

            {/* CTA */}
            <div className="text-center">
              <a
                href="#quote"
                onClick={scrollToQuote}
                className={`inline-flex items-center justify-center gap-2 px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg transition whitespace-nowrap
                  ${
                    monthlyUnits === 0
                      ? 'bg-gray-300 cursor-not-allowed text-gray-600'
                      : 'bg-[#46614b] hover:bg-[#3d5340] text-white shadow-lg hover:shadow-xl'
                  }`}
              >
                Get Your Custom Quote <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ================= SUB COMPONENTS ================= */

function ResultCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-3 sm:p-6 text-center border border-[#46614b]/10 hover:shadow-lg transition">
      <p className="text-xs sm:text-sm text-[#46614b] font-medium mb-1">{title}</p>
      <p className="text-lg sm:text-2xl font-bold text-[#46614b]">{value}</p>
    </div>
  );
}

function CostCard({
  title,
  value,
  highlight,
  final,
}: {
  title: string;
  value: string;
  highlight?: boolean;
  final?: boolean;
}) {
  return (
    <div
      className={`rounded-xl p-4 sm:p-6 text-center ${
        final
          ? 'bg-gradient-to-br from-[#f0f4f0] to-[#e8efe8] text-[#46614b] border-2 border-[#46614b]/30'
          : highlight
          ? 'bg-gradient-to-br from-amber-50 to-amber-100 text-amber-800 border-2 border-amber-300'
          : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800'
      }`}
    >
      <p className="text-xs sm:text-sm font-medium mb-1">{title}</p>
      <p className="text-lg sm:text-2xl font-bold break-words">{value}</p>
    </div>
  );
}
