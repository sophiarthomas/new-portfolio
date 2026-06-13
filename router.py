from fastapi import APIRouter
from data_model import load_json, Project, Experience, Company, Bullet, Education
from typing import List 

project_router = APIRouter(prefix="/api", tags=["Project"])
experience_router = APIRouter()
company_router = APIRouter()
bullet_router = APIRouter()
education_router = APIRouter()

@project_router.get("/projects", response_model=List[Project])
def get_json():
    return load_json("projects")

@experience_router.get("/api/experience", response_model=List[Experience])
def get_json(): 
    return load_json("experience")

@company_router.get("/api/company", response_model=List[Company])
def get_json(): 
    return load_json("company")

@bullet_router.get("/api/bullet", response_model=List[Bullet])
def get_json(): 
    return load_json("bullet")

@education_router.get("/api/education", response_model=List[Education])
def get_json():
    return load_json("education")
