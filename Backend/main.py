from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from sqlalchemy.orm import Session
from database import get_db, Base, engine
import models
from schemas import *   
from auth import router as auth_router
from routers import posts, user

app = FastAPI(title="Blogging API")

models.Base.metadata.create_all(bind=engine)

app.include_router(auth_router)
app.include_router(posts.router)
app.include_router(user.router)


# Serve uploaded images
UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")


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

