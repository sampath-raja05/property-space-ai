import httpx
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.core.config import settings
from app.db.session import get_db
from app.deps.auth import require_role
from app.models.models import Property

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("/score/{property_id}")
async def property_score(
    property_id: int,
    db: Session = Depends(get_db),
    _: dict = Depends(require_role(["analyst", "admin"])),
):
    prop = db.get(Property, property_id)
    if not prop:
        raise HTTPException(status_code=404, detail="Property not found")

    payload = {
        "city": prop.city,
        "locality": prop.locality,
        "area_sqft": prop.area_sqft,
        "price_inr": prop.price_inr,
        "bhk": prop.bhk,
    }
    async with httpx.AsyncClient(timeout=10) as client:
        response = await client.post(f"{settings.ml_base_url}/predict", json=payload)
    response.raise_for_status()
    return response.json()
