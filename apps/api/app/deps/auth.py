from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

from app.core.config import settings

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


def get_current_user(token: Annotated[str, Depends(oauth2_scheme)]) -> dict:
    try:
        payload = jwt.decode(token, settings.jwt_secret, algorithms=[settings.jwt_algorithm])
        return {"email": payload.get("sub"), "role": payload.get("role", "user")}
    except JWTError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token") from exc


def require_role(allowed: list[str]):
    def checker(user: Annotated[dict, Depends(get_current_user)]) -> dict:
        if user["role"] not in allowed:
            raise HTTPException(status_code=403, detail="Insufficient permissions")
        return user

    return checker
