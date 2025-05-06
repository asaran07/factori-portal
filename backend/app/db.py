from sqlmodel import SQLModel, create_engine, Session
import os
from dotenv import load_dotenv

load_dotenv("../.env")

DATABASE_URL = os.getenv(
    "DATABASE_URL", "postgresql://postgres:secretpassword@localhost:5432/factori-db"
)

engine = create_engine(DATABASE_URL, echo=True)


def get_session():
    with Session(engine) as session:
        yield session
