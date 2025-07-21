from fastapi import FastAPI
from fastapi.routing import APIRoute
from fastapi.middleware.cors import CORSMiddleware
from app.routers import users


def custom_generate_unique_id(route: APIRoute) -> str:
    """すべてのルートでユニークなoperation_idを生成"""
    if route.path_format.split("/")[1]:
        operation_id = f"{route.path_format.split('/')[1]}--{route.name}"
    else:
        operation_id = route.name
    return operation_id


app = FastAPI(
    title="User API",
    version="1.0.0",
    description="シンプルなユーザー管理API",
    contact={
        "name": "User API Team",
        "url": "https://example.com/contact",
        "email": "api-support@example.com",
    },
    license_info={
        "name": "MIT License",
        "url": "https://opensource.org/licenses/MIT",
    },
    generate_unique_id_function=custom_generate_unique_id,
    openapi_tags=[
        {
            "name": "Users",
            "description": "ユーザー管理API",
        },
    ],
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(users.router, prefix="/api/v1")


@app.get("/")
async def root():
    return {"message": "User API is running"}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
