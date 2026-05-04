# 🏥 Fala, Doutor

<p align="center">
  <img src="https://img.shields.io/github/license/reylanbit/third" alt="License" />
  <img src="https://img.shields.io/badge/Next.js-14-black" alt="Next.js" />
  <img src="https://img.shields.io/badge/FastAPI-0.111-green" alt="FastAPI" />
  <img src="https://img.shields.io/badge/IA-Mistral%207B-blue" alt="IA" />
  <img src="https://img.shields.io/badge/UI-Dark%20Mode-orange" alt="Dark Mode" />
</p>

**Fala, Doutor** é uma plataforma inteligente desenvolvida para auxiliar cidadãos de Fortaleza/CE. O projeto combina Inteligência Artificial avançada com geolocalização para oferecer uma triagem de saúde rápida, acessível e humana.

## 🌟 O que você irá experienciar?

Ao utilizar o **Fala, Doutor**, o usuário passa por uma jornada fluida e intuitiva:

### 1. 🧠 Triagem Inteligente e Humanizada
Esqueça formulários rígidos. Você descreve o que está sentindo em linguagem natural (ex: *"Estou com uma dor de cabeça que lateja e um pouco de febre desde ontem"*). Nossa IA, baseada no modelo **Mistral 7B**, analisa seu relato e fornece:
- **Resumo Clínico**: Uma síntese clara do que foi relatado.
- **Classificação de Urgência**: Uma escala visual de 1 a 5 para ajudar você a entender a gravidade.
- **Recomendação Personalizada**: Orientações baseadas nos protocolos de saúde (ex: procurar uma UBS em 24h ou ligar para o SAMU 192).

### 2. 🗺️ Localização Estratégica de Saúde
Não sabe onde ir? O sistema identifica as **Unidades Básicas de Saúde (UBS) de Fortaleza** mais próximas de você através do seu CEP ou localização GPS em tempo real. O mapa interativo permite visualizar a rota e a distância exata até o posto de saúde.

### 3. 🌓 Interface Adaptável (Dark Mode)
Uma experiência confortável em qualquer horário. Com o novo **Modo Escuro**, você pode realizar sua triagem durante a noite sem cansaço visual, alternando facilmente entre os temas com um único clique.

### 4. 📄 Seu Histórico na Palma da Mão
Todas as suas triagens ficam salvas. Você pode:
- Revisar orientações passadas.
- **Exportar para PDF**: Gere um documento profissional com o resumo da IA para mostrar ao médico durante a consulta, facilitando o diagnóstico.

## 🚀 Tecnologias de Ponta

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Leaflet (Mapas), Framer Motion.
- **Backend**: Python 3.13, FastAPI, SQLAlchemy (SQLite/PostgreSQL).
- **IA/ML**: Hugging Face Inference API (Mistral 7B Instruct).
- **Infra & Cache**: Redis (Upstash) para respostas instantâneas e persistência robusta.

## 🛠️ Instalação Local

### Pré-requisitos
- Node.js 20+
- Python 3.12+

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # ou venv\Scripts\activate no Windows
pip install -r requirements.txt
cp .env.example .env
# Adicione sua HUGGINGFACE_API_KEY no arquivo .env
$env:PYTHONPATH="."; python -m uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---
Desenvolvido por [Reylan](https://github.com/reylanbit).
