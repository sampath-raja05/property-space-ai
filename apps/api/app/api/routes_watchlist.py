from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.deps.auth import get_current_user
from app.models.models import Property, User, Watchlist

router = APIRouter(prefix="/watchlist", tags=["watchlist"])


@router.post("/{property_id}")
def add_to_watchlist(
    property_id: int, db: Session = Depends(get_db), user: dict = Depends(get_current_user)
):
    db_user = db.execute(select(User).where(User.email == user["email"])).scalar_one_or_none()
    if not db_user:
        return {"message": "user not found"}
    prop = db.get(Property, property_id)
    if not prop:
        return {"message": "property not found"}
    db.add(Watchlist(user_id=db_user.id, property_id=property_id))
    db.commit()
    return {"message": "added"}


@router.get("")
def list_watchlist(db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    db_user = db.execute(select(User).where(User.email == user["email"])).scalar_one_or_none()
    if not db_user:
        return []
    stmt = (
        select(Property)
        .join(Watchlist, Watchlist.property_id == Property.id)
        .where(Watchlist.user_id == db_user.id)
    )
    rows = db.execute(stmt).scalars().all()
    return [{"id": row.id, "title": row.title, "city": row.city} for row in rows]
