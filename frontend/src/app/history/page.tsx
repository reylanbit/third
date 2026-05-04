"use client";

import { useEffect, useState } from "react";
import { fetchFromBackend } from "@/lib/api-client";
import { History, FileText, Loader2, Calendar } from "lucide-react";
import PdfExportButton from "@/components/PdfExportButton";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await fetchFromBackend("/api/chat/historico");
        setHistory(data);
      } catch (error) {
        console.error("Erro ao carregar histórico:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadHistory();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Meu Histórico</h1>
          <p className="text-slate-600 mt-2">Suas triagens recentes e orientações.</p>
        </div>
        <History className="h-10 w-10 text-slate-200" />
      </div>

      {history.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <FileText className="h-12 w-12 text-slate-200 mx-auto mb-4" />
          <p className="text-slate-500">Você ainda não realizou nenhuma triagem.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {history.map((item) => (
            <div key={item.id} id={`triagem-${item.id}`} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div className="flex items-center space-x-2 text-xs font-medium text-slate-400">
                  <Calendar size={14} />
                  <span>{format(new Date(item.data_criacao), "PPP 'às' HH:mm", { locale: ptBR })}</span>
                </div>
                <PdfExportButton targetId={`triagem-${item.id}`} filename={`triagem-${item.id}.pdf`} />
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Sintomas Relatados</h4>
                  <p className="text-sm text-slate-700 italic">"{item.mensagem}"</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-slate-50 rounded-xl">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Resumo da IA</h4>
                    <p className="text-sm text-slate-800">{item.resumo}</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-xl">
                    <h4 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">Recomendação</h4>
                    <p className="text-sm text-blue-900 font-medium">{item.recomendacao}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Urgência:</span>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((u) => (
                      <div 
                        key={u}
                        className={`h-2 w-8 rounded-full ${u <= item.urgencia ? 'bg-blue-600' : 'bg-slate-200'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
