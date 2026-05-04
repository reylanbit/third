"use client";

import { cn } from "@/lib/utils";
import { User, Bot, AlertTriangle, MapPin } from "lucide-react";
import Link from "next/link";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  metadata?: {
    urgencia: int;
    recomendacao: string;
  };
}

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isBot = message.sender === "bot";
  const urgencyColors = [
    "bg-slate-100 text-slate-600",
    "bg-green-100 text-green-700",
    "bg-yellow-100 text-yellow-700",
    "bg-orange-100 text-orange-700",
    "bg-red-100 text-red-700",
    "bg-red-200 text-red-900 font-bold animate-pulse",
  ];

  return (
    <div className={cn("flex w-full mb-4", isBot ? "justify-start" : "justify-end")}>
      <div className={cn("flex max-w-[80%] space-x-2", isBot ? "flex-row" : "flex-row-reverse space-x-reverse")}>
        <div className={cn(
          "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm",
          isBot ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-600"
        )}>
          {isBot ? <Bot size={18} /> : <User size={18} />}
        </div>
        
        <div className="space-y-2">
          <div className={cn(
            "p-4 rounded-2xl shadow-sm text-sm leading-relaxed",
            isBot ? "bg-white border border-slate-100 text-slate-800" : "bg-blue-600 text-white"
          )}>
            {message.text}
          </div>

          {isBot && message.metadata && (
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className={cn(
                "p-3 rounded-xl border flex items-center space-x-3",
                urgencyColors[message.metadata.urgencia] || urgencyColors[0]
              )}>
                <AlertTriangle size={18} />
                <div className="text-xs">
                  <span className="font-bold uppercase block">Nível de Urgência: {message.metadata.urgencia}/5</span>
                  {message.metadata.recomendacao}
                </div>
              </div>
              
              <Link 
                href="/ubs" 
                className="inline-flex items-center space-x-2 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                <MapPin size={14} />
                <span>Ver UBS próximas em Fortaleza</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
