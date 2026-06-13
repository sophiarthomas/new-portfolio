# Portfolio Documentation

## Commands

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

## Next Steps

### Automated Deployment (CI/CD Pipeline)

1. Push repo to git
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <PASTE_YOUR_COPIED_URL>
   git push -u origin main
   ```
2. create workflow file: this file
3. configure the pipeline: write a workflow that triggers on git push origin main:
   - build: builds a new docker image containign your updated backend code and your updated projects.json file
   - push: it pushes that image to a registry like docker hub or gihub pages
   - deploy: it uses an ssh action to connect to your remote linux server, stop the old container, pull the fresh image, and spin up a new version

### Frontend Connection

1. Simple React Frontend: Set up a quick frontend using Vite (npm create vite@latest portfolio-frontend -- --template react) use standard javascript fetch() to call your python API and map over the arry to display your data
