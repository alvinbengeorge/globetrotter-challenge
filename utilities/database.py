from pymongo import MongoClient
from dotenv import load_dotenv
from os import getenv

load_dotenv()
client = MongoClient(getenv("MONGO_URI"))

class Database:
    def __init__(self):
        self.db = client["globetrotter"]
        self.queue = self.db["queue"]

    def insert(self, data):
        response = self.queue.insert_one(data)
        return response.inserted_id
        

    