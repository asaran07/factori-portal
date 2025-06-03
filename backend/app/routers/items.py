from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List

from ..db import get_session
from ..models import Items, ItemRead, ItemCreate, ItemUpdate

router = APIRouter()


# POST endpoint to create a new item
@router.post("/", response_model=ItemRead, status_code=status.HTTP_201_CREATED)
async def create_item_endpoint(item: ItemCreate, db: Session = Depends(get_session)):
    db_item = Items.model_validate(item)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


# this gets all items from the database
@router.get("/", response_model=List[ItemRead])
async def read_items_endpoint(db: Session = Depends(get_session)):
    # `statement` is the query object retuned from selecting items.
    statement = select(Items)  # select(Items) is like doing 'SELECT *'
    items = db.exec(statement).all()
    return items


# so now if we go to http://localhost:8000/api/v1/items/1 it will return the item with id 1
@router.get("/{item_id}", response_model=ItemRead)
async def read_item_by_id(item_id: int, db: Session = Depends(get_session)):
    # first argument is the SQLModel class, second is the primary key value.
    db_item = db.get(Items, item_id)
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item


# PATCH endpoint to update an existing item by its ID
@router.patch("/{item_id}", response_model=ItemRead)
async def update_item_endpoint(
    item_id: int, item_update: ItemUpdate, db: Session = Depends(get_session)
):
    db_item = db.get(Items, item_id)
    if not db_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Item not found"
        )

    update_data = item_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_item, key, value)

    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


# DELETE endpoint to delete an item by its ID
@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_item_endpoint(item_id: int, db: Session = Depends(get_session)):
    db_item = db.get(Items, item_id)
    if not db_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Item not found"
        )

    db.delete(db_item)
    db.commit()
    return None
