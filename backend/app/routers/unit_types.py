from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from typing import List

from ..db import get_session
from ..models import UnitType, UnitTypeRead

router = APIRouter()


@router.get("/", response_model=List[UnitTypeRead])
async def read_unit_types(db: Session = Depends(get_session)):
    """
    Retrieve all unit types.
    """
    unit_types = db.exec(select(UnitType)).all()
    return unit_types
