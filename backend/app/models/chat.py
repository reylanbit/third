from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, description="Mensagem descrevendo os sintomas")
    cep: Optional[str] = Field(None, description="CEP do usuário para busca de UBS")

class ChatResponse(BaseModel):
    id: Optional[str] = None
    resumo: str
    urgencia: int
    recomendacao: str
    data_criacao: datetime = Field(default_factory=datetime.now)

class TriagemDB(BaseModel):
    id: int
    mensagem: str
    resumo: str
    urgencia: int
    recomendacao: str
    cep: Optional[str]
    data_criacao: datetime
