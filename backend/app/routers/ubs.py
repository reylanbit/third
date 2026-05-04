from fastapi import APIRouter, Query, HTTPException
from app.models.ubs import UbsListResponse
from app.services.ubs_service import ubs_service
from app.services.geocoding import geocoding_service
from typing import Optional

router = APIRouter()

@router.get("/proximas", response_model=UbsListResponse)
async def get_ubs_proximas(
    lat: Optional[float] = Query(None),
    lon: Optional[float] = Query(None),
    cep: Optional[str] = Query(None)
):
    if cep:
        coords = await geocoding_service.get_coordinates(cep)
        if not coords:
            raise HTTPException(status_code=400, detail="CEP não encontrado")
        lat, lon = coords
    
    if lat is None or lon is None:
        raise HTTPException(status_code=400, detail="Latitude/Longitude ou CEP são necessários")

    ubs_list = ubs_service.get_nearest_ubs(lat, lon)
    return UbsListResponse(ubs=ubs_list)
