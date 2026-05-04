# Brownie Points

A brownie & coffee shop website with a product menu, contact form, and newsletter signup.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, Vanilla JS |
| Backend | PHP 8.2 |
| Database | MySQL 8.0 |
| Server | Apache (via PHP official Docker image) |
| Container | Docker + Docker Compose |

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/) (included with Docker Desktop)

## Running the Project

**Start:**
```bash
docker compose up --build
```

The app will be available at [http://localhost:8080/](http://localhost:8080/)

**Start in background:**
```bash
docker compose up --build -d
```

**Stop:**
```bash
docker compose down
```

**Stop and delete the database volume (full reset):**
```bash
docker compose down -v
```

**View logs:**
```bash
docker compose logs -f
```
