#!/bin/bash

# Exit on error
set -e;

# env faile path
ENV_FILE="./.env";

# source the env file if it exists
if [ -f "$ENV_FILE" ]; then
    source "$ENV_FILE";
fi

# check whether docker is installed.
# if not, then exit with an error
if ! command -v docker &> /dev/null; then
    echo "docker is not installed";
    exit 1;
fi

# check whether the require env variables are set
# and not a blank string.
# if they are not set, then exit with an error
# required variables
# - username
# - password
# - port
# - container name
if [ -z "$DATABASE_CREDS_USERNAME" ]; then
    echo "Database username not set";
    exit 1;
fi

if [ -z "$DATABASE_CREDS_PASSWORD" ]; then
    echo "Database password not set";
    exit 1;
fi

if [ -z "$DATABASE_PORT" ]; then
    echo "Database port not set";
    exit 1;
fi

if [ -z "$DATABASE_CONTAINER_NAME" ]; then
    echo "Database container name not set";
    exit 1;
fi

# check whether the database container is already running
# if running, then exit the script
if docker ps -f "name=${DATABASE_CONTAINER_NAME}" | grep -w "${DATABASE_CONTAINER_NAME}" &> /dev/null; then
    echo "Database is alreay running";
    exit;
fi

# check whether the database container exists, but has been stopped
# if it exists, then try starting it
if docker ps -a -f "name=${DATABASE_CONTAINER_NAME}" | grep -w "${DATABASE_CONTAINER_NAME}" &> /dev/null; then
    echo "Database container exists, but stopped";
    echo "Restarting";
    # docker start "${DOCKER_CONTAINER_NAME}";
    # there is a bug on mac causing this to fail.
    # workaround: remove the container and create again
    docker rm "${DATABASE_CONTAINER_NAME}";
    #exit;
fi

echo "Starting database";

docker run -d \
    --name "${DATABASE_CONTAINER_NAME}" \
    -e POSTGRES_PASSWORD="${DATABASE_CREDS_PASSWORD}" \
    -e POSTGRES_USER="${DATABASE_CREDS_USERNAME}" \
    -p "${DATABASE_PORT}":"${DATABASE_PORT}" \
    postgres;

