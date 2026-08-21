import React, { useState } from 'react';
import {
  FileText,
  Download,
  Printer,
  Sparkles,
  Calendar,
  Layers,
  CheckCircle2,
  TrendingUp,
  Droplets,
  Eye,
  X
} from 'lucide-react';
import { FarmReport } from '../types';
import { apiService } from '../services/api';

interface ReportsPageProps {
  reports: FarmReport[];
  onRefreshReports: () => void;
}

export const ReportsPage: React.FC<ReportsPageProps> = ({ reports, onRefreshReports }) => {
  const [selectedReport, setSelectedReport] = useState<FarmReport | null>(null);
  const [generating, setGenerating] = useState(false);

  const handleGenerateNew = async (type: string) => {
    setGenerating(true);
    try {
      const newRep = await apiService.generateReport(type);
      onRefreshReports();
      setSelectedReport(newRep);
    } finally {
      setGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-2">
            <FileText className="w-3.5 h-3.5" />
            <span>Farm Intelligence Audits & Diagnostics</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Agricultural Reports</h2>
          <p className="text-emerald-100/80 text-xs sm:text-sm mt-1 max-w-xl">
            Automated PDF-ready agronomic reports synthesized across crop health, soil hydration, epidemiology, and mandi trade realization.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleGenerateNew('Weekly Farm Report')}
            disabled={generating}
            className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-5 py-3 rounded-2xl shadow-xl transition-all"
          >
            <Sparkles className="w-4 h-4" />
            <span>{generating ? 'Generating...' : 'Generate Live Audit'}</span>
          </button>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  {report.type}
                </span>
                <span className="text-xs text-gray-400 font-medium">{report.generatedDate}</span>
              </div>

              <h4 className="text-base font-bold text-gray-900 leading-snug">{report.title}</h4>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">{report.summary}</p>

              {/* Key Metrics Strip */}
              <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                {report.keyMetrics.map((km, idx) => (
                  <div key={idx} className="bg-slate-50 p-2.5 rounded-2xl border border-gray-100">
                    <span className="text-[10px] text-gray-400 block font-medium">{km.label}</span>
                    <div className="flex items-baseline justify-between mt-0.5">
                      <strong className="text-gray-900 text-sm">{km.value}</strong>
                      <span className="text-[10px] font-bold text-emerald-700">{km.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-gray-100 flex items-center gap-2">
              <button
                onClick={() => setSelectedReport(report)}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-emerald-50 text-slate-800 hover:text-emerald-800 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Full Audit</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Report Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-700" />
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">{selectedReport.title}</h3>
                  <p className="text-[11px] text-gray-500">{selectedReport.period} • Green Valley Farm (AP)</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-1.5 text-gray-400 hover:text-gray-700 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-xs text-gray-700 leading-relaxed">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <h4 className="font-bold text-emerald-950 uppercase text-[10px] tracking-wider mb-1">
                  Executive AI Agronomist Synthesis
                </h4>
                <p className="text-xs text-emerald-950 leading-relaxed">{selectedReport.summary}</p>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-3">
                  Key Agronomic Metrics & KPIs
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {selectedReport.keyMetrics.map((km, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-gray-200/80">
                      <span className="text-gray-400 block text-[10px]">{km.label}</span>
                      <p className="text-lg font-black text-gray-900 mt-1">{km.value}</p>
                      <span className="text-[10px] font-bold text-emerald-700">{km.trend} vs baseline</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider mb-2">
                  Farm Status Certification
                </h4>
                <div className="p-4 bg-slate-50 rounded-2xl border border-gray-200/80 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>All 7 AI domain monitoring agents operating within nominal tolerances.</span>
                  </div>
                  <p className="text-[11px] text-gray-500">
                    Document generated via AgriMind Precision Decision Support Framework. Validated for Guntur agro-climatic zone.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-gray-100 flex items-center justify-between">
              <span className="text-xs text-gray-500 font-medium">Status: {selectedReport.status}</span>
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
