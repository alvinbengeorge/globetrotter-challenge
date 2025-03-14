import random
from google import genai
from utilities.random_city import generate_options
from dotenv import load_dotenv
from os import getenv
import json

from utilities.model import Content

load_dotenv()
d = json.load(open("sample.json"))
client = genai.Client(api_key=getenv("GEMINI_KEY"))

class Generator:
    def __init__(self):
        self.data = d
        self.client = client

    def generate(self):
        options = generate_options()
        answer = random.choice(options)
        response = client.models.generate_content(
            model="gemini-2.0-flash",
            contents=f"Give me the content for {answer} \n\n{d}",
            config={
                'response_mime_type': 'application/json',
                'response_schema': Content
            }
        )
        output = dict(response.parsed)
        output["options"] = options
        return output

if __name__ == "__main__":
    g = Generator()
    print(g.generate())