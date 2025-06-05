from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime, timezone


class ItemsBase(SQLModel):
    item_name: str = Field(index=True)
    description: Optional[str] = None


class Items(ItemsBase, table=True):
    item_id: Optional[int] = Field(default=None, primary_key=True)
    created_at: Optional[datetime] = Field(
        default_factory=lambda: datetime.now(timezone.utc), nullable=True
    )
    updated_at: Optional[datetime] = Field(
        default_factory=lambda: datetime.now(timezone.utc), nullable=True
    )


# what the items should look like when when read from the API
class ItemRead(ItemsBase):
    item_id: int
    created_at: datetime
    updated_at: datetime


# no extra fields needed for creation other than whats in ItemsBase
class ItemCreate(ItemsBase):
    pass


# everything is optional here because the clint might only want to update one field
class ItemUpdate(SQLModel):
    item_name: Optional[str] = None
    description: Optional[str] = None


class UnitTypeBase(SQLModel):
    # from schema: type_name VARCHAR(30) NOT NULL UNIQUE
    type_name: str = Field(unique=True, index=True)


class UnitType(UnitTypeBase, table=True):
    __tablename__ = "unit_types"
    type_id: Optional[int] = Field(default=None, primary_key=True)

    # relationship: a UnitType can be associated with multiple AttributeDefinitions
    attribute_definitions: List["AttributeDefinition"] = Relationship(
        back_populates="unit_type_details"
    )


class UnitTypeRead(UnitTypeBase):
    type_id: int


class AttributeDefinitionAPIBase(SQLModel):
    attribute_name: str
    data_type: Optional[str] = None
    allowed_values: Optional[str] = None


class AttributeDefinition(SQLModel, table=True):
    __tablename__ = "attribute_definitions"
    definition_id: Optional[int] = Field(default=None, primary_key=True)
    # from schema: attribute_name VARCHAR(50) NOT NULL UNIQUE
    attribute_name: str = Field(unique=True, index=True)
    data_type: Optional[str] = None
    allowed_values: Optional[str] = None

    # from schema: unit_type INT, FOREIGN KEY (unit_type) REFERENCES unit_types (type_id)
    unit_type: Optional[int] = Field(default=None, foreign_key="unit_types.type_id")

    # relationship: an AttributeDefinition refers to one UnitType
    unit_type_details: Optional[UnitType] = Relationship(
        back_populates="attribute_definitions"
    )


class AttributeDefinitionCreate(SQLModel):
    attribute_name: str
    unit_type_id: int  # frontend will provide the ID of an existing UnitType
    data_type: Optional[str] = None
    allowed_values: Optional[str] = None


class AttributeDefinitionRead(AttributeDefinitionAPIBase):
    definition_id: int
    unit_type: Optional[int] = None  # the actual foreign key value from the table
    unit_type_details: Optional[UnitTypeRead] = None


class AttributeDefinitionUpdate(SQLModel):
    attribute_name: Optional[str] = None
    unit_type_id: Optional[int] = None
    data_type: Optional[str] = None
    allowed_values: Optional[str] = None


class LocationBase(SQLModel):
    location_name: str = Field(index=True, unique=True)  # VARCHAR(50) NOT NULL UNIQUE
    location_description: Optional[str] = None  # VARCHAR(50)


class Locations(LocationBase, table=True):
    location_id: Optional[int] = Field(default=None, primary_key=True)


# reading a location
class LocationRead(LocationBase):
    location_id: int


# creating a new location
# 'location_name' (required); 'location_description' (optional)
class LocationCreate(LocationBase):
    pass


# updating an existing location (all fields optional)
class LocationUpdate(SQLModel):
    location_name: Optional[str] = None
    location_description: Optional[str] = None
