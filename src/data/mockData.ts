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

export const DEMO_FARM: FarmInfo = {
  id: 'farm-ap-01',
  name: 'Green Valley Farm',
  farmerName: 'Ravi Kumar',
  location: 'Guntur District',
  state: 'Andhra Pradesh',
  country: 'India',
  totalArea: 9.0, // acres
  fieldCount: 3,
  cropCount: 3,
  soilType: 'Red Sandy Loam & Black Cotton',
  primaryIrrigation: 'Drip & Canal System',
  establishedYear: 2018
};

export const INITIAL_FIELDS: FieldData[] = [
  {
    id: 'field-a',
    name: 'Field A (North Ridge)',
    crop: 'Tomato',
    cropVariety: 'Arka Rakshak (High Yield)',
    area: 2.4,
    stage: 'Flowering',
    health: 'Excellent',
    healthScore: 92,
    sowingDate: '2026-06-15',
    expectedHarvest: '2026-09-20',
    soilMoisture: 41, // lower threshold approaching
    lastIrrigated: '3 days ago (Drip)',
    pestRisk: 32,
    diseaseRisk: 18,
    targetYieldKg: 24000
  },
  {
    id: 'field-b',
    name: 'Field B (East Terraces)',
    crop: 'Rice',
    cropVariety: 'BPT 5204 (Sona Masoori)',
    area: 4.8,
    stage: 'Vegetative',
    health: 'Good',
    healthScore: 88,
    sowingDate: '2026-07-01',
    expectedHarvest: '2026-11-10',
    soilMoisture: 78,
    lastIrrigated: 'Yesterday (Basin)',
    pestRisk: 44,
    diseaseRisk: 28,
    targetYieldKg: 28800
  },
  {
    id: 'field-c',
    name: 'Field C (South Plot)',
    crop: 'Chili',
    cropVariety: 'Guntur Sannam (Hot)',
    area: 1.8,
    stage: 'Fruiting',
    health: 'Moderate',
    healthScore: 76,
    sowingDate: '2026-05-20',
    expectedHarvest: '2026-09-30',
    soilMoisture: 52,
    lastIrrigated: '2 days ago (Drip)',
    pestRisk: 58,
    diseaseRisk: 42,
    targetYieldKg: 7500
  }
];

export const MOCK_SOIL_DATA: Record<string, SoilMetrics> = {
  'field-a': {
    fieldId: 'field-a',
    moisture: 41,
    moistureStatus: 'Deficit',
    pH: 6.7,
    phStatus: 'Optimal',
    nitrogen: 58, // kg/ha (Medium)
    phosphorus: 42, // kg/ha (Optimal)
    potassium: 72, // kg/ha (Rich)
    organicMatter: 2.4, // %
    soilTemperature: 25.8, // °C
    electricalConductivity: 0.85, // dS/m
    texture: 'Sandy Loam',
    lastUpdated: '10 mins ago via IoT Probe #A1',
    depthProfile: [
      { depth: '0-15 cm (Topsoil)', moisture: 38, temp: 27.2 },
      { depth: '15-30 cm (Root zone)', moisture: 41, temp: 25.8 },
      { depth: '30-60 cm (Subsoil)', moisture: 54, temp: 24.1 }
    ],
    history24h: [
      { time: '00:00', moisture: 46, temp: 23.5 },
      { time: '04:00', moisture: 45, temp: 22.8 },
      { time: '08:00', moisture: 44, temp: 24.2 },
      { time: '12:00', moisture: 42, temp: 28.1 },
      { time: '16:00', moisture: 41, temp: 27.4 },
      { time: '20:00', moisture: 41, temp: 25.2 }
    ]
  },
  'field-b': {
    fieldId: 'field-b',
    moisture: 78,
    moistureStatus: 'Optimal',
    pH: 7.2,
    phStatus: 'Optimal',
    nitrogen: 74,
    phosphorus: 38,
    potassium: 65,
    organicMatter: 3.1,
    soilTemperature: 24.5,
    electricalConductivity: 1.1,
    texture: 'Clay Loam (Puddle soil)',
    lastUpdated: '15 mins ago via IoT Probe #B2',
    depthProfile: [
      { depth: '0-15 cm (Topsoil)', moisture: 82, temp: 25.2 },
      { depth: '15-30 cm (Root zone)', moisture: 78, temp: 24.5 },
      { depth: '30-60 cm (Subsoil)', moisture: 75, temp: 23.8 }
    ],
    history24h: [
      { time: '00:00', moisture: 80, temp: 23.0 },
      { time: '04:00', moisture: 79, temp: 22.5 },
      { time: '08:00', moisture: 79, temp: 23.8 },
      { time: '12:00', moisture: 78, temp: 26.2 },
      { time: '16:00', moisture: 78, temp: 25.6 },
      { time: '20:00', moisture: 78, temp: 24.1 }
    ]
  },
  'field-c': {
    fieldId: 'field-c',
    moisture: 52,
    moistureStatus: 'Optimal',
    pH: 6.4,
    phStatus: 'Optimal',
    nitrogen: 62,
    phosphorus: 49,
    potassium: 88,
    organicMatter: 2.1,
    soilTemperature: 26.4,
    electricalConductivity: 0.92,
    texture: 'Red Loam',
    lastUpdated: '12 mins ago via IoT Probe #C1',
    depthProfile: [
      { depth: '0-15 cm (Topsoil)', moisture: 49, temp: 28.0 },
      { depth: '15-30 cm (Root zone)', moisture: 52, temp: 26.4 },
      { depth: '30-60 cm (Subsoil)', moisture: 60, temp: 24.9 }
    ],
    history24h: [
      { time: '00:00', moisture: 56, temp: 24.2 },
      { time: '04:00', moisture: 55, temp: 23.4 },
      { time: '08:00', moisture: 54, temp: 25.1 },
      { time: '12:00', moisture: 53, temp: 29.0 },
      { time: '16:00', moisture: 52, temp: 28.2 },
      { time: '20:00', moisture: 52, temp: 26.0 }
    ]
  }
};

