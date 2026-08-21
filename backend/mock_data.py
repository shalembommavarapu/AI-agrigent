"""
Mock agricultural data for Indian Precision Agriculture (Andhra Pradesh domain)
"""

DEMO_FARM = {
    "id": "farm-ap-01",
    "name": "Green Valley Farm",
    "farmerName": "Ravi Kumar",
    "location": "Guntur District",
    "state": "Andhra Pradesh",
    "country": "India",
    "totalArea": 9.0,
    "fieldCount": 3,
    "cropCount": 3,
    "soilType": "Red Sandy Loam & Black Cotton",
    "primaryIrrigation": "Drip & Canal System"
}

FIELDS_DATA = [
    {
        "id": "field-a",
        "name": "Field A (North Ridge)",
        "crop": "Tomato",
        "cropVariety": "Arka Rakshak (High Yield)",
        "area": 2.4,
        "stage": "Flowering",
        "health": "Excellent",
        "healthScore": 92,
        "sowingDate": "2026-06-15",
        "expectedHarvest": "2026-09-20",
        "soilMoisture": 41,
        "lastIrrigated": "3 days ago (Drip)",
        "pestRisk": 32,
        "diseaseRisk": 18,
        "targetYieldKg": 24000
    },
    {
        "id": "field-b",
        "name": "Field B (East Terraces)",
        "crop": "Rice",
        "cropVariety": "BPT 5204 (Sona Masoori)",
        "area": 4.8,
        "stage": "Vegetative",
        "health": "Good",
        "healthScore": 88,
        "sowingDate": "2026-07-01",
        "expectedHarvest": "2026-11-10",
        "soilMoisture": 78,
        "lastIrrigated": "Yesterday (Basin)",
        "pestRisk": 44,
        "diseaseRisk": 28,
        "targetYieldKg": 28800
    },
    {
        "id": "field-c",
        "name": "Field C (South Plot)",
        "crop": "Chili",
        "cropVariety": "Guntur Sannam (Hot)",
        "area": 1.8,
        "stage": "Fruiting",
        "health": "Moderate",
        "healthScore": 76,
        "sowingDate": "2026-05-20",
        "expectedHarvest": "2026-09-30",
        "soilMoisture": 52,
        "lastIrrigated": "2 days ago (Drip)",
        "pestRisk": 58,
        "diseaseRisk": 42,
        "targetYieldKg": 7500
    }
]

SOIL_DATA = {
    "field-a": {
        "fieldId": "field-a",
        "moisture": 41,
        "moistureStatus": "Deficit",
        "pH": 6.7,
        "phStatus": "Optimal",
        "nitrogen": 58,
        "phosphorus": 42,
        "potassium": 72,
        "organicMatter": 2.4,
        "soilTemperature": 25.8,
        "texture": "Sandy Loam",
        "depthProfile": [
            {"depth": "0-15 cm (Topsoil)", "moisture": 38, "temp": 27.2},
            {"depth": "15-30 cm (Root zone)", "moisture": 41, "temp": 25.8},
            {"depth": "30-60 cm (Subsoil)", "moisture": 54, "temp": 24.1}
        ]
    }
}

IRRIGATION_DATA = {
    "field-a": {
        "fieldId": "field-a",
        "fieldName": "Field A (Tomato)",
        "recommendedDate": "Tomorrow Morning",
        "recommendedTime": "6:00 AM – 8:00 AM",
        "waterAmountLiters": 2800,
        "durationMinutes": 45,
        "priority": "High",
        "reasons": [
            "Soil moisture in root zone dropped to 41% (approaching 40% threshold)",
            "Tomato is in critical Flowering stage; water stress causes blossom abortion",
            "No significant precipitation expected within next 48-72 hours",
            "Early morning slot minimizes evaporation loss by up to 28%"
        ],
        "waterSavingsPct": 22,
        "method": "Micro-Drip Line with Pulse Flow"
    }
}

WEATHER_DATA = {
    "currentTemp": 31,
    "condition": "Partly Sunny",
    "humidity": 72,
    "rainProbability": 12,
    "windSpeedKmH": 14,
    "uvIndex": 7,
    "alerts": [
        {
            "id": "alert-rain-48h",
            "type": "Rain",
            "severity": "medium",
            "title": "Monsoon Trough Approaching",
            "message": "Isolated light-to-moderate rain is expected within the next 48-60 hours (35% probability). Consider calibrating next irrigation cycle accordingly."
        }
    ]
}

MARKET_DATA = {
    "Tomato": {
        "crop": "Tomato",
        "currentPrice": 34,
        "mandiRateQuintal": 3400,
        "weeklyChangePct": 8.4,
        "demandLevel": "High",
        "marketTrend": "Bullish",
        "aiInsight": "Tomato prices gained +8.4% this week in Guntur/Vijayawada markets. Current wholesale demand is strong."
    },
    "Rice": {
        "crop": "Rice",
        "currentPrice": 28,
        "mandiRateQuintal": 2800,
        "weeklyChangePct": 2.1,
        "demandLevel": "High",
        "marketTrend": "Neutral",
        "aiInsight": "Stable spot rate across Andhra Pradesh procurement yards."
    },
    "Chili": {
        "crop": "Chili",
        "currentPrice": 145,
        "mandiRateQuintal": 14500,
        "weeklyChangePct": 12.3,
        "demandLevel": "Very High",
        "marketTrend": "Bullish",
        "aiInsight": "Guntur Mirchi Yard reports surging export demand for premium Sannam pods."
    }
}
