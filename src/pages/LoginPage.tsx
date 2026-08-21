import React, { useState } from 'react';
import { Sprout, User, Lock, ArrowRight, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { DEMO_FARM } from '../data/mockData';

interface LoginPageProps {
  onLogin: (user: { name: string; farm: string; location: string }) => void;
  onBackToLanding: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onBackToLanding }) => {
  const [email, setEmail] = useState('ravi.kumar@greenvalleyfarm.in');
  const [password, setPassword] = useState('agrimind2026');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin({
      name: DEMO_FARM.farmerName,
      farm: DEMO_FARM.name,
      location: `${DEMO_FARM.location}, ${DEMO_FARM.state}`
    });
  };

  const handleDemoAccess = () => {
    onLogin({
      name: DEMO_FARM.farmerName,
      farm: DEMO_FARM.name,
      location: `${DEMO_FARM.location}, ${DEMO_FARM.state}`
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Ambient background blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[550px] h-[300px] bg-emerald-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center gap-2 mb-6 text-xs text-slate-400 hover:text-emerald-400 transition-colors"
        >
          ← Back to Overview
        </button>

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black mx-auto shadow-xl shadow-emerald-500/20 mb-3">
          <Sprout className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          AgriMind <span className="text-emerald-400">AI</span>
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Precision Agriculture Decision-Support Platform
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* 1-Click Demo Farmer Banner */}
          <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-left space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> 1-Click Hackathon Access
              </span>
              <span className="text-[10px] bg-emerald-900 text-emerald-200 px-2 py-0.5 rounded-full font-mono">
                AP Farm
              </span>
            </div>
            <div className="text-xs text-slate-300">
              <p className="font-semibold text-white">Farmer: Ravi Kumar</p>
              <p className="text-[11px] text-slate-400">Farm: Green Valley Farm • 9.0 Acres</p>
              <p className="text-[11px] text-slate-400">Location: Andhra Pradesh, India</p>
            </div>
            <button
              type="button"
              onClick={handleDemoAccess}
              className="w-full mt-2 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <span>Continue as Demo Farmer</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-800 w-full" />
            <span className="bg-slate-900 px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Or Custom Sign In
            </span>
          </div>

          {/* Standard Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full text-xs bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-colors"
            >
              Login with Credentials
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800/80 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Multimodal Gemini 2.5 Flash API Integrated</span>
          </div>
        </div>
      </div>
    </div>
  );
};