export const MOCK_IRRIGATION_RECOMMENDATIONS: Record<string, IrrigationRecommendation> = {
  'field-a': {
    fieldId: 'field-a',
    fieldName: 'Field A (Tomato)',
    recommendedDate: 'Tomorrow Morning',
    recommendedTime: '6:00 AM – 8:00 AM',
    waterAmountLiters: 2800,
    durationMinutes: 45,
    priority: 'High',
    reasons: [
      'Soil moisture in root zone dropped to 41% (approaching 40% critical threshold)',
      'Tomato is at critical Flowering stage; water stress causes flower drops',
      'No significant precipitation expected within next 48-72 hours',
      'Early morning slot minimizes evaporation loss by up to 28%'
    ],
    waterSavingsPct: 22,
    method: 'Micro-Drip Line with Pulse Flow'
  },
  'field-b': {
    fieldId: 'field-b',
    fieldName: 'Field B (Rice)',
    recommendedDate: 'In 3 Days',
    recommendedTime: '5:30 AM – 7:30 AM',
    waterAmountLiters: 6500,
    durationMinutes: 120,
    priority: 'Low',
    reasons: [
      'Standing water & moisture at 78% is currently adequate for vegetative tillering',
      'AWD (Alternate Wetting and Drying) protocol suggests delaying for 72 hours',
      'Preserves root aeration and reduces methane emissions'
    ],
    waterSavingsPct: 35,
    method: 'Controlled Canal Sluice'
  },
  'field-c': {
    fieldId: 'field-c',
    fieldName: 'Field C (Chili)',
    recommendedDate: 'Tomorrow Evening',
    recommendedTime: '5:00 PM – 6:30 PM',
    waterAmountLiters: 1900,
    durationMinutes: 35,
    priority: 'Medium',
    reasons: [
      'Moisture at 52% is safe today, but fruiting stage demands steady transpiration',
      'Even moisture prevents Blossom End Rot and fruit splitting in chili pods'
    ],
    waterSavingsPct: 18,
    method: 'Drip System'
  }
};

export const MOCK_WEATHER: WeatherCondition = {
  currentTemp: 31,
  condition: 'Partly Sunny',
  conditionIcon: 'sun-dim',
  humidity: 72,
  rainProbability: 12,
  windSpeedKmH: 14,
  windDirection: 'SSW',
  uvIndex: 7,
  solarRadiation: 680,
  evapotranspiration: 4.8,
  alerts: [
    {
      id: 'alert-rain-48h',
      type: 'Rain',
      severity: 'medium',
      title: 'Monsoon Trough Approaching',
      message: 'Isolated light-to-moderate rain is expected within the next 48-60 hours (35% probability). Consider calibrating next irrigation cycle accordingly.',
      issuedAt: 'Today at 06:00 AM',
      actionRequired: 'Monitor Field B AWD cycle and delay non-urgent flooding'
    },
    {
      id: 'alert-humidity-fungus',
      type: 'Humidity',
      severity: 'high',
      title: 'High Relative Humidity Advisory',
      message: 'Persistent evening humidity (>72%) with warm daytime temps favors fungal spore germination on solanaceous crops.',
      issuedAt: 'Yesterday at 08:30 PM',
      actionRequired: 'Perform preventive visual check on Tomato & Chili plots'
    }
  ],
  forecast7Day: [
    { day: 'Today', date: 'Aug 21', maxTemp: 32, minTemp: 24, condition: 'Partly Sunny', rainChance: 12, humidity: 72, windSpeed: 14 },
    { day: 'Sat', date: 'Aug 22', maxTemp: 33, minTemp: 25, condition: 'Sunny & Warm', rainChance: 15, humidity: 70, windSpeed: 12 },
    { day: 'Sun', date: 'Aug 23', maxTemp: 30, minTemp: 23, condition: 'Cloudy with Showers', rainChance: 45, humidity: 82, windSpeed: 18 },
    { day: 'Mon', date: 'Aug 24', maxTemp: 29, minTemp: 23, condition: 'Scattered Rain', rainChance: 60, humidity: 88, windSpeed: 20 },
    { day: 'Tue', date: 'Aug 25', maxTemp: 31, minTemp: 24, condition: 'Passing Showers', rainChance: 35, humidity: 76, windSpeed: 15 },
    { day: 'Wed', date: 'Aug 26', maxTemp: 32, minTemp: 25, condition: 'Partly Sunny', rainChance: 20, humidity: 73, windSpeed: 11 },
    { day: 'Thu', date: 'Aug 27', maxTemp: 33, minTemp: 25, condition: 'Mostly Sunny', rainChance: 10, humidity: 68, windSpeed: 10 }
  ],
  hourlyForecast: [
    { time: '06:00', temp: 24, rainProb: 5, humidity: 84 },
    { time: '09:00', temp: 28, rainProb: 8, humidity: 76 },
    { time: '12:00', temp: 31, rainProb: 12, humidity: 70 },
    { time: '15:00', temp: 33, rainProb: 18, humidity: 66 },
    { time: '18:00', temp: 29, rainProb: 15, humidity: 75 },
    { time: '21:00', temp: 26, rainProb: 10, humidity: 82 }
  ]
};

