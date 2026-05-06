# 🏥 Fala, Doutor

<p align="center">
  <img src="https://img.shields.io/github/license/reylanbit/third" alt="License" />
  <img src="https://img.shields.io/badge/Next.js-14-black" alt="Next.js" />
  <img src="https://img.shields.io/badge/FastAPI-0.111-green" alt="FastAPI" />
  <img src="https://img.shields.io/badge/IA-Mistral%207B-blue" alt="IA" />
  <img src="https://img.shields.io/badge/UI-Dark%20Mode-orange" alt="Dark Mode" />
</p>

**Fala, Doutor** é uma plataforma de teleorientação projetada para otimizar o fluxo de atendimento básico em Fortaleza/CE. Através da integração de modelos de linguagem de larga escala e serviços de geolocalização, a aplicação oferece um primeiro contato ágil, auxiliando na identificação de quadros clínicos e no direcionamento adequado à rede de saúde.

## 🌟 Proposta de Valor

A arquitetura do **Fala, Doutor** foi pensada para oferecer uma experiência de usuário técnica e eficiente:

### 1. 🧠 Processamento de Linguagem Natural para Triagem
O sistema interpreta relatos em linguagem natural, eliminando a barreira de formulários estáticos. A integração com o modelo **Mistral 7B** permite uma análise semântica profunda para gerar:
- **Síntese Clínica**: Resumo técnico dos pontos chaves do relato.
- **Estratificação de Risco**: Classificação baseada em protocolos clínicos internacionais.
- **Direcionamento Resolutivo**: Condutas específicas baseadas na urgência identificada.

### 2. 🗺️ Geolocalização e Gestão de Rede
Utiliza APIs de geolocalização para mapear em tempo real as **Unidades Básicas de Saúde (UBS)** mais próximas. O sistema calcula rotas e distâncias, servindo como uma ferramenta de logística de saúde para o cidadão.

### 3. 🌓 Design de Interface Adaptativo
Implementação de um sistema de design resiliente com suporte nativo a **Dark Mode**, focado em acessibilidade e conforto visual em diferentes cenários de uso.

### 4. 📄 Persistência e Portabilidade de Dados
Gestão de histórico de triagens com capacidade de exportação para **PDF**, permitindo que o usuário transporte informações estruturadas para consultas presenciais, otimizando o tempo do profissional de saúde.

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
