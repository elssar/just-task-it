#!/bin/bash

# Exit on error
set -e;

npm run test-api;
npm run test-unit;

