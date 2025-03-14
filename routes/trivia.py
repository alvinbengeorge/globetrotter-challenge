from fastapi import APIRouter
from utilities.generator import Generator
from utilities.model import TriviaOutput, VerifyInput
from utilities.database import Database

router = APIRouter(tags=["trivia"], prefix="/trivia")
db = Database()
g = Generator()

@router.get("/")
async def generate_trivia() -> TriviaOutput:    
    data = g.generate()
    inserted_id = db.insert(data)
    output = TriviaOutput(inserted_id=inserted_id, **data)    
    return output

@router.post("/verify")
async def verify_trivia(user_input: VerifyInput):
    data = db.get(user_input.inserted_id)
    return {"correct": user_input.answer == data["answer"], "data": data}
