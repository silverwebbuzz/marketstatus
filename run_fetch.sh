#!/bin/bash
# Smart wrapper script to update futures data
# Strategy: Try to fetch new data, but always ensure data exists by converting fnO.json if needed
# Usage: ./run_fetch.sh

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Change to script directory
cd "$SCRIPT_DIR"

SUCCESS=0

# Try Python first (better for web scraping)
if command -v python3 &> /dev/null; then
    echo "Attempting to fetch new data with Python..."
    python3 fetch_futures.py 2>&1
    if [ $? -eq 0 ]; then
        echo "✓ Success: Fetched new data (Python)"
        exit 0
    fi
    echo "Python fetch failed (likely rate limited)"
fi

# Fallback to PHP
echo "Attempting to fetch new data with PHP..."
/usr/bin/php fetch_futures_data.php 2>&1
if [ $? -eq 0 ]; then
    echo "✓ Success: Fetched new data (PHP)"
    exit 0
fi
echo "PHP fetch failed (likely rate limited)"

# Ensure data exists by converting existing fnO.json
# This ensures the page always has data to display
if [ -f "data/fnO.json" ]; then
    echo "Using existing fnO.json data..."
    /usr/bin/php convert_fnO_to_futures.php
    if [ $? -eq 0 ]; then
        echo "✓ Success: Using existing fnO.json data"
        echo "Note: Data from fnO.json (may not be latest)"
        echo "To get latest data: Update fnO.json manually or wait for rate limit to reset"
        exit 0
    fi
fi

echo "✗ All methods failed - no data available"
exit 1

