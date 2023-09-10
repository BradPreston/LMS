up:
	docker compose up -d

up-prod:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml up

down:
	docker compose down

build:
	docker compose build

migrate:
	docker compose run api prisma migrate dev --name init

seed:
	docker compose run api npx prisma db seed
