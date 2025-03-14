from pydantic import BaseModel

class Content(BaseModel):
    city: str
    country: str
    clues: list[str]
    fun_fact: list[str]
    trivia: list[str]