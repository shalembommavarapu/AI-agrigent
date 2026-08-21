from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
import uvicorn
import os

from models import (
    FarmModel, FieldModel, CropAnalysisRequest,
    DecisionRequest, FeedbackRequest, ChatRequest, ReportRequest
)
from mock_data import DEMO_FARM, FIELDS_DATA, SOIL_DATA, IRRIGATION_DATA, WEATHER_DATA, MARKET_DATA
from ai_service import GeminiAIService

app = FastAPI(
    title="AgriMind AI - Smart Agriculture Decision Agent API",
    description="Multimodal & Agentic AI Backend for Agriculture Decision Support",
    version="1.0.0"
)

# CORS middleware for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

ai_service = GeminiAIService()

# In-memory storage for feedback
feedback_store: List[Dict[str, Any]] = []

@app.get("/")
def root():
    return {"message": "AgriMind AI FastAPI Backend is running.", "status": "online"}

@app.get("/api/farm")
def get_farm():
    return {
        "farm": DEMO_FARM,
        "totalFields": len(FIELDS_DATA),
        "activeCrops": list(set(f["crop"] for f in FIELDS_DATA))
    }

@app.get("/api/fields")
def get_fields():
    return FIELDS_DATA

@app.get("/api/weather")
def get_weather():
    return WEATHER_DATA

@app.get("/api/soil/{field_id}")
def get_soil(field_id: str):
    soil = SOIL_DATA.get(field_id, SOIL_DATA.get("field-a"))
    irrigation = IRRIGATION_DATA.get(field_id, IRRIGATION_DATA.get("field-a"))
    return {"soil": soil, "irrigation": irrigation}

@app.get("/api/market/{crop}")
def get_market(crop: str):
    data = MARKET_DATA.get(crop, MARKET_DATA.get("Tomato"))
    return data

@app.post("/api/analyze-crop")
def analyze_crop(req: CropAnalysisRequest):
    result = ai_service.analyze_crop_image(
        image_base64=req.imageBase64 or "",
        crop=req.crop,
        stage=req.growthStage
    )
    return result

@app.post("/api/decision")
def generate_decision(req: DecisionRequest):
    field_id = req.fieldId
    field_info = next((f for f in FIELDS_DATA if f["id"] == field_id), FIELDS_DATA[0])
    soil_info = SOIL_DATA.get(field_id, SOIL_DATA.get("field-a", {}))
    market_info = MARKET_DATA.get(field_info.get("crop", "Tomato"), MARKET_DATA.get("Tomato", {}))
    
    decision = ai_service.generate_decision(
        field_id=field_id,
        field_data=field_info,
        soil_data=soil_info,
        weather_data=WEATHER_DATA,
        market_data=market_info
    )
    return decision

@app.post("/api/feedback")
def submit_feedback(req: FeedbackRequest):
    item = req.dict()
    item["id"] = f"fb-{len(feedback_store) + 1}"
    item["submittedAt"] = "Just now"
    feedback_store.insert(0, item)
    return {"success": True, "feedback": item}

@app.get("/api/feedback")
def get_feedback():
    total = len(feedback_store)
    helpful_count = sum(1 for f in feedback_store if f.get("helpful"))
    return {
        "feedbacks": feedback_store,
        "stats": {
            "totalFeedback": total,
            "helpfulPercentage": round((helpful_count / total) * 100) if total > 0 else 100,
            "adoptionRate": 94
        }
    }

@app.post("/api/chat")
def chat_endpoint(req: ChatRequest):
    field_info = FIELDS_DATA[0]
    soil_info = SOIL_DATA.get("field-a", {})
    context = {
        "crop": field_info["crop"],
        "moisture": soil_info.get("moisture", 41),
        "temp": WEATHER_DATA["currentTemp"]
    }
    answer = ai_service.chat_answer(req.message, context)
    return {"reply": answer}

@app.get("/api/agents")
def get_agents():
    return [
        {"id": "agent-vision", "name": "Crop Vision AI Agent", "status": "Active", "confidence": 94},
        {"id": "agent-soil", "name": "Soil Intelligence Agent", "status": "Active", "confidence": 96},
        {"id": "agent-weather", "name": "Weather Intelligence Agent", "status": "Active", "confidence": 91},
        {"id": "agent-irrigation", "name": "Irrigation Optimization Agent", "status": "Active", "confidence": 93},
        {"id": "agent-pest", "name": "Pest & Disease Risk Agent", "status": "Active", "confidence": 89},
        {"id": "agent-market", "name": "Market Intelligence Agent", "status": "Active", "confidence": 90},
        {"id": "agent-decision", "name": "Decision Synthesizer Agent", "status": "Active", "confidence": 91}
    ]

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
