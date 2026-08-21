import React, { useState } from 'react';
import {
  BrainCircuit,
  Activity,
  Droplets,
  Bug,
  AlertTriangle,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  MessageSquareShare,
  Layers,
  CloudSun,
  Flame
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { FarmInfo, FieldData, FarmDecision, SoilMetrics, WeatherCondition } from '../types';
import { PageId } from '../components/Sidebar';

interface DashboardPageProps {
  farm: FarmInfo;
  fields: FieldData[];
  selectedField: FieldData;
  decision: FarmDecision;
  soil: SoilMetrics;
  weather: WeatherCondition;
  onNavigate: (page: PageId) => void;
  onApplyDecision: (id: string) => void;
  onOpenFeedback: () => void;
  onOpenAssistant: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  farm,
  fields,
  selectedField,
  decision,
  soil,
  weather,
  onNavigate,
  onApplyDecision,
  onOpenFeedback,
  onOpenAssistant
}) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [applied, setApplied] = useState(decision.applied);

  const handleApply = () => {
    setApplied(true);
    onApplyDecision(decision.id);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Greeting Header */}
      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1B4332] tracking-tight">
            Good Morning, {farm.farmerName} 👋
          </h1>
          <p className="text-emerald-700/60 font-medium text-sm mt-1">
            Here is your farm intelligence for <span className="text-[#1B4332] font-bold">{farm.name}</span> • {farm.location}, {farm.state}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('decision-center')}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md shadow-emerald-200 transition-all flex items-center gap-2"
          >
            <BrainCircuit className="w-4 h-4" />
            <span>AI Decision Center</span>
          </button>
          <button
            onClick={onOpenAssistant}
            className="bg-white hover:bg-emerald-50 text-[#1B4332] border border-emerald-200 font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Ask AgriMind</span>
          </button>
        </div>
      </header>

      {/* 4 to 6 Bento Metric KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* 1. Crop Health */}
        <div
          onClick={() => onNavigate('crop-vision')}
          className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-50 hover:border-emerald-300 hover:shadow transition-all cursor-pointer group"
        >
          <p className="text-xs font-bold text-emerald-800/50 uppercase tracking-widest mb-1">Crop Health</p>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-black text-[#1B4332]">92%</span>
            <span className="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">Healthy</span>
          </div>
        </div>

        {/* 2. Soil Moisture */}
        <div
          onClick={() => onNavigate('soil-irrigation')}
          className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-50 hover:border-emerald-300 hover:shadow transition-all cursor-pointer group"
        >
          <p className="text-xs font-bold text-emerald-800/50 uppercase tracking-widest mb-1">Soil Moisture</p>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-black text-[#1B4332]">64%</span>
            <span className="bg-sky-50 text-sky-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">Optimal</span>
          </div>
        </div>

        {/* 3. Disease Risk */}
        <div
          onClick={() => onNavigate('pest-disease')}
          className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-50 hover:border-emerald-300 hover:shadow transition-all cursor-pointer group"
        >
          <p className="text-xs font-bold text-emerald-800/50 uppercase tracking-widest mb-1">Disease Risk</p>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-black text-[#1B4332]">18%</span>
            <span className="bg-emerald-50 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">Low</span>
          </div>
        </div>

        {/* 4. Pest Risk */}
        <div
          onClick={() => onNavigate('pest-disease')}
          className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-50 hover:border-emerald-300 hover:shadow transition-all cursor-pointer group"
        >
          <p className="text-xs font-bold text-emerald-800/50 uppercase tracking-widest mb-1">Pest Attack</p>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-black text-[#1B4332]">32%</span>
            <span className="bg-amber-50 text-amber-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">Moderate</span>
          </div>
        </div>

        {/* 5. Irrigation */}
        <div
          onClick={() => onNavigate('soil-irrigation')}
          className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-50 hover:border-emerald-300 hover:shadow transition-all cursor-pointer group"
        >
          <p className="text-xs font-bold text-emerald-800/50 uppercase tracking-widest mb-1">Irrigation</p>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-black text-[#1B4332]">7h</span>
            <span className="bg-sky-50 text-sky-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">Dawn</span>
          </div>
        </div>

        {/* 6. Market Trend */}
        <div
          onClick={() => onNavigate('market')}
          className="bg-white p-4 rounded-2xl shadow-sm border border-emerald-50 hover:border-emerald-300 hover:shadow transition-all cursor-pointer group"
        >
          <p className="text-xs font-bold text-emerald-800/50 uppercase tracking-widest mb-1">Market Trend</p>
          <div className="flex justify-between items-end">
            <span className="text-2xl font-black text-emerald-700">+8.4%</span>
            <span className="bg-emerald-50 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase">Positive</span>
          </div>
        </div>
      </div>

      {/* Main Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Bento Hero Card: Today's AI Farm Decision (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-[32px] border-2 border-emerald-100 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <BrainCircuit className="w-64 h-64 text-[#1B4332]" />
          </div>

          <div>
            {/* Header with icon badge & focus tag */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="bg-emerald-600 text-white p-2.5 rounded-xl shadow-md shadow-emerald-200">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-[#1B4332] tracking-tight">Today's AI Farm Decision</h2>
                  <p className="text-xs text-emerald-700/70 font-semibold">Autonomous multi-agent consensus synthesis</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-rose-50 text-rose-700 border border-rose-200 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Priority: High
                </span>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Focus: {selectedField.name} ({selectedField.crop})
                </span>
              </div>
            </div>

            {/* Recommendation Quote Block */}
            <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100/80 mb-6">
              <p className="text-base sm:text-lg font-semibold leading-relaxed italic text-emerald-950">
                "Based on soil moisture (41%), zero rain forecast in 48 hours, and {selectedField.crop} flowering stage, Field A should be irrigated tomorrow morning between 6:00 AM and 8:00 AM."
              </p>
            </div>

            {/* Analytical Reasons & Dark Confidence Block */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-7">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-900 text-xs font-bold flex-shrink-0 mt-0.5">
                      1
                    </span>
                    <span className="text-xs sm:text-sm text-emerald-900/80 font-medium">
                      Soil moisture (41% in root zone) decreasing below optimal flowering threshold.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-900 text-xs font-bold flex-shrink-0 mt-0.5">
                      2
                    </span>
                    <span className="text-xs sm:text-sm text-emerald-900/80 font-medium">
                      Zero significant rainfall expected in the next 72-hour forecast.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-900 text-xs font-bold flex-shrink-0 mt-0.5">
                      3
                    </span>
                    <span className="text-xs sm:text-sm text-emerald-900/80 font-medium">
                      Flowering stage water stress risks reducing fruit set yield by 15%.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="sm:col-span-5 bg-[#1E3A2B] rounded-2xl p-5 text-white flex flex-col justify-center shadow-inner">
                <div className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-1">
                  Agent Confidence
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white">91%</div>
                <div className="mt-2.5 w-full bg-emerald-950 h-2 rounded-full overflow-hidden">
                  <div className="w-[91%] bg-[#74C69D] h-full rounded-full" />
                </div>
                <p className="text-[10px] text-emerald-300/70 mt-2">Validated by 7 autonomous agents</p>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="mt-8 pt-6 border-t border-emerald-100 flex flex-wrap items-center gap-3">
            <button
              onClick={handleApply}
              disabled={applied}
              className={`font-bold text-xs px-7 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 ${
                applied
                  ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 cursor-default'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200 hover:scale-[1.02]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{applied ? '✓ Recommendation Applied' : 'Apply Recommendation'}</span>
            </button>

            <button
              onClick={() => setShowExplanation(!showExplanation)}
              className="bg-white text-emerald-800 border border-emerald-200 font-bold text-xs px-6 py-3 rounded-xl hover:bg-emerald-50 transition-all flex items-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4 text-emerald-600" />
              <span>{showExplanation ? 'Hide Factor Weights' : 'Why this recommendation?'}</span>
            </button>

            <button
              onClick={onOpenFeedback}
              className="bg-emerald-50/80 hover:bg-emerald-100 text-emerald-900 border border-emerald-100 font-bold text-xs px-5 py-3 rounded-xl transition-all flex items-center gap-1.5"
            >
              <MessageSquareShare className="w-4 h-4 text-emerald-700" />
              <span>Farmer Feedback</span>
            </button>
          </div>

          {/* Explainable AI Drawer */}
          {showExplanation && (
            <div className="mt-6 pt-6 border-t border-emerald-100 animate-in fade-in space-y-3">
              <h4 className="text-xs font-bold text-[#1B4332] uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Explainable AI (XAI) Contributing Factor Weights:</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { factor: 'Crop Growth Stage', weight: 90, desc: 'Flowering is high sensitivity' },
                  { factor: 'Soil Moisture', weight: 80, desc: '41% approaching lower threshold' },
                  { factor: 'Rain Probability', weight: 80, desc: '12% probability confirms dry window' },
                  { factor: 'Weather Evaporation', weight: 70, desc: '31°C high evapotranspiration' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl">
                    <div className="flex justify-between items-center text-xs font-bold text-[#1B4332]">
                      <span className="truncate">{item.factor}</span>
                      <span className="text-emerald-700 ml-1">{item.weight}%</span>
                    </div>
                    <div className="w-full bg-emerald-200/60 rounded-full h-1.5 mt-2 overflow-hidden">
                      <div
                        className="bg-emerald-600 h-1.5 rounded-full"
                        style={{ width: `${item.weight}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-emerald-800/70 mt-1">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side Bento Column (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          {/* Crop Vision AI Bento Card */}
          <div
            onClick={() => onNavigate('crop-vision')}
            className="bg-white rounded-[32px] p-6 shadow-sm border border-emerald-100 hover:border-emerald-300 transition-all flex flex-col cursor-pointer group"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-base text-[#1B4332]">Crop Vision AI</h3>
              <span className="text-[10px] bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider">
                Active Scan
              </span>
            </div>
            <div className="h-44 bg-gray-100 rounded-2xl overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=400"
                alt="Leaf scan"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#14261C]/90 via-transparent to-transparent p-4 flex flex-col justify-end">
                <p className="text-white text-xs font-bold">{selectedField.name} - Section B4</p>
                <p className="text-[#74C69D] text-[11px] font-semibold">Detected: Early Blight Risk (87%)</p>
              </div>
              <div className="absolute top-4 left-4 right-4 h-0.5 bg-[#74C69D] animate-pulse shadow-[0_0_10px_#4ade80]" />
            </div>
            <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-red-900 text-xs font-bold">AI Diagnosis: Early Blight (Alternaria solani)</p>
              <p className="text-red-800/80 text-[11px] leading-tight mt-1">
                87% confidence detected on Sector B4 foliage. Recommended: Organic Copper Hydroxide spray.
              </p>
            </div>
          </div>

          {/* Agents Collaborative Bento Card (Dark Forest Green) */}
          <div
            onClick={() => onNavigate('ai-agents')}
            className="bg-[#1E3A2B] rounded-[32px] p-6 flex flex-col justify-between text-white shadow-sm hover:border hover:border-emerald-600 transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#74C69D]">
                Agents Collaborative Grid
              </span>
              <div className="flex -space-x-2">
                <div className="w-6 h-6 rounded-full border-2 border-[#1E3A2B] bg-emerald-400" />
                <div className="w-6 h-6 rounded-full border-2 border-[#1E3A2B] bg-[#74C69D]" />
                <div className="w-6 h-6 rounded-full border-2 border-[#1E3A2B] bg-teal-300" />
                <div className="w-6 h-6 rounded-full border-2 border-[#1E3A2B] bg-amber-400" />
              </div>
            </div>
            <div className="mt-6">
              <div className="text-2xl font-black text-white">7 AI Agents</div>
              <p className="text-emerald-300 text-xs font-medium mt-1">
                Synchronized on Precision Farming Decision #421
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Bento Row: Farm Plots & 24h Soil Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Plots Overview Bento Card (4 cols) */}
        <div className="lg:col-span-4 bg-white rounded-[32px] p-6 sm:p-7 border border-emerald-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#1B4332] flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-700" />
              <span>Farm Plots Overview</span>
            </h3>
            <button
              onClick={() => onNavigate('my-farm')}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950"
            >
              Manage Plots →
            </button>
          </div>

          <div className="space-y-3">
            {fields.map((f) => (
              <div
                key={f.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  f.id === selectedField.id
                    ? 'bg-emerald-50/70 border-emerald-300 ring-1 ring-emerald-400/40'
                    : 'bg-[#F8FAF7] border-emerald-100 hover:bg-emerald-50/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#1B4332]">{f.name}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      f.health === 'Excellent'
                        ? 'bg-emerald-100 text-emerald-800'
                        : f.health === 'Good'
                        ? 'bg-sky-100 text-sky-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {f.health}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2 text-[11px] text-emerald-900/70">
                  <div>
                    <span className="text-emerald-800/50 block text-[10px] uppercase font-bold">Crop</span>
                    <strong className="text-[#1B4332]">{f.crop}</strong>
                  </div>
                  <div>
                    <span className="text-emerald-800/50 block text-[10px] uppercase font-bold">Area</span>
                    <strong className="text-[#1B4332]">{f.area} ac</strong>
                  </div>
                  <div>
                    <span className="text-emerald-800/50 block text-[10px] uppercase font-bold">Stage</span>
                    <strong className="text-[#1B4332]">{f.stage}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 24-Hour Soil Telemetry Bento Card (8 cols) */}
        <div className="lg:col-span-8 bg-white rounded-[32px] p-6 sm:p-7 border border-emerald-100 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-sm text-[#1B4332] flex items-center gap-2">
                <Droplets className="w-4 h-4 text-sky-600" />
                <span>24-Hour Soil Telemetry ({selectedField.name})</span>
              </h3>
              <p className="text-xs text-emerald-800/60 font-medium">
                Root-zone moisture (%) and temperature (°C) diurnal profile
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 text-sky-800 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> Moisture %
              </span>
              <span className="flex items-center gap-1.5 text-amber-800 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Temp °C
              </span>
            </div>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={soil.history24h} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E3A2B',
                    borderRadius: '16px',
                    color: '#fff',
                    fontSize: '12px',
                    border: '1px solid #2D6A4F'
                  }}
                />
                <Area type="monotone" dataKey="moisture" stroke="#0284c7" strokeWidth={2.5} fillOpacity={1} fill="url(#colorMoisture)" name="Moisture %" />
                <Area type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorTemp)" name="Temp °C" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
