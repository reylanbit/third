"use client";

import { useState, useRef, useEffect } from "react";
import MessageBubble, { Message } from "./MessageBubble";
import { Send, Loader2 } from "lucide-react";
import { sendMessage } from "@/actions/chat";

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! Sou o assistente virtual do Fala, Doutor. Como posso ajudar você hoje? Por favor, descreva seus sintomas.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev: Message[]) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const data = await sendMessage(input);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.resumo,
        sender: "bot",
        timestamp: new Date(),
        metadata: {
          urgencia: data.urgencia,
          recomendacao: data.recomendacao,
        },
      };

      setMessages((prev: Message[]) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Desculpe, ocorreu um erro ao processar sua solicitação. Tente novamente mais tarde.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev: Message[]) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full flex-1">
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50"
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
              <span className="text-sm text-slate-500">Analisando sintomas...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ex: Estou com febre e dor de cabeça há 2 dias..."
            className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            aria-label="Enviar mensagem"
            className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-[10px] text-slate-400 mt-2 text-center uppercase tracking-wider font-semibold">
          Aviso: Esta é uma ferramenta de orientação e não substitui consulta médica.
        </p>
      </div>
    </div>
  );
}
