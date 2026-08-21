from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class FarmModel(BaseModel):
    id: str
    name: str
    farmerName: str
    location: str
    state: str
    country: str
    totalArea: float
    fieldCount: int
    cropCount: int
    soilType: str
    primaryIrrigation: str

class FieldModel(BaseModel):
    id: str
    name: str
    crop: str
    cropVariety: str
    area: float
    stage: str
    health: str
    healthScore: int
    sowingDate: str
    expectedHarvest: str
    soilMoisture: int
    lastIrrigated: str
    pestRisk: int
    diseaseRisk: int
    targetYieldKg: int

class CropAnalysisRequest(BaseModel):
    imageBase64: Optional[str] = None
    crop: str = "Tomato"
    fieldId: str = "field-a"
    growthStage: str = "Flowering"
    mimeType: str = "image/jpeg"

class DecisionRequest(BaseModel):
    fieldId: str = "field-a"

class FeedbackRequest(BaseModel):
    decisionId: str
    fieldName: str
    actionTitle: str
    helpful: bool
    followedStatus: str
    comments: Optional[str] = ""
    actualOutcome: Optional[str] = ""

class ChatRequest(BaseModel):
    message: str
    activeFieldId: Optional[str] = "field-a"

class ReportRequest(BaseModel):
    type: str = "Weekly Farm Report"