export const MOCK_DISEASE_DATA: Record<string, DiseaseRiskData> = {
  'field-a': {
    fieldId: 'field-a',
    fieldName: 'Field A (Tomato)',
    crop: 'Tomato',
    overallDiseaseRisk: 18,
    overallPestRisk: 32,
    fungalRisk: 68,
    bacterialRisk: 22,
    viralRisk: 14,
    detectedConditions: [
      {
        id: 'cond-1',
        name: 'Early Blight (Alternaria solani)',
        category: 'Fungal',
        confidence: 87,
        severity: 'Moderate',
        detectedOn: 'Sample Leaf #A-04',
        affectedAreaPct: 6.5,
        symptoms: ['Brown concentric rings on lower foliage', 'Yellow chlorotic halos around lesions', 'Minor leaf tip drop'],
        treatment: ['Remove lowest affected foliage', 'Ensure strict drip irrigation to avoid canopy wetting', 'Apply bio-fungicide (Trichoderma viride @ 5g/L) or copper oxychloride preventive spray']
      }
    ],
    predictedRisks: [
      {
        diseaseName: 'Tomato Late Blight',
        pathogenType: 'Phytophthora infestans',
        probability: 38,
        triggerCondition: 'Consecutive days with humidity >80% and temp 20-25°C',
        windowDays: 5,
        preventiveAction: 'Maintain canopy air circulation, prepare preventive Mancozeb barrier'
      },
      {
        diseaseName: 'Tomato Fruit Borer (Helicoverpa)',
        pathogenType: 'Insect Pest',
        probability: 32,
        triggerCondition: 'Flowering to early fruit transition',
        windowDays: 7,
        preventiveAction: 'Install 5 pheromone traps per acre and spray neem seed kernel extract (NSKE 5%)'
      }
    ],
    environmentalFactors: [
      { factor: 'Canopy Relative Humidity', value: '74%', impact: 'High Risk', score: 78 },
      { factor: 'Average Night Temperature', value: '24°C', impact: 'Favorable', score: 62 },
      { factor: 'Leaf Wetness Duration', value: '3.5 hrs/day', impact: 'Moderate', score: 45 },
      { factor: 'Crop Growth Stage Sensitivity', value: 'Flowering Phase', impact: 'High Risk', score: 85 }
    ]
  },
  'field-b': {
    fieldId: 'field-b',
    fieldName: 'Field B (Rice)',
    crop: 'Rice',
    overallDiseaseRisk: 28,
    overallPestRisk: 44,
    fungalRisk: 34,
    bacterialRisk: 48,
    viralRisk: 12,
    detectedConditions: [],
    predictedRisks: [
      {
        diseaseName: 'Bacterial Leaf Blight (Xanthomonas oryzae)',
        pathogenType: 'Bacterial',
        probability: 48,
        triggerCondition: 'Warm wet foliage with nitrogen surplus',
        windowDays: 6,
        preventiveAction: 'Balance nitrogen dosage with split potassium top-dressing'
      },
      {
        diseaseName: 'Rice Stem Borer (Scirpophaga incertulas)',
        pathogenType: 'Insect Pest',
        probability: 44,
        triggerCondition: 'Active tillering vegetative canopy',
        windowDays: 4,
        preventiveAction: 'Install light traps and monitor dead hearts in central rows'
      }
    ],
    environmentalFactors: [
      { factor: 'Standing Water Depth', value: '4 cm', impact: 'Safe', score: 25 },
      { factor: 'Nitrogen Balance', value: '74 kg/ha (Slight High)', impact: 'Moderate', score: 55 },
      { factor: 'Canopy Density', value: 'High Tillering', impact: 'Moderate', score: 48 }
    ]
  },
  'field-c': {
    fieldId: 'field-c',
    fieldName: 'Field C (Chili)',
    crop: 'Chili',
    overallDiseaseRisk: 42,
    overallPestRisk: 58,
    fungalRisk: 54,
    bacterialRisk: 30,
    viralRisk: 62,
    detectedConditions: [
      {
        id: 'cond-2',
        name: 'Chili Leaf Curl Virus (Begomovirus)',
        category: 'Viral',
        confidence: 79,
        severity: 'Mild',
        detectedOn: 'Perimeter Row 2',
        affectedAreaPct: 4.2,
        symptoms: ['Upward leaf curling', 'Slight vein thickening', 'Stunted apical growth on 3 plants'],
        treatment: ['Rogue out severely affected isolated plants', 'Control whitefly vector with yellow sticky cards (10/acre) and neem oil spray']
      }
    ],
    predictedRisks: [
      {
        diseaseName: 'Chili Anthracnose (Fruit Rot)',
        pathogenType: 'Colletotrichum capsici',
        probability: 54,
        triggerCondition: 'High humidity during pod maturation',
        windowDays: 8,
        preventiveAction: 'Spray Pseudomonas fluorescens or Azoxystrobin on green pods'
      }
    ],
    environmentalFactors: [
      { factor: 'Thrips/Whitefly Vector Activity', value: 'High', impact: 'High Risk', score: 82 },
      { factor: 'Soil Organic Health', value: '2.1%', impact: 'Moderate', score: 50 },
      { factor: 'Fruiting Load Stress', value: 'Moderate', impact: 'Moderate', score: 58 }
    ]
  }
};

