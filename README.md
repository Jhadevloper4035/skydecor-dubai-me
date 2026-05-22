# SkyDecor Dubai - MERN Stack Platform

SkyDecor Dubai is a MERN stack laminate discovery platform. It helps users explore SkyDecor laminate collections, filter and sort products according to their project needs, view product details, and visualize laminate options before choosing materials for homes, offices, retail spaces, and interior design projects.

It includes a React/Next.js frontend, an Express.js REST API, MongoDB persistence with Mongoose, Redis QR-code scan caching, Docker-based local and production runtime configs, and seed data for laminate products and QR codes.

The project is structured so it can be extended into a cloud deployment workflow using Docker images, Kubernetes, AWS infrastructure, and a CI/CD pipeline.

## Project Structure

```text
.
├── backend/                 # Express API, MongoDB models, validators, seed scripts
├── forntend/                # Next.js frontend app
├── docs/                    # Backend, auth, Redis, Docker, MongoDB, and upload docs
├── docker-compose.yaml      # Development frontend + backend
├── docker-compose.prod.yaml # Production Nginx + frontend + backend
└── init-mongo.js            # Optional local MongoDB initialization script
```

> Note: the frontend directory is currently named `forntend`.

## Tech Stack

- MongoDB: database layer for products, QR codes, and application data
- Redis: QR-code scan lookup cache to reduce repeated MongoDB reads
- Express.js: backend REST API
- JWT authentication: admin and superadmin access control for protected backend operations
- React/Next.js: frontend application
- Node.js: backend runtime
- Docker: containerized frontend and backend services
- Docker Compose: local development and production container orchestration
- Kubernetes: recommended production orchestration target
- AWS: recommended cloud target for container registry, Kubernetes, networking, and deployment
- CI/CD: recommended pipeline for linting, building, pushing images, and deploying to Kubernetes
- Tooling: ESLint, Prettier, npm

## Product Features

- Browse SkyDecor laminate collections in a modern web catalogue
- Filter laminates by product category, subcategory, type, code, and search terms
- Sort and narrow product options according to customer needs
- View laminate product images, product codes, PDFs, and related details
- Scan QR codes to open specific laminate product information
- Help customers visualize suitable laminate choices for their own projects
- Support future catalogue management, deployment, and cloud scaling workflows

## Prerequisites

- Node.js 20+
- npm 10+
- Docker and Docker Compose, if running frontend/API containers
- kubectl, if deploying to Kubernetes
- AWS CLI, if deploying to AWS

## Environment

Create local environment files at the repo root:

- `.env.development`
- `.env.production`

These files are intentionally ignored by Git. Use values appropriate for your machine or deployment.

Development variables:

```env
NODE_ENV=development
PORT=3000
FRONTEND_PORT=3001
MONGO_URI=mongodb://...
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
DNS_SERVERS=1.1.1.1,8.8.8.8
DB_AUTO_INDEX=true
JSON_BODY_LIMIT=1mb
URLENCODED_BODY_LIMIT=1mb
UPLOAD_MAX_IMAGE_BYTES=5mb
UPLOAD_MAX_BATCH_FILES=10
UPLOAD_ALLOW_SVG=false
JWT_SECRET=change-this-to-a-random-32-character-minimum-secret
JWT_EXPIRES_IN=1d
REDIS_URL=redis://redis:6379
QR_CODE_CACHE_TTL_SECONDS=300
```

For team development, point `MONGO_URI` at a shared MongoDB Atlas development database, not the production database.
`DNS_SERVERS` is optional, but useful when a local network resolver fails MongoDB Atlas SRV/TXT lookups.

Production variables:

```env
PORT=8080
NGINX_HTTP_PORT=80
NODE_ENV=production
APP_IMAGE=<dockerhub-username>/skydecor-api:latest
FRONTEND_IMAGE=<dockerhub-username>/skydecor-frontend:latest
TRUST_PROXY=1
MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/skydecor?retryWrites=true&w=majority
ALLOWED_ORIGINS=http://skydecor.me,http://www.skydecor.me,https://skydecor.me,https://www.skydecor.me
DB_AUTO_INDEX=false
DB_MIN_POOL_SIZE=2
DB_MAX_POOL_SIZE=20
DB_SERVER_SELECTION_TIMEOUT_MS=10000
DB_SOCKET_TIMEOUT_MS=45000
DB_HEARTBEAT_FREQUENCY_MS=10000
DB_MAX_IDLE_TIME_MS=30000
JSON_BODY_LIMIT=1mb
URLENCODED_BODY_LIMIT=1mb
UPLOAD_MAX_IMAGE_BYTES=5mb
UPLOAD_MAX_BATCH_FILES=10
UPLOAD_ALLOW_SVG=false
JWT_SECRET=change-this-to-a-random-32-character-minimum-secret
JWT_EXPIRES_IN=1d
REDIS_URL=redis://redis:6379
QR_CODE_CACHE_TTL_SECONDS=300
BOOTSTRAP_SUPERADMIN_NAME=Super Admin
BOOTSTRAP_SUPERADMIN_EMAIL=admin@example.com
BOOTSTRAP_SUPERADMIN_PASSWORD=change-this-password
```

