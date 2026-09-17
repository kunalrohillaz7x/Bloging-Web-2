from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    username: str
    password: str
    email: str

class UserLogin(BaseModel):
    email: Optional[str] = None
    username: Optional[str] = None
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: str

    class Config:
        from_attributes = True

UserResponse = UserOut

class Token(BaseModel):
    access_token: str
    token_type: str
    user: Optional[dict] = None

class PostCreate(BaseModel):
    title: str
    content: str

class PostOut(BaseModel):
    id: int
    title: str
    content: str
    user_id: Optional[int] = None
    author: Optional[str] = None

    class Config:
        from_attributes = True
