import Link from "next/link";
import { Stethoscope, MapPin, History } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-6 text-center">
      <div className="max-w-3xl space-y-8">
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
          Fala, <span className="text-blue-600">Doutor</span>
        </h1>
        <p className="text-xl text-slate-600">
          Descreva seus sintomas e receba uma orientação inicial baseada em IA, 
          além de localizar as Unidades Básicas de Saúde mais próximas em Fortaleza.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <Link href="/chat" className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 group">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-full mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Stethoscope size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Iniciar Triagem</h3>
            <p className="text-sm text-slate-500 mt-2">Fale com nossa IA sobre o que você está sentindo</p>
          </Link>

          <Link href="/ubs" className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 group">
            <div className="p-4 bg-green-50 text-green-600 rounded-full mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
              <MapPin size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Buscar UBS</h3>
            <p className="text-sm text-slate-500 mt-2">Encontre o posto de saúde mais próximo de você</p>
          </Link>

          <Link href="/history" className="flex flex-col items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-100 group">
            <div className="p-4 bg-purple-50 text-purple-600 rounded-full mb-4 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <History size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Meu Histórico</h3>
            <p className="text-sm text-slate-500 mt-2">Acesse suas triagens anteriores e exporte em PDF</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
