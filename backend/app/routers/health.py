from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.utils.db import get_db
from app.services.cache_service import cache_service
import time

router = APIRouter()

@router.get("/")
async def health_check(db: Session = Depends(get_db)):
    health_status = {
        "status": "ok",
        "timestamp": time.time(),
        "services": {
            "database": "down",
            "redis": "down"
        }
    }
    
    # Check DB
    try:
        db.execute("SELECT 1")
        health_status["services"]["database"] = "up"
    except Exception:
        pass
        
    # Check Redis
    try:
        if cache_service.redis:
            await cache_service.redis.ping()
            health_status["services"]["redis"] = "up"
    except Exception:
        pass

    if any(s == "down" for s in health_status["services"].values()):
        health_status["status"] = "degraded"
        
    return health_status
