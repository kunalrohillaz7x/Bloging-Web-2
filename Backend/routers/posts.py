from fastapi import APIRouter, Depends, status, HTTPException, Response
from sqlalchemy.orm import Session
from database import get_db
import schemas, models, utils
from typing import List

router = APIRouter(prefix="/posts", tags=["posts"])

@router.post("/", response_model=schemas.PostOut, status_code=status.HTTP_201_CREATED)
def create_post(
    post: schemas.PostCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(utils.get_current_user)
):
    new_post = models.Post(
        title=post.title,
        content=post.content,
        user_id=current_user.id
    )
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return schemas.PostOut(
        id=new_post.id,
        title=new_post.title,
        content=new_post.content,
        user_id=new_post.user_id,
        author=current_user.username
    )

@router.get("/", response_model=List[schemas.PostOut])
def get_posts(
    db: Session = Depends(get_db)
): 
    posts = db.query(models.Post).all()
    return [
        schemas.PostOut(
            id=post.id,
            title=post.title,
            content=post.content,
            user_id=post.user_id,
            author=post.owner.username if post.owner else None,
        )
        for post in posts
    ]

@router.get("/{post_id}", response_model=schemas.PostOut)
def get_post(
    post_id: int,
    db: Session = Depends(get_db)
):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    return schemas.PostOut(
        id=post.id,
        title=post.title,
        content=post.content,
        user_id=post.user_id,
        author=post.owner.username if post.owner else None,
    )

@router.put("/{post_id}", response_model=schemas.PostOut)
def update_post(
    post_id: int,
    updated_post: schemas.PostCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(utils.get_current_user)
):
    post_query = db.query(models.Post).filter(models.Post.id == post_id)
    post = post_query.first()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    if post.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to update")
    
    post_query.update(updated_post.model_dump() if hasattr(updated_post, "model_dump") else updated_post.dict(), synchronize_session=False)
    db.commit()
    db.refresh(post)    
    return schemas.PostOut(
        id=post.id,
        title=post.title,
        content=post.content,
        user_id=post.user_id,
        author=current_user.username
    )

@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(utils.get_current_user)
):
    post_query = db.query(models.Post).filter(models.Post.id == post_id)
    post = post_query.first()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Post not found")
    if post.user_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to delete")
    post_query.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)
    