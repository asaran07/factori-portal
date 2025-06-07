from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session, select

from ..db import get_session
from ..models import (
    ItemAttribute,
    ItemAttributeCreate,
    ItemAttributeUpdate,
    ItemAttributeRead,
    Items,
    AttributeDefinition,
)

router = APIRouter()


@router.post("/", response_model=ItemAttributeRead, status_code=status.HTTP_201_CREATED)
def create_item_attribute(
    item_attribute: ItemAttributeCreate, db: Session = Depends(get_session)
):
    """
    Assign a new attribute to an item.
    """
    item = db.get(Items, item_attribute.item_id)
    if not item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Item with id {item_attribute.item_id} not found.",
        )

    attr_def = db.get(AttributeDefinition, item_attribute.definition_id)
    if not attr_def:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"AttributeDefinition with id {item_attribute.definition_id} not found.",
        )

    # check for uniqueness: an item should not have the same attribute definition twice
    existing_attribute = db.exec(
        select(ItemAttribute).where(
            ItemAttribute.item_id == item_attribute.item_id,
            ItemAttribute.definition_id == item_attribute.definition_id,
        )
    ).first()
    if existing_attribute:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Item {item.item_name} already has the attribute {attr_def.attribute_name}.",
        )

    db_item_attribute = ItemAttribute.model_validate(item_attribute)
    db.add(db_item_attribute)
    db.commit()
    db.refresh(db_item_attribute)
    return db_item_attribute


@router.patch("/{attribute_id}", response_model=ItemAttributeRead)
def update_item_attribute(
    attribute_id: int,
    item_attribute_update: ItemAttributeUpdate,
    db: Session = Depends(get_session),
):
    """
    Update the value or unit of an item's assigned attribute.
    """
    db_item_attribute = db.get(ItemAttribute, attribute_id)
    if not db_item_attribute:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="ItemAttribute not found",
        )

    update_data = item_attribute_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_item_attribute, key, value)

    db.add(db_item_attribute)
    db.commit()
    db.refresh(db_item_attribute)
    return db_item_attribute


@router.delete("/{attribute_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_item_attribute(attribute_id: int, db: Session = Depends(get_session)):
    """
    Remove an assigned attribute from an item.
    """
    db_item_attribute = db.get(ItemAttribute, attribute_id)
    if not db_item_attribute:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="ItemAttribute not found",
        )

    db.delete(db_item_attribute)
    db.commit()
    return None
