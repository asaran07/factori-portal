from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime, timezone

# =================================================================
# 1. Unit & Attribute Foundational Models
# =================================================================


class UnitTypeBase(SQLModel):
    type_name: str = Field(unique=True, index=True)


class UnitType(UnitTypeBase, table=True):
    __tablename__ = "unit_types"
    type_id: Optional[int] = Field(default=None, primary_key=True)
    attribute_definitions: List["AttributeDefinition"] = Relationship(
        back_populates="unit_type_details"
    )
    unit_definitions: List["UnitDefinition"] = Relationship(back_populates="type")


class UnitTypeRead(UnitTypeBase):
    type_id: int


class UnitDefinitionBase(SQLModel):
    unit_name: str = Field(unique=True)
    type_id: int = Field(foreign_key="unit_types.type_id")


class UnitDefinition(UnitDefinitionBase, table=True):
    __tablename__ = "unit_definitions"
    unit_id: Optional[int] = Field(default=None, primary_key=True)
    type: UnitType = Relationship(back_populates="unit_definitions")
    item_attributes: List["ItemAttribute"] = Relationship(back_populates="unit")


class UnitDefinitionRead(UnitDefinitionBase):
    unit_id: int


class AttributeDefinitionAPIBase(SQLModel):
    attribute_name: str
    data_type: Optional[str] = None
    allowed_values: Optional[str] = None


class AttributeDefinition(SQLModel, table=True):
    __tablename__ = "attribute_definitions"
    definition_id: Optional[int] = Field(default=None, primary_key=True)
    attribute_name: str = Field(unique=True, index=True)
    data_type: Optional[str] = None
    allowed_values: Optional[str] = None
    unit_type: Optional[int] = Field(default=None, foreign_key="unit_types.type_id")
    unit_type_details: Optional[UnitType] = Relationship(
        back_populates="attribute_definitions"
    )
    item_attributes: List["ItemAttribute"] = Relationship(back_populates="definition")


class AttributeDefinitionRead(AttributeDefinitionAPIBase):
    definition_id: int
    unit_type: Optional[int] = None
    unit_type_details: Optional[UnitTypeRead] = None


class AttributeDefinitionCreate(SQLModel):
    attribute_name: str
    unit_type_id: int
    data_type: Optional[str] = None
    allowed_values: Optional[str] = None


class AttributeDefinitionUpdate(SQLModel):
    attribute_name: Optional[str] = None
    unit_type_id: Optional[int] = None
    data_type: Optional[str] = None
    allowed_values: Optional[str] = None


# =================================================================
# 2. Item Models & Item-Attribute Link Models
#
#    NOTE: ItemAttribute models are defined before the Item models
#    that reference them to prevent forward reference errors.
# =================================================================


class ItemAttributeBase(SQLModel):
    attribute_value: Optional[str] = None
    item_id: int = Field(foreign_key="items.item_id")
    definition_id: int = Field(foreign_key="attribute_definitions.definition_id")
    unit_id: Optional[int] = Field(default=None, foreign_key="unit_definitions.unit_id")


class ItemAttribute(ItemAttributeBase, table=True):
    __tablename__ = "item_attributes"
    attribute_id: Optional[int] = Field(default=None, primary_key=True)
    item: "Items" = Relationship(back_populates="attributes")
    definition: AttributeDefinition = Relationship(back_populates="item_attributes")
    unit: Optional[UnitDefinition] = Relationship(back_populates="item_attributes")


class ItemAttributeRead(SQLModel):
    attribute_id: int
    attribute_value: Optional[str]
    definition: AttributeDefinitionRead
    unit: Optional[UnitDefinitionRead] = None


class ItemAttributeCreate(SQLModel):
    item_id: int
    definition_id: int
    attribute_value: Optional[str] = None
    unit_id: Optional[int] = None


class ItemAttributeUpdate(SQLModel):
    attribute_value: Optional[str] = None
    unit_id: Optional[int] = None


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
    inventory_entries: List["Inventory"] = Relationship(back_populates="item")
    transactions: List["InventoryTransactions"] = Relationship(back_populates="item")
    attributes: List[ItemAttribute] = Relationship(back_populates="item")


class ItemRead(ItemsBase):
    item_id: int
    created_at: datetime
    updated_at: datetime


class ItemReadWithAttributes(ItemRead):
    attributes: List[ItemAttributeRead] = []


class ItemCreate(ItemsBase):
    pass


class ItemUpdate(SQLModel):
    item_name: Optional[str] = None
    description: Optional[str] = None


# =================================================================
# 3. Location, Supplier, and Inventory Models
# =================================================================


class LocationBase(SQLModel):
    location_name: str = Field(index=True, unique=True)
    location_description: Optional[str] = None


class Locations(LocationBase, table=True):
    location_id: Optional[int] = Field(default=None, primary_key=True)
    inventory_entries: List["Inventory"] = Relationship(back_populates="location")
    transactions: List["InventoryTransactions"] = Relationship(
        back_populates="location"
    )


class LocationRead(LocationBase):
    location_id: int


class LocationCreate(LocationBase):
    pass


class LocationUpdate(SQLModel):
    location_name: Optional[str] = None
    location_description: Optional[str] = None


class SupplierBase(SQLModel):
    supplier_name: str = Field(index=True, unique=True)


class Suppliers(SupplierBase, table=True):
    supplier_id: Optional[int] = Field(default=None, primary_key=True)
    transactions: List["InventoryTransactions"] = Relationship(
        back_populates="supplier"
    )


class SupplierRead(SupplierBase):
    supplier_id: int


class SupplierCreate(SupplierBase):
    pass


class SupplierUpdate(SQLModel):
    supplier_name: Optional[str] = None


class InventoryBase(SQLModel):
    quantity: float = Field(default=0)
    item_id: int = Field(foreign_key="items.item_id")
    location_id: Optional[int] = Field(
        default=None, foreign_key="locations.location_id"
    )


class Inventory(InventoryBase, table=True):
    inventory_id: Optional[int] = Field(default=None, primary_key=True)
    item: "Items" = Relationship(back_populates="inventory_entries")
    location: Optional["Locations"] = Relationship(back_populates="inventory_entries")


class InventoryTransactionsBase(SQLModel):
    quantity: float
    transaction_description: Optional[str] = Field(default=None, max_length=50)
    item_id: int = Field(foreign_key="items.item_id")
    location_id: Optional[int] = Field(
        default=None, foreign_key="locations.location_id"
    )
    supplier_id: Optional[int] = Field(
        default=None, foreign_key="suppliers.supplier_id"
    )


class InventoryTransactions(InventoryTransactionsBase, table=True):
    __tablename__ = "inventory_transactions"
    transaction_id: Optional[int] = Field(default=None, primary_key=True)
    transaction_date: datetime = Field(
        default_factory=lambda: datetime.now(timezone.utc)
    )
    item: "Items" = Relationship(back_populates="transactions")
    location: Optional["Locations"] = Relationship(back_populates="transactions")
    supplier: Optional["Suppliers"] = Relationship(back_populates="transactions")


class InventoryRead(InventoryBase):
    inventory_id: int


class InventoryReadWithLocation(InventoryRead):
    location: Optional[LocationRead] = None


class InventoryMoveRequest(SQLModel):
    item_id: int
    source_location_id: int
    destination_location_id: int
    quantity: float
