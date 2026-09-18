"""
Run this script ONCE to add the image_url column to existing posts table.
Usage:  python add_image_column.py
"""
from database import engine
from sqlalchemy import text 

with engine.connect() as conn:
    try:
        conn.execute(text("ALTER TABLE posts ADD COLUMN image_url VARCHAR"))
        conn.commit()
        print("Column 'image_url' added to 'posts' table successfully!")
    except Exception as e:
        if "already exists" in str(e).lower() or "duplicate column" in str(e).lower():
            print("Column 'image_url' already exists, skipping.")
        else:
            print(f"Error: {e}")