export const MOCK_MARKETS: Record<string, MarketData> = {
  'Tomato': {
    crop: 'Tomato',
    hindiName: 'Tamatar',
    currentPrice: 34,
    mandiRateQuintal: 3400,
    weeklyChangePct: 8.4,
    monthlyChangePct: 24.2,
    demandLevel: 'High',
    marketTrend: 'Bullish',
    aiInsight: 'Tomato prices have gained +8.4% this week across Andhra Pradesh & Telangana mandis due to supply transit bottlenecks from northern hubs. Current farm-gate realization is favorable; timing selective harvest at Breaker/Turning stage preserves shelf life while capturing peak wholesale rates.',
    priceHistory30d: [
      { date: 'Jul 22', price: 26, volumeTons: 140 },
      { date: 'Jul 27', price: 27, volumeTons: 155 },
      { date: 'Aug 01', price: 29, volumeTons: 130 },
      { date: 'Aug 06', price: 30, volumeTons: 125 },
      { date: 'Aug 11', price: 31, volumeTons: 110 },
      { date: 'Aug 16', price: 32, volumeTons: 105 },
      { date: 'Aug 21 (Today)', price: 34, volumeTons: 98 }
    ],
    mandiComparison: [
      { mandi: 'Guntur Vegetable Market', location: 'Guntur, AP', price: 34, distanceKm: 14 },
      { mandi: 'Vijayawada APMC Yard', location: 'Vijayawada, AP', price: 36, distanceKm: 38 },
      { mandi: 'Tenali Krishi Mandi', location: 'Tenali, AP', price: 33, distanceKm: 26 },
      { mandi: 'Bowenpally Wholesale Yard', location: 'Hyderabad, TS', price: 39, distanceKm: 270 }
    ]
  },
  'Rice': {
    crop: 'Rice',
    hindiName: 'Dhan (Paddy)',
    currentPrice: 28,
    mandiRateQuintal: 2800,
    weeklyChangePct: 2.1,
    monthlyChangePct: 5.6,
    demandLevel: 'High',
    marketTrend: 'Neutral',
    aiInsight: 'Sona Masoori raw paddy spot rate holds steady with stable government procurement baselines. Quality grade grain with <14% moisture content attracts premium buyers in export milling circuits.',
    priceHistory30d: [
      { date: 'Jul 22', price: 26.5, volumeTons: 450 },
      { date: 'Jul 27', price: 27.0, volumeTons: 420 },
      { date: 'Aug 01', price: 27.2, volumeTons: 460 },
      { date: 'Aug 06', price: 27.5, volumeTons: 410 },
      { date: 'Aug 11', price: 27.6, volumeTons: 390 },
      { date: 'Aug 16', price: 27.8, volumeTons: 430 },
      { date: 'Aug 21 (Today)', price: 28.0, volumeTons: 440 }
    ],
    mandiComparison: [
      { mandi: 'Guntur Grain Mandi', location: 'Guntur, AP', price: 28.0, distanceKm: 16 },
      { mandi: 'Miryalaguda Paddy Terminal', location: 'Nalgonda, TS', price: 29.2, distanceKm: 110 },
      { mandi: 'Nellore Rice Market', location: 'Nellore, AP', price: 28.5, distanceKm: 210 }
    ]
  },
  'Chili': {
    crop: 'Chili',
    hindiName: 'Mirchi',
    currentPrice: 145,
    mandiRateQuintal: 14500,
    weeklyChangePct: 12.3,
    monthlyChangePct: 18.7,
    demandLevel: 'Very High',
    marketTrend: 'Bullish',
    aiInsight: 'Guntur Sannam red and dry chili trades near 3-month highs with robust oleoresin extraction export demand. Ensuring optimal fruit shine and preventing pest scarring on pods directly impacts grade value by ₹15-25/kg.',
    priceHistory30d: [
      { date: 'Jul 22', price: 122, volumeTons: 85 },
      { date: 'Jul 27', price: 126, volumeTons: 92 },
      { date: 'Aug 01', price: 130, volumeTons: 78 },
      { date: 'Aug 06', price: 134, volumeTons: 88 },
      { date: 'Aug 11', price: 138, volumeTons: 70 },
      { date: 'Aug 16', price: 140, volumeTons: 65 },
      { date: 'Aug 21 (Today)', price: 145, volumeTons: 60 }
    ],
    mandiComparison: [
      { mandi: 'Asia’s Largest Guntur Mirchi Yard', location: 'Guntur, AP', price: 145, distanceKm: 12 },
      { mandi: 'Khammam Chili Mandi', location: 'Khammam, TS', price: 142, distanceKm: 125 },
      { mandi: 'Byadgi Spice Market', location: 'Haveri, KA', price: 152, distanceKm: 580 }
    ]
  }
};

