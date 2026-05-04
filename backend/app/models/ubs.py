from pydantic import BaseModel
from typing import List

class UbsBase(BaseModel):
    nome: str
    endereco: str
    bairro: str
    latitude: float
    longitude: float

class UbsProxima(UbsBase):
    distancia_km: float

class UbsListResponse(BaseModel):
    ubs: List[UbsProxima]
