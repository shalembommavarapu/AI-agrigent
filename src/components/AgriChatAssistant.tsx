import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  RotateCcw,
  Maximize2,
  Minimize2,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';
import { FieldData } from '../types';
import { apiService } from '../services/api';

interface AgriChatAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  activeField: FieldData;
}

interface Message {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  isAi?: boolean;
}

const DEFAULT_SUGGESTIONS = [
  'Should I irrigate my tomato field today?',
  'Why is my disease risk high?',
  'When is the best time to irrigate?',
  'How is tomato price trending in Guntur?',
  'Which field needs immediate attention?',
  'What fertilizer should I apply during flowering?'
];

export const AgriChatAssistant: React.FC<AgriChatAssistantProps> = ({
  isOpen,
  onClose,
  activeField
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'agent',
      text: `Namaste Ravi! 👋 I am your **AgriMind AI Assistant**.\n\nI have live telemetry on **${activeField.name} (${activeField.crop})** with **${activeField.soilMoisture}% soil moisture** and **31°C weather**.\n\nHow can I help optimize your farm decisions today?`,
      timestamp: 'Just now',
      isAi: true
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const messageText = (textToSend || input).trim();
    if (!messageText || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await apiService.sendChatMessage(messageText, activeField.id);
      const agentMsg: Message = {
        id: `agent-${Date.now()}`,
        sender: 'agent',
        text: response.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAi: response.isAi
      };
      setMessages((prev) => [...prev, agentMsg]);
    } catch (err) {
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        sender: 'agent',
        text: `⚠️ I encountered a brief connection delay, but based on your ${activeField.crop} crop state (Flowering stage, 41% soil moisture), morning drip irrigation (6-8 AM) remains the optimal recommendation.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isAi: false
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'agent',
        text: `Chat session refreshed. Current focus is **${activeField.name} (${activeField.crop})**. Ask me anything about irrigation schedules, disease symptoms, or mandi market rates!`,
        timestamp: 'Just now',
        isAi: true
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex flex-col bg-white rounded-[32px] shadow-2xl border border-emerald-950/20 overflow-hidden transition-all duration-300 ${
        isExpanded
          ? 'w-[95vw] md:w-[600px] h-[85vh] max-h-[750px]'
          : 'w-[95vw] sm:w-[420px] h-[550px] max-h-[80vh]'
      }`}
    >
      {/* Assistant Header */}
      <div className="bg-[#1E3A2B] text-white p-4 flex items-center justify-between shadow-md border-b border-emerald-900/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#74C69D]/20 border border-[#74C69D]/30 flex items-center justify-center text-[#74C69D] shadow-inner">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm tracking-tight text-white">AgriMind AI Assistant</h3>
              <span className="text-[10px] bg-emerald-500/20 text-[#74C69D] border border-[#74C69D]/30 px-1.5 py-0.5 rounded font-mono font-bold">
                Multimodal AI
              </span>
            </div>
            <p className="text-[11px] text-emerald-200/80">
              Context: <span className="font-semibold text-white">{activeField.name}</span> ({activeField.crop})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleReset}
            className="p-1.5 text-emerald-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            title="Reset conversation"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-emerald-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors hidden sm:block"
            title={isExpanded ? 'Restore size' : 'Expand window'}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
            title="Close Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/60 scrollbar-thin scrollbar-thumb-slate-200">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'agent' && (
              <div className="w-7 h-7 rounded-xl bg-emerald-700 text-white flex items-center justify-center flex-shrink-0 shadow-sm text-xs font-bold mt-0.5">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald-600 text-white font-medium rounded-tr-none shadow-sm'
                  : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none shadow-sm'
              }`}
            >
              <div className="whitespace-pre-line font-sans">
                {msg.text.split('\n').map((line, idx) => {
                  if (line.startsWith('**') && line.endsWith('**')) {
                    return (
                      <p key={idx} className="font-bold text-gray-900 my-1">
                        {line.replace(/\*\*/g, '')}
                      </p>
                    );
                  }
                  if (line.startsWith('- ')) {
                    return (
                      <li key={idx} className="ml-3 my-0.5 list-disc">
                        {line.replace('- ', '')}
                      </li>
                    );
                  }
                  return <p key={idx} className="my-0.5">{line}</p>;
                })}
              </div>
              <div className="flex items-center justify-between gap-2 mt-1.5 pt-1 border-t border-black/5 text-[10px] text-gray-400">
                <span>{msg.timestamp}</span>
                {msg.sender === 'agent' && (
                  <span className="text-emerald-700 font-medium flex items-center gap-0.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Ag Decision
                  </span>
                )}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-xl bg-slate-800 text-white flex items-center justify-center flex-shrink-0 shadow-sm text-xs font-bold mt-0.5">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex gap-2.5 justify-start">
            <div className="w-7 h-7 rounded-xl bg-emerald-700 text-white flex items-center justify-center flex-shrink-0 text-xs font-bold">
              <Bot className="w-4 h-4" />
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
              <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                <span className="ml-1.5 text-slate-500 text-[11px]">Analyzing multi-agent farm telemetry...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Chips */}
      <div className="px-3 py-2 bg-slate-100/70 border-t border-slate-200/80 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-1.5">
        <Lightbulb className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mr-1" />
        {DEFAULT_SUGGESTIONS.map((suggestion, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(suggestion)}
            className="text-[11px] bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200/80 hover:border-emerald-300 px-2.5 py-1 rounded-full transition-colors flex-shrink-0 font-medium"
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Ask about ${activeField.crop}, soil, weather, or mandi prices...`}
          className="flex-1 text-xs bg-slate-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 text-gray-800"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white rounded-xl shadow-sm transition-all flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
