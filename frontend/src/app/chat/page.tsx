"use client";

import { useState } from "react";
import ChatWindow from "@/components/ChatWindow";
import { Message } from "@/components/MessageBubble";

export default function ChatPage() {
  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Triagem com IA</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">Descreva detalhadamente o que você está sentindo.</p>
      </div>
      
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-100 dark:border-slate-800 overflow-hidden min-h-[600px] flex flex-col transition-colors duration-300">
        <ChatWindow />
      </div>
    </div>
  );
}
