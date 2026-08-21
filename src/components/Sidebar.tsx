import React from 'react';
import {
  LayoutDashboard,
  Trees,
  Eye,
  Droplets,
  CloudSun,
  Bug,
  TrendingUp,
  BrainCircuit,
  Network,
  FileText,
  MessageSquareShare,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sprout,
  Menu,
  X
} from 'lucide-react';

export type PageId =
  | 'dashboard'
  | 'my-farm'
  | 'crop-vision'
  | 'soil-irrigation'
  | 'weather'
  | 'pest-disease'
  | 'market'
  | 'decision-center'
  | 'ai-agents'
  | 'reports'
  | 'feedback'
  | 'settings';

interface SidebarProps {
  activePage: PageId;
  onNavigate: (page: PageId) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  id: PageId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  highlight?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'decision-center', label: 'AI Decision Center', icon: BrainCircuit, badge: 'High Priority', highlight: true },
  { id: 'crop-vision', label: 'Crop Vision AI', icon: Eye },
  { id: 'soil-irrigation', label: 'Soil & Irrigation', icon: Droplets },
  { id: 'weather', label: 'Weather Intelligence', icon: CloudSun },
  { id: 'pest-disease', label: 'Pest & Disease', icon: Bug },
  { id: 'market', label: 'Market Intelligence', icon: TrendingUp, badge: '+8.4%' },
  { id: 'ai-agents', label: 'AI Agents Network', icon: Network },
  { id: 'my-farm', label: 'My Farm & Fields', icon: Trees },
  { id: 'reports', label: 'Farm Reports', icon: FileText },
  { id: 'feedback', label: 'Farmer Feedback', icon: MessageSquareShare },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onNavigate,
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile
}) => {
  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#1E3A2B] text-white border-r border-emerald-900 select-none">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-emerald-800/80">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#74C69D] rounded-xl flex items-center justify-center text-[#1B4332] shadow-sm flex-shrink-0">
            <Sprout className="w-6 h-6 text-[#1B4332]" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden transition-opacity duration-200">
              <h2 className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                AgriMind <span className="text-[#74C69D] font-extrabold text-xs bg-emerald-950/90 border border-emerald-700/60 px-1.5 py-0.5 rounded-md">AI</span>
              </h2>
              <p className="text-[11px] text-emerald-200/60 truncate">Autonomous Farming Agent</p>
            </div>
          )}
        </div>

        {/* Mobile close button */}
        <button
          onClick={onCloseMobile}
          className="lg:hidden p-1.5 text-emerald-300 hover:text-white rounded-lg hover:bg-[#2D6A4F]/40"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1.5 scrollbar-thin scrollbar-thumb-emerald-900">
        <div className="mb-2 px-3">
          {!collapsed && (
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400/60">
              Bento Farm Intelligence
            </p>
          )}
        </div>

        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                onCloseMobile();
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all relative group ${
                isActive
                  ? 'bg-[#2D6A4F] text-white font-semibold shadow-sm'
                  : item.highlight
                  ? 'text-emerald-200 bg-emerald-950/60 hover:bg-[#2D6A4F]/40 border border-emerald-700/40'
                  : 'text-emerald-100/70 hover:text-white hover:bg-[#2D6A4F]/30'
              }`}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={`w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-[#74C69D]' : item.highlight ? 'text-emerald-300' : 'text-emerald-300/70'
                }`}
              />

              {!collapsed && (
                <div className="flex items-center justify-between flex-1 overflow-hidden">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-emerald-800 text-emerald-100'
                          : item.highlight
                          ? 'bg-[#74C69D]/20 text-[#74C69D] border border-emerald-500/30'
                          : 'bg-emerald-950 text-emerald-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}

              {/* Tooltip on collapse */}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2.5 py-1 bg-[#14261C] border border-emerald-800 text-white text-xs font-semibold rounded-md shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                  {item.label}
                  {item.badge && ` (${item.badge})`}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Multi-Agent Quick Status Bento Pill */}
      {!collapsed && (
        <div className="mx-3.5 my-2 p-3.5 rounded-2xl bg-[#14261C] border border-emerald-800/60 text-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-bold text-emerald-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#74C69D] animate-pulse" />
              7 AI Agents Synced
            </span>
            <span className="text-[10px] text-emerald-400/70 font-mono">91% Conf</span>
          </div>
          <p className="text-[11px] text-emerald-200/70 leading-relaxed">
            Consensus ready: Morning irrigation for Field A.
          </p>
        </div>
      )}

      {/* User Profile & Collapse Toggle Footer */}
      <div className="p-3.5 bg-[#14261C] border-t border-emerald-900">
        {!collapsed && (
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-emerald-900/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-700 text-white text-xs font-bold flex items-center justify-center">
                RK
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-white truncate">Ravi Kumar</p>
                <p className="text-[10px] text-emerald-400 truncate">Green Valley Farm</p>
              </div>
            </div>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center gap-2 p-2 rounded-xl text-emerald-300/70 hover:text-white hover:bg-[#2D6A4F]/40 transition-colors text-xs font-medium"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span>Collapse Sidebar</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:block h-screen sticky top-0 transition-all duration-300 z-40 ${
          collapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="fixed inset-y-0 left-0 w-72 max-w-[85vw] shadow-2xl z-50">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