export const MOCK_AGENTS: AgentInfo[] = [
  {
    id: 'agent-vision',
    name: 'Crop Vision AI Agent',
    role: 'Computer Vision & Symptom Diagnostics',
    icon: 'Eye',
    status: 'Active',
    confidence: 94,
    lastAnalysis: 'Analyzed Field A Leaf Sample (Early Blight: Moderate)',
    keyMetric: '87% Diagnostic Accuracy',
    mainFinding: 'Identified concentric necrotic lesions with chlorotic halos on lower foliage; advised target drip and bio-fungicide.'
  },
  {
    id: 'agent-soil',
    name: 'Soil Intelligence Agent',
    role: 'NPK, Moisture & Depth Telemetry',
    icon: 'FlaskConical',
    status: 'Active',
    confidence: 96,
    lastAnalysis: 'Field A root zone at 41% moisture (Deficit approaching)',
    keyMetric: '6.7 pH, 58 kg/ha N',
    mainFinding: 'Topsoil moisture depleted by 5% in 24 hrs due to high daytime evapotranspiration (4.8 mm/day).'
  },
  {
    id: 'agent-weather',
    name: 'Weather Intelligence Agent',
    role: 'Micro-climate & Atmospheric Radar',
    icon: 'CloudSun',
    status: 'Active',
    confidence: 91,
    lastAnalysis: 'No major precipitation in 48h (12% rain prob)',
    keyMetric: '31°C, 72% RH, 14 km/h SSW',
    mainFinding: 'Monsoon front 70km offshore; calm window for precise morning irrigation and field spray.'
  },
  {
    id: 'agent-irrigation',
    name: 'Irrigation Optimization Agent',
    role: 'Hydraulic Modeling & Water Conservation',
    icon: 'Droplets',
    status: 'Active',
    confidence: 93,
    lastAnalysis: 'Recommended 2,800 L for Field A (6:00-8:00 AM)',
    keyMetric: '22% Water Saved vs Flood',
    mainFinding: 'Pulse-drip scheduled for dawn achieves optimal root uptake while avoiding midday thermal shock.'
  },
  {
    id: 'agent-pest',
    name: 'Pest & Disease Risk Agent',
    role: 'Epidemiological Spore & Vector Forecasting',
    icon: 'Bug',
    status: 'Active',
    confidence: 89,
    lastAnalysis: 'Fungal propagation index elevated (68%) due to night RH',
    keyMetric: 'Disease: 18% | Pest: 32%',
    mainFinding: 'High humidity (>72%) increases fungal spore germination window; preventive scouting recommended.'
  },
  {
    id: 'agent-market',
    name: 'Market Intelligence Agent',
    role: 'APMC Mandi Price & Demand Forecasting',
    icon: 'TrendingUp',
    status: 'Active',
    confidence: 90,
    lastAnalysis: 'Tomato ₹34/kg (+8.4% weekly bullish trend)',
    keyMetric: '+8.4% Realization',
    mainFinding: 'Wholesale supplies tight; Grade-A tomatoes fetching ₹36/kg in Vijayawada hub.'
  },
  {
    id: 'agent-decision',
    name: 'Multi-Agent Consensus Synthesizer',
    role: 'Agentic Reasoning & Explainable Farm Action',
    icon: 'BrainCircuit',
    status: 'Active',
    confidence: 91,
    lastAnalysis: 'Consensus action synthesized for Field A (Priority: HIGH)',
    keyMetric: '91% Synthesized Confidence',
    mainFinding: 'Unified multi-modal decision: Irrigate Field A tomorrow 6-8 AM with 2,800 L + inspect lower foliage.'
  }
];

export const MOCK_DECISIONS: Record<string, FarmDecision> = {
  'field-a': {
    id: 'dec-tomato-01',
    fieldId: 'field-a',
    fieldName: 'Field A (Tomato)',
    crop: 'Tomato',
    actionTitle: 'Irrigate Field A tomorrow morning and perform preventive canopy scouting',
    priority: 'HIGH',
    confidence: 91,
    summary: 'Based on soil moisture depletion (41%), zero rain probability in next 48h, critical flowering stage, and +8.4% market price peak, execute early morning drip irrigation of 2,800 L.',
    reasons: [
      'Soil moisture in root zone is at 41%, nearing the 40% yield-loss threshold',
      'No significant rainfall expected over the next 48 hours (12% probability)',
      'Tomato is at high-demand Flowering stage where water deficits trigger flower abortion',
      'High evening humidity (72%) requires early morning irrigation to avoid overnight leaf wetness',
      'Wholesale tomato price is trending bullish (+8.4%), justifying high crop protection priority'
    ],
    contributingFactors: [
      { factor: 'Crop Growth Stage Sensitivity', weightPct: 90, description: 'Flowering stage requires uninterrupted moisture balance' },
      { factor: 'Soil Moisture Depletion', weightPct: 80, description: 'Sensor reading at 41% approaching deficit zone' },
      { factor: 'Rain Probability Forecast', weightPct: 80, description: '12% chance confirms natural recharge will not occur' },
      { factor: 'Weather Evaporation Rate', weightPct: 70, description: '31°C temp & 4.8 mm/day ET demand replenishment' },
      { factor: 'Market Realization Value', weightPct: 65, description: 'Strong ₹34/kg price increases financial stakes' }
    ],
    expectedImpact: [
      { benefit: 'Prevent Flower Drop', detail: 'Saves estimated 12-15% of potential fruit sets' },
      { benefit: 'Water Efficiency', detail: 'Early 6 AM slot cuts evaporation loss by 28%' },
      { benefit: 'Disease Prevention', detail: 'Keeping canopy dry mitigates Alternaria fungal spread' }
    ],
    timing: 'Tomorrow between 6:00 AM and 8:00 AM',
    generatedAt: '2026-08-21T06:00:00Z',
    applied: false
  },
  'field-b': {
    id: 'dec-rice-02',
    fieldId: 'field-b',
    fieldName: 'Field B (Rice)',
    crop: 'Rice',
    actionTitle: 'Maintain Alternate Wetting & Drying (AWD) — Hold irrigation for 72 hours',
    priority: 'MEDIUM',
    confidence: 88,
    summary: 'Standing water at 78% is sufficient for active tillering. Holding flooding for 3 days promotes vigorous root aeration and saves 35% water.',
    reasons: [
      'Soil moisture currently at 78% with 4 cm standing water depth',
      'Rainfall front expected in 48-60 hours will naturally replenish paddies',
      'Prevents root rot and strengthens tillering stems against lodging'
    ],
    contributingFactors: [
      { factor: 'Current Soil Water Level', weightPct: 85, description: '78% moisture is well above AWD recharge trigger' },
      { factor: 'Weather Outlook', weightPct: 75, description: 'Precipitation chance rises to 45% in 48 hours' },
      { factor: 'Tillering Stage Requirements', weightPct: 70, description: 'Periodic drying encourages deeper root penetration' }
    ],
    expectedImpact: [
      { benefit: 'Conserve 6,500 L Water', detail: 'Prevents wasteful drainage runoff' },
      { benefit: 'Reduce Methane Emission', detail: 'AWD protocol cuts paddy GHG footprint' }
    ],
    timing: 'Re-evaluate in 3 Days (Aug 24)',
    generatedAt: '2026-08-21T06:15:00Z',
    applied: false
  },
  'field-c': {
    id: 'dec-chili-03',
    fieldId: 'field-c',
    fieldName: 'Field C (Chili)',
    crop: 'Chili',
    actionTitle: 'Deploy yellow sticky traps and apply organic neem spray for vector management',
    priority: 'HIGH',
    confidence: 89,
    summary: 'Chili leaf curl symptoms noted on perimeter rows. Vector risk is 58%. Immediate eco-friendly vector suppression preserves export quality fruit pods.',
    reasons: [
      'Early mild leaf curl detected on perimeter plants',
      'Whitefly vector population favored by warm 31°C afternoon temperatures',
      'Guntur chili prices at ₹145/kg make fruit blemishing financially costly'
    ],
    contributingFactors: [
      { factor: 'Pest Vector Pressure', weightPct: 88, description: 'Whitefly activity elevated in southern plot' },
      { factor: 'High Economic Value', weightPct: 85, description: '₹145/kg market rate rewards premium quality' },
      { factor: 'Fruiting Stage Susceptibility', weightPct: 78, description: 'Pod development stage cannot tolerate viral stunting' }
    ],
    expectedImpact: [
      { benefit: 'Halt Vector Spread', detail: 'Yellow traps reduce adult whiteflies by up to 65%' },
      { benefit: 'Protect Pod Skin Quality', detail: 'Preserves Grade-A export qualification' }
    ],
    timing: 'Today by 5:00 PM',
    generatedAt: '2026-08-21T06:30:00Z',
    applied: false
  }
};

