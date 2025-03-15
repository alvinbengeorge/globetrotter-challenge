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
    
    def create_new_user(self, username):
        response = self.users.insert_one({
            "username": username,
            "total_correct_answers": 0,
            "total_wrong_answers": 0,
            "total_games_played": 0
        })
        return str(response.inserted_id)
    
    def check_user_exists(self, username):
        return self.users.find_one(username) is not None
    
    def check_duplicate_cities(self):
        results = self.queue.find({})
        results = [result['city'] for result in results]
        duplicates = []
        for result in set(results):
            if results.count(result) > 1:
                duplicates.append(result)     
                self.queue.delete_many({"city": result})
        print(duplicates)

    