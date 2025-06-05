from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select
from typing import List

from ..db import get_session
from ..models import (
    AttributeDefinition,
    AttributeDefinitionCreate,
    AttributeDefinitionRead,
    AttributeDefinitionUpdate,
    UnitType,
)

router = APIRouter()


@router.post(
    "/", response_model=AttributeDefinitionRead, status_code=status.HTTP_201_CREATED
)
async def create_attribute_definition(
    attr_def_create: AttributeDefinitionCreate, db: Session = Depends(get_session)
):
    """
    Create a new attribute definition.
    """
    unit_type = db.get(UnitType, attr_def_create.unit_type_id)
    if not unit_type:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"UnitType with id {attr_def_create.unit_type_id} not found. Cannot create attribute definition.",
        )

    db_attr_def = AttributeDefinition(
        attribute_name=attr_def_create.attribute_name,
        unit_type=attr_def_create.unit_type_id,
        data_type=attr_def_create.data_type,
        allowed_values=attr_def_create.allowed_values,
    )

    db.add(db_attr_def)
    db.commit()
    db.refresh(db_attr_def)
    return db_attr_def


@router.get("/", response_model=List[AttributeDefinitionRead])
async def read_attribute_definitions(db: Session = Depends(get_session)):
    """
    Retrieve all attribute definitions.
    """
    attribute_definitions = db.exec(select(AttributeDefinition)).all()
    return attribute_definitions


@router.get("/{definition_id}", response_model=AttributeDefinitionRead)
async def read_attribute_definition_by_id(
    definition_id: int, db: Session = Depends(get_session)
):
    """
    Retrieve a single attribute definition by its ID.
    """
    db_attr_def = db.get(AttributeDefinition, definition_id)
    if not db_attr_def:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="AttributeDefinition not found",
        )
    return db_attr_def


@router.patch("/{definition_id}", response_model=AttributeDefinitionRead)
async def update_attribute_definition(
    definition_id: int,
    attr_def_update: AttributeDefinitionUpdate,
    db: Session = Depends(get_session),
):
    """
    Update an existing attribute definition.
    """
    db_attr_def = db.get(AttributeDefinition, definition_id)
    if not db_attr_def:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="AttributeDefinition not found",
        )

    update_data = attr_def_update.model_dump(exclude_unset=True)

    if "unit_type_id" in update_data and update_data["unit_type_id"] is not None:
        unit_type = db.get(UnitType, update_data["unit_type_id"])
        if not unit_type:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"UnitType with id {update_data['unit_type_id']} not found. Cannot update attribute definition.",
            )
        db_attr_def.unit_type = update_data.pop("unit_type_id")
    elif "unit_type_id" in update_data and update_data["unit_type_id"] is None:
        db_attr_def.unit_type = None
        update_data.pop("unit_type_id")

    for key, value in update_data.items():
        setattr(db_attr_def, key, value)

    db.add(db_attr_def)
    db.commit()
    db.refresh(db_attr_def)
    return db_attr_def


@router.delete("/{definition_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_attribute_definition(
    definition_id: int, db: Session = Depends(get_session)
):
    """
    Delete an attribute definition by its ID.
    """
    db_attr_def = db.get(AttributeDefinition, definition_id)
    if not db_attr_def:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="AttributeDefinition not found",
        )

    db.delete(db_attr_def)
    db.commit()
    return None
