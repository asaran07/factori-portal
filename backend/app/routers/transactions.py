from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from ..db import get_session
from ..models import (
    Inventory,
    InventoryTransactions,
    InventoryMoveRequest,
    Items,
    Locations,
)

router = APIRouter()


@router.post("/move-inventory", status_code=status.HTTP_200_OK)
def move_item_inventory(
    move_request: InventoryMoveRequest, db: Session = Depends(get_session)
):
    """
    Move a specified quantity of an item from a source location to a destination location
    within a single atomic transaction.
    """
    if move_request.source_location_id == move_request.destination_location_id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Source and destination locations cannot be the same.",
        )

    try:
        source_inventory_statement = select(Inventory).where(
            Inventory.item_id == move_request.item_id,
            Inventory.location_id == move_request.source_location_id,
        )
        source_inventory = db.exec(source_inventory_statement).first()

        if not source_inventory or source_inventory.quantity < move_request.quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Insufficient quantity at the source location.",
            )

        source_inventory.quantity -= move_request.quantity

        dest_inventory_statement = select(Inventory).where(
            Inventory.item_id == move_request.item_id,
            Inventory.location_id == move_request.destination_location_id,
        )
        dest_inventory = db.exec(dest_inventory_statement).first()

        if not dest_inventory:
            # if the item doesn't exist at the destination, create a new inventory record.
            dest_inventory = Inventory(
                item_id=move_request.item_id,
                location_id=move_request.destination_location_id,
                quantity=0,
            )
            db.add(dest_inventory)

        dest_inventory.quantity += move_request.quantity

        item_name = db.get(Items, move_request.item_id).item_name
        source_loc_name = db.get(
            Locations, move_request.source_location_id
        ).location_name
        dest_loc_name = db.get(
            Locations, move_request.destination_location_id
        ).location_name

        transaction_out = InventoryTransactions(
            item_id=move_request.item_id,
            location_id=move_request.source_location_id,
            quantity=-move_request.quantity,
            transaction_description=f"Moved to {dest_loc_name}",
        )
        transaction_in = InventoryTransactions(
            item_id=move_request.item_id,
            location_id=move_request.destination_location_id,
            quantity=move_request.quantity,
            transaction_description=f"Moved from {source_loc_name}",
        )
        db.add(transaction_out)
        db.add(transaction_in)

        # if all operations were successful, commit the transaction.
        db.commit()

        db.refresh(source_inventory)
        db.refresh(dest_inventory)

        return {
            "message": f"Successfully moved {move_request.quantity} of '{item_name}' from '{source_loc_name}' to '{dest_loc_name}'.",
            "source_inventory": source_inventory,
            "destination_inventory": dest_inventory,
        }

    except HTTPException as http_exc:
        db.rollback()
        raise http_exc
    except Exception as e:
        # if any error occurs at any step, roll back all changes.
        db.rollback()
        # raise a generic server error
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected error occurred: {e}. The transaction has been rolled back.",
        )
