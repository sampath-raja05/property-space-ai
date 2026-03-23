from typing import Optional

from pydantic import BaseModel


class PropertyOut(BaseModel):
    id: int
    title: str
    city: str
    locality: str
    property_type: str
    bhk: int
    area_sqft: float
    price_inr: float
    latitude: float
    longitude: float

    model_config = {"from_attributes": True}


class PropertySearchParams(BaseModel):
    city: Optional[str] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None
    bhk: Optional[int] = None
    property_type: Optional[str] = None
    limit: int = 20
    offset: int = 0
