#!/bin/sh
set -e

: "${API_BASE_URL:?API_BASE_URL is required}"

envsubst '${API_BASE_URL}' \
  < /etc/nginx/settings.json.template \
  > /usr/share/nginx/html/settings.json

echo "[nginx] settings.json generated: $(cat /usr/share/nginx/html/settings.json)"
