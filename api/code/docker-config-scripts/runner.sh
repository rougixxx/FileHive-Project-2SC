#!/bin/sh


FLAG_FILE=/app/flag


if [ ! -e "$FLAG_FILE" ]; then
    touch "$FLAG_FILE"
    echo "********EXECUTING ENTRYPOINT********"
    bash /app/docker-config-scripts/entrypoint.sh
 
else
    bash /app/docker-config-scripts/start.sh
fi