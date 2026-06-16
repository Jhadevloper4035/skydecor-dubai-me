# SkyDecor CI/CD and EC2 Setup

This project uses `.github/workflows/ci.yaml` to run the following pipeline:

- Pull request to `main`: install dependencies, run tests, lint/build the frontend, build the backend, and validate both production Docker images. Nothing is pushed or deployed.
- Push to `main`: run validation, build and push SHA-tagged plus `latest` images to Docker Hub, then deploy that exact commit and image tags to EC2.
- Manual run from the GitHub Actions **Run workflow** button: choose `deploy` on `main` to perform the same publish and deploy flow, or `validate-only` to run checks without publishing images.

The production stack is `nginx + Next.js frontend + Express API + Redis`. MongoDB runs in MongoDB Atlas and is supplied through `PROD_MONGO_URI`.

## 1. Create Docker Hub repositories

Create these repositories under your Docker Hub account or organization:

- `skydecor-api`
- `skydecor-frontend`

Create a Docker Hub access token with read/write permission. Do not use your Docker Hub password in GitHub Actions.

## 2. Create the EC2 instance

Recommended starting configuration:

- Ubuntu Server 24.04 LTS
- `t3.small` or larger
- At least 20 GB gp3 storage
- An Elastic IP, so deployments and DNS do not break after an instance restart

Security group inbound rules:

| Port | Source | Purpose |
| --- | --- | --- |
| 22 | Your approved deployment source | GitHub Actions SSH deployment |
| 80 | `0.0.0.0/0`, `::/0` | HTTP website |
| 443 | `0.0.0.0/0`, `::/0` | Future HTTPS website |

GitHub-hosted runner IP ranges change. For a simple first deployment, port 22 must be reachable by the runner and SSH must remain key-only. For tighter production access, use a self-hosted runner, VPN, or bastion host with a fixed source IP.

Point the DNS `A` records for `skydecor.me` and `www.skydecor.me` to the Elastic IP. The current Nginx configuration uses those hostnames.

## 3. Install Docker and prepare EC2

SSH into the instance as `ubuntu`, then install Docker from Docker's official apt repository:

```bash
sudo apt-get update
sudo apt-get install -y ca-certificates curl git
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo ${UBUNTU_CODENAME:-$VERSION_CODENAME}) stable" | sudo tee /etc/apt/sources.list.d/docker.list >/dev/null

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo usermod -aG docker ubuntu
sudo systemctl enable --now docker

sudo mkdir -p /opt/skydecor
sudo chown ubuntu:ubuntu /opt/skydecor
```

Log out and reconnect so the Docker group membership is active, then verify:

```bash
docker version
docker compose version
test -w /opt/skydecor
```

The workflow clones the repository into `/opt/skydecor` during the first deployment. For a private repository, configure a read-only GitHub deploy key or change the clone authentication before the first run.

## 4. Prepare MongoDB Atlas

Create a production database user and add the EC2 Elastic IP to the Atlas network access list. Build a URI similar to:

```text
mongodb+srv://USERNAME:PASSWORD@CLUSTER.mongodb.net/skydecor?retryWrites=true&w=majority
```

URL-encode special characters in the username or password.

## 5. Prepare the deployment SSH key

Use a dedicated SSH key for GitHub Actions. Add its public key to `/home/ubuntu/.ssh/authorized_keys` on EC2 and store the complete private key, including its BEGIN/END lines, in the GitHub secret `EC2_SSH_KEY`.

Get the EC2 host fingerprint from a trusted SSH session:

```bash
sudo ssh-keygen -l -E sha256 -f /etc/ssh/ssh_host_ed25519_key.pub
```

Copy only the `SHA256:...` value into `EC2_HOST_FINGERPRINT`.

## 6. Add GitHub Actions secrets

Open the GitHub repository, then go to **Settings > Secrets and variables > Actions > New repository secret**.

Required secrets:

