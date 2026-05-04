from fastapi import APIRouter, HTTPException, Depends
from app.models.chat import ChatRequest, ChatResponse
from app.services.huggingface_client import hf_client
from app.services.cache_service import cache_service
from app.utils.db import get_db, Triagem
from sqlalchemy.orm import Session
import hashlib

router = APIRouter()

@router.post("/", response_model=ChatResponse)
async def process_chat(request: ChatRequest, db: Session = Depends(get_db)):
    # Gera chave de cache
    cache_key = hashlib.sha256(request.message.encode()).hexdigest()
    
    # Verifica cache
    cached_data = await cache_service.get(cache_key)
    
    if cached_data:
        result = cached_data
    else:
        # Chama IA
        result = await hf_client.gerar_resumo_e_classificacao(request.message)
        # Salva no cache
        await cache_service.set(cache_key, result)

    # Salvar no banco de dados
    new_triagem = Triagem(
        mensagem=request.message,
        resumo=result["resumo"],
        urgencia=result["urgencia"],
        recomendacao=result["recomendacao"],
        cep=request.cep
    )
    db.add(new_triagem)
    db.commit()
    db.refresh(new_triagem)

    return ChatResponse(
        id=str(new_triagem.id),
        resumo=new_triagem.resumo,
        urgencia=new_triagem.urgencia,
        recomendacao=new_triagem.recomendacao,
        data_criacao=new_triagem.data_criacao
    )

@router.get("/historico")
async def get_historico(db: Session = Depends(get_db)):
    triagens = db.query(Triagem).order_by(Triagem.data_criacao.desc()).limit(20).all()
    return triagens
