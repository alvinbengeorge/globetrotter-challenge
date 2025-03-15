from fastapi import APIRouter, Request

from utilities.database import Database

router = APIRouter(tags=["users"], prefix="/users")
db = Database()

@router.get("/")
async def user_details(req: Request):
    username = req.headers.get("username")
    if not username: 
        return {}
    return db.check_user_exists(username)
    
