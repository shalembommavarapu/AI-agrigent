import React, { useState, useEffect } from 'react';
import {
  MessageSquareShare,
  ThumbsUp,
  ThumbsDown,
  CheckCircle2,
  Star,
  Sparkles,
  TrendingUp,
  RotateCcw,
  Activity,
  Layers
} from 'lucide-react';
import { FeedbackItem } from '../types';
import { apiService } from '../services/api';

export const FeedbackDashboardPage: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [stats, setStats] = useState({
    totalFeedback: 0,
    helpfulPercentage: 98,
    adoptionRate: 94,
    avgYieldImpact: 4.8
  });
  const [loading, setLoading] = useState(false);

  const fetchFeedback = async () => {
    setLoading(true);
    try {
      const res = await apiService.getFeedback();
      setFeedbacks(res.feedbacks);
      if (res.stats) setStats(res.stats);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-2">
            <MessageSquareShare className="w-3.5 h-3.5" />
            <span>Human-in-the-Loop Active Learning</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Farmer Feedback & Continuous Learning</h2>
          <p className="text-emerald-100/80 text-xs sm:text-sm mt-1 max-w-xl">
            Real field outcomes reported by farmers are ingested by the consensus engine to calibrate localized regional models.
          </p>
        </div>

        <button
          onClick={fetchFeedback}
          className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-5 py-3 rounded-2xl shadow-xl transition-all"
        >
          <RotateCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Logs</span>
        </button>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Farmer Helpful Rating</span>
          <p className="text-3xl font-black text-emerald-700">{stats.helpfulPercentage}%</p>
          <span className="text-xs text-gray-500 font-medium">Found suggestions actionable</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Adoption / Follow Rate</span>
          <p className="text-3xl font-black text-teal-700">{stats.adoptionRate}%</p>
          <span className="text-xs text-gray-500 font-medium">Prescriptions implemented</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Feedback Logs</span>
          <p className="text-3xl font-black text-gray-900">{feedbacks.length}</p>
          <span className="text-xs text-gray-500 font-medium">Verified farm records</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-1">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Yield Impact Score</span>
          <p className="text-3xl font-black text-purple-700">{stats.avgYieldImpact} / 5.0</p>
          <span className="text-xs text-gray-500 font-medium">Crop protection efficacy</span>
        </div>
      </div>

      {/* Feedback Logs Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-gray-900">Historical Farmer Feedback & Ground Truth Logs</h3>
          <span className="text-xs text-gray-500 font-medium">{feedbacks.length} recorded entries</span>
        </div>

        <div className="space-y-3">
          {feedbacks.map((fb) => (
            <div
              key={fb.id}
              className="p-4 rounded-2xl bg-slate-50 border border-gray-200/80 hover:border-emerald-300 transition-all space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-xs text-gray-900">{fb.fieldName}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-700 font-medium">{fb.actionTitle}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${
                      fb.helpful
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {fb.helpful ? <ThumbsUp className="w-3 h-3" /> : <ThumbsDown className="w-3 h-3" />}
                    <span>{fb.helpful ? 'Helpful' : 'Not Helpful'}</span>
                  </span>
                  <span className="text-[10px] bg-slate-200 text-slate-800 font-bold px-2 py-0.5 rounded-full">
                    Applied: {fb.followedStatus}
                  </span>
                  <span className="text-[10px] text-gray-400">{fb.submittedAt}</span>
                </div>
              </div>

              {fb.actualOutcome && (
                <p className="text-xs text-slate-700 bg-white p-3 rounded-xl border border-gray-200/60 leading-relaxed">
                  <strong className="text-emerald-800 font-semibold">Reported Ground Outcome:</strong> {fb.actualOutcome}
                </p>
              )}

              {fb.comments && fb.comments !== fb.actualOutcome && (
                <p className="text-[11px] text-gray-500 italic pl-1">"{fb.comments}"</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
