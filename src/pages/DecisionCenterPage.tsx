import React, { useState } from 'react';
import {
  BrainCircuit,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  HelpCircle,
  MessageSquareShare,
  ShieldCheck,
  TrendingUp,
  Droplets,
  RotateCcw
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { FieldData, FarmDecision, SoilMetrics, WeatherCondition, MarketData } from '../types';
import { apiService } from '../services/api';

interface DecisionCenterPageProps {
  fields: FieldData[];
  selectedField: FieldData;
  decision: FarmDecision;
  soil: SoilMetrics;
  weather: WeatherCondition;
  market: MarketData;
  onSelectField: (id: string) => void;
  onApplyDecision: (id: string) => void;
  onOpenFeedback: () => void;
  onRefreshDecision: (fieldId: string) => void;
}

export const DecisionCenterPage: React.FC<DecisionCenterPageProps> = ({
  fields,
  selectedField,
  decision,
  soil,
  weather,
  market,
  onSelectField,
  onApplyDecision,
  onOpenFeedback,
  onRefreshDecision
}) => {
  const [generating, setGenerating] = useState(false);
  const [applied, setApplied] = useState(decision.applied);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      await onRefreshDecision(selectedField.id);
    } finally {
      setTimeout(() => setGenerating(false), 800);
    }
  };

  const handleApply = () => {
    setApplied(true);
    onApplyDecision(decision.id);
  };

  const factorWeightsData = decision.contributingFactors.map((f) => ({
    name: f.factor,
    weight: f.weightPct,
    desc: f.description
  }));

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/70 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-2">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Autonomous Agricultural Decision Center</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">AI Decision Engine & Explainability</h2>
          <p className="text-emerald-100/80 text-xs sm:text-sm mt-1 max-w-xl">
            Synthesizes soil sensors, weather micro-climate, crop growth phase, pathology risks, and mandi trends into actionable, explainable farm actions.
          </p>
        </div>

        {/* Field Switcher & Refresh Button */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-900/90 border border-slate-700 rounded-2xl p-2 flex items-center gap-2">
            <span className="text-xs text-slate-400 pl-2">Plot:</span>
            <select
              value={selectedField.id}
              onChange={(e) => onSelectField(e.target.value)}
              className="bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-600 focus:outline-none"
            >
              {fields.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.crop})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-5 py-3 rounded-2xl shadow-lg transition-all hover:scale-105"
          >
            <RotateCcw className={`w-4 h-4 ${generating ? 'animate-spin' : ''}`} />
            <span>{generating ? 'Synthesizing...' : 'Re-Run Multi-Agent Engine'}</span>
          </button>
        </div>
      </div>

      {/* Main Decision Synthesizer Hero Card */}
      <div className="bg-white rounded-3xl border-2 border-emerald-500/40 p-6 sm:p-8 shadow-xl space-y-6">
        {/* Header Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-emerald-100 text-emerald-900 font-bold text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
              <BrainCircuit className="w-4 h-4 text-emerald-700" />
              <span>Consensus Farm Recommendation</span>
            </span>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${
                decision.priority === 'HIGH'
                  ? 'bg-rose-100 text-rose-800'
                  : decision.priority === 'MEDIUM'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-emerald-100 text-emerald-800'
              }`}
            >
              Priority: {decision.priority}
            </span>
            <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full">
              Confidence: {decision.confidence}%
            </span>
          </div>

          <span className="text-xs text-gray-500">
            Target Execution: <strong className="text-gray-900">{decision.timing}</strong>
          </span>
        </div>

        {/* Action Title & Executive Summary */}
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
            Synthesized Prescription:
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 mt-1 leading-snug">
            {decision.actionTitle}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            "{decision.summary}"
          </p>
        </div>

        {/* Analytical Justifications List */}
        <div>
          <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
            Key Multi-Factor Agronomic Reasons:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-gray-700">
            {decision.reasons.map((reason, idx) => (
              <div key={idx} className="p-3.5 bg-emerald-50/60 border border-emerald-100 rounded-2xl flex items-start gap-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1 flex-shrink-0" />
                <span>{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Expected Yield & Economic Impact */}
        <div>
          <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">
            Expected Farm & ROI Impact:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {decision.expectedImpact.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-gray-200/80 space-y-1">
                <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  {item.benefit}
                </span>
                <p className="text-gray-600 text-[11px]">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100">
          <button
            onClick={handleApply}
            disabled={applied}
            className={`px-6 py-3.5 rounded-2xl font-bold text-xs shadow-md transition-all flex items-center gap-2 ${
              applied
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white hover:scale-105'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{applied ? '✓ Recommendation Applied & Logged' : 'Apply Recommendation'}</span>
          </button>

          <button
            onClick={onOpenFeedback}
            className="px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center gap-2"
          >
            <MessageSquareShare className="w-4 h-4 text-slate-600" />
            <span>Provide Farmer Feedback</span>
          </button>
        </div>
      </div>

      {/* Explainable AI (XAI) Contributing Factor Breakdown */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span>Explainable AI (XAI) Feature Importance Matrix</span>
            </h3>
            <p className="text-xs text-gray-500">Transparent mathematical attribution of telemetry variables</p>
          </div>
        </div>

        {/* Weights Bar Chart */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={factorWeightsData} layout="vertical" margin={{ top: 10, right: 30, left: 60, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#334155' }} width={140} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                  border: 'none'
                }}
              />
              <Bar dataKey="weight" fill="#059669" name="Factor Weight %" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Detailed Breakdown Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {decision.contributingFactors.map((f, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200/80">
              <div className="flex justify-between items-center text-xs font-bold text-gray-900">
                <span>{f.factor}</span>
                <span className="text-emerald-700">{f.weightPct}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2 overflow-hidden">
                <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: `${f.weightPct}%` }} />
              </div>
              <p className="text-[11px] text-gray-600 mt-2">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
