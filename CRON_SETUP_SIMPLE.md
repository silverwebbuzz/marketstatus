# Simple PHP Cron Setup

## Quick Setup

### Step 0: Find Your Full Path

First, find the absolute path to your `ms` directory:
```bash
cd /path/to/your/ms/directory
pwd
```

This will show something like: `/home/username/public_html/ms` or `/var/www/html/ms`

### Step 1: Test the Script

**Important:** Make sure you're in the correct directory!

```bash
cd /path/to/your/ms/directory
php fetch_futures_data.php
```

**If you get HTTP 429 (rate limited), use the safe version:**
```bash
php fetch_futures_data_safe.php
```

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

### Step 2: Set Up Daily Cron at 8 AM

**Option A: cPanel Cron Jobs**

1. Login to cPanel
2. Go to "Cron Jobs"
3. Add:
   - **Minute**: `0`
   - **Hour**: `8`
   - **Day**: `*`
   - **Month**: `*`
   - **Weekday**: `*`
   - **Command**:
     ```bash
     cd /home/username/public_html/ms && /usr/bin/php fetch_futures_data.php >> cron_log.txt 2>&1
     ```
     
     **OR use absolute path:**
     ```bash
     /usr/bin/php /home/username/public_html/ms/fetch_futures_data.php >> /home/username/public_html/ms/cron_log.txt 2>&1
     ```

**Option B: SSH Crontab**

```bash
crontab -e
```

Add (use absolute paths):
```
0 8 * * * cd /full/path/to/ms && /usr/bin/php fetch_futures_data.php >> /full/path/to/ms/cron_log.txt 2>&1
```

**OR:**
```
0 8 * * * /usr/bin/php /full/path/to/ms/fetch_futures_data.php >> /full/path/to/ms/cron_log.txt 2>&1
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

