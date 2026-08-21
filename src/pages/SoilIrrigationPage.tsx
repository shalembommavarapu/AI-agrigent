import React, { useState } from 'react';
import {
  Droplets,
  Gauge,
  Thermometer,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Layers,
  Sparkles,
  Zap,
  Leaf
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
  ResponsiveContainer,
  Legend
} from 'recharts';
import { FieldData, SoilMetrics, IrrigationRecommendation } from '../types';

interface SoilIrrigationPageProps {
  fields: FieldData[];
  selectedField: FieldData;
  soil: SoilMetrics;
  irrigation: IrrigationRecommendation;
  onSelectField: (id: string) => void;
  onApplyIrrigation: () => void;
}

export const SoilIrrigationPage: React.FC<SoilIrrigationPageProps> = ({
  fields,
  selectedField,
  soil,
  irrigation,
  onSelectField,
  onApplyIrrigation
}) => {
  const [applied, setApplied] = useState(false);

  const npkData = [
    { nutrient: 'Nitrogen (N)', current: soil.nitrogen, optimal: 65, unit: 'kg/ha' },
    { nutrient: 'Phosphorus (P)', current: soil.phosphorus, optimal: 45, unit: 'kg/ha' },
    { nutrient: 'Potassium (K)', current: soil.potassium, optimal: 80, unit: 'kg/ha' },
  ];

  const handleTrigger = () => {
    setApplied(true);
    onApplyIrrigation();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-800/60 border border-teal-400/30 text-teal-300 text-xs font-semibold mb-2">
            <Droplets className="w-3.5 h-3.5" />
            <span>Hydro-Dynamic Soil IoT Telemetry</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Soil & Irrigation Intelligence</h2>
          <p className="text-teal-100/80 text-xs sm:text-sm mt-1 max-w-xl">
            Real-time root zone moisture sensors, nutrient NPK ratios, and AI-optimized precision drip scheduling for <strong className="text-white">{selectedField.name}</strong>.
          </p>
        </div>

        {/* Field Switcher */}
        <div className="bg-slate-900/80 border border-slate-700 rounded-2xl p-2.5 flex items-center gap-2">
          <span className="text-xs text-slate-400 pl-2">Select Plot:</span>
          <select
            value={selectedField.id}
            onChange={(e) => onSelectField(e.target.value)}
            className="bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-600 focus:outline-none cursor-pointer"
          >
            {fields.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name} ({f.crop})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Recommended Irrigation Plan (Hero Box) */}
      <div className="bg-white rounded-3xl border-2 border-sky-500/40 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gray-100">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="bg-sky-100 text-sky-900 font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-700" />
                <span>Next Recommended Irrigation</span>
              </span>
              <span className="bg-rose-100 text-rose-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                Priority: {irrigation.priority}
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
                💧 {irrigation.waterSavingsPct}% Water Saved
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
              {irrigation.recommendedDate} • <span className="text-sky-700">{irrigation.recommendedTime}</span>
            </h3>

            <p className="text-xs text-gray-600">
              Method: <strong className="text-gray-900">{irrigation.method}</strong> • Volume:{' '}
              <strong className="text-sky-800">{irrigation.waterAmountLiters.toLocaleString()} Liters</strong> ({irrigation.durationMinutes} min runtime)
            </p>
          </div>

          <button
            onClick={handleTrigger}
            disabled={applied}
            className={`px-6 py-3.5 rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 self-start lg:self-auto ${
              applied
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-sky-600 hover:bg-sky-700 text-white hover:scale-105'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{applied ? '✓ Drip Valve Scheduled' : 'Schedule Drip Cycle'}</span>
          </button>
        </div>

        {/* Reasons Grid */}
        <div className="mt-4 pt-2">
          <p className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
            Multi-Factor Agronomic Justifications:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-gray-700">
            {irrigation.reasons.map((r, idx) => (
              <div key={idx} className="p-3 bg-sky-50/60 border border-sky-100 rounded-xl flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-600 mt-1.5 flex-shrink-0" />
                <span>{r}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Soil Metrics Overview (8 Metrics) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {[
          { label: 'Moisture', value: `${soil.moisture}%`, status: soil.moistureStatus, color: 'text-sky-700', bg: 'bg-sky-50' },
          { label: 'Soil pH', value: soil.pH, status: soil.phStatus, color: 'text-emerald-700', bg: 'bg-emerald-50' },
          { label: 'Nitrogen (N)', value: `${soil.nitrogen}`, sub: 'kg/ha', color: 'text-gray-900', bg: 'bg-slate-50' },
          { label: 'Phosphorus (P)', value: `${soil.phosphorus}`, sub: 'kg/ha', color: 'text-gray-900', bg: 'bg-slate-50' },
          { label: 'Potassium (K)', value: `${soil.potassium}`, sub: 'kg/ha', color: 'text-gray-900', bg: 'bg-slate-50' },
          { label: 'Organic Carbon', value: `${soil.organicMatter}%`, status: 'Good', color: 'text-emerald-700', bg: 'bg-emerald-50' },
          { label: 'Soil Temp', value: `${soil.soilTemperature}°C`, sub: 'Optimal', color: 'text-amber-700', bg: 'bg-amber-50' },
          { label: 'Texture', value: soil.texture.split(' ')[0], sub: soil.texture.split(' ')[1] || 'Loam', color: 'text-slate-800', bg: 'bg-slate-50' },
        ].map((item, idx) => (
          <div key={idx} className={`p-3.5 rounded-2xl border border-gray-100 ${item.bg} shadow-sm`}>
            <span className="text-[10px] font-bold text-gray-500 block uppercase tracking-wider">{item.label}</span>
            <p className={`text-lg font-black mt-0.5 ${item.color}`}>{item.value}</p>
            <span className="text-[10px] text-gray-500 font-medium">{item.status || item.sub}</span>
          </div>
        ))}
      </div>

      {/* Depth Profile & Telemetry Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Depth Profile Card */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-600" />
            <span>Soil Depth Strata Profile</span>
          </h3>
          <p className="text-xs text-gray-500">Multilayer capacitive soil probes sensor data</p>

          <div className="space-y-3">
            {soil.depthProfile.map((layer, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-gray-200/80 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold text-gray-900">
                  <span>{layer.depth}</span>
                  <span className="text-sky-700">{layer.moisture}% Moisture</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-sky-600 h-2 rounded-full"
                    style={{ width: `${layer.moisture}%` }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-gray-500 pt-1">
                  <span>Temperature: <strong className="text-gray-800">{layer.temp}°C</strong></span>
                  <span>Hydration: <strong className="text-emerald-700">Healthy</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NPK Distribution Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                <Leaf className="w-4 h-4 text-emerald-600" />
                <span>Macronutrient NPK Balance (kg/ha)</span>
              </h3>
              <p className="text-xs text-gray-500">Current soil test values vs recommended optimal benchmark</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={npkData} margin={{ top: 15, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="nutrient" tick={{ fontSize: 11, fill: '#64748b' }} />
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
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="current" fill="#059669" name="Current Soil Level" radius={[8, 8, 0, 0]} />
                <Bar dataKey="optimal" fill="#94a3b8" name="Recommended Target" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
