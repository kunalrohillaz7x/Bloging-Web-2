from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import get_db, Base, engine
import models
from schemas import *   
from auth import router as auth_router
from routers import posts, user

app = FastAPI(title="Blogging API")

app.include_router(auth_router)
app.include_router(posts.router)
app.include_router(user.router)

models.Base.metadata.create_all(bind=engine)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def read_root():
    return {"message": "Welcome to the Blogging API"}

