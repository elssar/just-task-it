#!/bin/bash

# Exit on error
set -e;

npm run test-unit;
npm run test-api;

