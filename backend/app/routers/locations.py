from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import Session, select
from typing import List

from ..db import get_session
from ..models import (
    Locations,
    LocationRead,
    LocationCreate,
    LocationUpdate,
    Inventory,
    InventoryTransactions,
)

router = APIRouter()


# create a new location
@router.post("/", response_model=LocationRead, status_code=status.HTTP_201_CREATED)
async def create_location_endpoint(
    location_create: LocationCreate, db: Session = Depends(get_session)
):
    # check if location name already exists
    existing_location = db.exec(
        select(Locations).where(
            Locations.location_name == location_create.location_name
        )
    ).first()
    if existing_location:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Location name already exists.",
        )

    db_location = Locations.model_validate(location_create)
    db.add(db_location)
    db.commit()
    db.refresh(db_location)
    return db_location


# read all locations
@router.get("/", response_model=List[LocationRead])
async def read_locations_endpoint(db: Session = Depends(get_session)):
    locations = db.exec(select(Locations)).all()
    return locations


# read a single location by its ID
@router.get("/{location_id}", response_model=LocationRead)
async def read_location_by_id_endpoint(
    location_id: int, db: Session = Depends(get_session)
):
    db_location = db.get(Locations, location_id)
    if not db_location:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Location not found"
        )
    return db_location


# update an existing location by its ID
@router.patch("/{location_id}", response_model=LocationRead)
async def update_location_endpoint(
    location_id: int,
    location_update: LocationUpdate,
    db: Session = Depends(get_session),
):
    db_location = db.get(Locations, location_id)
    if not db_location:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Location not found"
        )

    update_data = location_update.model_dump(exclude_unset=True)

    if (
        "location_name" in update_data
        and update_data["location_name"] != db_location.location_name
    ):
        existing_location_with_new_name = db.exec(
            select(Locations).where(
                Locations.location_name == update_data["location_name"]
            )
        ).first()
        if existing_location_with_new_name:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Another location with this name already exists.",
            )

    for key, value in update_data.items():
        setattr(db_location, key, value)

    db.add(db_location)
    db.commit()
    db.refresh(db_location)
    return db_location


@router.delete("/{location_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_location_endpoint(
    location_id: int,
    confirm_orphan: bool = Query(
        False,
        alias="confirmOrphan",
        description="Confirm deletion even if records in other tables will be orphaned (set to NULL).",
    ),
    db: Session = Depends(get_session),
):
    db_location = db.get(Locations, location_id)
    if not db_location:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Location not found"
        )

    # check for dependencies if confirm_orphan is False
    if not confirm_orphan:
        inventory_dependency = db.exec(
            select(Inventory).where(Inventory.location_id == location_id).limit(1)
        ).first()
        transaction_dependency = db.exec(
            select(InventoryTransactions)
            .where(InventoryTransactions.location_id == location_id)
            .limit(1)
        ).first()

        if inventory_dependency or transaction_dependency:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="This location is currently assigned to inventory items or transactions. "
                "Deleting it will set these references to NULL. To proceed, "
                "please send the request again with the 'confirmOrphan=true' query parameter.",
            )

    db.delete(db_location)
    db.commit()
    return None
