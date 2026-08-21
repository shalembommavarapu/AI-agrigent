import React, { useState } from 'react';
import {
  TrendingUp,
  Store,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  MapPin,
  Calendar,
  Layers,
  CheckCircle2,
  DollarSign
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { MarketData } from '../types';
import { MOCK_MARKETS } from '../data/mockData';

interface MarketPageProps {
  initialCrop?: string;
}

export const MarketPage: React.FC<MarketPageProps> = ({ initialCrop = 'Tomato' }) => {
  const [selectedCrop, setSelectedCrop] = useState<string>(initialCrop);
  const currentMarket: MarketData = MOCK_MARKETS[selectedCrop] || MOCK_MARKETS['Tomato'];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>APMC Mandi Intelligence • Andhra Pradesh Hubs</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Market Intelligence</h2>
          <p className="text-emerald-100/80 text-xs sm:text-sm mt-1 max-w-xl">
            Live wholesale mandi rates, price volatility trajectories, and AI-assisted harvest realization timing.
          </p>
        </div>

        {/* Crop Selector Tabs */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-700 p-1.5 rounded-2xl">
          {Object.keys(MOCK_MARKETS).map((crop) => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCrop === crop
                  ? 'bg-emerald-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Spot Rate Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mandi Spot Price</span>
          <p className="text-3xl font-black text-gray-900">
            ₹{currentMarket.currentPrice} <span className="text-sm font-normal text-gray-500">/ kg</span>
          </p>
          <span className="text-xs text-gray-500 font-medium">₹{currentMarket.mandiRateQuintal} / Quintal</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Weekly Movement</span>
          <div className="flex items-center gap-1.5 text-3xl font-black text-emerald-700">
            <ArrowUpRight className="w-6 h-6" />
            <span>+{currentMarket.weeklyChangePct}%</span>
          </div>
          <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
            {currentMarket.marketTrend} Trend
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Wholesale Demand</span>
          <p className="text-3xl font-black text-sky-700">{currentMarket.demandLevel}</p>
          <span className="text-xs text-gray-500 font-medium">Procurement yards active</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Trading Trend</span>
          <p className="text-2xl font-black text-teal-800">{currentMarket.marketTrend}</p>
          <span className="text-[11px] text-gray-500 font-medium">Monthly: +{currentMarket.monthlyChangePct}%</span>
        </div>
      </div>

      {/* AI Market Advisory Card */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-slate-50 border border-emerald-200 rounded-3xl p-5 shadow-sm flex items-start gap-4">
        <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 shadow-md">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
            AI Mandi Insight & Harvest Advisory ({selectedCrop})
          </h4>
          <p className="text-xs text-slate-800 mt-1 leading-relaxed">{currentMarket.aiInsight}</p>
        </div>
      </div>

      {/* Price Trend Chart & Mandi Hubs Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Trend Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-600" />
                <span>30-Day Wholesale Price Trajectory (₹/kg)</span>
              </h3>
              <p className="text-xs text-gray-500">{selectedCrop} Spot Price History & Volume</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={currentMarket.priceHistory30d} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                    border: 'none'
                  }}
                />
                <Area type="monotone" dataKey="price" stroke="#059669" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPrice)" name="Price (₹/kg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Regional Mandi Comparison Table (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <Store className="w-4 h-4 text-teal-600" />
              <span>Regional APMC Mandi Comparison</span>
            </h3>
          </div>

          <div className="space-y-3">
            {currentMarket.mandiComparison.map((mandi, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200/80 hover:border-emerald-300 transition-all flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-xs text-gray-900">{mandi.mandi}</h4>
                  <p className="text-[11px] text-gray-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span>{mandi.distanceKm} km away • {mandi.location}</span>
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-base font-black text-gray-900 block">₹{mandi.price}/kg</span>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">
                    ₹{mandi.price * 100}/Q
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
