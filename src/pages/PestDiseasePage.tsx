import React, { useState } from 'react';
import {
  Bug,
  ShieldCheck,
  AlertTriangle,
  AlertCircle,
  Clock,
  Sparkles,
  Leaf,
  Layers,
  Thermometer,
  Droplets,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { FieldData, DiseaseRiskData } from '../types';

interface PestDiseasePageProps {
  fields: FieldData[];
  selectedField: FieldData;
  diseaseData: DiseaseRiskData;
  onSelectField: (id: string) => void;
}

export const PestDiseasePage: React.FC<PestDiseasePageProps> = ({
  fields,
  selectedField,
  diseaseData,
  onSelectField
}) => {
  const radarData = [
    { subject: 'Canopy RH', A: 85, fullMark: 100 },
    { subject: 'Night Temp', A: 70, fullMark: 100 },
    { subject: 'Leaf Wetness', A: 65, fullMark: 100 },
    { subject: 'Stage Susceptibility', A: 90, fullMark: 100 },
    { subject: 'Spore Dispersion', A: 60, fullMark: 100 },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-900/60 border border-rose-400/30 text-rose-300 text-xs font-semibold mb-2">
            <Bug className="w-3.5 h-3.5" />
            <span>Epidemiological Risk Forecast Model</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Pest & Disease Intelligence</h2>
          <p className="text-rose-100/80 text-xs sm:text-sm mt-1 max-w-xl">
            Proactive pathogen alerts combining weather micro-climate, crop canopy humidity, and historical disease vectors for <strong className="text-white">{selectedField.name}</strong>.
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

      {/* Detected Condition vs Predicted Risk Concept Banner */}
      <div className="bg-white rounded-3xl p-5 border border-emerald-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900">AgriMind AI Conceptual Precision</h4>
            <p className="text-xs text-gray-600 mt-0.5">
              <strong>Detected Condition</strong> identifies physical symptoms currently visible on leaves (via Crop Vision AI).{' '}
              <strong>Predicted Risk</strong> calculates prospective likelihood before symptoms manifest.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Core Risk Scores */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Overall Disease Risk */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase tracking-wider">
            <span>Overall Disease Risk</span>
            <AlertCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-black text-gray-900">{diseaseData.overallDiseaseRisk}%</p>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-600 h-2 rounded-full"
              style={{ width: `${diseaseData.overallDiseaseRisk}%` }}
            />
          </div>
          <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
            Low Risk Category
          </span>
        </div>

        {/* Pest Risk */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase tracking-wider">
            <span>Pest Attack Risk</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-3xl font-black text-amber-700">{diseaseData.overallPestRisk}%</p>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-amber-500 h-2 rounded-full"
              style={{ width: `${diseaseData.overallPestRisk}%` }}
            />
          </div>
          <span className="text-[11px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full inline-block">
            Moderate Monitoring Needed
          </span>
        </div>

        {/* Fungal Spore Risk */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-gray-500 uppercase tracking-wider">
            <span>Fungal Spore Risk</span>
            <Bug className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-3xl font-black text-rose-700">{diseaseData.fungalRisk}%</p>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-rose-500 h-2 rounded-full"
              style={{ width: `${diseaseData.fungalRisk}%` }}
            />
          </div>
          <span className="text-[11px] font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded-full inline-block">
            Elevated Due to 72% RH
          </span>
        </div>
      </div>

      {/* Pathogen Forecasting Matrix & Radar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pathogens Table (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
                <Bug className="w-4 h-4 text-rose-600" />
                <span>Forecasting Pathogen Window (Next 7-14 Days)</span>
              </h3>
              <p className="text-xs text-gray-500">Predicted vulnerabilities for {selectedField.crop}</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-gray-600 font-bold border-b border-gray-100 uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-3">Pathogen / Pest</th>
                  <th className="py-3 px-2">Type</th>
                  <th className="py-3 px-2">Risk Probability</th>
                  <th className="py-3 px-2">Vulnerability Window</th>
                  <th className="py-3 px-3">Preventive Bio-Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {diseaseData.predictedRisks.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-3 font-bold text-gray-900">{item.diseaseName}</td>
                    <td className="py-3.5 px-2 text-gray-500">{item.pathogenType}</td>
                    <td className="py-3.5 px-2">
                      <span
                        className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                          item.probability >= 50
                            ? 'bg-rose-100 text-rose-800'
                            : item.probability >= 25
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {item.probability}% ({item.probability >= 50 ? 'High' : item.probability >= 25 ? 'Moderate' : 'Low'})
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-gray-600 font-medium">In {item.windowDays} Days</td>
                    <td className="py-3.5 px-3 text-emerald-800 font-medium">{item.preventiveAction}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Environmental Drivers Radar */}
        <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Micro-Climate Risk Drivers</span>
            </h3>
            <p className="text-xs text-gray-500">Aggregated environmental pressure indices</p>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#64748b' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                <Radar name="Risk Driver Index" dataKey="A" stroke="#e11d48" fill="#e11d48" fillOpacity={0.4} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 bg-rose-50 rounded-2xl text-[11px] text-rose-900 border border-rose-200">
            <strong>Key Advisory:</strong> High relative humidity (72%) paired with warm nights creates prime conditions for early blight spore incubation. Keep foliage dry via drip irrigation.
          </div>
        </div>
      </div>
    </div>
  );
};
