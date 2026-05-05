import { useState } from 'react';
import { Calculator, TrendingUp, Zap } from 'lucide-react';

export default function SolarSavingsCalculator() {
  const [inputType, setInputType] = useState<'bill' | 'units'>('bill');
  const [billAmount, setBillAmount] = useState('');
  const [monthlyUnits, setMonthlyUnits] = useState('');
  const [showResults, setShowResults] = useState(false);

  // Average electricity rate in India (Rs/kWh) - can be adjusted
  const AVG_ELECTRICITY_RATE = 6.5;
  const SOLAR_SYSTEM_COST_PER_KW = 80000;
  const ANNUAL_DEGRADATION = 0.005; // 0.5% annual degradation
  const SYSTEM_LIFESPAN = 25; // years
  const MAINTENANCE_COST_ANNUAL = 2000; // Rs

  const calculateSavings = () => {
    let dailyUnits = 0;

    if (inputType === 'bill') {
      // Convert bill amount to monthly units
      const monthlyUnitsFromBill = (parseFloat(billAmount) || 0) / AVG_ELECTRICITY_RATE;
      dailyUnits = monthlyUnitsFromBill / 30;
    } else {
      // Direct unit input
      dailyUnits = (parseFloat(monthlyUnits) || 0) / 30;
    }

    const monthlyUnitsValue = dailyUnits * 30;
    const monthlyBillAmount = monthlyUnitsValue * AVG_ELECTRICITY_RATE;
    const annualBillAmount = monthlyBillAmount * 12;

    // Calculate required system size (in kW)
    // Average solar capacity: 4-5 kWh per kW per day in India
    const solarCapacityPerDay = 4.5; // kWh per kW
    const requiredSystemSize = Math.ceil(dailyUnits / solarCapacityPerDay * 10) / 10; // in kW

    // Calculate system cost
    const systemCost = requiredSystemSize * SOLAR_SYSTEM_COST_PER_KW;

    // Calculate 25-year savings
    let totalSavings = 0;
    let totalGeneration = 0;

    for (let year = 1; year <= SYSTEM_LIFESPAN; year++) {
      const degradationFactor = Math.pow(1 - ANNUAL_DEGRADATION, year - 1);
      const yearlyGeneration = dailyUnits * 365 * degradationFactor;
      const yearlySavings = yearlyGeneration * AVG_ELECTRICITY_RATE - MAINTENANCE_COST_ANNUAL;
      totalSavings += yearlySavings;
      totalGeneration += yearlyGeneration;
    }

    const netSavings = totalSavings - systemCost;
    const roi = ((netSavings / systemCost) * 100).toFixed(1);
    const paybackPeriod = (systemCost / (annualBillAmount - MAINTENANCE_COST_ANNUAL)).toFixed(1);

    return {
      dailyUnits: dailyUnits.toFixed(2),
      monthlyUnits: monthlyUnitsValue.toFixed(2),
      monthlyBill: monthlyBillAmount.toFixed(0),
      annualBill: annualBillAmount.toFixed(0),
      requiredSystemSize: requiredSystemSize.toFixed(2),
      systemCost: systemCost.toFixed(0),
      annualSavings: (annualBillAmount - MAINTENANCE_COST_ANNUAL).toFixed(0),
      twentyFivYearSavings: totalSavings.toFixed(0),
      twentyFiveYearGeneration: totalGeneration.toFixed(0),
      netSavings: netSavings.toFixed(0),
      roi: roi,
      paybackPeriod: paybackPeriod,
    };
  };

  const results = showResults ? calculateSavings() : null;
  const hasInput = (inputType === 'bill' && billAmount) || (inputType === 'units' && monthlyUnits);

  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-br from-amber-50/30 via-emerald-50/20 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-[#f0f4f0] rounded-full p-4">
              <Calculator className="w-8 h-8 text-[#46614b]" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#46614b] mb-4">
            Calculate Your Solar Savings
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Discover how much you can save with solar energy. Choose your preferred input method.
          </p>
        </div>

        {/* Calculator Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
            {/* Input Section */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Enter Your Details</h3>

              {/* Input Type Toggle */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => {
                    setInputType('bill');
                    setMonthlyUnits('');
                    setShowResults(false);
                  }}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                    inputType === 'bill'
                      ? 'bg-[#46614b] text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  By Bill Amount
                </button>
                <button
                  onClick={() => {
                    setInputType('units');
                    setBillAmount('');
                    setShowResults(false);
                  }}
                  className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                    inputType === 'units'
                      ? 'bg-[#46614b] text-white shadow-lg'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  By Units (kWh)
                </button>
              </div>

              {/* Input Fields */}
              <div className="space-y-6">
                {inputType === 'bill' ? (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Monthly Electricity Bill Amount (Rs)
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 text-xl text-gray-500">Rs</span>
                      <input
                        type="number"
                        value={billAmount}
                        onChange={(e) => {
                          setBillAmount(e.target.value);
                          setShowResults(false);
                        }}
                        placeholder="Enter your monthly bill"
                        className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#46614b]/50 focus:ring-2 focus:ring-[#46614b]/20 outline-none transition"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Enter your monthly electricity bill amount in rupees
                    </p>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Monthly Electricity Units (kWh)
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        value={monthlyUnits}
                        onChange={(e) => {
                          setMonthlyUnits(e.target.value);
                          setShowResults(false);
                        }}
                        placeholder="Enter your monthly consumption"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-[#46614b]/50 focus:ring-2 focus:ring-[#46614b]/20 outline-none transition"
                      />
                      <span className="absolute right-4 top-3.5 text-gray-500 font-semibold">kWh</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Check your electricity bill for monthly consumption in kWh
                    </p>
                  </div>
                )}

                <button
                  onClick={() => setShowResults(true)}
                  disabled={!hasInput}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                    hasInput
                      ? 'bg-[#46614b] text-white hover:bg-[#3d5340] shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Zap className="w-5 h-5" />
                  Calculate Savings
                </button>
              </div>

              {/* Info Box */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Note:</span> Calculation based on average electricity rate of Rs{AVG_ELECTRICITY_RATE}/kWh and 25-year system lifespan
                </p>
              </div>
            </div>

            {/* Results Section */}
            <div>
              {results ? (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900">Your Savings Projection</h3>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-[#f0f4f0] to-[#e8efe8] p-4 rounded-lg border border-[#46614b]/20">
                      <p className="text-xs text-gray-600 mb-1">Required System Size</p>
                      <p className="text-2xl font-bold text-[#46614b]">{results.requiredSystemSize} kW</p>
                    </div>
                    <div className="bg-gradient-to-br from-[#f0f4f0] to-[#e8efe8] p-4 rounded-lg border border-[#46614b]/20">
                      <p className="text-xs text-gray-600 mb-1">System Cost</p>
                      <p className="text-xl font-bold text-[#46614b]">Rs {parseInt(results.systemCost).toLocaleString()}</p>
                    </div>
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-lg border border-amber-200">
                      <p className="text-xs text-gray-600 mb-1">Annual Savings</p>
                      <p className="text-xl font-bold text-amber-700">Rs {parseInt(results.annualSavings).toLocaleString()}</p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                      <p className="text-xs text-gray-600 mb-1">Payback Period</p>
                      <p className="text-2xl font-bold text-blue-700">{results.paybackPeriod} yrs</p>
                    </div>
                  </div>

                  {/* Consumption Details */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-3">Current Consumption</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Daily Consumption:</span>
                        <span className="font-semibold text-gray-900">{results.dailyUnits} kWh</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Consumption:</span>
                        <span className="font-semibold text-gray-900">{results.monthlyUnits} kWh</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Bill:</span>
                        <span className="font-semibold text-gray-900">Rs {parseInt(results.monthlyBill).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Annual Bill:</span>
                        <span className="font-semibold text-gray-900">Rs {parseInt(results.annualBill).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* 25-Year Projections */}
                  <div className="bg-[#f0f4f0] p-4 rounded-lg border border-[#46614b]/20">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-[#46614b]" />
                      25-Year Projections
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Generation:</span>
                        <span className="font-semibold text-gray-900">{parseInt(results.twentyFiveYearGeneration).toLocaleString()} kWh</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Savings:</span>
                        <span className="font-semibold text-[#46614b]">Rs {parseInt(results.twentyFivYearSavings).toLocaleString()}</span>
                      </div>
                      <div className="border-t border-[#46614b]/20 pt-2 mt-2 flex justify-between">
                        <span className="text-gray-600 font-semibold">Net Profit:</span>
                        <span className="font-bold text-[#46614b] text-lg">Rs {parseInt(results.netSavings).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ROI:</span>
                        <span className="font-semibold text-[#46614b]">{results.roi}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="bg-gray-100 rounded-full p-8 mb-4">
                    <Calculator className="w-12 h-12 text-gray-400" />
                  </div>
                  <p className="text-gray-600">
                    Enter your details and click "Calculate Savings" to see your solar energy potential
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Benefits Footer */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <Zap className="w-8 h-8 text-[#46614b] mx-auto mb-3" />
            <h4 className="font-bold text-gray-900 mb-2">Reduced Bills</h4>
            <p className="text-sm text-gray-600">Save 50-90% on electricity bills with solar</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <TrendingUp className="w-8 h-8 text-amber-600 mx-auto mb-3" />
            <h4 className="font-bold text-gray-900 mb-2">Quick ROI</h4>
            <p className="text-sm text-gray-600">Recover your investment in 5-7 years</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="w-8 h-8 text-green-600 mx-auto mb-3 flex items-center justify-center font-bold text-xl">
              ♻️
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Eco-Friendly</h4>
            <p className="text-sm text-gray-600">25+ years of clean, renewable energy</p>
          </div>
        </div>
      </div>
    </section>
  );
}
