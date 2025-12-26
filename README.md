# Market Status - Futures & Options Data

## Data Source

The page at `https://silverwebbuzz.com/ms/futures-margins` reads data from:
- **Primary:** `data/futures_margins.json` (632 contracts)
- **Fallback:** `data/fnO.json` (if primary not available)

## Daily Updates

### Automatic (Recommended)

**Cron job handles everything automatically:**

```bash
0 8 * * * cd /path/to/ms && /usr/bin/php update_futures_smart.php >> cron_log.txt 2>&1
```

**What it does:**
1. ✅ Fetches fresh HTML from Zerodha (Python script)
2. ✅ Saves HTML to `data/zerodha_temp.html`
3. ✅ Parses and saves to `data/futures_margins.json`
4. ✅ Falls back to cached HTML if fetch fails
5. ✅ Uses existing `fnO.json` if all else fails

**You don't need to manually download anything!** The cron job does it all.

### Manual Update (If Needed)

If cron fails or you want to update manually:

```bash
# Option 1: Run Python script (fetches and parses)
python3 fetch_futures.py

# Option 2: If you manually downloaded HTML
# 1. Save page as HTML to: data/zerodha_temp.html
# 2. Run:
php parse_from_html.php data/zerodha_temp.html
```

## Files

### Essential Files (Keep These)
- `update_futures_smart.php` - Main updater (use in cron)
- `fetch_futures.py` - Python fetcher/parser
- `parse_from_html.php` - PHP parser (backup)
- `convert_fnO_to_futures.php` - Converter (fallback)
- `run_fetch.sh` - Bash wrapper (alternative)
- `config.php` - Configuration
- `functions.php` - Helper functions
- `pages/market/fno.php` - Display page

### Data Files
- `data/futures_margins.json` - Main data file (used by page)
- `data/zerodha_temp.html` - Cached HTML (auto-generated)
- `data/fnO.json` - Legacy data (fallback)

## Setup

1. **Install Python dependencies:**
   ```bash
   pip3 install requests beautifulsoup4
   ```

2. **Set up cron (daily at 8 AM):**
   ```bash
   crontab -e
   ```
   Add:
   ```
   0 8 * * * cd /path/to/ms && /usr/bin/php update_futures_smart.php >> cron_log.txt 2>&1
   ```

3. **Test it:**
   ```bash
   php update_futures_smart.php
   ```

## How It Works

1. **Cron runs** `update_futures_smart.php` at 8 AM daily
2. **Python script** fetches HTML from Zerodha
3. **HTML saved** to `data/zerodha_temp.html`
4. **Data parsed** and saved to `data/futures_margins.json`
5. **Page displays** data from `futures_margins.json`

**No manual work needed!** Everything is automated.
