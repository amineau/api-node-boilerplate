#!/bin/sh
export NODE_ENV=production
docker-compose build --no-cache --force-rm api
docker-compose up --no-deps -d api