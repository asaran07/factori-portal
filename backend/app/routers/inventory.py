from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List

from ..db import get_session
from ..models import Inventory, Items, InventoryReadWithLocation

router = APIRouter()


@router.get("/item/{item_id}", response_model=List[InventoryReadWithLocation])
async def get_inventory_by_item_id(item_id: int, db: Session = Depends(get_session)):
    """
    Retrieve all inventory entries for a specific item, including location details.
    """
    item = db.get(Items, item_id)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item with id {item_id} not found.",
        )

    inventory_entries = db.exec(
        select(Inventory).where(Inventory.item_id == item_id)
    ).all()
    return inventory_entries
