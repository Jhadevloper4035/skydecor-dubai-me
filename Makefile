# SkyDecor Dubai - Docker Makefile

up:
	docker compose -f docker-compose.yaml --env-file .env.development --profile dev up -d --remove-orphans

up-all:
	docker compose -f docker-compose.yaml --env-file .env.development --profile  dev up -d --build --remove-orphans

logs:
	docker compose -f docker-compose.yaml --env-file .env.development logs -f

down:
	docker compose -f docker-compose.yaml --env-file .env.development --profile dev down -v --remove-orphans

down-v:
	docker compose -f docker-compose.yaml --env-file .env.development --profile dev down --rmi all -v --remove-orphans

prod-up:
	docker compose -f docker-compose.prod.yaml --env-file .env.production up -d --remove-orphans

prod-pull:
	docker compose -f docker-compose.prod.yaml --env-file .env.production pull app frontend nginx

prod-logs:
	docker compose -f docker-compose.prod.yaml --env-file .env.production logs -f

prod-down:
	docker compose -f docker-compose.prod.yaml --env-file .env.production down --remove-orphans

prod-rollback:
	test -n "$(BACKEND_IMAGE)"
	test -n "$(FRONTEND_IMAGE)"
	APP_IMAGE="$(BACKEND_IMAGE)" FRONTEND_IMAGE="$(FRONTEND_IMAGE)" docker compose -f docker-compose.prod.yaml --env-file .env.production pull app frontend
	APP_IMAGE="$(BACKEND_IMAGE)" FRONTEND_IMAGE="$(FRONTEND_IMAGE)" docker compose -f docker-compose.prod.yaml --env-file .env.production up -d --remove-orphans
