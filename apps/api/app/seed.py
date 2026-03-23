from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.db.session import Base, SessionLocal, engine
from app.models.models import Property, Tenant, User


def run_seed() -> None:
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()
    try:
        tenant = Tenant(name="Default Tenant")
        db.add(tenant)
        db.flush()

        user = User(
            tenant_id=tenant.id,
            email="admin@propertyspace.ai",
            password_hash=hash_password("admin123"),
            role="admin",
        )
        db.add(user)

        records = [
            Property(
                tenant_id=tenant.id,
                title="2 BHK Near IT Park",
                city="Pune",
                locality="Hinjewadi",
                property_type="Apartment",
                bhk=2,
                area_sqft=980,
                price_inr=7800000,
                latitude=18.5912,
                longitude=73.7389,
            ),
            Property(
                tenant_id=tenant.id,
                title="3 BHK Premium Tower",
                city="Bengaluru",
                locality="Whitefield",
                property_type="Apartment",
                bhk=3,
                area_sqft=1560,
                price_inr=14500000,
                latitude=12.9698,
                longitude=77.7499,
            ),
            Property(
                tenant_id=tenant.id,
                title="Residential Plot",
                city="Indore",
                locality="Super Corridor",
                property_type="Plot",
                bhk=0,
                area_sqft=1200,
                price_inr=4200000,
                latitude=22.7522,
                longitude=75.906,
            ),
        ]
        db.add_all(records)
        db.commit()
    finally:
        db.close()


if __name__ == "__main__":
    run_seed()
