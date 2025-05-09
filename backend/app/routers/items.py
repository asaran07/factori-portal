from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from typing import List

from ..db import get_session
from ..models import Items, ItemRead

router = APIRouter()


@router.get("/", response_model=List[ItemRead])
async def read_items_endpoint(db: Session = Depends(get_session)):
    # `statement` is the query object retuned from selecting items.
    statement = select(Items)  # select(Items) is like doing 'SELECT *'
    items = db.exec(statement).all()
    return items


@router.get("/{item_id}", response_model=ItemRead)
async def read_item_by_id(item_id: int, db: Session = Depends(get_session)):
    # first argument is the SQLModel class, second is the primary key value.
    db_item = db.get(Items, item_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item
