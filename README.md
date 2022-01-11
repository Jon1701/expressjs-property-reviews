# property-reviews
Full Stack application which allows users to review residential properties.

## Environment Variables

Set up, and export the following environment variables:

| Variable Name | Description |
|---------------|-------------|
| `POSTGRES_DOCKER_CONTAINER_NAME` | Container name for the Postgres database service |
| `POSTGRES_DB` | Database name |
| `POSTGRES_HOST` | Database server hostname |
| `POSTGRES_PORT` | Database server port |
| `POSTGRES_USER` | Postgres username |
| `POSTGRES_PASSWORD` | Postgres password |

## Commands

The following `make` commands are available:

- `make start-services` to start all Docker services
- `make stop-services` to stop all Docker services
- `make psql` to open Postgresql Shell