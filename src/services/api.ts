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
  FeedbackItem,
  NotificationItem,
  FarmReport,
  VisionAnalysisResult
} from '../types';
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
  MOCK_FEEDBACK_LIST,
  MOCK_NOTIFICATIONS,
  MOCK_REPORTS,
  SAMPLE_CROP_IMAGES
} from '../data/mockData';

const BASE_URL = '/api';

export const apiService = {
  // Health / Connection status
  async checkHealth(): Promise<{ status: string; geminiConnected: boolean }> {
    try {
      const res = await fetch(`${BASE_URL}/health`);
      if (res.ok) return await res.json();
    } catch {
      // Fallback
    }
    return { status: 'ok', geminiConnected: false };
  },

  // Farm info
  async getFarm(): Promise<{ farm: FarmInfo; totalFields: number; activeCrops: string[] }> {
    try {
      const res = await fetch(`${BASE_URL}/farm`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('API getFarm fallback:', err);
    }
    return {
      farm: DEMO_FARM,
      totalFields: INITIAL_FIELDS.length,
      activeCrops: ['Tomato', 'Rice', 'Chili']
    };
  },

  // Fields
  async getFields(): Promise<FieldData[]> {
    try {
      const res = await fetch(`${BASE_URL}/fields`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('API getFields fallback:', err);
    }
    return INITIAL_FIELDS;
  },

  async addField(data: Partial<FieldData>): Promise<FieldData> {
    try {
      const res = await fetch(`${BASE_URL}/fields`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('API addField fallback:', err);
    }
    return {
      id: `field-${Date.now()}`,
      name: data.name || 'New Field',
      crop: data.crop || 'Tomato',
      cropVariety: data.cropVariety || 'Standard Hybrid',
      area: Number(data.area) || 2.0,
      stage: (data.stage as any) || 'Vegetative',
      health: 'Good',
      healthScore: 88,
      sowingDate: new Date().toISOString().split('T')[0],
      expectedHarvest: new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
      soilMoisture: 58,
      lastIrrigated: 'Today',
      pestRisk: 25,
      diseaseRisk: 15,
      targetYieldKg: 16000
    };
  },

  async deleteField(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${BASE_URL}/fields/${id}`, { method: 'DELETE' });
      if (res.ok) {
        const data = await res.json();
        return data.success;
      }
    } catch (err) {
      console.warn('API deleteField fallback:', err);
    }
    return true;
  },

  // Weather
  async getWeather(): Promise<WeatherCondition> {
    try {
      const res = await fetch(`${BASE_URL}/weather`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('API getWeather fallback:', err);
    }
    return MOCK_WEATHER;
  },

  // Soil & Irrigation
  async getSoilAndIrrigation(fieldId: string): Promise<{ soil: SoilMetrics; irrigation: IrrigationRecommendation }> {
    try {
      const res = await fetch(`${BASE_URL}/soil/${fieldId}`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('API getSoilAndIrrigation fallback:', err);
    }
    return {
      soil: MOCK_SOIL_DATA[fieldId] || MOCK_SOIL_DATA['field-a'],
      irrigation: MOCK_IRRIGATION_RECOMMENDATIONS[fieldId] || MOCK_IRRIGATION_RECOMMENDATIONS['field-a']
    };
  },

  // Disease Risk Assessment
  async getDiseaseRisk(fieldId: string): Promise<DiseaseRiskData> {
    try {
      const res = await fetch(`${BASE_URL}/disease/${fieldId}`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('API getDiseaseRisk fallback:', err);
    }
    return MOCK_DISEASE_DATA[fieldId] || MOCK_DISEASE_DATA['field-a'];
  },

  // Market Intelligence
  async getMarket(crop: string): Promise<MarketData> {
    try {
      const res = await fetch(`${BASE_URL}/market/${crop}`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('API getMarket fallback:', err);
    }
    const key = Object.keys(MOCK_MARKETS).find(k => k.toLowerCase() === crop.toLowerCase()) || 'Tomato';
    return MOCK_MARKETS[key];
  },

  async getAllMarkets(): Promise<Record<string, MarketData>> {
    try {
      const res = await fetch(`${BASE_URL}/markets`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('API getAllMarkets fallback:', err);
    }
    return MOCK_MARKETS;
  },

  // Crop Vision AI
  async analyzeCrop(payload: {
    imageBase64?: string;
    crop?: string;
    fieldId?: string;
    growthStage?: string;
    mimeType?: string;
  }): Promise<VisionAnalysisResult> {
    try {
      const res = await fetch(`${BASE_URL}/analyze-crop`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('API analyzeCrop fallback:', err);
    }
    const sample = SAMPLE_CROP_IMAGES.find(s => s.crop.toLowerCase() === (payload.crop || 'tomato').toLowerCase()) || SAMPLE_CROP_IMAGES[0];
    return sample.expectedResult;
  },

  // AI Decision Engine
  async generateDecision(fieldId: string): Promise<FarmDecision> {
    try {
      const res = await fetch(`${BASE_URL}/decision`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fieldId })
      });
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('API generateDecision fallback:', err);
    }
    return MOCK_DECISIONS[fieldId] || MOCK_DECISIONS['field-a'];
  },

  async applyDecision(decisionId: string): Promise<boolean> {
    try {
      const res = await fetch(`${BASE_URL}/decision/${decisionId}/apply`, { method: 'POST' });
      if (res.ok) return true;
    } catch {
      // ignore
    }
    return true;
  },

  // Multi-Agent System
  async getAgents(): Promise<AgentInfo[]> {
    try {
      const res = await fetch(`${BASE_URL}/agents`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('API getAgents fallback:', err);
    }
    return MOCK_AGENTS;
  },

  // Feedback
  async submitFeedback(data: Partial<FeedbackItem>): Promise<{ success: boolean; feedback: FeedbackItem }> {
    try {
      const res = await fetch(`${BASE_URL}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('API submitFeedback fallback:', err);
    }
    const fb: FeedbackItem = {
      id: `fb-${Date.now()}`,
      decisionId: data.decisionId || 'dec-manual',
      fieldName: data.fieldName || 'Field A (Tomato)',
      actionTitle: data.actionTitle || 'Irrigation & IPM Recommendation',
      helpful: data.helpful ?? true,
      followedStatus: data.followedStatus || 'Yes',
      comments: data.comments || 'Logged locally.',
      actualOutcome: data.actualOutcome || 'Yield protected.',
      submittedAt: 'Just now',
      yieldImpactRating: data.yieldImpactRating || 5
    };
    return { success: true, feedback: fb };
  },

  async getFeedback(): Promise<{
    feedbacks: FeedbackItem[];
    stats: { totalFeedback: number; helpfulPercentage: number; adoptionRate: number; avgYieldImpact: number };
  }> {
    try {
      const res = await fetch(`${BASE_URL}/feedback`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('API getFeedback fallback:', err);
    }
    return {
      feedbacks: MOCK_FEEDBACK_LIST,
      stats: {
        totalFeedback: MOCK_FEEDBACK_LIST.length,
        helpfulPercentage: 100,
        adoptionRate: 92,
        avgYieldImpact: 4.8
      }
    };
  },

  // AI Chat Assistant
  async sendChatMessage(message: string, activeFieldId?: string): Promise<{ reply: string; isAi: boolean }> {
    try {
      const res = await fetch(`${BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, activeFieldId })
      });
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('API sendChatMessage fallback:', err);
    }
    return {
      reply: `🌱 **AgriMind Advisor:** I have reviewed your current farm telemetry. Root moisture is being tracked continuously and weather indicators suggest favorable conditions. Please let me know which field or crop you would like to examine in detail!`,
      isAi: false
    };
  },

  // Notifications
  async getNotifications(): Promise<NotificationItem[]> {
    try {
      const res = await fetch(`${BASE_URL}/notifications`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('API getNotifications fallback:', err);
    }
    return MOCK_NOTIFICATIONS;
  },

  async markNotificationRead(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${BASE_URL}/notifications/${id}/read`, { method: 'POST' });
      if (res.ok) return true;
    } catch {
      // ignore
    }
    return true;
  },

  // Reports
  async getReports(): Promise<FarmReport[]> {
    try {
      const res = await fetch(`${BASE_URL}/reports`);
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('API getReports fallback:', err);
    }
    return MOCK_REPORTS;
  },

  async generateReport(type: string): Promise<FarmReport> {
    try {
      const res = await fetch(`${BASE_URL}/reports/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type })
      });
      if (res.ok) return await res.json();
    } catch (err) {
      console.warn('API generateReport fallback:', err);
    }
    return {
      id: `rep-${Date.now()}`,
      title: `${type} - Live Snapshot`,
      type: type as any,
      period: 'Current Season',
      generatedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      summary: 'Automated synthesis across active farm plots.',
      keyMetrics: [
        { label: 'Farm Health Index', value: '91/100', trend: '+4%' },
        { label: 'Water Conserved', value: '26%', trend: '+6%' }
      ],
      status: 'Ready'
    };
  }
};
