from fastapi import FastAPI

# from .routers import items

app = FastAPI(title="FactoriPortal API")

# include routers later
# app.include_router(items.router, prefix="/api/v1/items", tags=["items"])


@app.get("/")
async def read_root():
    return {"message": "Welcome to FactoriPortal API!"}
