# Start docker services.
start-services:
	@echo "Starting the database service..."
	@POSTGRES_DOCKER_CONTAINER_NAME=${POSTGRES_DOCKER_CONTAINER_NAME} \
	POSTGRES_DB=${POSTGRES_DB} \
	POSTGRES_PORT=${POSTGRES_PORT} \
	POSTGRES_USER=${POSTGRES_USER} \
	POSTGRES_PASSWORD=${POSTGRES_PASSWORD} \
		docker-compose up -d
	@echo "Done starting the database service"

# Stop docker services.
stop-services:
	@echo "Stopping services..."
	@docker-compose down
	@echo "Done stopping services"

# Installs node server dependencies.
install-node-server-dependencies:
	@echo "Installing node server dependencies..."
	@npm ci
	@echo "Done installing node server dependencies"

# Opens an interactive psql shell.
psql:
	@docker exec \
		-it ${POSTGRES_DOCKER_CONTAINER_NAME} \
			psql \
				--username ${POSTGRES_USER} \
				--dbname ${POSTGRES_DB}
