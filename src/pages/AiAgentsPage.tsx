import React, { useState } from 'react';
import {
  Network,
  Cpu,
  BrainCircuit,
  Eye,
  Droplets,
  CloudSun,
  Bug,
  TrendingUp,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Zap,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { AgentInfo } from '../types';

interface AiAgentsPageProps {
  agents: AgentInfo[];
  onOpenDecisionCenter: () => void;
}

export const AiAgentsPage: React.FC<AiAgentsPageProps> = ({ agents, onOpenDecisionCenter }) => {
  const [syncing, setSyncing] = useState(false);
  const [synced, setSynced] = useState(true);

  const getAgentIcon = (id: string) => {
    switch (id) {
      case 'agent-vision':
        return Eye;
      case 'agent-soil':
      case 'agent-irrigation':
        return Droplets;
      case 'agent-weather':
        return CloudSun;
      case 'agent-pest':
        return Bug;
      case 'agent-market':
        return TrendingUp;
      case 'agent-decision':
      default:
        return BrainCircuit;
    }
  };

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setSynced(true);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/60 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-2">
            <Network className="w-3.5 h-3.5" />
            <span>Agentic AI Architecture • Autonomous Consensus</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Multi-Agent Intelligence Network</h2>
          <p className="text-emerald-100/80 text-xs sm:text-sm mt-1 max-w-xl">
            7 collaborative AI domain agents process vision, telemetry, meteorology, epidemiology, and mandis to synthesize explainable farm decisions.
          </p>
        </div>

        <button
          onClick={handleSync}
          disabled={syncing}
          className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-6 py-3.5 rounded-2xl shadow-xl transition-all self-start md:self-auto hover:scale-105"
        >
          <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
          <span>{syncing ? 'Synchronizing Agents...' : 'Run Consensus Engine'}</span>
        </button>
      </div>

      {/* Multi-Agent Collaboration Flowchart Diagram */}
      <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 text-white space-y-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <h3 className="font-bold text-base text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-emerald-400" />
              <span>Multi-Agent Information Hierarchy</span>
            </h3>
            <p className="text-xs text-slate-400">Autonomous data extraction → Domain processing → Consensus synthesis</p>
          </div>
          <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-1 rounded-full font-bold">
            Consensus Confidence: 91%
          </span>
        </div>

        {/* Visual Graph Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          {/* Stage 1: Domain Agents (5 parallel) */}
          <div className="space-y-2.5 md:col-span-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Domain Intelligence Agents (Parallel)
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 bg-slate-800/90 rounded-2xl border border-emerald-500/30 flex items-center gap-2 text-xs">
                <Eye className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-semibold text-slate-200">Crop Vision Agent</span>
              </div>
              <div className="p-3 bg-slate-800/90 rounded-2xl border border-sky-500/30 flex items-center gap-2 text-xs">
                <Droplets className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span className="font-semibold text-slate-200">Soil Agent</span>
              </div>
              <div className="p-3 bg-slate-800/90 rounded-2xl border border-amber-500/30 flex items-center gap-2 text-xs">
                <CloudSun className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <span className="font-semibold text-slate-200">Weather Agent</span>
              </div>
              <div className="p-3 bg-slate-800/90 rounded-2xl border border-rose-500/30 flex items-center gap-2 text-xs">
                <Bug className="w-4 h-4 text-rose-400 flex-shrink-0" />
                <span className="font-semibold text-slate-200">Pest & Disease Agent</span>
              </div>
            </div>
            <div className="p-3 bg-slate-800/90 rounded-2xl border border-teal-500/30 flex items-center gap-2 text-xs">
              <TrendingUp className="w-4 h-4 text-teal-400 flex-shrink-0" />
              <span className="font-semibold text-slate-200">Market Intelligence Agent (APMC Mandis)</span>
            </div>
          </div>

          {/* Arrow / Center Step */}
          <div className="flex flex-col items-center justify-center p-4 bg-emerald-950/70 border border-emerald-500/40 rounded-3xl text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-emerald-500/20">
              <BrainCircuit className="w-7 h-7" />
            </div>
            <h4 className="text-xs font-bold text-emerald-300">Decision Synthesizer Agent</h4>
            <p className="text-[10px] text-slate-300 leading-tight">Resolves conflicts & assigns factor weights</p>
          </div>

          {/* Stage 3: Explainable Farm Decision Output */}
          <div className="p-4 bg-gradient-to-br from-emerald-900 to-slate-900 border-2 border-emerald-400/50 rounded-3xl space-y-2">
            <span className="text-[10px] font-bold uppercase text-emerald-400 block">Synthesized Action</span>
            <h4 className="text-xs font-bold text-white leading-snug">
              Irrigate Field A tomorrow morning (6-8 AM) with 2,800L
            </h4>
            <p className="text-[10px] text-slate-300">Water stress prevented; 22% hydraulic savings achieved.</p>
            <button
              onClick={onOpenDecisionCenter}
              className="w-full mt-2 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[11px] rounded-xl transition-all"
            >
              Open Decision Center →
            </button>
          </div>
        </div>
      </div>

      {/* 7 Individual Agent Status Cards */}
      <div>
        <h3 className="text-base font-bold text-gray-900 mb-4">7 Autonomous Agent Profiles & Telemetry</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {agents.map((agent) => {
            const Icon = getAgentIcon(agent.id);
            return (
              <div
                key={agent.id}
                className="bg-white rounded-3xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-gray-900">{agent.name}</h4>
                        <span className="text-[10px] text-gray-400 font-mono">{agent.id}</span>
                      </div>
                    </div>

                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      {agent.status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed">{agent.role}</p>

                  <div className="mt-4 p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                    <div className="flex justify-between text-gray-500 text-[11px]">
                      <span>Key Metric:</span>
                      <strong className="text-gray-900">{agent.keyMetric}</strong>
                    </div>
                    <div className="flex justify-between text-gray-500 text-[11px]">
                      <span>Finding:</span>
                      <strong className="text-emerald-800">{agent.mainFinding}</strong>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-500">Confidence:</span>
                  <span className="font-black text-emerald-700">{agent.confidence}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
