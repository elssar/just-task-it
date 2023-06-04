#!/bin/bash

# Exit on error
set -e;

# env file path
ENV_FILE="./.env";

# source the env file if it exists
if [ -f "$ENV_FILE" ]; then
    source "$ENV_FILE";
fi

# if the "LOCAL_DATABASE" env var is set to "true"
# then run the script to setup a local database via
# a docker container
if [ ${LOCAL_DATABASE} = "true" ]; then
    /bin/bash ./scripts/local_database.sh;
fi

node index.js;

