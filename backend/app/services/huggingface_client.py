import httpx
import json
from app.utils.config import settings
from typing import Dict, Any

class HuggingFaceClient:
    def __init__(self):
        self.api_url = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"
        self.headers = {"Authorization": f"Bearer {settings.HUGGINGFACE_API_KEY}"}

    async def gerar_resumo_e_classificacao(self, texto: str) -> Dict[str, Any]:
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
        
        fallback_response = {
            "resumo": "Desculpe, não foi possível processar sua mensagem agora.",
            "urgencia": 0,
            "recomendacao": "Em caso de emergência, ligue 192."
        }

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
                    return fallback_response

                result = response.json()
                # O Mistral pode retornar uma lista de gerações ou o texto direto
                if isinstance(result, list) and len(result) > 0:
                    generated_text = result[0].get('generated_text', '')
                elif isinstance(result, dict):
                    generated_text = result.get('generated_text', '')
                else:
                    generated_text = str(result)
                
                # Tenta extrair o JSON da resposta de forma mais robusta
                import re
                match = re.search(r'\{.*\}', generated_text, re.DOTALL)
                if match:
                    json_str = match.group(0)
                    try:
                        return json.loads(json_str)
                    except json.JSONDecodeError:
                        pass
                
                return fallback_response

        except Exception:
            return fallback_response

hf_client = HuggingFaceClient()
