import React from 'react';
import {
  CloudSun,
  Droplets,
  Wind,
  Sun,
  CloudRain,
  AlertTriangle,
  Compass,
  Thermometer,
  ShieldAlert,
  Sparkles,
  Calendar,
  Layers
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { WeatherCondition } from '../types';

interface WeatherPageProps {
  weather: WeatherCondition;
}

export const WeatherPage: React.FC<WeatherPageProps> = ({ weather }) => {
  return (
    <div className="space-y-6 pb-12">
      {/* Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-2">
            <CloudSun className="w-3.5 h-3.5" />
            <span>Agro-Meteorological Forecast • Guntur District, AP</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Weather Intelligence</h2>
          <p className="text-amber-100/80 text-xs sm:text-sm mt-1 max-w-xl">
            Hyper-local micro-climate forecasts, evapotranspiration rates, and predictive rain radar calibrated for crop canopy protection.
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 flex items-center gap-4 text-center">
          <div>
            <span className="text-[10px] uppercase text-slate-400 block font-bold">Current</span>
            <span className="text-3xl font-black text-amber-400">{weather.currentTemp}°C</span>
          </div>
          <div className="border-l border-slate-700 pl-4 text-left">
            <p className="text-xs font-bold text-white">{weather.condition}</p>
            <p className="text-[11px] text-slate-300">Humidity: {weather.humidity}%</p>
            <p className="text-[11px] text-sky-400 font-semibold">Rain: {weather.rainProbability}%</p>
          </div>
        </div>
      </div>

      {/* Active Meteorological Alerts */}
      {weather.alerts && weather.alerts.length > 0 && (
        <div className="space-y-3">
          {weather.alerts.map((alert) => (
            <div
              key={alert.id}
              className="p-4 rounded-3xl bg-amber-50 border border-amber-200 shadow-sm flex items-start gap-3.5"
            >
              <div className="w-9 h-9 rounded-2xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-amber-950">{alert.title}</h4>
                  <span className="text-[10px] font-bold uppercase bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-full">
                    {alert.severity} Advisory
                  </span>
                </div>
                <p className="text-xs text-amber-900/90 mt-1 leading-relaxed">{alert.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 6 Key Weather Gauges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-[11px] font-bold text-gray-500 block uppercase">Temperature</span>
          <p className="text-2xl font-black text-amber-600 mt-1">{weather.currentTemp}°C</p>
          <span className="text-[10px] text-gray-500">Feels like 34°C</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-[11px] font-bold text-gray-500 block uppercase">Humidity</span>
          <p className="text-2xl font-black text-sky-600 mt-1">{weather.humidity}%</p>
          <span className="text-[10px] text-sky-700 font-medium">High Canopy RH</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-[11px] font-bold text-gray-500 block uppercase">Rain Chance</span>
          <p className="text-2xl font-black text-emerald-600 mt-1">{weather.rainProbability}%</p>
          <span className="text-[10px] text-emerald-700 font-medium">Dry Window Next 48h</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-[11px] font-bold text-gray-500 block uppercase">Wind Speed</span>
          <p className="text-2xl font-black text-gray-900 mt-1">{weather.windSpeedKmH} km/h</p>
          <span className="text-[10px] text-gray-500">Direction: {weather.windDirection}</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-[11px] font-bold text-gray-500 block uppercase">UV Index</span>
          <p className="text-2xl font-black text-purple-600 mt-1">{weather.uvIndex} / 10</p>
          <span className="text-[10px] text-purple-700 font-medium">Moderate Radiation</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-[11px] font-bold text-gray-500 block uppercase">Evaporation ET0</span>
          <p className="text-2xl font-black text-teal-700 mt-1">{weather.evapotranspiration} mm</p>
          <span className="text-[10px] text-teal-700 font-medium">Per day water loss</span>
        </div>
      </div>

      {/* 7-Day Forecast Chart */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-sm text-gray-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-600" />
              <span>7-Day Agro-Weather Forecast (Guntur Station)</span>
            </h3>
            <p className="text-xs text-gray-500">Daytime max/min temperatures and rain precipitation probability</p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="flex items-center gap-1 text-amber-600 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Max Temp °C
            </span>
            <span className="flex items-center gap-1 text-sky-600 font-medium">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> Rain Probability %
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weather.forecast7Day} margin={{ top: 15, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTempMax" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#0284c7" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#64748b' }} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                  border: 'none'
                }}
              />
              <Area type="monotone" dataKey="maxTemp" stroke="#f59e0b" strokeWidth={2.5} fillOpacity={1} fill="url(#colorTempMax)" name="Max Temp °C" />
              <Area type="monotone" dataKey="rainChance" stroke="#0284c7" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRain)" name="Rain Prob %" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 7-Day Day Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {weather.forecast7Day.map((item, idx) => (
          <div
            key={idx}
            className={`p-3.5 rounded-2xl border text-center transition-all ${
              idx === 0
                ? 'bg-emerald-50/70 border-emerald-300 shadow-sm'
                : 'bg-white border-gray-100 hover:bg-slate-50'
            }`}
          >
            <span className="text-[11px] font-bold text-gray-700 block">{item.day}</span>
            <span className="text-lg font-black text-gray-900 block mt-1">{item.maxTemp}°C</span>
            <span className="text-[10px] text-gray-500">Min: {item.minTemp}°C</span>
            <div className="mt-2 pt-2 border-t border-gray-100 text-[10px] font-semibold text-sky-700 flex items-center justify-center gap-1">
              <CloudRain className="w-3 h-3 text-sky-500" />
              <span>{item.rainChance}% Rain</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
