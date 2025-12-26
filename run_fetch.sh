#!/bin/bash
# Simple wrapper script to run futures data fetch
# Usage: ./run_fetch.sh

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Change to script directory
cd "$SCRIPT_DIR"

# Run the PHP script
/usr/bin/php fetch_futures_data.php

# Check exit status
if [ $? -eq 0 ]; then
    echo "✓ Success"
else
    echo "✗ Failed - check cron_log.txt for details"
    exit 1
fi

