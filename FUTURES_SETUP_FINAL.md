# Futures & Options Margins - Complete Setup Guide

## Overview

This system fetches and displays Futures & Options margin data from Zerodha and stock market data from NSE India.

## Architecture

### 1. Zerodha Margins (Daily Morning - 8:00 AM)
Fetches futures margin data from Zerodha's margin calculator.

### 2. NSE Stock Data (Every 30 Minutes)
Fetches comprehensive stock data from NSE India API in a single call.

---

## Files Used

### Zerodha Margins Functionality

#### Core Files:
1. **`update_futures_smart.php`** - Main orchestrator
   - Tries Python script first
   - Falls back to PHP script
   - Finally uses existing fnO.json if all fail
   - **Cron:** `0 8 * * *` (Daily at 8:00 AM)

2. **`fetch_futures.py`** - Python fetcher
   - Fetches HTML from Zerodha
   - Parses futures margin data
   - Saves to `data/futures_margins.json`

3. **`fetch_futures_data.php`** - PHP fetcher (fallback)
   - Alternative to Python
   - Same functionality

4. **`convert_fnO_to_futures.php`** - Data converter
   - Converts old `fnO.json` format to new format
   - Used as last resort

5. **`run_fetch.sh`** - Shell wrapper (optional)
   - Can be used instead of `update_futures_smart.php`

#### Data Files:
- `data/futures_margins.json` - Output file (used by website)
- `data/fnO.json` - Legacy/fallback data
- `data/zerodha_temp.html` - Cached HTML (for debugging)

---

### NSE Stock Data Functionality

#### Core Files:
1. **`fetch_nse_fno_data.php`** - NSE F&O data fetcher
   - Single API call to get all F&O securities
   - Merges with futures_margins.json
   - Calculates technical indicators
   - **Cron:** `0,30 * * * *` (Every 30 minutes)

#### Data Files:
- `data/stock_data.json` - Output file (used by website)

---

### Display Files

1. **`pages/market/fno.php`** - Main display page
   - Shows all futures margin data
   - Displays NSE stock data (OHLC, Volume, etc.)
   - Shows advance/decline numbers
   - Industry filter
   - Technical indicators modal

---

## Cron Setup

### 1. Zerodha Margins (Daily at 8:00 AM)

```bash
crontab -e
```

Add:
```bash
0 8 * * * cd /path/to/ms && /usr/bin/php update_futures_smart.php >> cron_futures.log 2>&1
```

### 2. NSE Stock Data (Every 30 Minutes)

Add:
```bash
0,30 * * * * cd /path/to/ms && /usr/bin/php fetch_nse_fno_data.php >> cron_nse_fno.log 2>&1
```

**Complete cron setup:**
```bash
# Zerodha margins - daily at 8 AM
0 8 * * * cd /path/to/ms && /usr/bin/php update_futures_smart.php >> cron_futures.log 2>&1

# NSE stock data - every 30 minutes
0,30 * * * * cd /path/to/ms && /usr/bin/php fetch_nse_fno_data.php >> cron_nse_fno.log 2>&1
```

---

## Data Flow

### Zerodha Margins Flow:
```
Zerodha Website → fetch_futures.py/fetch_futures_data.php 
→ futures_margins.json → fno.php (display)
```

### NSE Stock Data Flow:
```
NSE API → fetch_nse_fno_data.php 
→ stock_data.json → fno.php (display + merge with futures)
```

### Combined Display:
```
fno.php loads:
- futures_margins.json (Zerodha margins)
- stock_data.json (NSE stock data)
- Merges by symbol
- Displays all data together
```

---

## NSE API Endpoint

**URL:** `https://www.nseindia.com/api/equity-stockIndices?index=SECURITIES%20IN%20F%26O`

**Returns:** All F&O securities in one call with:
- OHLC data
- Volume
- Change & Change %
- 52-week high/low
- Industry
- Market Cap, PE, PB, Dividend Yield
- Face Value
- And more...

---

## Features on Website

### Displayed Data:
1. **Futures Margins** (from Zerodha):
   - Symbol, Expiry, Lot Size
   - NRML Margin, Margin Rate
   - MWPL, Futures Price
   - Contract Value

2. **Stock Data** (from NSE):
   - Current Price, OHLC
   - Volume
   - 52-week High/Low
   - Change & Change %
   - Industry

3. **Technical Indicators** (calculated):
   - Pivot Points
   - Fibonacci Levels
   - DMA (5, 10, 20, 50, 100, 200)
   - Crash Signals
   - Target Prices

4. **Market Overview**:
   - Advance/Decline numbers
   - Last updated timestamp

### Filters:
- Search by Symbol
- Filter by Expiry
- Filter by Margin Rate
- **Filter by Industry** (new)

### Sorting:
- All columns are sortable
- Click column headers to sort

---

## Testing

### Test Zerodha Fetcher:
```bash
php update_futures_smart.php
```

### Test NSE Fetcher:
```bash
php fetch_nse_fno_data.php
```

### Expected Output:

**Zerodha:**
```
Smart Futures Data Updater
==========================
Trying Python script...
✓ Success: Fetched new data with Python
```

**NSE:**
```
Fetching F&O stock data from NSE India...
Initializing NSE session...
Fetching F&O securities data from NSE...
Found 250 F&O securities from NSE
✓ Success: 250 symbols saved
📊 Advance/Decline: 120 advances, 100 declines, 30 unchanged
```

---

## Troubleshooting

### Zerodha Issues:
- **Rate Limited (HTTP 429)**: Wait and retry, or use existing fnO.json
- **Python not found**: Install Python 3 or use PHP script
- **No data**: Check if fnO.json exists as fallback

### NSE Issues:
- **403/401 errors**: NSE requires session initialization (handled automatically)
- **No data returned**: Check NSE API endpoint is accessible
- **Cookie issues**: Script handles cookies automatically

### Display Issues:
- **No volume showing**: Run `fetch_nse_fno_data.php` to populate stock_data.json
- **No advance/decline**: Ensure NSE fetcher ran successfully
- **Missing industries**: Check NSE data includes industry field

---

## File Cleanup (Removed)

The following files are **no longer needed** (Yahoo Finance):
- ~~`fetch_stock_data.php`~~ - Replaced by `fetch_nse_fno_data.php`
- ~~`fetch_nse_data.php`~~ - Replaced by `fetch_nse_fno_data.php`
- ~~`CRON_STOCK_DATA.md`~~ - Replaced by this file
- ~~`CRON_NSE_DATA.md`~~ - Replaced by this file

---

## Summary

**Zerodha Margins:**
- Runs: Daily at 8:00 AM
- Files: `update_futures_smart.php`, `fetch_futures.py`, `fetch_futures_data.php`
- Output: `data/futures_margins.json`

**NSE Stock Data:**
- Runs: Every 30 minutes
- File: `fetch_nse_fno_data.php`
- Output: `data/stock_data.json`

**Display:**
- File: `pages/market/fno.php`
- URL: `https://silverwebbuzz.com/ms/futures-margins`

---

## Quick Reference

**Update Zerodha margins manually:**
```bash
php update_futures_smart.php
```

**Update NSE data manually:**
```bash
php fetch_nse_fno_data.php
```

**Check logs:**
```bash
tail -f cron_futures.log
tail -f cron_nse_fno.log
```

