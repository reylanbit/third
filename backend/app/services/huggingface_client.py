import httpx
import json
import re
from app.utils.config import settings
from typing import Dict, Any

class HuggingFaceClient:
    def __init__(self):
        self.api_url = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"
        self.headers = {"Authorization": f"Bearer {settings.HUGGINGFACE_API_KEY}"}

    async def gerar_resumo_e_classificacao(self, texto: str) -> Dict[str, Any]:
        # Se não houver chave real, usa o modo de demonstração (mock)
        if not settings.HUGGINGFACE_API_KEY or "placeholder" in settings.HUGGINGFACE_API_KEY or "hf_xxxx" in settings.HUGGINGFACE_API_KEY:
            return self._mock_triage(texto)

        prompt = f"""Você é um assistente médico virtual. Com base nos sintomas descritos, forneça:
        1) Um resumo clínico simples (máximo 200 caracteres).
        2) Uma classificação de urgência de 1 a 5, onde:
            1: não urgente, pode agendar consulta eletiva;
            2: pouco urgente, orientação em UBS em até 72h;
            3: urgência moderada, procurar UBS em até 24h;
            4: urgente, procurar UPA em até 2h;
            5: emergência, ligar para SAMU 192 imediatamente.
        3) Uma recomendação final.
        Responda NO FORMATO JSON exato: {{"resumo": "...", "urgencia": <int>, "recomendacao": "..."}}
        Sintomas: '{texto}'
        """
        
        fallback_response = self._mock_triage(texto)

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    self.api_url,
                    headers=self.headers,
                    json={
                        "inputs": prompt,
                        "parameters": {"max_new_tokens": 500, "temperature": 0.3}
                    }
                )
                
                if response.status_code != 200:
                    print(f"Erro na API do Hugging Face: {response.status_code} - {response.text}")
                    return fallback_response

                result = response.json()
                if isinstance(result, list) and len(result) > 0:
                    generated_text = result[0].get('generated_text', '')
                elif isinstance(result, dict):
                    generated_text = result.get('generated_text', '')
                else:
                    generated_text = str(result)
                
                match = re.search(r'\{.*\}', generated_text, re.DOTALL)
                if match:
                    json_str = match.group(0)
                    try:
                        return json.loads(json_str)
                    except json.JSONDecodeError as e:
                        print(f"Erro ao decodificar JSON da IA: {e}")
                
                return fallback_response

        except Exception as e:
            print(f"Erro inesperado no cliente Hugging Face: {e}")
            return fallback_response

    def _mock_triage(self, texto: str) -> Dict[str, Any]:
        texto_lower = texto.lower()
        
        # Lógica simples de palavras-chave para demonstração (Mock)
        if any(w in texto_lower for w in ["dor no peito", "falta de ar", "desmai", "infarto", "parada"]):
            return {
                "resumo": "Sintomas de ALTA GRAVIDADE detectados.",
                "urgencia": 5,
                "recomendacao": "EMERGÊNCIA: Ligue para o SAMU 192 imediatamente ou vá ao pronto-socorro mais próximo."
            }
        elif any(w in texto_lower for w in ["sangue", "fratura", "corte profundo", "acidente"]):
            return {
                "resumo": "Lesão traumática ou sangramento significativo.",
                "urgencia": 4,
                "recomendacao": "URGENTE: Procure uma UPA ou hospital em até 2 horas."
            }
        elif any(w in texto_lower for w in ["febre alta", "dor forte", "vômito", "diarreia intensa"]):
            return {
                "resumo": "Sintomas de urgência moderada.",
                "urgencia": 3,
                "recomendacao": "Procure uma Unidade Básica de Saúde (UBS) ou UPA em até 24 horas."
            }
        elif any(w in texto_lower for w in ["gripe", "tosse", "resfriado", "dor leve", "garganta"]):
            return {
                "resumo": "Sintomas leves sugestivos de quadro viral ou inflamação simples.",
                "urgencia": 2,
                "recomendacao": "Procure orientação em uma UBS em até 72 horas. Repouse e hidrate-se."
            }
        else:
            return {
                "resumo": "Relato de sintomas recebido para análise.",
                "urgencia": 1,
                "recomendacao": "Caso os sintomas persistam ou piorem, agende uma consulta na sua UBS de referência."
            }

hf_client = HuggingFaceClient()
