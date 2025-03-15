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
        self.check_duplicate_cities()
        self.users = self.db["users"]
        self.games = self.db["games"]

    def insert(self, data):
        print(data)
        response = self.queue.insert_one(data)
        return str(response.inserted_id)
    
    def get(self, inserted_id: str):
        data = self.queue.find_one({"_id": ObjectId(inserted_id)})
        data['_id'] = inserted_id
        return data
    
    def insert_games(self, data):
        response = self.games.insert_one(data)
        return str(response.inserted_id)
    
    def check_duplicate_cities(self):
        results = self.queue.find({})
        results = [result['city'] for result in results]
        duplicates = []
        for result in set(results):
            if results.count(result) > 1:
                duplicates.append(result)     
        print(duplicates)
        
    def get_games(self, game_id: str):
        data = self.games.find_one({"_id": ObjectId(game_id)})
        if not data:
            return {
                "_id": game_id,
                "games": []
            }
        data['_id'] = game_id
        return data
    
    def add_to_game(self, game_id: str, user):
        response = self.games.update_one(
            {"_id": ObjectId(game_id)},
            {"$push": {"games": dict(user)}}
        )
        return game_id if response.modified_count else None

    