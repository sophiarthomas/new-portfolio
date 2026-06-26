from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from router import project_router, experience_router, company_router, bullet_router, education_router

app = FastAPI()
origins = [
    "http://frontend:5173", 
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:8001", 
    "sophiarthomas.com"
]

# Cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Vite's default port
    allow_credentials=[True],
    allow_methods=["GET"],
    allow_headers=["*"],
)

# "Plug in" the routes from data_model.py
app.include_router(project_router)
app.include_router(experience_router)
app.include_router(company_router)
app.include_router(bullet_router)
app.include_router(education_router)

@app.get("/")
def read_root(): 
    return {"message": "Welcome to my portfolio API. Head to /docs for the swagger UI."}
