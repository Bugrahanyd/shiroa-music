.PHONY: dev build up down logs clean validate

dev:
	docker-compose up -d postgres mongodb redis
	cd backend && npm run start:dev &
	cd frontend && npm run dev

build:
	docker-compose build

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs -f

clean:
	docker-compose down -v
	rm -rf frontend/.next backend/dist

validate:
	node validate-env.js
