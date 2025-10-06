#!/usr/bin/env sh
set -eu

/app/start/replace-variables.sh

NODE_DEV_SERVER="${NODE_DEV_SERVER:-false}"

if [ "$NODE_DEV_SERVER" = "true" ] || [ "$NODE_DEV_SERVER" = "True" ]; then
    echo "Starting Node.js in development mode"
    exec npm run dev
else
    echo "Starting Node.js in production mode"
    exec npm run start
fi