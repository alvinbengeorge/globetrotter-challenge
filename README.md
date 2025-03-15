# `GlobeTrotter Challenge`
### The Ultimate Travel Guessing Game!
![undraw_eiffel-tower_ju2s](https://github.com/user-attachments/assets/0da3d83b-188a-4959-bd52-02338b9de733)
## Description
This is a web application project, made in NextJS and FastAPI. The idea is to select a city based on the clue(s) provided by the system.
The project also includes multiplayer support, you will be able to send a URL, where others can play and see the leaderboard

## Backend Routes
- GET `/trivia/` → Gets Clues, Options and Document ID as questions
- POST `/trivia/verify/` → Verifies the answer based on the Document ID provided

- GET `/game/{game_id}` → Get Game details `[used for leaderboard]`
- POST `/game/{game_id}` → Join into a game and add scores
- POST `/game/` → Create a new game

## Environment variables

### Backend
```sh
GEMINI_KEY=<api key: string>
MONGO_URI=<uri: string>
```

### Frontend
```sh
NEXT_PUBLIC_BACKEND_URL=<backend url: string>
```

## Tech Used:
- `FastAPI`
- `NextJS v15`
- `Docker`
- `Google Cloud Run`
- `Gemini`


