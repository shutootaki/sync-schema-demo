from fastapi import APIRouter, HTTPException
from app.models.user import UserCreateRequest, UserResponse
import random


router = APIRouter(tags=["Users"])


def generate_user_id() -> int:
    """デモ用のユーザーID生成関数"""
    return random.randint(1, 10000)


users_db: dict = {}


@router.post("/users", response_model=UserResponse)
async def create_user(user_data: UserCreateRequest) -> UserResponse:
    """ユーザーを作成する"""
    new_user = {
        "id": generate_user_id(),
        "name": user_data.name,
        "email": user_data.email,
        "age": user_data.age,
        "role": user_data.role,
    }

    users_db[new_user["id"]] = new_user
    return UserResponse.model_validate(new_user)


@router.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: int) -> UserResponse:
    """ユーザーを取得する"""
    user = users_db.get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="ユーザーが見つかりません")
    return UserResponse.model_validate(user)
