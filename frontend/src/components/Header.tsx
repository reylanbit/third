"use client";

import Link from "next/link";
import { Stethoscope, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-950/80 backdrop-blur-md dark:border-slate-800 transition-colors duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <Stethoscope className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50">Fala, Doutor</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/chat" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Chat</Link>
          <Link href="/ubs" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Mapa UBS</Link>
          <Link href="/history" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Histórico</Link>
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <ThemeToggle />
          <Link href="/chat" className="hidden sm:inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700">
            Nova Triagem
          </Link>
          <button 
            className="md:hidden p-2 text-slate-600 dark:text-slate-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t dark:border-slate-800 bg-white dark:bg-slate-950 p-4 space-y-4 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            <Link 
              href="/chat" 
              className="text-slate-600 dark:text-slate-400 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Chat
            </Link>
            <Link 
              href="/ubs" 
              className="text-slate-600 dark:text-slate-400 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Mapa UBS
            </Link>
            <Link 
              href="/history" 
              className="text-slate-600 dark:text-slate-400 font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Histórico
            </Link>
          </nav>
          <Link 
            href="/chat" 
            className="flex w-full h-10 items-center justify-center rounded-md bg-blue-600 text-white font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Nova Triagem
          </Link>
        </div>
      )}
    </header>
  );
}
