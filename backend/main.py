from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def read_root():
    return {"status": "ok", "message": "Backend is running"}


@app.get("/hello")
def read_hello(name: str = "Suren"):
    return {"message": f"Hello, {name}!"}
