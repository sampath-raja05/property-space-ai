from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.cache import cache_get, cache_set
from app.db.session import get_db
from app.deps.auth import get_current_user
from app.models.models import Property
from app.schemas.property import PropertyOut

router = APIRouter(prefix="/properties", tags=["properties"])


@router.get("", response_model=list[PropertyOut])
def search_properties(
    city: str | None = Query(default=None),
    min_price: float | None = Query(default=None),
    max_price: float | None = Query(default=None),
    bhk: int | None = Query(default=None),
    property_type: str | None = Query(default=None),
    limit: int = Query(default=20, le=100),
    offset: int = Query(default=0),
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_user),
) -> list[PropertyOut]:
    cache_key = f"properties:{city}:{min_price}:{max_price}:{bhk}:{property_type}:{limit}:{offset}"
    cached = cache_get(cache_key)
    if cached:
        return cached

    stmt = select(Property)
    if city:
        stmt = stmt.where(Property.city.ilike(f"%{city}%"))
    if min_price is not None:
        stmt = stmt.where(Property.price_inr >= min_price)
    if max_price is not None:
        stmt = stmt.where(Property.price_inr <= max_price)
    if bhk is not None:
        stmt = stmt.where(Property.bhk == bhk)
    if property_type:
        stmt = stmt.where(Property.property_type == property_type)

    stmt = stmt.limit(limit).offset(offset)
    rows = db.execute(stmt).scalars().all()
    response = [PropertyOut.model_validate(row).model_dump() for row in rows]
    cache_set(cache_key, response, ttl_seconds=120)
    return response


@router.get("/{property_id}", response_model=PropertyOut)
def get_property(
    property_id: int,
    db: Session = Depends(get_db),
    _: dict = Depends(get_current_user),
) -> PropertyOut:
    row = db.get(Property, property_id)
    if not row:
        raise HTTPException(status_code=404, detail="Property not found")
    return PropertyOut.model_validate(row)
