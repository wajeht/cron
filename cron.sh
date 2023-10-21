#!/bin/bash
# set -e

if ! command -v pm2 &> /dev/null; then
  echo "Installing PM2..."
  npm install pm2 -g
fi

if pm2 show cron &> /dev/null; then
  echo "Stopping and deleting existing cron..."
  pm2 stop cron
  pm2 delete cron
fi

# 30 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
KILL_TIMEOUT_MS=$((30 * 24 * 60 * 60 * 1000))

pm2 start ./src/index.js --name cron --kill-timeout $KILL_TIMEOUT_MS --restart-delay 5000
pm2 startup
pm2 save --force

echo ""
echo "cron scheduler has been started"
echo ""
# exit 0
