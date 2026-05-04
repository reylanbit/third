# 🏥 Fala, Doutor

<p align="center">
  <img src="https://img.shields.io/github/license/techlead/fala-doutor" alt="License" />
  <img src="https://img.shields.io/badge/Next.js-14-black" alt="Next.js" />
  <img src="https://img.shields.io/badge/FastAPI-0.111-green" alt="FastAPI" />
  <img src="https://img.shields.io/badge/IA-Mistral%207B-blue" alt="IA" />
</p>

**Fala, Doutor** é uma plataforma open-source desenvolvida para auxiliar cidadãos de Fortaleza/CE na triagem inicial de sintomas utilizando Inteligência Artificial e na localização das Unidades Básicas de Saúde (UBS) mais próximas.

## ✨ Funcionalidades

- 💬 **Triagem com IA**: Conversa em linguagem natural para descrever sintomas e receber orientações iniciais baseadas no modelo Mistral 7B.
- 🗺️ **Mapa de UBS**: Integração com OpenStreetMap para localizar as UBS mais próximas do seu CEP ou localização atual.
- 📄 **Histórico & PDF**: Acesso a triagens anteriores com opção de exportação para PDF para facilitar o diálogo com profissionais de saúde.
- ⚡ **Alta Performance**: Cache com Redis e banco de dados serverless para respostas instantâneas.

## 🚀 Tecnologias

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Leaflet.
- **Backend**: Python 3.12, FastAPI, SQLAlchemy, Pydantic.
- **IA/ML**: Hugging Face Inference API (Mistral 7B).
- **Infra**: Redis (Upstash), PostgreSQL (Neon), GitHub Actions.

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
# Preencha as chaves no arquivo .env
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
npm run dev
```

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---
Desenvolvido por [Tech Lead](https://github.com/techlead) - Projeto de Portfólio Senior.
