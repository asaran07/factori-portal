from sqlmodel import SQLModel, create_engine, Session
import os
from dotenv import load_dotenv

load_dotenv("../.env")

DATABASE_URL = os.getenv(
    "DATABASE_URL", "postgresql://postgres:secretpassword@localhost:5432/factori-db"
)

engine = create_engine(DATABASE_URL, echo=True)


# FastAPI uses this function as a dependency to provide a fresh
# database `Session` to any route function that asks for it.
# each session is like a single, short-lived conversation
# with the database for a single request.
def get_session():
    with Session(engine) as session:
        yield session
