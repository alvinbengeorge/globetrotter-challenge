from fastapi import APIRouter, Request

from utilities.response import Response
from utilities.database import Database
from utilities.model import User

router = APIRouter(tags=["game"], prefix="/game")
db = Database()

@router.get("/{game_id}")
async def get_game(game_id: str):
    games = db.get_games(game_id)
    games["games"].sort(key=lambda x: x["correctAnswers"], reverse=True)
    return games

@router.post("/")
async def create_game(user: User):
    data = {
        "games": [dict(user)]
    }
    inserted_id = db.insert_games(data)
    return {
        "game_id": inserted_id
    }

@router.post("/{game_id}")
async def join_game(game_id: str, user: User):
    data = db.get_games(game_id)    
    if not data:
        return Response({
            "error": "Game not found",
            "status": False
        }, status_code=404)
    response = db.add_to_game(game_id, user)
    return Response({
        "status": True,
        "message": "User added to game",
        "game_id": response
    })
    

