import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
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
} from './src/data/mockData.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory state for prototype
let farmData = { ...DEMO_FARM };
let fieldsData = [...INITIAL_FIELDS];
let feedbackList = [...MOCK_FEEDBACK_LIST];
let decisionsData = { ...MOCK_DECISIONS };
let notificationsData = [...MOCK_NOTIFICATIONS];
let reportsData = [...MOCK_REPORTS];

// Lazy Gemini AI initialization
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY' || apiKey.trim() === '') {
    return null;
  }
  try {
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  } catch (err) {
    console.warn('Gemini client init error:', err);
    return null;
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '25mb' }));
  app.use(express.urlencoded({ extended: true, limit: '25mb' }));

  // --- API Endpoints ---

  // Health check
  app.get('/api/health', (req, res) => {
    const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');
    res.json({
      status: 'ok',
      service: 'AgriMind AI Backend',
      geminiConnected: hasGeminiKey,
      timestamp: new Date().toISOString()
    });
  });

  // GET /api/farm
  app.get('/api/farm', (req, res) => {
    res.json({
      farm: farmData,
      totalFields: fieldsData.length,
      activeCrops: Array.from(new Set(fieldsData.map(f => f.crop)))
    });
  });

  // GET /api/fields
  app.get('/api/fields', (req, res) => {
    res.json(fieldsData);
  });

  // POST /api/fields (Add field)
  app.post('/api/fields', (req, res) => {
    const { name, crop, cropVariety, area, stage } = req.body;
    const newField = {
      id: `field-${Date.now()}`,
      name: name || 'New Field',
      crop: crop || 'Tomato',
      cropVariety: cropVariety || 'Standard Hybrid',
      area: Number(area) || 1.0,
      stage: stage || 'Vegetative',
      health: 'Good' as const,
      healthScore: 85,
      sowingDate: new Date().toISOString().split('T')[0],
      expectedHarvest: new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
      soilMoisture: 60,
      lastIrrigated: 'Today',
      pestRisk: 25,
      diseaseRisk: 15,
      targetYieldKg: Math.round(Number(area || 1) * 8000)
    };
    fieldsData.push(newField);
    farmData.fieldCount = fieldsData.length;
    farmData.totalArea += newField.area;
    res.status(201).json(newField);
  });

  // DELETE /api/fields/:id
  app.delete('/api/fields/:id', (req, res) => {
    const { id } = req.params;
    const initialLen = fieldsData.length;
    fieldsData = fieldsData.filter(f => f.id !== id);
    farmData.fieldCount = fieldsData.length;
    res.json({ success: fieldsData.length < initialLen });
  });

  // GET /api/weather
  app.get('/api/weather', (req, res) => {
    res.json(MOCK_WEATHER);
  });

  // GET /api/soil/:fieldId
  app.get('/api/soil/:fieldId', (req, res) => {
    const { fieldId } = req.params;
    const soil = MOCK_SOIL_DATA[fieldId] || MOCK_SOIL_DATA['field-a'];
    const irrigation = MOCK_IRRIGATION_RECOMMENDATIONS[fieldId] || MOCK_IRRIGATION_RECOMMENDATIONS['field-a'];
    res.json({ soil, irrigation });
  });

  // GET /api/disease/:fieldId
  app.get('/api/disease/:fieldId', (req, res) => {
    const { fieldId } = req.params;
    const diseaseData = MOCK_DISEASE_DATA[fieldId] || MOCK_DISEASE_DATA['field-a'];
    res.json(diseaseData);
  });

  // GET /api/market/:crop
  app.get('/api/market/:crop', (req, res) => {
    const { crop } = req.params;
    const cropKey = Object.keys(MOCK_MARKETS).find(
      k => k.toLowerCase() === crop.toLowerCase()
    ) || 'Tomato';
    res.json(MOCK_MARKETS[cropKey]);
  });

  // GET /api/markets (all)
  app.get('/api/markets', (req, res) => {
    res.json(MOCK_MARKETS);
  });

  // GET /api/agents
  app.get('/api/agents', (req, res) => {
    res.json(MOCK_AGENTS);
  });

  // POST /api/analyze-crop (Crop Vision AI)
  app.post('/api/analyze-crop', async (req, res) => {
    try {
      const { imageBase64, mimeType = 'image/jpeg', crop = 'Tomato', fieldId = 'field-a', growthStage = 'Flowering' } = req.body;

      const ai = getGeminiClient();

      if (ai && imageBase64) {
        try {
          // Clean base64 string
          const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');

          const prompt = `You are AgriMind AI, an expert agricultural pathologist and agronomist. 
Analyze this crop leaf/plant image for a farm in Andhra Pradesh, India.
Crop Selected: ${crop}
Field: ${fieldId}
Growth Stage: ${growthStage}

Respond strictly in JSON matching this schema:
{
  "cropType": "${crop} (botanical name)",
  "identifiedCondition": "Possible [Name of Disease/Condition or Healthy Crop]",
  "confidence": number between 60 and 98,
  "severity": "Healthy" | "Low" | "Moderate" | "Severe",
  "affectedAreaPct": number,
  "visibleSymptoms": ["symptom 1", "symptom 2", "symptom 3"],
  "possibleCauses": ["cause 1", "cause 2"],
  "recommendedActions": ["action 1", "action 2", "action 3"],
  "preventiveMeasures": ["preventive 1", "preventive 2"],
  "organicRemedies": ["organic remedy 1", "organic remedy 2"],
  "chemicalRemedies": ["chemical remedy with safe dosage 1", "chemical remedy 2"],
  "growthStageDetected": "growth stage observations",
  "aiNotes": "Concise agronomist note for Indian farming conditions (Guntur/Andhra Pradesh). ALWAYS use cautious phrasing like 'Possible [Disease] detected' rather than asserting definite infection."
}`;

          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: {
              parts: [
                {
                  inlineData: {
                    mimeType: mimeType || 'image/jpeg',
                    data: cleanBase64
                  }
                },
                { text: prompt }
              ]
            },
            config: {
              responseMimeType: 'application/json'
            }
          });

          const rawText = response.text || '{}';
          const parsed = JSON.parse(rawText);
          parsed.isAiGenerated = true;
          return res.json(parsed);
        } catch (genErr) {
          console.warn('Gemini vision API call failed, falling back to expert diagnostic engine:', genErr);
        }
      }

      // Smart Fallback Diagnostic Engine
      const matchingSample = SAMPLE_CROP_IMAGES.find(
        s => s.crop.toLowerCase() === crop.toLowerCase()
      ) || SAMPLE_CROP_IMAGES[0];

      const fallbackResult = {
        ...matchingSample.expectedResult,
        isAiGenerated: false
      };

      return res.json(fallbackResult);
    } catch (error: any) {
      console.error('Error in analyze-crop:', error);
      res.status(500).json({
        error: 'Failed to analyze crop image',
        details: error?.message || 'Unknown error'
      });
    }
  });

  // POST /api/decision (AI Decision Center Synthesis)
  app.post('/api/decision', async (req, res) => {
    try {
      const { fieldId = 'field-a' } = req.body;
      const field = fieldsData.find(f => f.id === fieldId) || fieldsData[0];
      const soil = MOCK_SOIL_DATA[field.id] || MOCK_SOIL_DATA['field-a'];
      const weather = MOCK_WEATHER;
      const market = MOCK_MARKETS[field.crop] || MOCK_MARKETS['Tomato'];
      const disease = MOCK_DISEASE_DATA[field.id] || MOCK_DISEASE_DATA['field-a'];

      const ai = getGeminiClient();

      if (ai) {
        try {
          const prompt = `You are the Multi-Agent Farm Decision Synthesizer for AgriMind AI on a farm in Andhra Pradesh, India.
Synthesize the input data from 6 agricultural domain agents:
- Field: ${field.name} (${field.crop}, ${field.area} acres, Stage: ${field.stage}, Health: ${field.healthScore}%)
- Soil Agent: Moisture ${soil.moisture}%, pH ${soil.pH}, Nitrogen ${soil.nitrogen} kg/ha, Phosphorus ${soil.phosphorus} kg/ha, Potassium ${soil.potassium} kg/ha
- Weather Agent: Temp ${weather.currentTemp}°C, Humidity ${weather.humidity}%, Rain Chance next 48h: ${weather.rainProbability}%
- Disease Agent: Disease Risk ${disease.overallDiseaseRisk}%, Pest Risk ${disease.overallPestRisk}%, Fungal Risk ${disease.fungalRisk}%
- Market Agent: ${market.crop} current price ₹${market.currentPrice}/kg, Weekly change ${market.weeklyChangePct}%, Trend ${market.marketTrend}

Generate a clear, actionable, explainable decision. Respond strictly in JSON:
{
  "id": "dec-${Date.now()}",
  "fieldId": "${field.id}",
  "fieldName": "${field.name}",
  "crop": "${field.crop}",
  "actionTitle": "Specific clear action title (e.g. Irrigate Field A tomorrow morning and perform preventive canopy scouting)",
  "priority": "HIGH" | "MEDIUM" | "LOW" | "CRITICAL",
  "confidence": number between 85 and 96,
  "summary": "2-3 sentence executive summary explaining what to do and why.",
  "reasons": [
    "5 concise, concrete bullet points based on soil, weather, stage, disease risk, and market"
  ],
  "contributingFactors": [
    { "factor": "Crop Growth Stage", "weightPct": 90, "description": "Flowering stage is highly sensitive to moisture swings" },
    { "factor": "Soil Moisture Level", "weightPct": 80, "description": "At ${soil.moisture}% approaching deficit threshold" },
    { "factor": "Rain Forecast Probability", "weightPct": 80, "description": "${weather.rainProbability}% chance confirms irrigation needed" },
    { "factor": "Market Realization", "weightPct": 65, "description": "Favorable market rate rewards quality protection" }
  ],
  "expectedImpact": [
    { "benefit": "Yield Protection", "detail": "Mitigates blossom drop and preserves 12-15% output" },
    { "benefit": "Resource Conservation", "detail": "Early timing avoids evaporation loss" }
  ],
  "timing": "e.g. Tomorrow between 6:00 AM and 8:00 AM"
}`;

          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
              responseMimeType: 'application/json'
            }
          });

          const rawText = response.text || '{}';
          const decisionResult = JSON.parse(rawText);
          decisionResult.applied = false;
          decisionResult.generatedAt = new Date().toISOString();
          decisionsData[field.id] = decisionResult;
          return res.json(decisionResult);
        } catch (aiErr) {
          console.warn('Gemini decision generation fallback:', aiErr);
        }
      }

      // Heuristic Fallback
      const baseDecision = MOCK_DECISIONS[field.id] || MOCK_DECISIONS['field-a'];
      const updatedDecision = {
        ...baseDecision,
        id: `dec-${Date.now()}`,
        generatedAt: new Date().toISOString()
      };
      decisionsData[field.id] = updatedDecision;
      res.json(updatedDecision);
    } catch (error: any) {
      console.error('Error generating decision:', error);
      res.status(500).json({ error: 'Failed to generate farm decision' });
    }
  });

  // POST /api/decision/:id/apply
  app.post('/api/decision/:id/apply', (req, res) => {
    const { id } = req.params;
    for (const key of Object.keys(decisionsData)) {
      if (decisionsData[key].id === id) {
        decisionsData[key].applied = true;
        return res.json({ success: true, decision: decisionsData[key] });
      }
    }
    res.json({ success: true, message: 'Decision marked as applied' });
  });

  // POST /api/feedback
  app.post('/api/feedback', (req, res) => {
    const { decisionId, fieldName, actionTitle, helpful, followedStatus, comments, actualOutcome, yieldImpactRating } = req.body;
    const newFeedback = {
      id: `fb-${Date.now()}`,
      decisionId: decisionId || 'dec-manual',
      fieldName: fieldName || 'Field A (Tomato)',
      actionTitle: actionTitle || 'Irrigation & IPM Recommendation',
      helpful: helpful ?? true,
      followedStatus: followedStatus || 'Yes',
      comments: comments || 'Recommendation followed smoothly.',
      actualOutcome: actualOutcome || 'Crop health maintained stably.',
      submittedAt: 'Just now',
      yieldImpactRating: yieldImpactRating || 5
    };
    feedbackList.unshift(newFeedback);
    res.status(201).json({ success: true, feedback: newFeedback });
  });

  // GET /api/feedback
  app.get('/api/feedback', (req, res) => {
    const total = feedbackList.length;
    const helpfulCount = feedbackList.filter(f => f.helpful).length;
    const followedCount = feedbackList.filter(f => f.followedStatus === 'Yes').length;

    res.json({
      feedbacks: feedbackList,
      stats: {
        totalFeedback: total,
        helpfulPercentage: total > 0 ? Math.round((helpfulCount / total) * 100) : 100,
        adoptionRate: total > 0 ? Math.round((followedCount / total) * 100) : 95,
        avgYieldImpact: 4.8
      }
    });
  });

  // POST /api/chat (AgriMind Assistant)
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, activeFieldId = 'field-a' } = req.body;
      const field = fieldsData.find(f => f.id === activeFieldId) || fieldsData[0];
      const soil = MOCK_SOIL_DATA[field.id] || MOCK_SOIL_DATA['field-a'];
      const weather = MOCK_WEATHER;
      const market = MOCK_MARKETS[field.crop] || MOCK_MARKETS['Tomato'];
      const disease = MOCK_DISEASE_DATA[field.id] || MOCK_DISEASE_DATA['field-a'];

      const ai = getGeminiClient();

      if (ai && message) {
        try {
          const systemContext = `You are AgriMind AI Assistant, a precision agriculture decision advisor assisting farmer Ravi Kumar at Green Valley Farm in Guntur, Andhra Pradesh, India.
Current Farm Context:
- Active Field: ${field.name} (${field.crop}, ${field.area} acres, Stage: ${field.stage}, Health: ${field.healthScore}%)
- Soil Moisture: ${soil.moisture}%, pH: ${soil.pH}, N: ${soil.nitrogen} kg/ha, P: ${soil.phosphorus} kg/ha, K: ${soil.potassium} kg/ha
- Weather: ${weather.currentTemp}°C, Humidity ${weather.humidity}%, Rain Chance: ${weather.rainProbability}%, Alert: ${weather.alerts[0]?.title}
- Disease Risk: ${disease.overallDiseaseRisk}%, Fungal Risk: ${disease.fungalRisk}%, Pest Risk: ${disease.overallPestRisk}%
- Market Price: ${market.crop} at ₹${market.currentPrice}/kg (+${market.weeklyChangePct}% weekly)

Provide a direct, practical, and highly helpful response in 2-4 structured paragraphs or bullet points. Use Indian farming context and metric units (kg/ha, ₹/kg, liters, °C). Keep explanations concise and explainable.`;

          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: message,
            config: {
              systemInstruction: systemContext
            }
          });

          const replyText = response.text || 'I analyzed your farm data. Everything looks consistent with current parameters.';
          return res.json({
            reply: replyText,
            isAi: true
          });
        } catch (chatErr) {
          console.warn('Gemini chat fallback:', chatErr);
        }
      }

      // Smart rule-based conversational assistant fallback
      const lower = (message || '').toLowerCase();
      let reply = '';
      if (lower.includes('irrigate') || lower.includes('water')) {
        reply = `💧 **Irrigation Recommendation for ${field.name} (${field.crop}):**\n\n- **Recommended Window:** Tomorrow morning between **6:00 AM – 8:00 AM**.\n- **Target Volume:** 2,800 Liters (Drip method).\n- **Why:** Soil moisture in root zone is at ${soil.moisture}%, approaching the lower threshold. Irrigating early prevents daytime evaporation loss by up to 28% while supporting ${field.crop}'s critical ${field.stage} stage.`;
      } else if (lower.includes('disease') || lower.includes('fung') || lower.includes('pest')) {
        reply = `🐛 **Pest & Disease Advisory for ${field.crop}:**\n\n- Current **Disease Risk is ${disease.overallDiseaseRisk}%** and **Fungal Risk is ${disease.fungalRisk}%**.\n- **Key Observation:** Night humidity (72-84%) increases fungal spore propagation.\n- **Action:** Inspect the lower canopy for concentric lesions (Early Blight). Avoid overhead sprinkler wetting; use root drip and consider preventive Trichoderma viride bio-spray.`;
      } else if (lower.includes('price') || lower.includes('market') || lower.includes('mandi')) {
        reply = `📈 **Market Intelligence for ${market.crop}:**\n\n- **Current Mandi Rate:** ₹${market.currentPrice}/kg (₹${market.mandiRateQuintal}/quintal at Guntur).\n- **Trend:** **+${market.weeklyChangePct}% Bullish** over the past 7 days.\n- **AI Insight:** Demand remains strong in regional hubs (Vijayawada APMC @ ₹36/kg). Selective harvesting at breaker stage will capture top wholesale grade realization.`;
      } else if (lower.includes('soil') || lower.includes('fertilizer') || lower.includes('npk')) {
        reply = `🧪 **Soil Health Profile (${field.name}):**\n\n- **pH:** ${soil.pH} (Optimal neutral range)\n- **NPK Status:** Nitrogen: ${soil.nitrogen} kg/ha (Moderate), Phosphorus: ${soil.phosphorus} kg/ha (Good), Potassium: ${soil.potassium} kg/ha (Rich).\n- **Recommendation:** Maintain potassium levels to support ${field.crop} fruit/grain setting. Split top-dressing is advised.`;
      } else {
        reply = `🌱 **Farm Intelligence Summary for ${field.name}:**\n\n- **Crop & Stage:** ${field.crop} at ${field.stage} phase (${field.healthScore}% health index).\n- **Top Priority:** Field A soil moisture (${soil.moisture}%) requires morning drip irrigation.\n- **Weather Outlook:** ${weather.currentTemp}°C with low rain probability (12%) for the next 48h.\n- **Market:** ${market.crop} price is trending up at ₹${market.currentPrice}/kg.\n\nHow else can I assist with your farm management today?`;
      }

      res.json({ reply, isAi: false });
    } catch (error: any) {
      console.error('Error in chat:', error);
      res.status(500).json({ error: 'Failed to process chat message' });
    }
  });

  // GET /api/notifications
  app.get('/api/notifications', (req, res) => {
    res.json(notificationsData);
  });

  // POST /api/notifications/:id/read
  app.post('/api/notifications/:id/read', (req, res) => {
    const { id } = req.params;
    notificationsData = notificationsData.map(n => n.id === id ? { ...n, read: true } : n);
    res.json({ success: true });
  });

  // GET /api/reports
  app.get('/api/reports', (req, res) => {
    res.json(reportsData);
  });

  // POST /api/reports/generate
  app.post('/api/reports/generate', (req, res) => {
    const { type = 'Weekly Farm Report' } = req.body;
    const newReport = {
      id: `rep-${Date.now()}`,
      title: `${type} - ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
      type: type as any,
      period: 'Current Cycle (Real-time Snapshot)',
      generatedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      summary: `Automated multi-agent synthesis across ${fieldsData.length} farm plots in Guntur. Consolidates vision diagnostics, IoT soil telemetry, and Mandi price forecasts.`,
      keyMetrics: [
        { label: 'Farm Health Index', value: '90/100', trend: '+3%' },
        { label: 'Total Water Efficiency', value: '24% Saved', trend: '+5%' },
        { label: 'Avg Soil Moisture', value: '57%', trend: 'Balanced' }
      ],
      status: 'Ready' as const
    };
    reportsData.unshift(newReport);
    res.status(201).json(newReport);
  });

  // --- Vite / Static Middleware ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌾 AgriMind AI Decision Platform Server running on http://localhost:${PORT}`);
  });
}

startServer();
