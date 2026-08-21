import React, { useState, useEffect } from 'react';
import { PageId, Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { AgriChatAssistant } from './components/AgriChatAssistant';
import { NotificationModal } from './components/NotificationModal';
import { FeedbackModal } from './components/FeedbackModal';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { MyFarmPage } from './pages/MyFarmPage';
import { CropVisionPage } from './pages/CropVisionPage';
import { SoilIrrigationPage } from './pages/SoilIrrigationPage';
import { WeatherPage } from './pages/WeatherPage';
import { PestDiseasePage } from './pages/PestDiseasePage';
import { MarketPage } from './pages/MarketPage';
import { AiAgentsPage } from './pages/AiAgentsPage';
import { DecisionCenterPage } from './pages/DecisionCenterPage';
import { ReportsPage } from './pages/ReportsPage';
import { FeedbackDashboardPage } from './pages/FeedbackDashboardPage';
import { SettingsPage } from './pages/SettingsPage';

import {
  FarmInfo,
  FieldData,
  SoilMetrics,
  IrrigationRecommendation,
  WeatherCondition,
  DiseaseRiskData,
  MarketData,
  AgentInfo,
  FarmDecision,
  NotificationItem,
  FarmReport,
  FeedbackItem
} from './types';
import {
  DEMO_FARM,
  INITIAL_FIELDS,
  MOCK_SOIL_DATA,
  MOCK_IRRIGATION_RECOMMENDATIONS,
  MOCK_WEATHER,
  MOCK_DISEASE_DATA,
  MOCK_MARKETS,
  MOCK_AGENTS,
  MOCK_DECISIONS,
  MOCK_NOTIFICATIONS,
  MOCK_REPORTS
} from './data/mockData';
import { apiService } from './services/api';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  // App view level: 'landing' | 'login' | 'app'
  const [appView, setAppView] = useState<'landing' | 'login' | 'app'>('app');
  const [activePage, setActivePage] = useState<PageId>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Modals & Panels
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Core Data States
  const [farm, setFarm] = useState<FarmInfo>(DEMO_FARM);
  const [fields, setFields] = useState<FieldData[]>(INITIAL_FIELDS);
  const [selectedFieldId, setSelectedFieldId] = useState<string>('field-a');
  const [weather, setWeather] = useState<WeatherCondition>(MOCK_WEATHER);
  const [agents, setAgents] = useState<AgentInfo[]>(MOCK_AGENTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [reports, setReports] = useState<FarmReport[]>(MOCK_REPORTS);
  const [isAiConnected, setIsAiConnected] = useState(true);

  // Derived current field & telemetry
  const selectedField = fields.find((f) => f.id === selectedFieldId) || fields[0] || INITIAL_FIELDS[0];
  const currentSoil: SoilMetrics = MOCK_SOIL_DATA[selectedField.id] || MOCK_SOIL_DATA['field-a'];
  const currentIrrigation: IrrigationRecommendation =
    MOCK_IRRIGATION_RECOMMENDATIONS[selectedField.id] || MOCK_IRRIGATION_RECOMMENDATIONS['field-a'];
  const currentDisease: DiseaseRiskData =
    MOCK_DISEASE_DATA[selectedField.id] || MOCK_DISEASE_DATA['field-a'];
  const currentMarket: MarketData =
    MOCK_MARKETS[selectedField.crop] || MOCK_MARKETS['Tomato'];
  const currentDecision: FarmDecision =
    MOCK_DECISIONS[selectedField.id] || MOCK_DECISIONS['field-a'];

  // Initialize data from backend API
  const loadInitialData = async () => {
    try {
      const health = await apiService.checkHealth();
      setIsAiConnected(health.geminiConnected ?? true);

      const farmRes = await apiService.getFarm();
      if (farmRes && farmRes.farm) setFarm(farmRes.farm);

      const fieldsRes = await apiService.getFields();
      if (fieldsRes && fieldsRes.length > 0) setFields(fieldsRes);

      const weatherRes = await apiService.getWeather();
      if (weatherRes) setWeather(weatherRes);

      const agentsRes = await apiService.getAgents();
      if (agentsRes && agentsRes.length > 0) setAgents(agentsRes);

      const notifRes = await apiService.getNotifications();
      if (notifRes && notifRes.length > 0) setNotifications(notifRes);

      const reportsRes = await apiService.getReports();
      if (reportsRes && reportsRes.length > 0) setReports(reportsRes);
    } catch (err) {
      console.warn('Initial data load completed with local fallbacks.');
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleApplyDecision = async (decisionId: string) => {
    await apiService.applyDecision(decisionId);
    showToast(`✓ Recommendation applied for ${selectedField.name}!`);
  };

  const handleMarkNotificationRead = async (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    await apiService.markNotificationRead(id);
  };

  const handleRefreshDecision = async (fieldId: string) => {
    const dec = await apiService.generateDecision(fieldId);
    showToast(`Consensus synthesized for ${selectedField.name} (Confidence: ${dec.confidence}%)`);
  };

  // Titles mapping
  const getPageTitle = (page: PageId) => {
    switch (page) {
      case 'dashboard':
        return 'Precision Farm Dashboard';
      case 'my-farm':
        return 'My Farm & Plots';
      case 'crop-vision':
        return 'Crop Vision AI Diagnostic';
      case 'soil-irrigation':
        return 'Soil & Irrigation Optimization';
      case 'weather':
        return 'Agro-Meteorological Forecast';
      case 'pest-disease':
        return 'Pest & Disease Intelligence';
      case 'market':
        return 'APMC Mandi Intelligence';
      case 'ai-agents':
        return 'Multi-Agent Network Architecture';
      case 'decision-center':
        return 'Autonomous Decision Center';
      case 'reports':
        return 'Farm Audits & Reports';
      case 'feedback':
        return 'Farmer Feedback & Active Learning';
      case 'settings':
        return 'Farm Configuration';
      default:
        return 'AgriMind AI';
    }
  };

  // Render Landing Page
  if (appView === 'landing') {
    return (
      <LandingPage
        onStartDemo={() => setAppView('login')}
        onExploreAi={() => {
          setAppView('app');
          setActivePage('ai-agents');
        }}
      />
    );
  }

  // Render Login Page
  if (appView === 'login') {
    return (
      <LoginPage
        onLogin={() => {
          setAppView('app');
          setActivePage('dashboard');
          showToast(`Welcome back, ${farm.farmerName}!`);
        }}
        onBackToLanding={() => setAppView('landing')}
      />
    );
  }

  // Render Main App Layout
  return (
    <div className="min-h-screen bg-[#F8FAF7] text-[#1B4332] font-sans flex antialiased selection:bg-emerald-600 selection:text-white">
      {/* Sidebar Navigation */}
      <Sidebar
        activePage={activePage}
        onNavigate={(p) => setActivePage(p)}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-x-hidden">
        {/* Top Navbar */}
        <Navbar
          farm={farm}
          fields={fields}
          selectedFieldId={selectedFieldId}
          onSelectField={(id) => {
            setSelectedFieldId(id);
            const found = fields.find((f) => f.id === id);
            if (found) showToast(`Switched focus to ${found.name} (${found.crop})`);
          }}
          notifications={notifications}
          onOpenNotifications={() => setNotificationsOpen(true)}
          onOpenAssistant={() => setAssistantOpen(true)}
          onLogout={() => setAppView('login')}
          activePageTitle={getPageTitle(activePage)}
          isAiConnected={isAiConnected}
        />

        {/* Page Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
          {activePage === 'dashboard' && (
            <DashboardPage
              farm={farm}
              fields={fields}
              selectedField={selectedField}
              decision={currentDecision}
              soil={currentSoil}
              weather={weather}
              onNavigate={(p) => setActivePage(p)}
              onApplyDecision={handleApplyDecision}
              onOpenFeedback={() => setFeedbackOpen(true)}
              onOpenAssistant={() => setAssistantOpen(true)}
            />
          )}

          {activePage === 'my-farm' && (
            <MyFarmPage
              farm={farm}
              fields={fields}
              onSelectField={(id) => {
                setSelectedFieldId(id);
                setActivePage('decision-center');
              }}
              onRefreshFields={loadInitialData}
            />
          )}

          {activePage === 'crop-vision' && (
            <CropVisionPage fields={fields} selectedField={selectedField} />
          )}

          {activePage === 'soil-irrigation' && (
            <SoilIrrigationPage
              fields={fields}
              selectedField={selectedField}
              soil={currentSoil}
              irrigation={currentIrrigation}
              onSelectField={(id) => setSelectedFieldId(id)}
              onApplyIrrigation={() => showToast(`✓ Drip cycle scheduled for ${selectedField.name}!`)}
            />
          )}

          {activePage === 'weather' && <WeatherPage weather={weather} />}

          {activePage === 'pest-disease' && (
            <PestDiseasePage
              fields={fields}
              selectedField={selectedField}
              diseaseData={currentDisease}
              onSelectField={(id) => setSelectedFieldId(id)}
            />
          )}

          {activePage === 'market' && <MarketPage initialCrop={selectedField.crop} />}

          {activePage === 'ai-agents' && (
            <AiAgentsPage
              agents={agents}
              onOpenDecisionCenter={() => setActivePage('decision-center')}
            />
          )}

          {activePage === 'decision-center' && (
            <DecisionCenterPage
              fields={fields}
              selectedField={selectedField}
              decision={currentDecision}
              soil={currentSoil}
              weather={weather}
              market={currentMarket}
              onSelectField={(id) => setSelectedFieldId(id)}
              onApplyDecision={handleApplyDecision}
              onOpenFeedback={() => setFeedbackOpen(true)}
              onRefreshDecision={handleRefreshDecision}
            />
          )}

          {activePage === 'reports' && (
            <ReportsPage reports={reports} onRefreshReports={loadInitialData} />
          )}

          {activePage === 'feedback' && <FeedbackDashboardPage />}

          {activePage === 'settings' && <SettingsPage farm={farm} />}
        </main>
      </div>

      {/* Floating Chatbot Assistant */}
      <AgriChatAssistant
        isOpen={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        activeField={selectedField}
      />

      {/* Alert Notifications Modal */}
      <NotificationModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkRead={handleMarkNotificationRead}
        onNavigate={(p) => setActivePage(p)}
      />

      {/* Farmer Feedback Modal */}
      <FeedbackModal
        isOpen={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        decision={currentDecision}
        onSubmitted={() => showToast('✓ Feedback recorded! Thank you, Ravi.')}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white font-semibold text-xs px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
