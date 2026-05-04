import json
import os
from geopy.distance import geodesic
from typing import List, Optional
from app.models.ubs import UbsBase, UbsProxima

class UbsService:
    def __init__(self):
        self.ubs_data: List[UbsBase] = []
        self._load_data()

    def _load_data(self):
        data_path = os.path.join(os.path.dirname(__file__), "..", "..", "data", "ubs_fortaleza.json")
        if os.path.exists(data_path):
            with open(data_path, "r", encoding="utf-8") as f:
                data = json.load(f)
                self.ubs_data = [UbsBase(**u) for u in data]

    def get_nearest_ubs(self, lat: float, lon: float, limit: int = 3) -> List[UbsProxima]:
        if not self.ubs_data:
            return []

        results = []
        user_coords = (lat, lon)

        for ubs in self.ubs_data:
            ubs_coords = (ubs.latitude, ubs.longitude)
            dist = geodesic(user_coords, ubs_coords).km
            results.append(UbsProxima(**ubs.model_dump(), distancia_km=round(dist, 2)))

        results.sort(key=lambda x: x.distancia_km)
        return results[:limit]

ubs_service = UbsService()
