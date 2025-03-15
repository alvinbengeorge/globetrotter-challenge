from pydantic import BaseModel

class Content(BaseModel):
    city: str
    country: str
    clues: list[str]
    fun_fact: list[str]
    trivia: list[str]

class TriviaOutput(BaseModel):
    clues: list[str]
    options: list[str]
    inserted_id: str

class VerifyInput(BaseModel):
    answer: str
    inserted_id: str

class User(BaseModel):
    username: str
    correctAnswers: int
    wrongAnswers: int

class Game(BaseModel):
    host_username: str
    users: list[User]

    