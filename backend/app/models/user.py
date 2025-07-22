from pydantic import BaseModel, Field, EmailStr
from enum import Enum


class UserRole(str, Enum):
    USER = "user"
    ADMIN = "admin"


class UserCreateRequest(BaseModel):
    """ユーザー作成リクエストのスキーマ"""

    name: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    age: int = Field(..., ge=18, le=120)
    role: UserRole = UserRole.USER


class UserResponse(BaseModel):
    """ユーザーレスポンスのスキーマ"""

    id: int
    name: str
    email: str
    age: int
    role: UserRole
