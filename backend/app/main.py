from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import users


app = FastAPI(
    title="User API",
    version="1.0.0",
    description="シンプルなユーザー管理API",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],
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
