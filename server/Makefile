NODE_MODULES_FOLDER=node_modules
NODE_MODULES_BIN_FOLDER=${NODE_MODULES_FOLDER}/.bin
SERVER_BUILD_FOLDER=dist

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

# Wait for services to start.
wait-services-start:
	@echo "Waiting for services..."
	@sleep 1
	@echo "Done waiting for services"

# Create database tables.
create-db-tables:
	@echo "Creating database tables..."
	@docker cp ./.db/create-tables.sql ${POSTGRES_DOCKER_CONTAINER_NAME}:/tmp/create-tables.sql
	@docker exec -t ${POSTGRES_DOCKER_CONTAINER_NAME} \
		psql \
			--dbname ${POSTGRES_DB} \
			--username ${POSTGRES_USER} \
			--file /tmp/create-tables.sql
	@docker exec -t ${POSTGRES_DOCKER_CONTAINER_NAME} \
		rm /tmp/create-tables.sql
	@echo "Done creating database tables"

# Installs node server dependencies.
install-node-server-dependencies:
	@echo "Installing node server dependencies..."
	@npm ci
	@echo "Done installing node server dependencies"

# Creates folders needed for the node server.
create-node-server-folders:
	@echo "Creating server folders..."
	@mkdir -p \
		${SERVER_BUILD_FOLDER}/
	@echo "Done creating server folders"

# Starts the node development server with auto-compilation.
start-node-dev-server:
	@echo "Starting node development server..."
	PORT=${NODE_SERVER_PORT} \
	POSTGRES_USER=${POSTGRES_USER} \
	POSTGRES_HOST=${POSTGRES_HOST} \
	POSTGRES_PASSWORD=${POSTGRES_PASSWORD} \
	POSTGRES_DB=${POSTGRES_DB} \
	POSTGRES_PORT=${POSTGRES_PORT} \
	${NODE_MODULES_BIN_FOLDER}/tsc-watch \
		--onSuccess "node ./${SERVER_BUILD_FOLDER}/app.js" \
		--onFailure "echo Compilation failed!" \
		--noClear

# Starts all services to begin development.
start: stop-services start-services wait-services-start create-db-tables install-node-server-dependencies create-node-server-folders start-node-dev-server

# Opens an interactive psql shell.
psql:
	@docker exec \
		-it ${POSTGRES_DOCKER_CONTAINER_NAME} \
			psql \
				--username ${POSTGRES_USER} \
				--dbname ${POSTGRES_DB}

# Opens a shell in the database container.
db-shell:
	@docker exec \
		-it ${POSTGRES_DOCKER_CONTAINER_NAME} \
			bash