## Install Dependencies

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd forntend
npm install
```

## Run Locally

### Backend API

From `backend/`:

```bash
npm run dev
```

The API defaults to `http://localhost:8000` in development, unless `PORT` is changed.

Health endpoints:

- `GET /health`
- `GET /ready`

API base path:

- `/api/v1`

Detailed backend docs:

- [Backend overview](docs/docs.md)
- [Swagger API documentation](docs/SWAGGER_API_DOCUMENTATION.md)
- [Authentication and authorization](docs/AUTHENTICATION_AUTHORIZATION.md)
- [Redis QR-code scan cache](docs/REDIS_QRCODE_CACHE.md)
- [S3 presigned uploads](docs/S3_PRESIGNED_UPLOADS.md)
- [MongoDB setup](docs/MONGODB_SETUP.md)

QR code endpoints:

- `GET /scan/:code` - scan QR, increment count, redirect to PDF
- `GET /scan/qr-code/:productType/:productCode` - scan QR, increment count, redirect to PDF
- `GET /api/v1/qrcodes`
- `POST /api/v1/qrcodes`
- `GET /api/v1/qrcodes/stats`
- `GET /api/v1/qrcodes/scan/:code` - scan QR, increment count, redirect to PDF
- `POST /api/v1/qrcodes/scan/:productType/:productCode`
- `GET /api/v1/qrcodes/:id`
- `PATCH /api/v1/qrcodes/:id`
- `DELETE /api/v1/qrcodes/:id`

### Frontend

From `forntend/`:

```bash
npm run dev
```

Open the URL printed by Next.js, usually `http://localhost:3000`.

The Docker development backend is published on `http://localhost:8000` by default so it does not conflict with the frontend.
The frontend proxies `/api/v1/*` to the backend API. If the shop shows only the 40 static fallback products, the backend API is not reachable from the frontend.

## Docker Development

From the repo root:

```bash
docker compose --env-file .env.development --profile dev up -d
```

Services:

- Frontend: `http://localhost:3000`
- API: `http://localhost:8000`

The API connects to the MongoDB Atlas database configured in `.env.development`.

Stop containers:

```bash
docker compose --env-file .env.development --profile dev down
```

## Docker Production

From the repo root:

```bash
APP_IMAGE=<dockerhub-username>/skydecor-api:latest FRONTEND_IMAGE=<dockerhub-username>/skydecor-frontend:latest docker compose -f docker-compose.prod.yaml --env-file .env.production up -d
```

Production uses MongoDB Atlas through `MONGO_URI`; `docker-compose.prod.yaml` does not start a MongoDB container.

Production traffic flow:

```text
browser -> Nginx :80 on skydecor.me -> frontend:3000 or app:8080 on the Docker network
```

Only Nginx publishes a host port. The frontend and backend are reachable only on the internal Docker network. Nginx forwards `X-Real-IP`, `X-Forwarded-For`, `X-Forwarded-Proto`, and `X-Forwarded-Host`; the backend uses `TRUST_PROXY=1` so Express and rate limiting see the real client IP.

Stop production containers:

```bash
docker compose -f docker-compose.prod.yaml --env-file .env.production down
```

## Kubernetes Deployment

Kubernetes manifests are not currently included in this repository. For a production Kubernetes setup, add manifests or Helm charts for:

- Backend API Deployment and Service
- Frontend Deployment and Service
- MongoDB Atlas or another managed MongoDB database
- ConfigMaps for non-secret runtime configuration
- Secrets for database credentials, API keys, and production environment values
- Ingress for public routing and TLS termination
- HorizontalPodAutoscaler for API/frontend scaling

Recommended namespace:

```bash
kubectl create namespace skydecor
```

Typical deployment flow after manifests are added:

```bash
kubectl apply -n skydecor -f k8s/
kubectl get pods -n skydecor
kubectl get services -n skydecor
```

## AWS Deployment

