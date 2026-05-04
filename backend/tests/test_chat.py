import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.utils.db import get_db, Base, engine
from sqlalchemy.orm import sessionmaker

# Setup database para testes
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health/")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

def test_ubs_proximas_missing_params():
    response = client.get("/api/ubs/proximas")
    assert response.status_code == 400
    assert "detail" in response.json()

def test_chat_invalid_payload():
    response = client.post("/api/chat/", json={})
    assert response.status_code == 422
