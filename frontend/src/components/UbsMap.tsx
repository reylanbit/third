"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix para ícones do Leaflet no Next.js
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const userIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const ubsIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 14);
    }
  }, [center, map]);
  return null;
}

interface UbsMapProps {
  ubsList: any[];
  center: [number, number] | null;
}

export default function UbsMap({ ubsList, center }: UbsMapProps) {
  const defaultCenter: [number, number] = [-3.731862, -38.526670]; // Fortaleza Centro

  return (
    <MapContainer 
      center={center || defaultCenter} 
      zoom={13} 
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {center && (
        <>
          <ChangeView center={center} />
          <Marker position={center} icon={userIcon}>
            <Popup>Você está aqui</Popup>
          </Marker>
        </>
      )}

      {ubsList.map((ubs, index) => (
        <Marker 
          key={index} 
          position={[ubs.latitude, ubs.longitude]}
          icon={ubsIcon}
        >
          <Popup>
            <div className="p-1">
              <h3 className="font-bold text-slate-900">{ubs.nome}</h3>
              <p className="text-xs text-slate-500 mt-1">{ubs.endereco}</p>
              <p className="text-xs text-slate-500">{ubs.bairro}</p>
              <div className="mt-2 text-[10px] font-bold text-blue-600 uppercase">
                {ubs.distancia_km} km de distância
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
