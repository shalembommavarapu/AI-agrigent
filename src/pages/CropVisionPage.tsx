import React, { useState, useRef } from 'react';
import {
  Eye,
  Upload,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  Leaf,
  ShieldCheck,
  Zap,
  RotateCcw,
  Image as ImageIcon,
  MessageSquare,
  Send,
  Bot
} from 'lucide-react';
import { FieldData, VisionAnalysisResult } from '../types';
import { SAMPLE_CROP_IMAGES } from '../data/mockData';
import { apiService } from '../services/api';

interface CropVisionPageProps {
  fields: FieldData[];
  selectedField: FieldData;
}

export const CropVisionPage: React.FC<CropVisionPageProps> = ({ fields, selectedField }) => {
  const [selectedCrop, setSelectedCrop] = useState(selectedField.crop);
  const [growthStage, setGrowthStage] = useState(selectedField.stage);
  const [activeFieldId, setActiveFieldId] = useState(selectedField.id);
  const [previewImage, setPreviewImage] = useState<string>(SAMPLE_CROP_IMAGES[0].thumbnail);
  const [selectedSampleId, setSelectedSampleId] = useState<string>(SAMPLE_CROP_IMAGES[0].id);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<VisionAnalysisResult | null>(
    SAMPLE_CROP_IMAGES[0].expectedResult
  );
  const [customImageBase64, setCustomImageBase64] = useState<string | null>(null);

  // Mini-chat for this image
  const [miniChatOpen, setMiniChatOpen] = useState(false);
  const [miniMessages, setMiniMessages] = useState<Array<{ sender: 'user' | 'agent'; text: string }>>([
    {
      sender: 'agent',
      text: 'Ask me anything specifically about this crop image diagnosis, organic fungicides, or dosage intervals.'
    }
  ]);
  const [miniInput, setMiniInput] = useState('');
  const [miniLoading, setMiniLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPreviewImage(base64);
        setCustomImageBase64(base64);
        setSelectedSampleId('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSample = (sample: typeof SAMPLE_CROP_IMAGES[0]) => {
    setSelectedSampleId(sample.id);
    setPreviewImage(sample.thumbnail);
    setSelectedCrop(sample.crop);
    setCustomImageBase64(null);
    setAnalysisResult(sample.expectedResult);
  };

  const handleRunAnalysis = async () => {
    setLoading(true);
    try {
      const result = await apiService.analyzeCrop({
        imageBase64: customImageBase64 || previewImage,
        crop: selectedCrop,
        fieldId: activeFieldId,
        growthStage: growthStage
      });
      setAnalysisResult(result);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMiniChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!miniInput.trim() || miniLoading) return;
    const text = miniInput;
    setMiniMessages((prev) => [...prev, { sender: 'user', text }]);
    setMiniInput('');
    setMiniLoading(true);

    try {
      const prompt = `Crop Image Diagnostic Query: The diagnosed condition is ${
        analysisResult?.identifiedCondition || 'Early Blight'
      } on ${selectedCrop} at ${growthStage} stage. Question: ${text}`;
      const res = await apiService.sendChatMessage(prompt, activeFieldId);
      setMiniMessages((prev) => [...prev, { sender: 'agent', text: res.reply }]);
    } catch {
      setMiniMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: `For ${selectedCrop} management against ${analysisResult?.identifiedCondition}, apply organic neem oil (10,000 ppm) or Trichoderma viride bio-fungicide in early morning hours.`
        }
      ]);
    } finally {
      setMiniLoading(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/70 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Google Gemini Multimodal Vision AI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Crop Vision AI Analyzer</h2>
          <p className="text-emerald-100/80 text-xs sm:text-sm mt-1 max-w-xl">
            Upload leaf or crop imagery to diagnose fungal blight, pests, chlorosis, and nutritional stress with cautious, explainable guidance.
          </p>
        </div>

        <button
          onClick={handleRunAnalysis}
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-extrabold text-xs px-6 py-3.5 rounded-2xl shadow-xl transition-all self-start md:self-auto hover:scale-105"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
              <span>Analyzing Leaf Pixels...</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              <span>Run Multimodal Analysis</span>
            </>
          )}
        </button>
      </div>

      {/* Main Grid: Upload & Controls + Diagnostic Report */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Image Controls & Gallery (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Image Upload / Drop Box */}
          <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm space-y-4">
            <h3 className="font-bold text-sm text-gray-900 flex items-center justify-between">
              <span>Target Crop Image</span>
              <span className="text-[11px] text-gray-500 font-normal">PNG, JPG, WebP</span>
            </h3>

            {/* Preview Box */}
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center group shadow-inner">
              <img
                src={previewImage}
                alt="Crop preview"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                <span className="font-semibold bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10">
                  {selectedCrop} • {growthStage}
                </span>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-lg text-xs font-bold shadow transition-colors flex items-center gap-1"
                >
                  <Upload className="w-3 h-3" /> Change Image
                </button>
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />

            {/* Parameter Selectors */}
            <div className="grid grid-cols-2 gap-3 text-xs pt-1">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Crop Type</label>
                <select
                  value={selectedCrop}
                  onChange={(e) => setSelectedCrop(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800 focus:outline-none"
                >
                  <option value="Tomato">Tomato</option>
                  <option value="Rice">Rice</option>
                  <option value="Chili">Chili</option>
                  <option value="Cotton">Cotton</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Growth Stage</label>
                <select
                  value={growthStage}
                  onChange={(e) => setGrowthStage(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-800 focus:outline-none"
                >
                  <option value="Seedling">Seedling</option>
                  <option value="Vegetative">Vegetative</option>
                  <option value="Flowering">Flowering</option>
                  <option value="Fruiting">Fruiting</option>
                  <option value="Ripening">Ripening</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Demo Sample Images */}
          <div className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500">
              1-Click Hackathon Sample Presets
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              {SAMPLE_CROP_IMAGES.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className={`p-2.5 rounded-2xl border text-left transition-all flex items-center gap-2.5 ${
                    selectedSampleId === sample.id
                      ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-400/30'
                      : 'bg-slate-50 border-gray-200 hover:bg-slate-100'
                  }`}
                >
                  <img
                    src={sample.thumbnail}
                    alt={sample.title}
                    className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-gray-900 truncate">{sample.title}</p>
                    <p className="text-[10px] text-gray-500">{sample.crop} • {sample.stage}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: AI Diagnostic Report (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          {analysisResult ? (
            <div className="bg-white rounded-3xl border-2 border-emerald-500/30 p-6 sm:p-8 shadow-lg space-y-6">
              {/* Header Status */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-gray-100">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    Multimodal Vision Analysis
                  </span>
                  <h3 className="text-xl font-extrabold text-gray-900 mt-1">
                    {analysisResult.identifiedCondition}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 block font-semibold">AI Confidence</span>
                    <span className="text-base font-black text-emerald-700">{analysisResult.confidence}%</span>
                  </div>
                  <div className="text-right ml-3 pl-3 border-l border-gray-200">
                    <span className="text-[10px] text-gray-400 block font-semibold">Severity</span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        analysisResult.severity === 'Severe'
                          ? 'bg-rose-100 text-rose-800'
                          : analysisResult.severity === 'Moderate'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {analysisResult.severity}
                    </span>
                  </div>
                </div>
              </div>

              {/* Symptoms & Possible Causes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70">
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Visible Symptoms</span>
                  </h4>
                  <ul className="space-y-1 text-xs text-amber-950">
                    {analysisResult.visibleSymptoms.map((sym, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-amber-600 mt-1.5 flex-shrink-0" />
                        <span>{sym}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Possible Environmental Causes</span>
                  </h4>
                  <ul className="space-y-1 text-xs text-gray-700">
                    {analysisResult.possibleCauses.map((cause, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
                        <span>{cause}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Dual Management: Organic & Safe Chemical Remedies */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Organic Remedies */}
                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                  <h4 className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Organic & Bio-Control</span>
                  </h4>
                  <ul className="space-y-1 text-xs text-emerald-950">
                    {analysisResult.organicRemedies.map((org, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-emerald-600 mt-1.5 flex-shrink-0" />
                        <span>{org}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Safe Chemical / Synthetic */}
                <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200">
                  <h4 className="text-xs font-bold text-sky-900 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <Zap className="w-3.5 h-3.5 text-sky-700" />
                    <span>Chemical & Safe Dosage</span>
                  </h4>
                  <ul className="space-y-1 text-xs text-sky-950">
                    {analysisResult.chemicalRemedies.map((chem, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-sky-600 mt-1.5 flex-shrink-0" />
                        <span>{chem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Agronomist AI Notes (Cautious phrasing) */}
              <div className="p-4 rounded-2xl bg-slate-900 text-slate-200 text-xs space-y-2">
                <div className="flex items-center justify-between text-emerald-400 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Bot className="w-4 h-4" /> AI Pathology Notes & Guidance
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">Gemini 2.5 Flash</span>
                </div>
                <p className="text-slate-300 leading-relaxed">{analysisResult.aiNotes}</p>
              </div>

              {/* Mini-Chat Toggle */}
              <div className="pt-2">
                <button
                  onClick={() => setMiniChatOpen(!miniChatOpen)}
                  className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-2xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{miniChatOpen ? 'Hide Image Q&A' : 'Ask AI Questions About This Diagnosis'}</span>
                </button>
              </div>

              {/* Embedded Mini-Chat */}
              {miniChatOpen && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-gray-200 space-y-3 animate-in fade-in">
                  <div className="max-h-48 overflow-y-auto space-y-2 text-xs">
                    {miniMessages.map((m, idx) => (
                      <div
                        key={idx}
                        className={`p-2.5 rounded-xl ${
                          m.sender === 'user'
                            ? 'bg-emerald-600 text-white ml-6'
                            : 'bg-white text-gray-800 border border-gray-200 mr-6'
                        }`}
                      >
                        {m.text}
                      </div>
                    ))}
                    {miniLoading && (
                      <p className="text-xs text-gray-500 italic">Formulating pathology response...</p>
                    )}
                  </div>

                  <form onSubmit={handleSendMiniChat} className="flex gap-2">
                    <input
                      type="text"
                      value={miniInput}
                      onChange={(e) => setMiniInput(e.target.value)}
                      placeholder="e.g. Can I mix neem oil with sulfur spray?"
                      className="flex-1 text-xs bg-white border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <button
                      type="submit"
                      disabled={miniLoading}
                      className="p-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center text-gray-400 space-y-3">
              <Eye className="w-12 h-12 text-gray-300 mx-auto" />
              <p className="text-sm font-semibold text-gray-600">No Image Analysis Executed Yet</p>
              <p className="text-xs text-gray-400">Click "Run Multimodal Analysis" above to generate a full pathology report.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