export const MOCK_FEEDBACK_LIST: FeedbackItem[] = [
  {
    id: 'fb-01',
    decisionId: 'dec-tomato-prev',
    fieldName: 'Field A (Tomato)',
    actionTitle: 'Applied drip cycle at dawn & sprayed Trichoderma',
    helpful: true,
    followedStatus: 'Yes',
    comments: 'Followed recommendation exactly. Flower drop stopped completely within 4 days and new foliage emerged healthy.',
    actualOutcome: 'Yield protected; fruit set count increased by 14%',
    submittedAt: '3 days ago',
    yieldImpactRating: 5
  },
  {
    id: 'fb-02',
    decisionId: 'dec-rice-prev',
    fieldName: 'Field B (Rice)',
    actionTitle: 'Held canal sluice during AWD cycle',
    helpful: true,
    followedStatus: 'Yes',
    comments: 'Saved diesel pump operating costs and rice tillers look strong and deep green.',
    actualOutcome: 'Saved approx ₹1,200 in pump fuel',
    submittedAt: '5 days ago',
    yieldImpactRating: 5
  },
  {
    id: 'fb-03',
    decisionId: 'dec-chili-prev',
    fieldName: 'Field C (Chili)',
    actionTitle: 'Split potassium fertilizer top-dressing',
    helpful: true,
    followedStatus: 'Partially',
    comments: 'Applied 80% of suggested dose due to rain forecast. Chili pods gained good weight.',
    actualOutcome: 'Good color and pungency development',
    submittedAt: '1 week ago',
    yieldImpactRating: 4
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'High',
    color: 'red',
    title: 'Fungal Risk Elevated',
    message: 'Tomato Early Blight probability increased to 68% in Field A due to high night humidity.',
    timestamp: '25m ago',
    read: false,
    linkPage: 'pest-disease'
  },
  {
    id: 'notif-2',
    type: 'Medium',
    color: 'yellow',
    title: 'Irrigation Recommended',
    message: 'Field A root moisture at 41%. Drip irrigation scheduled for tomorrow 6:00 AM (2,800 L).',
    timestamp: '1h ago',
    read: false,
    linkPage: 'soil-irrigation'
  },
  {
    id: 'notif-3',
    type: 'Info',
    color: 'green',
    title: 'Market Surge: Tomato +8.4%',
    message: 'Mandi spot price rose to ₹34/kg at Guntur yard. Favorable realization window active.',
    timestamp: '3h ago',
    read: false,
    linkPage: 'market'
  },
  {
    id: 'notif-4',
    type: 'Weather',
    color: 'blue',
    title: 'Monsoon Front in 48h',
    message: 'Weather radar detects incoming precipitation front (35-45% chance). Hold Field B flooding.',
    timestamp: '5h ago',
    read: true,
    linkPage: 'weather'
  }
];

