import React, { useState } from 'react';
import {
  Trees,
  Plus,
  MapPin,
  Maximize2,
  Calendar,
  Layers,
  Sparkles,
  Droplets,
  Bug,
  Activity,
  Trash2,
  CheckCircle2,
  X,
  FileCheck
} from 'lucide-react';
import { FarmInfo, FieldData } from '../types';
import { apiService } from '../services/api';

interface MyFarmPageProps {
  farm: FarmInfo;
  fields: FieldData[];
  onSelectField: (id: string) => void;
  onRefreshFields: () => void;
}

export const MyFarmPage: React.FC<MyFarmPageProps> = ({
  farm,
  fields,
  onSelectField,
  onRefreshFields
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFieldName, setNewFieldName] = useState('');
  const [newCrop, setNewCrop] = useState('Tomato');
  const [newVariety, setNewVariety] = useState('Hybrid Arka');
  const [newArea, setNewArea] = useState('2.0');
  const [newStage, setNewStage] = useState('Vegetative');
  const [loading, setLoading] = useState(false);

  const handleAddField = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFieldName.trim()) return;
    setLoading(true);
    try {
      await apiService.addField({
        name: newFieldName,
        crop: newCrop,
        cropVariety: newVariety,
        area: parseFloat(newArea) || 2.0,
        stage: newStage as any,
      });
      setShowAddModal(false);
      setNewFieldName('');
      onRefreshFields();
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteField = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to remove ${name}?`)) {
      await apiService.deleteField(id);
      onRefreshFields();
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Farm Profile Banner */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center flex-shrink-0">
              <Trees className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900">{farm.name}</h2>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  Verified Farm
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span>{farm.location}, {farm.state}, {farm.country}</span>
              </p>
              <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-600">
                <span>Farmer: <strong className="text-gray-900">{farm.farmerName}</strong></span>
                <span>Soil: <strong className="text-gray-900">{farm.soilType}</strong></span>
                <span>Irrigation: <strong className="text-gray-900">{farm.primaryIrrigation}</strong></span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-3 rounded-2xl shadow-md transition-all self-start md:self-auto hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Plot / Field</span>
          </button>
        </div>

        {/* Farm Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100 text-xs">
          <div className="bg-slate-50 p-3.5 rounded-2xl">
            <span className="text-gray-400 font-medium block text-[11px]">Total Land Area</span>
            <p className="text-xl font-bold text-gray-900 mt-0.5">{farm.totalArea} Acres</p>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl">
            <span className="text-gray-400 font-medium block text-[11px]">Active Fields</span>
            <p className="text-xl font-bold text-emerald-700 mt-0.5">{fields.length} Plots</p>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl">
            <span className="text-gray-400 font-medium block text-[11px]">Crops Cultivated</span>
            <p className="text-xl font-bold text-gray-900 mt-0.5">Tomato, Rice, Chili</p>
          </div>
          <div className="bg-slate-50 p-3.5 rounded-2xl">
            <span className="text-gray-400 font-medium block text-[11px]">Consensus AI Engine</span>
            <p className="text-xl font-bold text-teal-700 mt-0.5">7 Synced Agents</p>
          </div>
        </div>
      </div>

      {/* Fields Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-gray-900">Registered Farm Plots & Crops</h3>
          <span className="text-xs text-gray-500">{fields.length} active plots</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {fields.map((field) => (
            <div
              key={field.id}
              className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    {field.crop}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        field.health === 'Excellent'
                          ? 'bg-emerald-100 text-emerald-800'
                          : field.health === 'Good'
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {field.health} ({field.healthScore}%)
                    </span>
                    {fields.length > 1 && (
                      <button
                        onClick={() => handleDeleteField(field.id, field.name)}
                        className="text-gray-300 hover:text-rose-600 transition-colors p-1"
                        title="Delete field"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <h4 className="text-base font-bold text-gray-900">{field.name}</h4>
                <p className="text-xs text-gray-500 mt-0.5">{field.cropVariety}</p>

                {/* Details Matrix */}
                <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl">
                    <span className="text-gray-400 block text-[10px]">Area</span>
                    <strong className="text-gray-800">{field.area} Acres</strong>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl">
                    <span className="text-gray-400 block text-[10px]">Growth Stage</span>
                    <strong className="text-gray-800">{field.stage}</strong>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl">
                    <span className="text-gray-400 block text-[10px]">Soil Moisture</span>
                    <strong className="text-sky-700">{field.soilMoisture}%</strong>
                  </div>
                  <div className="bg-slate-50 p-2.5 rounded-xl">
                    <span className="text-gray-400 block text-[10px]">Target Yield</span>
                    <strong className="text-emerald-700">{field.targetYieldKg.toLocaleString()} kg</strong>
                  </div>
                </div>

                <div className="mt-3 text-[11px] text-gray-500 space-y-1">
                  <div className="flex justify-between">
                    <span>Sown Date:</span>
                    <span className="font-semibold text-gray-700">{field.sowingDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Expected Harvest:</span>
                    <span className="font-semibold text-gray-700">{field.expectedHarvest}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Irrigation:</span>
                    <span className="font-semibold text-gray-700">{field.lastIrrigated}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100">
                <button
                  onClick={() => onSelectField(field.id)}
                  className="w-full py-2 bg-slate-50 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 border border-slate-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Focus Decisions on this Plot</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Field Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-slate-50/70">
              <h3 className="font-bold text-gray-900 text-sm">Add New Farm Plot</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddField} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-800 mb-1">Plot Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Field D (West Orchard)"
                  value={newFieldName}
                  onChange={(e) => setNewFieldName(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-800 mb-1">Crop</label>
                  <select
                    value={newCrop}
                    onChange={(e) => setNewCrop(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 focus:outline-none"
                  >
                    <option value="Tomato">Tomato</option>
                    <option value="Rice">Rice</option>
                    <option value="Chili">Chili</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Maize">Maize</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-800 mb-1">Area (Acres)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newArea}
                    onChange={(e) => setNewArea(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-800 mb-1">Variety</label>
                  <input
                    type="text"
                    value={newVariety}
                    onChange={(e) => setNewVariety(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-800 mb-1">Stage</label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value)}
                    className="w-full text-xs bg-slate-50 border border-gray-200 rounded-xl px-3 py-2.5 text-gray-800 focus:outline-none"
                  >
                    <option value="Vegetative">Vegetative</option>
                    <option value="Flowering">Flowering</option>
                    <option value="Fruiting">Fruiting</option>
                    <option value="Ripening">Ripening</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                >
                  {loading ? 'Adding...' : 'Register Plot'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
