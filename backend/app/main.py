from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import chat, ubs, health
from app.utils.config import settings

app = FastAPI(title="Fala, Doutor API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])
app.include_router(ubs.router, prefix="/api/ubs", tags=["UBS"])
app.include_router(health.router, prefix="/api/health", tags=["Health"])

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
