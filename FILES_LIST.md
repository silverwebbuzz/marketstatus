# Futures & Options - Complete File List

## Zerodha Margins Functionality (Daily 8 AM)

### Core Scripts:
1. **update_futures_smart.php** - Main orchestrator
   - Tries Python → PHP → fnO.json conversion
   - Cron: `0 8 * * *`

2. **fetch_futures.py** - Python fetcher
   - Fetches from Zerodha website
   - Parses HTML table

3. **fetch_futures_data.php** - PHP fetcher (fallback)
   - Alternative to Python

4. **convert_fnO_to_futures.php** - Data converter
   - Converts old format to new format

5. **run_fetch.sh** - Shell wrapper (optional)
   - Alternative to update_futures_smart.php

### Data Files:
- `data/futures_margins.json` - **Output (used by website)**
- `data/fnO.json` - Legacy/fallback data
- `data/zerodha_temp.html` - Cached HTML

---

## NSE Stock Data Functionality (Every 30 Minutes)

### Core Scripts:
1. **fetch_nse_fno_data.php** - **NEW - Single API call**
   - Fetches all F&O securities from NSE
   - Merges with futures_margins.json
   - Cron: `0,30 * * * *`

### Data Files:
- `data/stock_data.json` - **Output (used by website)**

---

## Display

1. **pages/market/fno.php** - Main display page
   - Shows Zerodha margins + NSE stock data
   - Industry filter (NEW)
   - All NSE fields displayed

---

## Removed Files (No Longer Needed)

- ~~fetch_stock_data.php~~ (Yahoo Finance - replaced)
- ~~fetch_nse_data.php~~ (Old NSE - replaced)
- ~~CRON_STOCK_DATA.md~~ (replaced)
- ~~CRON_NSE_DATA.md~~ (replaced)

---

## Documentation

1. **FUTURES_SETUP_FINAL.md** - Complete setup guide
