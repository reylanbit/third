import httpx
from typing import Optional, Tuple

class GeocodingService:
    def __init__(self):
        self.base_url = "https://nominatim.openstreetmap.org/search"
        self.headers = {"User-Agent": "FalaDoutorApp/1.0"}

    async def get_coordinates(self, cep: str) -> Optional[Tuple[float, float]]:
        params = {
            "postalcode": cep,
            "country": "Brasil",
            "format": "json"
        }
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(self.base_url, params=params, headers=self.headers)
                if response.status_code == 200:
                    data = response.json()
                    if data:
                        return float(data[0]["lat"]), float(data[0]["lon"])
        except Exception:
            pass
        return None

geocoding_service = GeocodingService()
