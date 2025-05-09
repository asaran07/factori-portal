from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from typing import List

from ..db import get_session
from ..models import Items

router = APIRouter()


@router.get("/", response_model=List[Items])
async def read_items_endpoint(db: Session = Depends(get_session)):
    # `statement` is the query object retuned from selecting items.
    statement = select(Items)  # select(Items) is like doing 'SELECT *'
    items = db.exec(statement).all()
    return items