This project can be deployed on AWS using a container-based architecture:

- Docker Hub for Docker image storage
- Amazon EKS for Kubernetes workloads
- AWS Load Balancer Controller for public ingress
- AWS Secrets Manager or SSM Parameter Store for secrets
- Amazon Route 53 for DNS
- AWS Certificate Manager for TLS certificates
- MongoDB Atlas or a managed/self-hosted MongoDB option for the database

Typical Docker Hub image flow:

```bash
docker build -t skydecor-api ./backend
docker tag skydecor-api:latest <dockerhub-username>/skydecor-api:latest
docker push <dockerhub-username>/skydecor-api:latest

docker build -t skydecor-frontend ./forntend
docker tag skydecor-frontend:latest <dockerhub-username>/skydecor-frontend:latest
docker push <dockerhub-username>/skydecor-frontend:latest
```

## CI/CD Pipeline

The GitHub Actions workflow in `.github/workflows/ci.yaml` validates the Node projects, builds the backend and frontend production Docker images, pushes them to Docker Hub, then SSHes into an EC2 instance to pull and restart `docker-compose.prod.yaml`.

Each deployment pushes both a mutable `latest` tag and an immutable GitHub commit SHA tag. EC2 deploys the SHA tag, so rollback can target a known-good commit image instead of guessing what `latest` currently points to.

Required GitHub repository secrets:

```env
# Docker Hub
DOCKERHUB_USERNAME=your-dockerhub-username
DOCKERHUB_TOKEN=your-dockerhub-access-token
DOCKERHUB_IMAGE=your-dockerhub-username/skydecor-api
DOCKERHUB_FRONTEND_IMAGE=your-dockerhub-username/skydecor-frontend

# EC2 SSH target
EC2_HOST=your-ec2-public-ip-or-domain
EC2_USERNAME=ubuntu
EC2_SSH_KEY=-----BEGIN OPENSSH PRIVATE KEY-----
EC2_APP_DIR=/home/ubuntu/skydecor

# Production app config
PROD_NGINX_HTTP_PORT=80
PROD_MONGO_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/skydecor?retryWrites=true&w=majority
PROD_ALLOWED_ORIGINS=https://skydecor.me,https://www.skydecor.me
PROD_JWT_SECRET=generate-a-random-secret-at-least-32-characters-long
PROD_JWT_EXPIRES_IN=1d
PROD_QR_CODE_CACHE_TTL_SECONDS=300

# Optional: set only for first deploy to create the first superadmin, then remove or leave empty
BOOTSTRAP_SUPERADMIN_NAME=Super Admin
BOOTSTRAP_SUPERADMIN_EMAIL=admin@example.com
BOOTSTRAP_SUPERADMIN_PASSWORD=change-this-password
```

Add these in GitHub at **Repository Settings -> Secrets and variables -> Actions -> New repository secret**. Do not commit the real values to the repository.

The EC2 instance must have Docker and Docker Compose installed. The deploy workflow writes `.env.production` into `EC2_APP_DIR`, logs in to Docker Hub, pulls the new image, and restarts the production compose stack.

Admin login endpoint:

```http
POST /api/v1/auth/login
```

Use the returned token for protected admin routes:

```http
Authorization: Bearer <token>
```

Public website users do not need to log in. Public reads and enquiry submissions remain open; create/update/delete/upload/admin-management routes require `admin` or `superadmin` access.

Pipeline stages:

```text
checkout
backend lint
frontend build
docker build
docker push to Docker Hub
copy production compose files
ec2 docker compose pull/up
health-check
```

Rollback example on EC2:

```bash
make prod-rollback \
  BACKEND_IMAGE=<dockerhub-username>/skydecor-api:<good-github-sha> \
  FRONTEND_IMAGE=<dockerhub-username>/skydecor-frontend:<good-github-sha>
```

## Seed Data

The backend includes seed data in `backend/src/data/`.

From `backend/`:

```bash
npm run seed:db
```

There is also a QR-code-specific script alias:

```bash
npm run seed:qrcode
```

## Scripts

Backend scripts:

```bash
npm run dev
npm run start
npm run lint
npm run lint:fix
npm run format
npm run format:check
npm run seed:db
```

Frontend scripts:

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Useful Docs

- `docs/DOCKERFILE.md`
- `docs/MONGODB_SETUP.md`
- `docs/docs.md`

## Git Notes

This repository ignores local dependencies, build outputs, logs, environment files, local database files, and editor/tooling artifacts. Commit `package-lock.json` files so installs stay reproducible.
