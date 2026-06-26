# Portfolio Documentation

## Commands

Run Frontend

```
npm run dev
```

Run Backend

```
uvicorn main:app --reload
```

Docker Build Image & Run Container

```
docker build -t new-portfolio .
docker run -p 8000:8000 new-portfolio
```

Saves the current pip installs and dependencies to the requirements.txt file (used in Dockerfile)

```
pip freeze > requirements.txt
```

## APIRouter

Industry standard for building production APIs. Add new feature -- like an endpoint for blog posts (blogs.py) or a contact form (contact.py) -- you can give each its ownisolated router file and simply add `app.include_router()` lines to your main.py

## deploy.yml

## current progress

- building two docker images and running containers for the frontend and backend
- Both images build and containers are runnable, but the frontend is not able to fetch the api data from the backend successfully; getting an this response "Error: Unexpected token '<', "<!doctype "... is not valid JSON"
- The frontend container can fetch the data when I run the backend locally via terminal
- working on the `docker-compose.yml` to define, launch, and manage multi-container Docker applications.
