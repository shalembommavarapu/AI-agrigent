import React, { useState } from 'react';
import {
  Bell,
  Search,
  CloudSun,
  Sparkles,
  User,
  ChevronDown,
  LogOut,
  Layers,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { FarmInfo, FieldData, NotificationItem } from '../types';

interface NavbarProps {
  farm: FarmInfo;
  fields: FieldData[];
  selectedFieldId: string;
  onSelectField: (id: string) => void;
  notifications: NotificationItem[];
  onOpenNotifications: () => void;
  onOpenAssistant: () => void;
  onLogout: () => void;
  activePageTitle: string;
  isAiConnected: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  farm,
  fields,
  selectedFieldId,
  onSelectField,
  notifications,
  onOpenNotifications,
  onOpenAssistant,
  onLogout,
  activePageTitle,
  isAiConnected
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;
  const currentField = fields.find(f => f.id === selectedFieldId) || fields[0];

  return (
    <header className="sticky top-0 z-30 bg-[#F8FAF7]/90 backdrop-blur-md border-b border-emerald-900/10 px-4 lg:px-8 py-3.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Page Title & Breadcrumb */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-800/60 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              {farm.name} • {farm.state}
            </span>
            <h1 className="text-xl font-black text-[#1B4332] tracking-tight mt-1">
              {activePageTitle}
            </h1>
          </div>
        </div>

        {/* Center: Field Selector */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center bg-white border border-emerald-100 rounded-2xl px-3.5 py-1.5 shadow-sm transition-all hover:border-emerald-300">
            <Layers className="w-4 h-4 text-emerald-700 mr-2 flex-shrink-0" />
            <span className="text-xs font-bold text-emerald-800/50 uppercase tracking-wider mr-2 hidden md:inline">Plot:</span>
            <select
              value={selectedFieldId}
              onChange={(e) => onSelectField(e.target.value)}
              className="text-xs sm:text-sm font-bold text-[#1B4332] bg-transparent focus:outline-none cursor-pointer pr-3"
            >
              {fields.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name} ({f.crop})
                </option>
              ))}
            </select>
          </div>

          {/* Quick Weather pill */}
          <div className="hidden lg:flex items-center gap-2 bg-white border border-emerald-100 rounded-2xl px-3.5 py-2 text-xs text-[#1B4332] shadow-sm">
            <CloudSun className="w-4 h-4 text-amber-500" />
            <span className="font-bold">31°C</span>
            <span className="text-emerald-700/60 font-medium">Partly Sunny</span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* AI Status Badge */}
          <div
            className={`hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full border shadow-sm ${
              isAiConnected
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200'
            }`}
            title="Google Gemini AI Decision Engine Ready"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Gemini AI Ready</span>
          </div>

          {/* AI Assistant Quick Button */}
          <button
            onClick={onOpenAssistant}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3.5 py-2 rounded-2xl shadow-sm hover:shadow-md shadow-emerald-200 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden md:inline">AgriMind AI</span>
          </button>

          {/* Notification Button */}
          <button
            onClick={onOpenNotifications}
            className="relative w-10 h-10 bg-white rounded-2xl shadow-sm border border-emerald-100 text-emerald-900 hover:bg-emerald-50 flex items-center justify-center transition-all"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-emerald-900" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1.5 pl-2 rounded-2xl bg-white border border-emerald-100 shadow-sm hover:border-emerald-200 transition-all text-left"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center shadow-inner">
                RK
              </div>
              <div className="hidden xl:block">
                <p className="text-xs font-bold text-[#1B4332] leading-tight">{farm.farmerName}</p>
                <p className="text-[10px] text-emerald-700/60">{farm.location}</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-emerald-700/40 mr-1" />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-3xl shadow-xl border border-emerald-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-4 py-3 border-b border-emerald-50">
                  <p className="text-sm font-bold text-[#1B4332]">{farm.farmerName}</p>
                  <p className="text-xs text-gray-500">{farm.name}</p>
                  <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">{farm.location}, {farm.state}</p>
                </div>
                <div className="py-1.5 text-xs text-gray-700">
                  <div className="px-4 py-2 flex justify-between items-center text-gray-600">
                    <span className="text-emerald-800/60 font-medium">Total Farm Area</span>
                    <span className="font-bold text-[#1B4332]">{farm.totalArea} Acres</span>
                  </div>
                  <div className="px-4 py-2 flex justify-between items-center text-gray-600">
                    <span className="text-emerald-800/60 font-medium">Active Fields</span>
                    <span className="font-bold text-[#1B4332]">{fields.length} Plots</span>
                  </div>
                </div>
                <div className="border-t border-emerald-50 pt-1">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onLogout();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-2xl flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Switch / Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