| Secret | Example or purpose |
| --- | --- |
| `DOCKERHUB_USERNAME` | Docker Hub username or organization, not an email |
| `DOCKERHUB_TOKEN` | Docker Hub read/write access token |
| `EC2_HOST` | EC2 Elastic IP or DNS name |
| `EC2_USER` | `ubuntu` |
| `EC2_SSH_KEY` | Complete private deployment key |
| `EC2_HOST_FINGERPRINT` | EC2 SSH `SHA256:...` fingerprint |
| `PROD_MONGO_URI` | MongoDB Atlas production URI |
| `PROD_ALLOWED_ORIGINS` | `https://skydecor.me,https://www.skydecor.me,http://skydecor.me,http://www.skydecor.me` |
| `PROD_JWT_SECRET` | Random secret of at least 32 characters |

Optional application secrets:

| Secret | Default or purpose |
| --- | --- |
| `PROD_NGINX_HTTP_PORT` | Defaults to `80` |
| `PROD_JWT_EXPIRES_IN` | Defaults to `1d` |
| `PROD_QR_CODE_CACHE_TTL_SECONDS` | Defaults to `300` |
| `BOOTSTRAP_SUPERADMIN_NAME` | Initial admin name |
| `BOOTSTRAP_SUPERADMIN_EMAIL` | Initial admin email |
| `BOOTSTRAP_SUPERADMIN_PASSWORD` | Strong initial admin password |
| `AWS_REGION` | S3 region |
| `AWS_ACCESS_KEY_ID` | S3 access key; prefer a limited IAM identity |
| `AWS_SECRET_ACCESS_KEY` | S3 secret key |
| `S3_BUCKET` | Upload bucket |
| `S3_PUBLIC_BASE_URL` | Public/CDN bucket URL |
| `S3_KEY_PREFIX` | Defaults to `uploads/images` |
| `S3_PRESIGNED_EXPIRES_SECONDS` | Defaults to `300` |

Generate a JWT secret locally with:

```bash
openssl rand -hex 32
```

## 7. Run the first deployment

Push or merge a commit into `main`, then watch **GitHub > Actions > CI/CD**.

To run the pipeline manually, open **GitHub > Actions > CI/CD > Run workflow**, select the `main` branch, choose `deploy`, and click **Run workflow**. Use `validate-only` when you only want tests and builds.

A successful deploy run will:

1. Validate the backend and frontend.
2. Push `<dockerhub-user>/skydecor-api:<commit-sha>` and `<dockerhub-user>/skydecor-frontend:<commit-sha>`.
3. Write `/opt/skydecor/.env.production` on EC2 from GitHub secrets.
4. Pull and start `docker-compose.prod.yaml`.
5. Check `/health`, `/ready`, the home page, and the products API.

Verify directly on EC2:

```bash
cd /opt/skydecor
docker compose -f docker-compose.prod.yaml --env-file .env.production ps
docker compose -f docker-compose.prod.yaml --env-file .env.production logs --tail=100
curl -H 'Host: skydecor.me' http://127.0.0.1/health
curl -H 'Host: skydecor.me' http://127.0.0.1/ready
```

## 8. HTTPS note

The active production configuration currently publishes HTTP on port 80. `nginx/conf.d/skydecor-ssl.conf.example` is only a starting point; HTTPS still requires certificate issuance, certificate volume mounts in `docker-compose.prod.yaml`, port 443 publishing, and automatic certificate renewal before enabling the SSL config.

## Troubleshooting

- `permission denied /var/run/docker.sock`: reconnect after `usermod -aG docker ubuntu`.
- SSH timeout: verify `EC2_HOST`, port 22, the security group, and the instance public route.
- Docker Hub `denied`: verify both repositories exist and the token has write permission.
- `/ready` returns 503: allow the EC2 Elastic IP in Atlas and verify `PROD_MONGO_URI`.
- Nginx is unhealthy: confirm both application containers are healthy with `docker compose ps` and inspect their logs.
