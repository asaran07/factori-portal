from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime


class Items(SQLModel, table=True):
    item_id: Optional[int] = Field(default=None, primary_key=True)
    item_name: str = Field(index=True)
    description: Optional[str] = None
    created_at: Optional[datetime] = Field(
        default_factory=datetime.utcnow, nullable=True
    )
    updated_at: Optional[datetime] = Field(
        default_factory=datetime.utcnow, nullable=True
    )
