# Simple PHP Cron Setup

## Quick Setup

### Step 0: Find Your Full Path

First, find the absolute path to your `ms` directory:
```bash
cd /path/to/your/ms/directory
pwd
```

This will show something like: `/home/username/public_html/ms` or `/var/www/html/ms`

### Step 1: Quick Setup (Use Existing Data)

Since Zerodha rate-limits requests, the easiest solution is to use your existing data:

```bash
php convert_fnO_to_futures.php
```

This converts your existing `fnO.json` to `futures_margins.json` format. Your page will work immediately!

### Step 2: Set Up Smart Updater (Recommended)

Use the smart updater that tries to fetch new data but falls back to existing data:

```bash
# Test it:
php update_futures_smart.php

# OR use the wrapper:
./run_fetch.sh
```

This ensures your page always has data, even if fetching fails.

**OR use absolute path:**
```bash
php /full/path/to/fetch_futures_data.php
```

**OR use the test script:**
```bash
php test_fetch.php
```

This will:
- Try to find Zerodha's API endpoint
- If not found, fetch HTML and parse it
- Save data to `data/futures_margins.json`

### Step 3: Set Up Daily Cron at 8 AM

**Option A: cPanel Cron Jobs**

1. Login to cPanel
2. Go to "Cron Jobs"
3. Add:
   - **Minute**: `0`
   - **Hour**: `8`
   - **Day**: `*`
   - **Month**: `*`
   - **Weekday**: `*`
   - **Command** (Recommended - Smart Updater):
     ```bash
     cd /home/username/public_html/ms && /usr/bin/php update_futures_smart.php >> cron_log.txt 2>&1
     ```
     
     **OR use wrapper script:**
     ```bash
     /home/username/public_html/ms/run_fetch.sh >> /home/username/public_html/ms/cron_log.txt 2>&1
     ```
     
     **OR use absolute path:**
     ```bash
     /usr/bin/php /home/username/public_html/ms/update_futures_smart.php >> /home/username/public_html/ms/cron_log.txt 2>&1
     ```

**Option B: SSH Crontab**

```bash
crontab -e
```

Add (use absolute paths):
```
0 8 * * * cd /full/path/to/ms && /usr/bin/php update_futures_smart.php >> /full/path/to/ms/cron_log.txt 2>&1
```

**OR use wrapper (tries Python, PHP, then existing data):**
```
0 8 * * * /full/path/to/ms/run_fetch.sh >> /full/path/to/ms/cron_log.txt 2>&1
```

**Option C: External Cron Service**

Use services like:
- https://cron-job.org
- https://www.easycron.com

Set URL: `https://silverwebbuzz.com/ms/cron_endpoint.php?key=your-secret`

## How It Works

The script tries 4 methods in order:

1. **API Endpoint** - Checks if Zerodha has a public API
2. **JSON in Script Tags** - Extracts embedded JSON data
3. **HTML Table Parsing** - Parses the HTML table directly
4. **Regex Extraction** - Last resort pattern matching

## Troubleshooting

### HTTP 429 (Rate Limited) Error

If you get "HTTP 429" error, Zerodha is rate-limiting your requests. Solutions:

1. **Wait and retry**: The script now has automatic retry with delays
2. **Run less frequently**: Change cron to run every 2-3 hours instead of daily
3. **Use alternative script**: Try `fetch_futures_data_safe.php` which has better rate limit handling
4. **Find API endpoint**: Check Zerodha's Network tab for API calls

### Check if script ran:
```bash
cat cron_log.txt
```

### Check if data file exists:
```bash
ls -la data/futures_margins.json
```

### Test manually:
```bash
php fetch_futures_data.php
```

### Verify PHP path:
```bash
which php
```

### Use Wrapper Script (Easier):

You can also use the provided wrapper script:
```bash
./run_fetch.sh
```

For cron:
```bash
0 8 * * * /full/path/to/ms/run_fetch.sh >> /full/path/to/ms/cron_log.txt 2>&1
```

### About the monarxprotect Warning:

The warning about `monarxprotect-php83.so` is harmless - it's a server security extension. You can ignore it. The script will still work.

## Important Notes

- **JavaScript Content**: If Zerodha loads data via JavaScript, this simple method may not work
- **API Endpoint**: Best solution is to find Zerodha's actual API endpoint
- **Manual Update**: You can always manually update `data/futures_margins.json`

## Finding API Endpoint

1. Open Zerodha's page: https://zerodha.com/margin-calculator/Futures/
2. Press F12 → Network tab
3. Filter by XHR or Fetch
4. Look for API calls that return JSON data
5. Update `$apiEndpoints` array in `fetch_futures_data.php`

