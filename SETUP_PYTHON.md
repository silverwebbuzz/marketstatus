# Python Setup for Futures Data Fetching

## Quick Installation

### Step 1: Install Python (if not installed)

**Check if Python 3 is installed:**
```bash
python3 --version
```

**If not installed:**
- **Linux**: `yum install python3` or `apt-get install python3`
- **macOS**: Usually pre-installed, or `brew install python3`

### Step 2: Install Required Packages

```bash
pip3 install requests beautifulsoup4 lxml
```

**OR use requirements.txt:**
```bash
pip3 install -r requirements.txt
```

### Step 3: Test the Script

```bash
python3 fetch_futures.py
```

### Step 4: Set Up Cron

**For Python script:**
```bash
0 8 * * * cd /path/to/ms && /usr/bin/python3 fetch_futures.py >> cron_log.txt 2>&1
```

**OR use absolute path:**
```bash
0 8 * * * /usr/bin/python3 /path/to/ms/fetch_futures.py >> /path/to/ms/cron_log.txt 2>&1
```

## Alternative: Use Existing Data

If Python is not available or fetching fails, use your existing `fnO.json`:

```bash
php convert_fnO_to_futures.php
```

This converts your existing `fnO.json` to the `futures_margins.json` format.

## Advantages of Python

- ✅ Better HTML parsing with BeautifulSoup
- ✅ More reliable than PHP cURL for complex pages
- ✅ Better error handling
- ✅ Easier to maintain

## Troubleshooting

### "python3: command not found"
**Solution**: Install Python 3 or use `python` instead of `python3`

### "ModuleNotFoundError: No module named 'requests'"
**Solution**: 
```bash
pip3 install requests beautifulsoup4
```

### "Permission denied"
**Solution**:
```bash
chmod +x fetch_futures.py
```

### Still getting HTTP 429?
**Solutions**:
1. Wait longer between requests (script already has delays)
2. Use existing `fnO.json` data: `php convert_fnO_to_futures.php`
3. Find Zerodha's API endpoint
4. Run less frequently (every 2-3 hours instead of daily)

## Recommended Approach

1. **First try**: `python3 fetch_futures.py`
2. **If that fails**: `php convert_fnO_to_futures.php` (uses existing data)
3. **For cron**: Use whichever works

