import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Layers,
  Cpu,
  Database,
  Radio,
  BellRing
} from 'lucide-react';
import { FarmInfo } from '../types';

interface SettingsPageProps {
  farm: FarmInfo;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ farm }) => {
  const [saved, setSaved] = useState(false);
  const [sensorInterval, setSensorInterval] = useState('15');
  const [units, setUnits] = useState('Indian (₹, Acres, kg/ha, Liters)');
  const [model, setModel] = useState('Google Gemini 2.5 Flash');
  const [rainAlertThreshold, setRainAlertThreshold] = useState('30');
  const [moistureDeficitAlert, setMoistureDeficitAlert] = useState('40');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 pb-12 max-w-5xl">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-2">
            <SettingsIcon className="w-3.5 h-3.5" />
            <span>Farm & Engine Configuration</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">System & AI Settings</h2>
          <p className="text-emerald-100/80 text-xs sm:text-sm mt-1 max-w-xl">
            Configure telemetry polling rates, agricultural unit systems, and AI inference parameters.
          </p>
        </div>

        {saved && (
          <div className="bg-emerald-500 text-slate-950 px-4 py-2 rounded-2xl font-bold text-xs flex items-center gap-1.5 shadow-lg">
            <CheckCircle2 className="w-4 h-4" /> Preferences Saved!
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Farm & Regional Parameters */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-600" />
            <span>Farm & Regional Parameters</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Farm Name</label>
              <input
                type="text"
                disabled
                value={farm.name}
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-800 font-medium"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Farmer / Operator</label>
              <input
                type="text"
                disabled
                value={farm.farmerName}
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-800 font-medium"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Location & State</label>
              <input
                type="text"
                disabled
                value={`${farm.location}, ${farm.state}, ${farm.country}`}
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-800 font-medium"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Measurement & Currency Standard</label>
              <select
                value={units}
                onChange={(e) => setUnits(e.target.value)}
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-800 focus:outline-none"
              >
                <option value="Indian (₹, Acres, kg/ha, Liters)">Indian Units (₹ INR, Acres, kg/ha, Liters)</option>
                <option value="Metric ($, Hectares, kg/ha, Liters)">Metric (Hectares, kg/ha, Liters)</option>
              </select>
            </div>
          </div>
        </div>

        {/* AI Model & Multi-Agent Inference Configuration */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-600" />
            <span>AI Model & Consensus Architecture</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Primary LLM & Multimodal Engine</label>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-800 focus:outline-none"
              >
                <option value="Google Gemini 2.5 Flash">Google Gemini 2.5 Flash (Recommended)</option>
                <option value="Google Gemini 2.5 Pro">Google Gemini 2.5 Pro</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">IoT Capacitive Sensor Ping Rate</label>
              <select
                value={sensorInterval}
                onChange={(e) => setSensorInterval(e.target.value)}
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-800 focus:outline-none"
              >
                <option value="5">Every 5 Minutes (High Precision)</option>
                <option value="15">Every 15 Minutes (Recommended)</option>
                <option value="60">Every 1 Hour (Battery Saver)</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950 flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700 flex-shrink-0" />
            <span>
              Server-side `@google/genai` SDK is activated. API keys remain protected and never exposed to client browsers.
            </span>
          </div>
        </div>

        {/* Alert Thresholds */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
          <h3 className="font-bold text-base text-gray-900 flex items-center gap-2">
            <BellRing className="w-5 h-5 text-emerald-600" />
            <span>Autonomous Alert Triggers</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Trigger Drip Irrigation when Root Moisture Drops Below (%)
              </label>
              <input
                type="number"
                value={moistureDeficitAlert}
                onChange={(e) => setMoistureDeficitAlert(e.target.value)}
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-800 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">
                Postpone Irrigation when Rain Probability Exceeds (%)
              </label>
              <input
                type="number"
                value={rainAlertThreshold}
                onChange={(e) => setRainAlertThreshold(e.target.value)}
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-800 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div>
          <button
            type="submit"
            className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-md transition-all hover:scale-105"
          >
            Save Farm Settings
          </button>
        </div>
      </form>
    </div>
  );
};
