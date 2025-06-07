from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from typing import List

from ..db import get_session
from ..models import UnitDefinition, UnitDefinitionRead

router = APIRouter()


@router.get("/", response_model=List[UnitDefinitionRead])
async def read_unit_definitions(db: Session = Depends(get_session)):
    """
    Retrieve all unit definitions.
    """
    unit_definitions = db.exec(select(UnitDefinition)).all()
    return unit_definitions
