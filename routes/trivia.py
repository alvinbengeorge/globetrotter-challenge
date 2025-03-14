from fastapi import APIRouter
from utilities.generator import Generator
from utilities.model import Content
from utilities.database import Database

router = APIRouter(tags=["trivia"], prefix="/trivia")
db = Database()
g = Generator()

@router.get("/")
async def generate_trivia() -> Content:    
    data = g.generate()
    db.insert(data)
    return data
