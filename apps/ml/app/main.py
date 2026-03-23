from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="Property Space ML Service", version="0.1.0")


class PredictIn(BaseModel):
    city: str
    locality: str
    area_sqft: float
    price_inr: float
    bhk: int


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/predict")
def predict(payload: PredictIn) -> dict:
    base_price = payload.area_sqft * 8500 + payload.bhk * 250000
    location_bonus = 1.12 if payload.city.lower() in {"bengaluru", "mumbai", "gurugram"} else 1.0
    predicted_price = base_price * location_bonus
    investment_score = max(1, min(100, int((predicted_price / max(payload.price_inr, 1)) * 65)))
    location_score = max(1, min(100, 72 if location_bonus > 1 else 61))
    return {
        "predicted_price_inr": round(predicted_price, 2),
        "investment_score": investment_score,
        "location_score": location_score,
        "model_version": "baseline-0.1",
        "shap_explanations": {
            "area_sqft": round(payload.area_sqft * 6.8, 2),
            "bhk": round(payload.bhk * 15.0, 2),
            "city": 12.0 if location_bonus > 1 else 4.0,
        },
    }
