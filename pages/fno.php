<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FNO Dashboard — MarketStatus</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/ms/assets/css/style.css">
</head>
<body>

<header class="topbar">
    <div class="topbar-logo">MarketStatus <span>/ FNO Dashboard</span></div>
    <div class="topbar-right">
        <span><span class="market-status-dot"></span>NSE Live</span>
        <span id="stat-time">—</span>
    </div>
</header>

<div class="stats-row">
    <div class="stat-box">
        <div class="lbl">Total Stocks</div>
        <div class="val blue" id="stat-total">—</div>
    </div>
    <div class="stat-box">
        <div class="lbl">Advances</div>
        <div class="val green" id="stat-adv">—</div>
    </div>
    <div class="stat-box">
        <div class="lbl">Declines</div>
        <div class="val red" id="stat-dec">—</div>
    </div>
    <div class="stat-box">
        <div class="lbl">Margins Updated</div>
        <div class="val" style="font-size:13px;color:var(--text2);">Daily 9 AM IST</div>
    </div>
</div>

<div class="controls-bar">
    <div class="search-wrap">
        <span class="ico">⌕</span>
        <input type="text" id="search-sym" placeholder="Search symbol  e.g. RELIANCE, NIFTY">
    </div>
    <select class="ctrl-select" id="filter-ind"><option value="">All Industries</option></select>
    <select class="ctrl-select" id="filter-exp"><option value="">All Expiries</option></select>
    <button class="btn-refresh" id="btn-refresh">⟳ Refresh Prices</button>
    <button class="btn-clear" id="btn-clear">Clear</button>
</div>

<div class="table-wrap">
    <table class="fno-table">
        <thead>
            <tr>
                <th data-sort="symbol">Symbol</th>
                <th data-sort="change_percent">LTP / Change</th>
                <th>Day Range</th>
                <th data-sort="week52_high">52W &amp; OHLC</th>
                <th data-sort="nrml_margin">NRML Margin</th>
                <th data-sort="lot_size">Lot Size</th>
                <th data-sort="contract_value">Contract Value</th>
                <th data-sort="today_pl">Today P/L</th>
                <th data-sort="roi">ROI %</th>
                <th data-sort="volume">Volume</th>
                <th data-sort="delivery_pct">Delivery %</th>
                <th>Signal</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody id="fno-tbody">
            <tr class="loading-row"><td colspan="13"><span class="spinner"></span>Loading...</td></tr>
        </tbody>
    </table>
</div>

<div class="modal-overlay" id="fno-modal">
    <div class="modal-box">
        <div class="modal-head">
            <h2 id="modal-symbol">—</h2>
            <button class="modal-close-btn" id="modal-close">✕</button>
        </div>
        <div id="modal-body"></div>
    </div>
</div>

<script>window.APP_BASE = '/ms';</script>
<script src="/ms/assets/js/fno.js?v=3"></script>
</body>
</html>
