# Futures & Options Data Fetching - Final Setup

## ✅ Current Status

**Working Solution:** Both Python and PHP scripts successfully parse HTML from Zerodha's page.

## How It Works

1. **Fetch HTML** - Python script fetches the page with browser-like headers
2. **Save to Temp File** - HTML is saved to `data/zerodha_temp.html`
3. **Parse HTML** - Extract contract data from the table
4. **Save JSON** - Save to `data/futures_margins.json`

## Files

- **`fetch_futures.py`** - Main Python script (recommended)
- **`parse_from_html.php`** - PHP parser (backup/alternative)
- **`update_futures_smart.php`** - Smart updater (tries Python, then PHP, then fnO.json)
- **`run_fetch.sh`** - Bash wrapper script

## Usage

### Option 1: Python Script (Recommended)

```bash
python3 fetch_futures.py
```

**Features:**
- Fetches HTML with browser-like headers
- Saves HTML to `data/zerodha_temp.html`
- Uses cached HTML if recent (< 1 hour)
- Parses 632+ contracts
- Saves to `data/futures_margins.json`

### Option 2: PHP Parser (If you have HTML file)

```bash
php parse_from_html.php data/zerodha_temp.html
```

**Use when:**
- Python fetch fails (rate limited)
- You manually downloaded the HTML
- You want to re-parse existing HTML

### Option 3: Smart Updater (Best for Cron)

```bash
php update_futures_smart.php
```

**What it does:**
1. Tries Python script first
2. Falls back to PHP script
3. Uses existing `fnO.json` if both fail
4. Always ensures data exists

## Cron Setup

### Recommended: Smart Updater

```bash
0 8 * * * cd /path/to/ms && /usr/bin/php update_futures_smart.php >> cron_log.txt 2>&1
```

### Alternative: Python Direct

```bash
0 8 * * * cd /path/to/ms && /usr/bin/python3 fetch_futures.py >> cron_log.txt 2>&1
```

### Alternative: Bash Wrapper

```bash
0 8 * * * /path/to/ms/run_fetch.sh >> /path/to/ms/cron_log.txt 2>&1
```

## Data Format

The JSON file contains:

```json
{
  "last_updated": "2025-12-26 12:00:00",
  "source": "Zerodha",
  "source_url": "https://zerodha.com/margin-calculator/Futures/",
  "html_cached": "data/zerodha_temp.html",
  "total_contracts": 632,
  "data": [
    {
      "symbol": "360ONE",
      "expiry": "30-DEC-2025",
      "lot_size": 500,
      "mwpl": 5.29,
      "nrml_margin": 135716,
      "nrml_margin_rate": 22.5,
      "price": 1197.8
    }
  ]
}
```

## Troubleshooting

### Rate Limited (HTTP 429)

**Solution:** The script now:
- Uses cached HTML if available (< 1 hour old)
- Has better browser headers
- Waits longer between requests

**Manual Workaround:**
1. Open https://zerodha.com/margin-calculator/Futures/ in browser
2. Save page as HTML to `data/zerodha_temp.html`
3. Run: `php parse_from_html.php data/zerodha_temp.html`

### No Data Extracted

**Check:**
1. Does `data/zerodha_temp.html` exist?
2. Is the HTML file valid? (open in browser)
3. Run: `python3 test_parse.py` to see table structure

### Python Not Found

**Install:**
```bash
yum install python3
# or
apt-get install python3
```

**Install dependencies:**
```bash
pip3 install requests beautifulsoup4
```

## Success Indicators

✅ **Python script:**
- Shows "Parsed X contracts from HTML"
- Shows "✓ Success: X contracts saved"
- File `data/futures_margins.json` is updated

✅ **PHP parser:**
- Shows "Successfully parsed X contracts"
- Shows "✓ Success: X contracts saved"
- File `data/futures_margins.json` is updated

✅ **Smart updater:**
- Shows "✓ Success: Fetched new data with Python"
- Shows contract count
- Shows last updated time

## Notes

- HTML is cached in `data/zerodha_temp.html` for reuse
- Data is saved to `data/futures_margins.json`
- Page displays data automatically from JSON file
- Scripts handle rate limiting gracefully