export const MOCK_REPORTS: FarmReport[] = [
  {
    id: 'rep-01',
    title: 'Weekly Farm Intelligence & Decision Synthesis',
    type: 'Weekly Farm Report',
    period: 'Aug 14 - Aug 21, 2026',
    generatedDate: 'Aug 21, 2026',
    summary: 'All 3 fields monitored continuously with 91% AI consensus accuracy. Total water saved: 9,300 Liters. Field A flower-retention rate is in top 10% benchmark for Guntur district.',
    keyMetrics: [
      { label: 'Overall Farm Health', value: '88/100', trend: '+4%' },
      { label: 'Water Efficiency Index', value: '26% Saved', trend: '+6%' },
      { label: 'Estimated Farm Output', value: '60,300 kg', trend: '+8%' },
      { label: 'Projected Gross Revenue', value: '₹18,45,000', trend: '+11%' }
    ],
    status: 'Ready'
  },
  {
    id: 'rep-02',
    title: 'Field A Tomato Vision & Pathology Report',
    type: 'Crop Health Report',
    period: 'Aug 21, 2026',
    generatedDate: 'Aug 21, 2026',
    summary: 'Automated multimodal image diagnosis identified mild Early Blight lesions on 6.5% foliage area. Bio-control protocol instituted with zero chemical residue risk.',
    keyMetrics: [
      { label: 'Detected Disease', value: 'Early Blight (Alternaria)', trend: 'Mild' },
      { label: 'Vision Confidence', value: '87%', trend: 'High' },
      { label: 'Affected Foliage', value: '6.5%', trend: '-1.2%' }
    ],
    status: 'Ready'
  },
  {
    id: 'rep-03',
    title: 'Precision Soil & Hydraulic Efficiency Audit',
    type: 'Irrigation Report',
    period: 'Aug 01 - Aug 21, 2026',
    generatedDate: 'Aug 21, 2026',
    summary: 'IoT soil probes recorded 41-78% moisture balance across 3 zones. Smart scheduling prevented over-irrigation during high temperature spikes.',
    keyMetrics: [
      { label: 'Avg Soil pH', value: '6.77', trend: 'Optimal' },
      { label: 'Total Water Delivered', value: '28,400 L', trend: '-22%' },
      { label: 'Energy Cost Saved', value: '₹3,400', trend: '+15%' }
    ],
    status: 'Ready'
  },
  {
    id: 'rep-04',
    title: 'Mandi Price Forecast & Harvest Window Timing',
    type: 'Market Report',
    period: 'Aug 2026 Outlook',
    generatedDate: 'Aug 21, 2026',
    summary: 'Comprehensive Andhra Pradesh & Telangana APMC mandi trend analysis indicates bullish momentum for Tomato (+8.4%) and Chili (+12.3%).',
    keyMetrics: [
      { label: 'Tomato Farmgate', value: '₹34/kg', trend: '+8.4%' },
      { label: 'Chili Premium Guntur', value: '₹145/kg', trend: '+12.3%' },
      { label: 'Paddy Baseline', value: '₹28/kg', trend: '+2.1%' }
    ],
    status: 'Ready'
  }
];

export interface SampleCropImage {
  id: string;
  title: string;
  crop: string;
  condition: string;
  thumbnail: string;
  stage: string;
  fieldId: string;
  description: string;
  expectedResult: VisionAnalysisResult;
}

