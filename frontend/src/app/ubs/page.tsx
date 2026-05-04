"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Search, MapPin, Loader2 } from "lucide-react";
import { fetchFromBackend } from "@/lib/api-client";

// Carregamento dinâmico do mapa para evitar erros de SSR com Leaflet
const UbsMap = dynamic(() => import("@/components/UbsMap"), { 
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full bg-slate-100 animate-pulse rounded-xl flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
    </div>
  )
});

export default function UbsPage() {
  const [cep, setCep] = useState("");
  const [ubsList, setUbsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  const handleSearch = async () => {
    if (!cep && !userLocation) return;
    setIsLoading(true);
    try {
      const query = cep ? `cep=${cep}` : userLocation ? `lat=${userLocation[0]}&lon=${userLocation[1]}` : "";
      if (!query) return;
      
      const data = await fetchFromBackend(`/api/ubs/proximas?${query}`);
      setUbsList(data.ubs);
    } catch (error) {
      console.error("Erro ao buscar UBS:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
          handleSearch();
        },
        (error) => {
          console.error("Erro ao obter localização:", error);
          alert("Não foi possível obter sua localização. Por favor, digite o CEP.");
        }
      );
    }
  };

  return (
    <div className="container mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">UBS Próximas</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Encontre o atendimento mais perto de você em Fortaleza.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative">
            <input
              type="text"
              value={cep}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCep(e.target.value)}
              placeholder="Digite seu CEP"
              className="w-full sm:w-48 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:outline-none text-slate-900 dark:text-slate-100"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search size={16} />}
            <span>Buscar</span>
          </button>
          <button
            onClick={handleGetCurrentLocation}
            className="bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center space-x-2"
          >
            <MapPin size={16} />
            <span>Usar minha localização</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden h-[600px]">
          <UbsMap ubsList={ubsList} center={userLocation} />
        </div>

        <div className="space-y-4 overflow-y-auto max-h-[600px] pr-2">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 px-2">Resultados</h3>
          {ubsList.length === 0 ? (
            <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
              <MapPin className="h-8 w-8 text-slate-300 dark:text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-500 dark:text-slate-400">Nenhuma UBS encontrada. <br/>Faça uma busca por CEP ou localização.</p>
            </div>
          ) : (
            ubsList.map((ubs: any, index: number) => (
              <div key={index} className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group">
                <h4 className="font-bold text-slate-900 dark:text-slate-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{ubs.nome}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{ubs.endereco}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{ubs.bairro}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
                    {ubs.distancia_km} km de distância
                  </span>
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${ubs.latitude},${ubs.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold text-slate-400 dark:text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 uppercase transition-colors"
                  >
                    Ver no Google Maps
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
