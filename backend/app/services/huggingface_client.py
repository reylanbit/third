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

        prompt = f"""Você é um Médico Especialista com Mestrado e Doutorado em Saúde Pública e Emergências Clínicas. 
        Sua tarefa é realizar uma triagem clínica rigorosa e humanizada baseada no Protocolo de Manchester.

        DIRETRIZES DE ANÁLISE:
        1. Identifique sinais de alerta (red flags) imediatamente.
        2. Avalie a cronicidade vs. agudização dos sintomas.
        3. Considere o impacto funcional relatado.

        CLASSIFICAÇÃO DE RISCO (1-5):
        - 5 (VERMELHO): Emergência imediata. Risco de vida. Ex: Infarto, AVC, obstrução de via aérea, choque.
        - 4 (LARANJA): Muito Urgente. Risco de agravamento rápido. Ex: Dor intensa, fraturas expostas, febre altíssima persistente.
        - 3 (AMARELO): Urgente. Gravidade moderada. Ex: Crise hipertensiva leve, vômitos incoercíveis, dor moderada.
        - 2 (VERDE): Pouco Urgente. Baixo risco. Ex: Sintomas virais leves, dores crônicas sem alteração aguda.
        - 1 (AZUL): Não Urgente. Casos eletivos. Ex: Troca de receitas, sintomas leves há longa data.

        FORMATO DE RESPOSTA (JSON APENAS):
        {{
            "resumo": "Síntese técnica e profissional do quadro clínico (máx 200 carac).",
            "urgencia": <int de 1 a 5>,
            "recomendacao": "Conduta médica precisa: local de atendimento (SAMU, UPA, UBS) e tempo sugerido."
        }}

        SINTOMAS DO PACIENTE: '{texto}'
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
        
        # Lógica de Triagem Acadêmica (Protocolo de Manchester Adaptado)
        
        # PRIORIDADE 5 - EMERGÊNCIA (VERMELHO)
        if any(w in texto_lower for w in ["dor no peito", "falta de ar", "desmai", "infarto", "parada", "consciência", "convulsão"]):
            return {
                "resumo": "Quadro clínico compatível com Emergência de Alta Complexidade.",
                "urgencia": 5,
                "recomendacao": "EMERGÊNCIA: Acione o SAMU 192 imediatamente ou dirija-se ao Hospital de Emergência mais próximo. Risco de vida iminente."
            }
        
        # PRIORIDADE 4 - MUITO URGENTE (LARANJA)
        elif any(w in texto_lower for w in ["sangue", "fratura", "corte profundo", "acidente", "queimadura grave", "hemorragia"]):
            return {
                "resumo": "Trauma agudo ou instabilidade clínica moderada detectada.",
                "urgencia": 4,
                "recomendacao": "MUITO URGENTE: Procure uma Unidade de Pronto Atendimento (UPA) imediatamente. Tempo de espera sugerido: < 10min."
            }
        
        # PRIORIDADE 3 - URGENTE (AMARELO)
        elif any(w in texto_lower for w in ["febre alta", "dor forte", "vômito", "diarreia intensa", "crise de ansiedade", "pressão alta"]):
            return {
                "resumo": "Sintomatologia aguda com necessidade de intervenção terapêutica em curto prazo.",
                "urgencia": 3,
                "recomendacao": "URGENTE: Procure uma UPA ou sua UBS de referência em até 24 horas para avaliação clínica presencial."
            }
        
        # PRIORIDADE 2 - POUCO URGENTE (VERDE)
        elif any(w in texto_lower for w in ["gripe", "tosse", "resfriado", "dor leve", "garganta", "coriza", "ouvido"]):
            return {
                "resumo": "Quadro clínico de baixa complexidade sugestivo de etiologia viral ou inflamatória leve.",
                "urgencia": 2,
                "recomendacao": "POUCO URGENTE: Atendimento em Unidade Básica de Saúde (UBS). Mantenha hidratação vigorosa e repouse."
            }
        
        # PRIORIDADE 1 - NÃO URGENTE (AZUL)
        else:
            return {
                "resumo": "Sintomas inespecíficos ou condições crônicas sem sinais de agudização.",
                "urgencia": 1,
                "recomendacao": "NÃO URGENTE: Agende uma consulta eletiva com seu médico de família na UBS. Monitore os sintomas."
            }

hf_client = HuggingFaceClient()
