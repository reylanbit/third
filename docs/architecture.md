# Arquitetura - Fala, Doutor

## Visão Geral
O projeto utiliza uma arquitetura de monorepo dividida em `frontend` (Next.js) e `backend` (FastAPI).

## Componentes
- **Frontend**: Next.js 14 com App Router, Tailwind CSS para estilização e Leaflet para mapas.
- **Backend**: FastAPI para alto desempenho, Pydantic para validação e SQLAlchemy para ORM.
- **IA**: Mistral 7B via Hugging Face Inference API para processamento de linguagem natural.
- **Cache**: Redis (Upstash) para evitar chamadas redundantes à API de IA.
- **Banco de Dados**: PostgreSQL (Neon) para persistência de dados de triagem.

## Fluxo de Dados
1. Usuário envia sintomas via Frontend.
2. Frontend chama o Backend (FastAPI).
3. Backend verifica cache no Redis.
4. Se não houver cache, chama Hugging Face API.
5. Resultado é salvo no PostgreSQL e retornado ao Frontend.
6. Frontend exibe orientações e permite buscar UBS próximas.
