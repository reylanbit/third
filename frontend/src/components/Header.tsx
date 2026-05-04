import Link from "next/link";
import { Stethoscope } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <Stethoscope className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-bold tracking-tight text-slate-900">Fala, Doutor</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/chat" className="text-slate-600 hover:text-blue-600 transition-colors">Chat</Link>
          <Link href="/ubs" className="text-slate-600 hover:text-blue-600 transition-colors">Mapa UBS</Link>
          <Link href="/history" className="text-slate-600 hover:text-blue-600 transition-colors">Histórico</Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/chat" className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700">
            Nova Triagem
          </Link>
        </div>
      </div>
    </header>
  );
}
