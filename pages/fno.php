<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../auth.php';
authStart();
$user = authUser();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>FNO Dashboard — MarketStatus</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/ms/assets/css/style.css">
    <style>
        /* AI Modal */
        .ai-bias-bullish { color:var(--green); font-weight:700; }
        .ai-bias-bearish { color:var(--red);   font-weight:700; }
        .ai-bias-neutral { color:var(--yellow); font-weight:700; }
        .ai-report-text { font-size:13px; line-height:1.8; color:var(--text); white-space:pre-wrap; }
        .ai-report-text strong { color:var(--accent); }
        .ai-meta { font-size:11px; color:var(--text3); margin-bottom:14px; display:flex; justify-content:space-between; align-items:center; }
        .btn-ai-refresh { background:transparent; border:1px solid var(--border); color:var(--text2); border-radius:4px; padding:3px 10px; font-size:11px; cursor:pointer; }
        .btn-ai-refresh:hover { border-color:var(--accent); color:var(--accent); }
        .ai-generating { text-align:center; padding:40px 20px; color:var(--text3); }
        .ai-generating .spinner { width:28px; height:28px; border-width:3px; display:block; margin:0 auto 12px; }
        .confidence-bar { height:6px; background:var(--bg3); border-radius:3px; margin:8px 0 16px; overflow:hidden; }
        .confidence-fill { height:100%; border-radius:3px; transition:width .6s; }
    </style>
</head>
<body>

<header class="topbar">
    <div class="topbar-logo">MarketStatus <span>/ FNO Dashboard</span></div>
    <div class="topbar-right">
        <span><span class="market-status-dot"></span>NSE Live</span>
        <span id="stat-time">—</span>
        <?php if ($user): ?>
            <a href="/ms/pages/watchlist.php" style="color:var(--accent);text-decoration:none;font-size:13px;font-weight:600;">My Portfolio</a>
            <span style="color:var(--text3);font-size:13px;"><?= htmlspecialchars($user['name']) ?></span>
            <a href="/ms/pages/logout.php" style="color:var(--text3);text-decoration:none;font-size:12px;">Logout</a>
        <?php else: ?>
            <a href="/ms/pages/login.php" style="color:var(--accent);text-decoration:none;font-size:13px;font-weight:600;">Login</a>
            <a href="/ms/pages/register.php" style="color:var(--text2);text-decoration:none;font-size:13px;">Register</a>
        <?php endif; ?>
    </div>
</header>

<div class="stats-row">
    <div class="stat-box"><div class="lbl">Total Stocks</div><div class="val blue"  id="stat-total">—</div></div>
    <div class="stat-box"><div class="lbl">Advances</div>    <div class="val green" id="stat-adv">—</div></div>
    <div class="stat-box"><div class="lbl">Declines</div>    <div class="val red"   id="stat-dec">—</div></div>
    <div class="stat-box"><div class="lbl">Margins Updated</div><div class="val" style="font-size:13px;color:var(--text2);">Daily 9 AM IST</div></div>
</div>

<div class="controls-bar">
    <div class="search-wrap">
        <span class="ico">⌕</span>
        <input type="text" id="search-sym" placeholder="Search symbol  e.g. RELIANCE, NIFTY">
    </div>
    <select class="ctrl-select" id="filter-ind"><option value="">All Industries</option></select>
    <select class="ctrl-select" id="filter-exp"><option value="">All Expiries</option></select>
    <button class="btn-refresh" id="btn-refresh">⟳ Refresh Prices</button>
    <button class="btn-clear"   id="btn-clear">Clear</button>
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

<!-- Detail Modal -->
<div class="modal-overlay" id="fno-modal">
    <div class="modal-box">
        <div class="modal-head">
            <h2 id="modal-symbol">—</h2>
            <button class="modal-close-btn" id="modal-close">✕</button>
        </div>
        <div id="modal-body"></div>
    </div>
</div>

<!-- Portfolio Add Modal (shared) -->
<?php require __DIR__ . '/../includes/portfolio_modal.php'; ?>

<!-- AI Report Modal -->
<div class="modal-overlay" id="ai-modal">
    <div class="modal-box" style="max-width:640px;">
        <div class="modal-head">
            <h2 id="ai-modal-title">AI Report</h2>
            <button class="modal-close-btn" id="ai-modal-close">✕</button>
        </div>
        <div id="ai-modal-body"></div>
    </div>
</div>

<script>
window.APP_BASE   = '/ms';
window.IS_LOGGED_IN = <?= $user ? 'true' : 'false' ?>;
</script>
<script src="/ms/assets/js/fno.js?v=4"></script>
</body>
</html>
