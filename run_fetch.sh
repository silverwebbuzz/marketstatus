#!/bin/bash
# Simple wrapper script to run futures data fetch
# Tries Python first, falls back to PHP, then converts existing data
# Usage: ./run_fetch.sh

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Change to script directory
cd "$SCRIPT_DIR"

# Try Python first (better for web scraping)
if command -v python3 &> /dev/null; then
    echo "Trying Python script..."
    python3 fetch_futures.py
    if [ $? -eq 0 ]; then
        echo "✓ Success (Python)"
        exit 0
    fi
fi

# Fallback to PHP
echo "Trying PHP script..."
/usr/bin/php fetch_futures_data.php
if [ $? -eq 0 ]; then
    echo "✓ Success (PHP)"
    exit 0
fi

# Last resort: Convert existing fnO.json
echo "Converting existing fnO.json data..."
/usr/bin/php convert_fnO_to_futures.php
if [ $? -eq 0 ]; then
    echo "✓ Success (Converted from fnO.json)"
    exit 0
fi

echo "✗ All methods failed"
exit 1

