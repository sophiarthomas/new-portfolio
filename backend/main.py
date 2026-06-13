from fastapi import FastAPI
from router import project_router, experience_router, company_router, bullet_router, education_router

app = FastAPI()

# "Plug in" the routes from data_model.py
app.include_router(project_router)
app.include_router(experience_router)
app.include_router(company_router)
app.include_router(bullet_router)
app.include_router(education_router)

@app.get("/")
def read_root(): 
    return {"message": "Welcome to my portfolio API. Head to /docs for the swagger UI."}
