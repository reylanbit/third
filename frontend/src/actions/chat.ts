"use server";

export async function sendMessage(message: string) {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
  
  try {
    const res = await fetch(`${backendUrl}/api/chat/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
      cache: 'no-store'
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.detail || "Falha na comunicação com o assistente");
    }

    return res.json();
  } catch (error) {
    console.error("Error in sendMessage server action:", error);
    throw error;
  }
}
