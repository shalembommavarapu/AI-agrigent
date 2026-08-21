export interface FarmInfo {
  id: string;
  name: string;
  farmerName: string;
  location: string;
  state: string;
  country: string;
  totalArea: number; // in acres
  fieldCount: number;
  cropCount: number;
  soilType: string;
  primaryIrrigation: string;
  establishedYear: number;
}

export type CropGrowthStage = 'Seedling' | 'Vegetative' | 'Flowering' | 'Fruiting' | 'Maturity' | 'Harvesting';
export type HealthStatus = 'Excellent' | 'Good' | 'Moderate' | 'Stressed' | 'Critical';

export interface FieldData {
  id: string;
  name: string;
  crop: string;
  cropVariety: string;
  area: number; // acres
  stage: CropGrowthStage;
  health: HealthStatus;
  healthScore: number; // 0-100%
  sowingDate: string;
  expectedHarvest: string;
  soilMoisture: number; // %
  lastIrrigated: string;
  pestRisk: number; // %
  diseaseRisk: number; // %
  targetYieldKg: number;
}

export interface SoilMetrics {
  fieldId: string;
  moisture: number; // %
  moistureStatus: 'Deficit' | 'Optimal' | 'Surplus';
  pH: number;
  phStatus: 'Acidic' | 'Optimal' | 'Alkaline';
  nitrogen: number; // kg/ha
  phosphorus: number; // kg/ha
  potassium: number; // kg/ha
  organicMatter: number; // %
  soilTemperature: number; // °C
  electricalConductivity: number; // dS/m
  texture: string;
  lastUpdated: string;
  depthProfile: { depth: string; moisture: number; temp: number }[];
  history24h: { time: string; moisture: number; temp: number }[];
}

export interface IrrigationRecommendation {
  fieldId: string;
  fieldName: string;
  recommendedTime: string;
  recommendedDate: string;
  waterAmountLiters: number;
  durationMinutes: number;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  reasons: string[];
  waterSavingsPct: number;
  method: string;
}

export interface WeatherCondition {
  currentTemp: number; // °C
  condition: string;
  conditionIcon: string;
  humidity: number; // %
  rainProbability: number; // %
  windSpeedKmH: number; // km/h
  windDirection: string;
  uvIndex: number;
  solarRadiation: number; // W/m²
  evapotranspiration: number; // mm/day
  alerts: WeatherAlert[];
  forecast7Day: DailyForecast[];
  hourlyForecast: HourlyForecast[];
}

export interface WeatherAlert {
  id: string;
  type: 'Rain' | 'Heat' | 'Wind' | 'Humidity' | 'Disease' | 'Frost';
  severity: 'low' | 'medium' | 'high';
  title: string;
  message: string;
  issuedAt: string;
  actionRequired: string;
}

export interface DailyForecast {
  day: string;
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  rainChance: number;
  humidity: number;
  windSpeed: number;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  rainProb: number;
  humidity: number;
}

export interface DiseaseRiskData {
  fieldId: string;
  fieldName: string;
  crop: string;
  overallDiseaseRisk: number; // %
  overallPestRisk: number; // %
  fungalRisk: number; // %
  bacterialRisk: number; // %
  viralRisk: number; // %
  detectedConditions: DetectedCondition[];
  predictedRisks: PredictedRisk[];
  environmentalFactors: {
    factor: string;
    value: string;
    impact: 'High Risk' | 'Moderate' | 'Favorable' | 'Safe';
    score: number;
  }[];
}

export interface DetectedCondition {
  id: string;
  name: string;
  category: 'Fungal' | 'Pest' | 'Bacterial' | 'Deficiency' | 'Viral';
  confidence: number;
  severity: 'Mild' | 'Moderate' | 'Severe';
  detectedOn: string;
  affectedAreaPct: number;
  symptoms: string[];
  treatment: string[];
}

export interface SampleCropImage {
  id: string;
  title: string;
  crop: string;
  condition: string;
  stage: string;
  fieldId: string;
  thumbnail: string;
  description: string;
  expectedResult: VisionAnalysisResult;
}

export interface PredictedRisk {
  diseaseName: string;
  pathogenType: string;
  probability: number;
  triggerCondition: string;
  windowDays: number;
  preventiveAction: string;
}

export interface MarketData {
  crop: string;
  hindiName: string;
  currentPrice: number; // ₹/kg
  mandiRateQuintal: number; // ₹/quintal
  weeklyChangePct: number;
  monthlyChangePct: number;
  demandLevel: 'Low' | 'Moderate' | 'High' | 'Very High';
  marketTrend: 'Bullish' | 'Neutral' | 'Bearish';
  aiInsight: string;
  priceHistory30d: { date: string; price: number; volumeTons: number }[];
  mandiComparison: { mandi: string; location: string; price: number; distanceKm: number }[];
}

export interface AgentInfo {
  id: string;
  name: string;
  role: string;
  icon: string;
  status: 'Active' | 'Analyzing' | 'Idle' | 'Alert';
  confidence: number;
  lastAnalysis: string;
  mainFinding: string;
  keyMetric: string;
  subAgents?: string[];
}

export interface FarmDecision {
  id: string;
  fieldId: string;
  fieldName: string;
  crop: string;
  actionTitle: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  confidence: number; // %
  summary: string;
  reasons: string[];
  contributingFactors: {
    factor: string;
    weightPct: number;
    description: string;
  }[];
  expectedImpact: {
    benefit: string;
    detail: string;
  }[];
  timing: string;
  generatedAt: string;
  applied: boolean;
}

export interface VisionAnalysisResult {
  cropType: string;
  identifiedCondition: string;
  confidence: number; // %
  severity: 'Low' | 'Moderate' | 'Severe' | 'Healthy';
  affectedAreaPct: number;
  visibleSymptoms: string[];
  possibleCauses: string[];
  recommendedActions: string[];
  preventiveMeasures: string[];
  organicRemedies: string[];
  chemicalRemedies: string[];
  growthStageDetected?: string;
  aiNotes: string;
  isAiGenerated: boolean;
}

export interface FeedbackItem {
  id: string;
  decisionId: string;
  fieldName: string;
  actionTitle: string;
  helpful: boolean;
  followedStatus: 'Yes' | 'No' | 'Partially';
  comments: string;
  actualOutcome?: string;
  submittedAt: string;
  yieldImpactRating?: number; // 1-5
}

export interface NotificationItem {
  id: string;
  type: 'High' | 'Medium' | 'Info' | 'Weather';
  color: 'red' | 'yellow' | 'green' | 'blue';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  linkPage?: string;
}

export interface FarmReport {
  id: string;
  title: string;
  type: 'Weekly Farm Report' | 'Crop Health Report' | 'Irrigation Report' | 'Disease Risk Report' | 'Market Report' | 'AI Decision Report';
  generatedDate: string;
  summary: string;
  period: string;
  keyMetrics: { label: string; value: string; trend?: string }[];
  status: 'Ready' | 'Generating';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  suggestedPrompts?: string[];
  contextData?: {
    field?: string;
    crop?: string;
    alertType?: string;
  };
}
