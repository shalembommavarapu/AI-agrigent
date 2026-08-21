import React from 'react';
import { X, AlertCircle, Bell, AlertTriangle, Info, CloudRain, Check, ArrowRight } from 'lucide-react';
import { NotificationItem } from '../types';
import { PageId } from './Sidebar';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkRead: (id: string) => void;
  onNavigate: (page: PageId) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkRead,
  onNavigate
}) => {
  if (!isOpen) return null;

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'High':
        return <AlertCircle className="w-5 h-5 text-rose-600" />;
      case 'Medium':
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case 'Weather':
        return <CloudRain className="w-5 h-5 text-sky-600" />;
      case 'Info':
      default:
        return <Info className="w-5 h-5 text-emerald-600" />;
    }
  };

  const getBg = (type: NotificationItem['type']) => {
    switch (type) {
      case 'High':
        return 'bg-rose-50 border-rose-200';
      case 'Medium':
        return 'bg-amber-50 border-amber-200';
      case 'Weather':
        return 'bg-sky-50 border-sky-200';
      case 'Info':
      default:
        return 'bg-emerald-50 border-emerald-200';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">Farm Intelligence Alerts</h3>
              <p className="text-xs text-gray-500">Real-time alerts from 7 automated monitoring agents</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-400 text-sm">No new notifications.</div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all ${getBg(item.type)} ${
                  item.read ? 'opacity-70' : 'shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex-shrink-0">{getIcon(item.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="font-bold text-xs text-gray-900">{item.title}</h4>
                      <span className="text-[10px] text-gray-500">{item.timestamp}</span>
                    </div>
                    <p className="text-xs text-gray-700 mt-1 leading-relaxed">{item.message}</p>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-black/5">
                      {item.linkPage ? (
                        <button
                          onClick={() => {
                            onNavigate(item.linkPage as PageId);
                            onMarkRead(item.id);
                            onClose();
                          }}
                          className="text-[11px] font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1"
                        >
                          <span>Open Module</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ) : (
                        <div />
                      )}

                      {!item.read && (
                        <button
                          onClick={() => onMarkRead(item.id)}
                          className="text-[11px] font-medium text-gray-500 hover:text-gray-900 flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" /> Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
          <span>Active Farm: Green Valley Farm (AP)</span>
          <button
            onClick={() => {
              notifications.forEach((n) => onMarkRead(n.id));
            }}
            className="font-medium text-emerald-700 hover:text-emerald-800"
          >
            Mark all as read
          </button>
        </div>
      </div>
    </div>
  );
};
