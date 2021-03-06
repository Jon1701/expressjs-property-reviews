# property-reviews (Server)

The server component for the `property-reviews` full stack app.

## Environment Variables

Set up, and export the following environment variables:

| Variable Name                    | Description                                              |
| -------------------------------- | -------------------------------------------------------- |
| `POSTGRES_DOCKER_CONTAINER_NAME` | Container name for the Postgres database service         |
| `POSTGRES_DB`                    | Database name                                            |
| `POSTGRES_HOST`                  | Database server hostname                                 |
| `POSTGRES_PORT`                  | Database server port                                     |
| `POSTGRES_USER`                  | Postgres username                                        |
| `POSTGRES_PASSWORD`              | Postgres password                                        |
| `NODE_SERVER_PORT`               | Port on which the `node` server will accepts connections |

## Commands

The following `make` commands are available:

- `make start-services` to start all Docker services
- `make stop-services` to stop all Docker services
- `make wait-services-start` to wait a fixed number of seconds for services to become ready to accept connections
- `make create-db-tables` to create database tables
- `make install-node-server-dependencies` installs `npm` dependencies
- `make create-node-server-folders` to create folders needed by the server
- `make start-node-dev-server` to start the `node` development server
- `make start` to start all services, populate database tables, and start the development server
- `make test` to run tests
- `make psql` to open Postgresql Shell
- `make db-shell` to open a shell in the database container
