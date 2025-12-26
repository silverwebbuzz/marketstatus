# Stock Data Fetching - Cron Setup

## Setup for 30-Minute Updates

### Cron Job

```bash
crontab -e
```

Add this line to fetch stock data every 30 minutes:

```bash
*/30 * * * * cd /path/to/ms && /usr/bin/php fetch_stock_data.php >> cron_stock.log 2>&1
```

**Explanation:**
- `*/30` = Every 30 minutes
- `* * * *` = Every hour, every day, every month, every day of week
- Runs at: 00:00, 00:30, 01:00, 01:30, 02:00, 02:30, etc.

### Alternative: Every Hour

If 30 minutes is too frequent:

```bash
0 * * * * cd /path/to/ms && /usr/bin/php fetch_stock_data.php >> cron_stock.log 2>&1
```

### Test First

Before setting up cron, test the script:

```bash
php fetch_stock_data.php
```

This will:
1. Load symbols from `futures_margins.json`
2. Fetch data from Yahoo Finance for each symbol
3. Calculate all technical indicators
4. Save to `data/stock_data.json`

### Expected Output

```
Fetching stock data from Yahoo Finance...
Found 200 unique symbols
Processed: 10 / 200
Processed: 20 / 200
...
✓ Success: 195 symbols saved
✗ Failed: 5 symbols
```

### Notes

- **Rate Limiting**: Script includes 0.1 second delay between requests
- **Time**: Takes ~20-30 seconds for 200 symbols
- **Data File**: Saves to `data/stock_data.json`
- **Page Display**: Frontend automatically loads and displays this data

### Troubleshooting

**If many symbols fail:**
- Yahoo Finance may be rate-limiting
- Check `cron_stock.log` for errors
- Consider running less frequently (every hour instead of 30 min)

**If script times out:**
- Increase `set_time_limit` in script
- Or fetch in batches (modify script to process 50 symbols at a time)

