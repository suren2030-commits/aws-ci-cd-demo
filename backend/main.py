from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend (localhost:8080) to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],        # For local testing, allow everything
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"status": "ok", "message": "Backend is running"}


@app.get("/hello")
def read_hello(name: str = "Suren"):
    return {"message": f"Hello, {name}!"}
