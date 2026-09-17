from fastapi import APIRouter,Depends,status,HTTPException
from sqlalchemy.orm import Session
from database import get_db
import schemas,models,utils
from typing import List

router = APIRouter(prefix="/users",tags=["users"])

@router.get("/",response_model=List[schemas.UserResponse])
def get_users(
    db:Session=Depends(get_db)
):
    users = db.query(models.User).all()
    return users

