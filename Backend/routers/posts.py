from fastapi import APIRouter, Depends, status, HTTPException, Response, UploadFile, File, Form
from sqlalchemy.orm import Session
from database import get_db
import schemas, models, utils
from typing import List, Optional
import uuid
import os

UPLOAD_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)

MAX_IMAGE_SIZE = 5 * 1024 * 1024  # 5 MB
ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}

router = APIRouter(prefix="/posts", tags=["posts"])


def _save_image(file: UploadFile) -> str:
    """Save an uploaded image and return its URL path."""
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File type '{ext}' not allowed. Use: {', '.join(ALLOWED_EXTENSIONS)}"
        )

    contents = file.file.read()
    if len(contents) > MAX_IMAGE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Image too large. Maximum size is 5 MB."
        )

    filename = f"{uuid.uuid4().hex}{ext}"
    filepath = os.path.join(UPLOAD_DIR, filename)
    with open(filepath, "wb") as f:
        f.write(contents)

    return f"/uploads/{filename}"


def _delete_image(image_url: str):
    """Delete an image file from disk if it exists."""
    if not image_url:
        return
    filename = image_url.split("/")[-1]
    filepath = os.path.join(UPLOAD_DIR, filename)
    if os.path.exists(filepath):
        os.remove(filepath)


def _post_to_out(post, author: str = None) -> schemas.PostOut:
    """Convert a Post model to PostOut schema."""
    return schemas.PostOut(
        id=post.id,
        title=post.title,
        content=post.content,
        image_url=post.image_url,
        user_id=post.user_id,
        author=author or (post.owner.username if post.owner else None),
    )


@router.post("/", response_model=schemas.PostOut, status_code=status.HTTP_201_CREATED)
def create_post(
    title: str = Form(...),
    content: str = Form(...),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(utils.get_current_user)
):
    image_url = None
    if image and image.filename:
        image_url = _save_image(image)

    new_post = models.Post(
        title=title,
        content=content,
        image_url=image_url,
        user_id=current_user.id
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return _post_to_out(new_post, current_user.username)


@router.get("/", response_model=List[schemas.PostOut])
def get_posts(db: Session = Depends(get_db)):
    posts = db.query(models.Post).all()
    return [_post_to_out(post) for post in posts]


@router.get("/{post_id}", response_model=schemas.PostOut)
def get_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    return _post_to_out(post)


@router.put("/{post_id}", response_model=schemas.PostOut)
def update_post(
    post_id: int,
    title: str = Form(...),
    content: str = Form(...),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user: models.User = Depends(utils.get_current_user)
):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    if post.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to update")

    post.title = title
    post.content = content

    if image and image.filename:
        _delete_image(post.image_url)  # remove old image
        post.image_url = _save_image(image)

    db.commit()
    db.refresh(post)
    return _post_to_out(post, current_user.username)


@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(utils.get_current_user)
):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    if post.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete")

    _delete_image(post.image_url)  # clean up the image file
    db.delete(post)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)