export const SAMPLE_CROP_IMAGES: SampleCropImage[] = [
  {
    id: 'sample-tomato-blight',
    title: 'Tomato Leaf with Early Blight',
    crop: 'Tomato',
    condition: 'Possible Early Blight (Alternaria solani)',
    stage: 'Flowering',
    fieldId: 'field-a',
    thumbnail: 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?auto=format&fit=crop&w=600&q=80',
    description: 'Leaf showing dark brown concentric target-spot lesions surrounded by yellow chlorotic halo.',
    expectedResult: {
      cropType: 'Tomato (Solanum lycopersicum)',
      identifiedCondition: 'Possible Early Blight (Alternaria solani)',
      confidence: 87,
      severity: 'Moderate',
      affectedAreaPct: 7.2,
      visibleSymptoms: [
        'Concentric brown circular lesions with "target board" pattern',
        'Yellow chlorotic halos surrounding necrotic spots',
        'Early senescence on lower leaf margins'
      ],
      possibleCauses: [
        'Prolonged leaf wetness combined with warm daytime temps (26-32°C)',
        'Spore splash from contaminated soil during overhead irrigation or heavy rain',
        'Nutrient stress (slight nitrogen deficit in lower canopy)'
      ],
      recommendedActions: [
        'Prune and safely discard the bottom 2 tiers of affected leaves',
        'Switch entirely to root-zone drip irrigation to keep upper canopy dry',
        'Ensure 45-60 cm spacing between plants for adequate cross-ventilation'
      ],
      preventiveMeasures: [
        'Apply organic mulch (paddy straw) around tomato stems to stop soil splash',
        'Practice 3-year crop rotation with non-solanaceous crops (e.g. pulses or corn)'
      ],
      organicRemedies: [
        'Trichoderma viride or Pseudomonas fluorescens spray @ 5g/liter water',
        'Neem cake soil enrichment (250 kg/ha)'
      ],
      chemicalRemedies: [
        'Preventive: Mancozeb 75% WP @ 2g/L or Copper Oxychloride 50% WP @ 2.5g/L',
        'Curative if spreading: Azoxystrobin 23% SC @ 1 ml/L'
      ],
      growthStageDetected: 'Flowering Stage (Weeks 8-10)',
      aiNotes: 'Diagnosis generated via Gemini Multimodal Vision AI. Confirm symptoms with local Krishi Vigyan Kendra (KVK) officer before applying synthetic fungicides.',
      isAiGenerated: true
    }
  },
  {
    id: 'sample-rice-healthy',
    title: 'Healthy Rice Paddy Canopy',
    crop: 'Rice',
    condition: 'Healthy Vigorous Tillering',
    stage: 'Vegetative',
    fieldId: 'field-b',
    thumbnail: 'https://images.unsplash.com/photo-1536657464919-892534f60d6e?auto=format&fit=crop&w=600&q=80',
    description: 'Uniform vibrant emerald green leaf blades with sturdy tillers and no visible necrotic lesions.',
    expectedResult: {
      cropType: 'Rice (Oryza sativa - Sona Masoori)',
      identifiedCondition: 'Healthy Crop (No Disease Detected)',
      confidence: 96,
      severity: 'Healthy',
      affectedAreaPct: 0,
      visibleSymptoms: [
        'Uniform deep green coloration across leaf lamina',
        'Erect leaf architecture with robust chlorophyll density',
        'Clean leaf sheaths with zero spots, blast lesions, or stem borer entrance holes'
      ],
      possibleCauses: [
        'Optimal root zone water management and balanced NPK fertilizer top-dressing',
        'Favorable sunlight exposure and healthy soil microbiome'
      ],
      recommendedActions: [
        'Continue Alternate Wetting and Drying (AWD) irrigation protocol',
        'Apply scheduled potassium top-dressing (MOP @ 25 kg/ha) at panicle initiation stage',
        'Maintain perimeter pest monitoring with light traps'
      ],
      preventiveMeasures: [
        'Keep bunds clean of grassy weed hosts',
        'Avoid excessive nitrogen fertilization which predisposes rice to Blast and Blight'
      ],
      organicRemedies: [
        'Panchagavya foliar spray (3%) for enhanced systemic plant immunity',
        'Azospirillum & PSB bio-fertilizers'
      ],
      chemicalRemedies: [
        'No chemical intervention required. Crop is in prime condition.'
      ],
      growthStageDetected: 'Active Vegetative Tillering',
      aiNotes: 'Crop vigor index is in the 95th percentile for Sona Masoori variety in Krishna-Godavari basin.',
      isAiGenerated: true
    }
  },
  {
    id: 'sample-chili-curl',
    title: 'Chili Foliage with Leaf Curl',
    crop: 'Chili',
    condition: 'Possible Chili Leaf Curl (Begomovirus / Thrips)',
    stage: 'Fruiting',
    fieldId: 'field-c',
    thumbnail: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80',
    description: 'Upward cupping of leaf edges, reduced leaf lamina size, and slight crinkling.',
    expectedResult: {
      cropType: 'Chili (Capsicum annuum - Guntur Sannam)',
      identifiedCondition: 'Possible Chili Leaf Curl Complex (Whitefly/Thrips Vector)',
      confidence: 84,
      severity: 'Moderate',
      affectedAreaPct: 5.8,
      visibleSymptoms: [
        'Upward boat-shaped curling and crinkling of young leaves',
        'Thickened veins with slight interveinal chlorosis',
        'Slight internode shortening on terminal branches'
      ],
      possibleCauses: [
        'Feeding activity of sap-sucking pests: Whiteflies (Bemisia tabaci) transmitting Begomovirus',
        'Thrips (Scirtothrips dorsalis) lacerating tender leaf tissues in dry weather'
      ],
      recommendedActions: [
        'Install 10-12 bright yellow sticky traps and blue traps per acre at crop height',
        'Rogue out severely stunted single plants to prevent vector transmission',
        'Spray during late afternoon when pollinator bees are inactive'
      ],
      preventiveMeasures: [
        'Grow barrier crops (2-3 rows of maize or sorghum) around chili field perimeter',
        'Avoid sequential solanaceous plantings'
      ],
      organicRemedies: [
        'Neem Oil (10,000 ppm) @ 3 ml/L or 5% NSKE (Neem Seed Kernel Extract)',
        'Lecanicillium lecanii (entomopathogenic fungus) @ 5g/L'
      ],
      chemicalRemedies: [
        'Diafenthiuron 50% WP @ 1.2g/L or Acetamiprid 20% SP @ 0.3g/L for sucking pest control',
        'Fipronil 5% SC @ 1.5 ml/L'
      ],
      growthStageDetected: 'Early Pod Maturation & Flowering',
      aiNotes: 'Prompt vector suppression prevents virus spread into central rows.',
      isAiGenerated: true
    }
  },
  {
    id: 'sample-tomato-healthy',
    title: 'Healthy Tomato Plants',
    crop: 'Tomato',
    condition: 'Healthy Vigorous Canopy',
    stage: 'Flowering',
    fieldId: 'field-a',
    thumbnail: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=600&q=80',
    description: 'Deep green foliage with abundant bright yellow blossom clusters and sturdy stem growth.',
    expectedResult: {
      cropType: 'Tomato (Solanum lycopersicum)',
      identifiedCondition: 'Healthy Crop (No Disease Detected)',
      confidence: 94,
      severity: 'Healthy',
      affectedAreaPct: 0,
      visibleSymptoms: [
        'Abundant golden yellow blossoms with strong pedicel attachment',
        'Healthy deep green foliage with zero chlorosis or spots',
        'Vigorous apical shoot elongation'
      ],
      possibleCauses: [
        'Balanced soil moisture and steady root nutrition'
      ],
      recommendedActions: [
        'Maintain regular drip irrigation (6:00-8:00 AM) to support flower retention',
        'Provide light staking/trellising to support heavy impending fruit clusters',
        'Monitor for early borer entry on blossom drops'
      ],
      preventiveMeasures: [
        'Apply 19:19:19 soluble NPK fertigation @ 4 kg/acre once a week during flowering'
      ],
      organicRemedies: [
        'Jeevamrutha application through drip lines',
        'Seaweed extract foliar spray (2 ml/L) for fruit set stimulation'
      ],
      chemicalRemedies: [
        'None required. Continue standard preventive IPM protocol.'
      ],
      growthStageDetected: 'Peak Flowering Stage',
      aiNotes: 'Excellent canopy health and high prospective yield index.',
      isAiGenerated: true
    }
  }
];
