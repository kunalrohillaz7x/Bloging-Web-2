from fastapi import HTTPException,status,Depends,APIRouter
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from database import get_db
import schemas,models,utils
from werkzeug.security import generate_password_hash,check_password_hash


router = APIRouter(tags=["Authentication"])

#register
@router.post("/signup", response_model=schemas.UserResponse, status_code=status.HTTP_201_CREATED)
def register(
    user:schemas.UserCreate,
    db:Session = Depends(get_db)
):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST,detail="User already exists")
    hashed_password = generate_password_hash(user.password)
    new_user = models.User(
        username = user.username,   
        email = user.email,
        hashed_password = hashed_password
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user 
 
@router.post("/login", response_model=schemas.Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db:Session = Depends(get_db)
):
    # Try to find user by username (Swagger sends "username" field)
    user = db.query(models.User).filter(models.User.username == form_data.username).first()
    # Also try by email in case they entered their email in the username field
    if not user:
        user = db.query(models.User).filter(models.User.email == form_data.username).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invalid credentials")
    if not check_password_hash(user.hashed_password, form_data.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="Invalid credentials")
    token = utils.create_token(user.email)
    return {"access_token":token,"token_type":"bearer","user":{"username":user.username,"email":user.email}}    