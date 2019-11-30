#!/bin/bash
set -e

rm -f /app_name/tmp/pids/server.pid

exec "$@"
