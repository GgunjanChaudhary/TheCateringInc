from pathlib import Path
import uuid

from dotenv import load_dotenv
from fastapi import Header, HTTPException
import os


ENV_PATH = Path(__file__).resolve().parent / ".env"
load_dotenv(ENV_PATH)
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "")

_valid_tokens: set[str] = set()


def login_with_password(password: str) -> str | None:
    if not ADMIN_PASSWORD or password != ADMIN_PASSWORD:
        return None

    token = str(uuid.uuid4())
    _valid_tokens.add(token)
    return token


def revoke_token(token: str) -> None:
    _valid_tokens.discard(token)


def verify_token(authorization: str = Header(default="")) -> str:
    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid authorization header")

    token = authorization.removeprefix("Bearer ").strip()
    if not token or token not in _valid_tokens:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    return token
