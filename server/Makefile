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

# Installs node server dependencies.
install-node-server-dependencies:
	@echo "Installing node server dependencies..."
	@npm ci
	@echo "Done installing node server dependencies"

# Creates folders needed for the node server.
create-node-server-folders:
	@echo "Creating server folders..."
	@mkdir -p \
		dist/
	@echo "Done creating server folders"

# Starts the node development server with auto-compilation.
start-node-dev-server:
	@echo "Starting node development server..."
	@${NODE_MODULES_BIN_FOLDER}/tsc-watch \
		--onSuccess "node ./${SERVER_BUILD_FOLDER}/app.js" \
		--onFailure "echo Compilation failed!" \
		--noClear

# Opens an interactive psql shell.
psql:
	@docker exec \
		-it ${POSTGRES_DOCKER_CONTAINER_NAME} \
			psql \
				--username ${POSTGRES_USER} \
				--dbname ${POSTGRES_DB}
