#!/bin/bash

# Exit on error
set -e;

npx newman run ./postman/collections/api-tests.postman_collection.json -e ./postman/environments/api-tests.postman_environment.json;

