from pymongo import MongoClient
from dotenv import load_dotenv
from os import getenv
from bson.objectid import ObjectId

load_dotenv()
client = MongoClient(getenv("MONGO_URI"))

class Database:
    def __init__(self):
        self.db = client["globetrotter"]
        self.queue = self.db["queue"]

    def insert(self, data):
        print(data)
        response = self.queue.insert_one(data)
        return str(response.inserted_id)
    
    def get(self, inserted_id: str):
        data = self.queue.find_one({"_id": ObjectId(inserted_id)})
        data['_id'] = inserted_id
        

    