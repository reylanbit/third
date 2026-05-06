from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text
from sqlalchemy.orm import declarative_base, sessionmaker
from app.utils.config import settings
import datetime

DATABASE_URL = settings.DATABASE_URL or "sqlite:///./fala_doutor.db"
# Compatibilidade com URLs do Heroku/Neon que usam postgres://
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class Triagem(Base):
    __tablename__ = "triagens"

    id = Column(Integer, primary_key=True, index=True)
    mensagem = Column(Text)
    resumo = Column(Text)
    urgencia = Column(Integer)
    recomendacao = Column(Text)
    cep = Column(String, nullable=True)
    data_criacao = Column(DateTime, default=datetime.datetime.utcnow)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
