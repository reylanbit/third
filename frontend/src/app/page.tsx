import Link from "next/link";
import { Stethoscope, MapPin, History } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] p-4 sm:p-6 text-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-3xl space-y-6 sm:space-y-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          Fala, <span className="text-blue-600 dark:text-blue-400">Doutor</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Descreva seus sintomas e receba uma orientação inicial baseada em IA, 
          além de localizar as Unidades Básicas de Saúde mais próximas em Fortaleza.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <Link href="/chat" className="flex flex-col items-center p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 dark:border-slate-800 group">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full mb-4 group-hover:bg-blue-600 dark:group-hover:bg-blue-500 group-hover:text-white transition-colors">
              <Stethoscope size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Iniciar Triagem</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Fale com nossa IA sobre o que você está sentindo</p>
          </Link>

          <Link href="/ubs" className="flex flex-col items-center p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 dark:border-slate-800 group">
            <div className="p-4 bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full mb-4 group-hover:bg-green-600 dark:group-hover:bg-green-500 group-hover:text-white transition-colors">
              <MapPin size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Buscar UBS</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Encontre o posto de saúde mais próximo de você</p>
          </Link>

          <Link href="/history" className="flex flex-col items-center p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-md transition-all border border-slate-100 dark:border-slate-800 group">
            <div className="p-4 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full mb-4 group-hover:bg-purple-600 dark:group-hover:bg-purple-500 group-hover:text-white transition-colors">
              <History size={32} />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Meu Histórico</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Acesse suas triagens anteriores e exporte em PDF</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
