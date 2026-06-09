# DevOps 3-Tier App

simple task manager built for learning DevOps: React frontend, Node.js API, MongoDB database.

## Project structure

```
├── frontend/     # React (Vite)
├── backend/      # Node.js + Express + Mongoose
├── database/     # MongoDB seed script
├── k8s/          # Kubernetes manifests (Phase 5)
├── .github/workflows/  # CI/CD (Phase 3)
└── docker-compose.yml  # Local containers (Phase 2)
```

## Prerequisites

- Node.js 20+
- Docker Desktop
- Git

## Run locally (after installing Node + MongoDB)

### 1. Start MongoDB

```bash
# Option A: Docker (once Docker is installed)
docker run -d -p 27017:27017 --name mongo mongo:7
```

### 2. Backend

```bash
cd backend
npm install
npm run dev
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

## Run with Docker Compose (Phase 2)

```bash
cd "/Users/aniruddha/Desktop/Devops project"
docker compose up --build
```

Open http://localhost:3000

## CI/CD (Phase 3)

On every push/PR to `main`, GitHub Actions will:

1. Validate `docker-compose.yml`
2. Build backend and frontend Docker images
3. Scan images with **Trivy** (fails on CRITICAL/HIGH vulnerabilities)
4. Upload results to the **Security** tab (SARIF)

Workflow file: `.github/workflows/ci.yml`

### Push to GitHub

```bash
cd "/Users/aniruddha/Desktop/Devops project"
git init
git add .
git commit -m "Add Phase 3: GitHub Actions CI with Trivy scanning"
```

Create a new repo on GitHub (e.g. `devops-3tier-app`), then:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/devops-3tier-app.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username. Check the **Actions** tab on GitHub to see the pipeline run.

## Phases

1. **App** — React + Node + MongoDB ✅
2. **Docker** — Dockerfiles + docker-compose ✅
3. **CI/CD** — GitHub Actions + Trivy scanning ✅
4. **Infra** — Terraform + Minikube
5. **GitOps** — ArgoCD
6. **Monitoring** — Prometheus + Grafana
