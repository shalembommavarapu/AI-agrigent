import React from 'react';
import {
  Sprout,
  BrainCircuit,
  Eye,
  Droplets,
  CloudSun,
  Bug,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  Activity,
  Cpu,
  ChevronRight,
  Database,
  BarChart3
} from 'lucide-react';

interface LandingPageProps {
  onStartDemo: () => void;
  onExploreAi: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStartDemo, onExploreAi }) => {
  const steps = [
    { num: '01', title: 'Add Farm Data', desc: 'Connect IoT soil sensors, field dimensions, crop growth stage, and regional location.' },
    { num: '02', title: 'Analyze With AI Agents', desc: '7 specialized AI domain agents analyze micro-climate, vision imagery, pathology, and mandis.' },
    { num: '03', title: 'Generate Farm Decision', desc: 'Consensus engine synthesizes multi-factor data with transparent confidence ratings.' },
    { num: '04', title: 'Take Action', desc: 'Apply precise timing, hydraulic irrigation volumes, and organic IPM recommendations.' },
    { num: '05', title: 'Provide Feedback', desc: 'Log actual field outcomes to continuously fine-tune the multimodal neural models.' },
  ];

  const capabilities = [
    { icon: Eye, title: 'Crop Vision AI', desc: 'Multimodal Gemini vision analyzes crop leaf imagery for early blight, pest damage, and nutrient deficiency with cautious phrasing.' },
    { icon: Droplets, title: 'Soil Intelligence', desc: 'Real-time root zone moisture, NPK ratio balance, pH levels, and soil temperature depth profiling.' },
    { icon: CloudSun, title: 'Weather Intelligence', desc: 'Hyper-local micro-climate forecasts, evapotranspiration rates, and automated 48-hour rain advisories.' },
    { icon: Droplets, title: 'Irrigation Optimization', desc: 'Calculates exact hydraulic water volumes and dawn/dusk windows to save up to 26% farm water.' },
    { icon: Bug, title: 'Disease Detection', desc: 'Differentiates detected physical symptoms from predictive risk probabilities with preventive bio-remedies.' },
    { icon: ShieldCheck, title: 'Pest Risk Prediction', desc: 'Epidemiological vector modeling alerts farmers before devastating infestation waves take root.' },
    { icon: TrendingUp, title: 'Market Intelligence', desc: 'Live APMC Mandi wholesale spot rates across Indian hubs to optimize harvesting windows.' },
    { icon: BrainCircuit, title: 'Explainable AI (XAI)', desc: 'Transparent factor weighting reveals exactly WHY each decision is recommended without black-box opacity.' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Floating Bar */}
      <nav className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-500/20">
              <Sprout className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white flex items-center gap-2">
                AgriMind <span className="text-emerald-400 text-xs bg-emerald-950/90 border border-emerald-500/40 px-2 py-0.5 rounded-md">Agentic AI</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onExploreAi}
              className="text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-2 rounded-xl transition-colors hidden sm:block"
            >
              Multi-Agent Architecture
            </button>
            <button
              onClick={onStartDemo}
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-105"
            >
              <span>Demo Login</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold mb-6 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Hackathon Prototype • Multimodal Agriculture Decision Support</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-[1.15]">
            AI-Powered Decisions for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Smarter Farming</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Combine crop images, soil, weather, irrigation, disease risk and market intelligence to make smarter farm decisions.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onStartDemo}
              className="flex items-center gap-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-xl shadow-emerald-500/25 transition-all hover:scale-105"
            >
              <span>Start Farming Smarter</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onExploreAi}
              className="flex items-center gap-2 bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm px-6 py-3.5 rounded-2xl transition-all"
            >
              <BrainCircuit className="w-4 h-4 text-emerald-400" />
              <span>Explore AI Agents</span>
            </button>
          </div>

          {/* Interactive Agriculture Dashboard Preview Card */}
          <div className="mt-14 max-w-5xl mx-auto rounded-3xl p-1 bg-gradient-to-b from-emerald-500/30 via-slate-800 to-slate-900 shadow-2xl">
            <div className="bg-slate-900 rounded-[22px] p-4 sm:p-6 text-left border border-slate-800">
              {/* Preview Top bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-slate-400 font-mono text-[11px] ml-2">Green Valley Farm • Andhra Pradesh, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800 text-[11px] font-semibold">
                    7 Agents Consensus: 91%
                  </span>
                  <button
                    onClick={onStartDemo}
                    className="bg-emerald-500 text-slate-950 font-bold text-[11px] px-3 py-1 rounded-md hover:bg-emerald-400"
                  >
                    Open Live Dashboard →
                  </button>
                </div>
              </div>

              {/* Preview Dashboard Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {/* Hero AI Decision Box */}
                <div className="md:col-span-2 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <BrainCircuit className="w-4 h-4" /> 🤖 Today's AI Farm Decision
                    </span>
                    <span className="text-[10px] font-bold bg-rose-500 text-white px-2 py-0.5 rounded-full">
                      Priority: HIGH
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white leading-snug">
                    Irrigate Field A tomorrow morning (6:00 AM – 8:00 AM) with 2,800 Liters
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Based on root zone moisture depletion (41%), zero rain probability in next 48h, critical flowering stage, and +8.4% tomato price peak.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3 text-[11px]">
                    <span className="bg-slate-800/90 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700">
                      ✓ Soil Moisture: 41% (Approaching threshold)
                    </span>
                    <span className="bg-slate-800/90 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700">
                      ✓ Rain Chance: 12%
                    </span>
                    <span className="bg-slate-800/90 text-slate-300 px-2.5 py-1 rounded-lg border border-slate-700">
                      ✓ Market: ₹34/kg (+8.4%)
                    </span>
                  </div>
                </div>

                {/* Quick KPI Preview */}
                <div className="space-y-3">
                  <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">Crop Health Index</p>
                      <p className="text-lg font-bold text-emerald-400">92% <span className="text-xs font-normal text-slate-300">Healthy</span></p>
                    </div>
                    <Activity className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-slate-400">Next Irrigation</p>
                      <p className="text-lg font-bold text-sky-400">7 Hours <span className="text-xs font-normal text-slate-300">Drip</span></p>
                    </div>
                    <Droplets className="w-5 h-5 text-sky-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-slate-900/60 border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs uppercase font-bold tracking-widest text-emerald-400">5-Step Intelligence Loop</h2>
            <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">How AgriMind AI Works</p>
            <p className="text-slate-400 text-xs mt-2">
              From field image capture to validated farmer feedback, every step is transparent and explainable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-all group"
              >
                <div className="text-2xl font-black text-emerald-500/30 group-hover:text-emerald-400 transition-colors font-mono">
                  {step.num}
                </div>
                <h4 className="text-sm font-bold text-white mt-2">{step.title}</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Capabilities Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold mb-3">
              <Cpu className="w-3.5 h-3.5" />
              <span>Full Agricultural Intelligence Suite</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">AI Capabilities</h2>
            <p className="text-slate-400 text-sm mt-2">
              Designed for high-impact decision support across Indian cropping systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {capabilities.map((cap, idx) => {
              const Icon = cap.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/40 transition-all hover:-translate-y-1 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{cap.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{cap.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-14 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 border-t border-slate-800 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Ready to test the AgriMind Decision Agent?
          </h2>
          <p className="text-slate-300 text-sm mt-2 max-w-xl mx-auto">
            Experience the full live demo with preloaded farm telemetry from Green Valley Farm, Andhra Pradesh.
          </p>
          <button
            onClick={onStartDemo}
            className="mt-6 inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm px-8 py-3.5 rounded-2xl shadow-xl shadow-emerald-500/20 transition-all hover:scale-105"
          >
            <span>Launch Live Hackathon Demo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
