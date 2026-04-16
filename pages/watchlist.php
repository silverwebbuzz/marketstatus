<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../auth.php';
$user = authRequire();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Portfolio — MarketStatus</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/ms/assets/css/style.css">
    <style>
        .wl-controls { padding:12px 20px; display:flex; gap:10px; flex-wrap:wrap; align-items:center; background:var(--bg2); border-bottom:1px solid var(--border); }
        .btn-add { background:var(--accent); color:#fff; border:none; border-radius:var(--radius); padding:7px 16px; font-size:13px; font-weight:600; cursor:pointer; }
        .filter-tabs { display:flex; gap:6px; }
        .filter-tab { background:var(--bg3); border:1px solid var(--border); border-radius:var(--radius); padding:5px 14px; font-size:12px; cursor:pointer; color:var(--text2); }
        .filter-tab.active { background:var(--accent); border-color:var(--accent); color:#fff; }

        /* Summary strip */
        .summary-row { display:flex; gap:1px; background:var(--border); border-bottom:1px solid var(--border); }
        .summary-box { flex:1; background:var(--bg2); padding:10px 16px; min-width:110px; }
        .summary-box .lbl { font-size:11px; color:#7a8fa6; text-transform:uppercase; letter-spacing:.4px; }
        .summary-box .val { font-size:17px; font-weight:700; margin-top:3px; color:#e2e8f0; }

        /* Brighter text for dark screen readability */
        .wl-table-wrap { --text2:#b8c5d6; --text3:#7a8fa6; }

        /* Table */
        .wl-table-wrap { overflow-x:auto; }
        .wl-table { width:100%; border-collapse:collapse; table-layout:auto; }
        .wl-table thead th {
            background:var(--bg2); padding:10px 14px;
            font-size:11px; font-weight:600; text-transform:uppercase;
            letter-spacing:.5px; color:#7a8fa6;
            border-bottom:2px solid var(--border); white-space:nowrap;
            text-align:left;
        }
        .wl-table thead th.num  { text-align:right; }
        .wl-table thead th.ctr  { text-align:center; }
        .wl-table tbody td { padding:10px 14px; border-bottom:1px solid var(--border); font-size:13px; vertical-align:top; white-space:nowrap; color:#cbd5e1; }
        .wl-table tbody td.num  { text-align:right; }
        .wl-table tbody td.ctr  { text-align:center; }
        .wl-table tbody tr:hover { background:rgba(255,255,255,.04); }
        .wl-table tbody tr.closed-row { opacity:.65; }
        /* Totals row */
        .wl-table tfoot td { padding:10px 14px; font-size:13px; font-weight:700; border-top:2px solid var(--border); background:var(--bg2); white-space:nowrap; color:#cbd5e1; }
        .wl-table tfoot td.num { text-align:right; }

        /* Name cell */
        .sym-name { font-weight:700; font-size:14px; color:#e2e8f0; }
        .sym-meta { font-size:10px; color:#7a8fa6; margin-top:3px; display:flex; gap:8px; flex-wrap:wrap; }
        .sym-meta .tgt  { color:#4ade80; }
        .sym-meta .sl   { color:#f87171; }
        .sym-meta .note { color:#7a8fa6; font-style:italic; }

        /* Product badge */
        .badge-buy  { background:rgba(34,197,94,.15);  color:var(--green); padding:2px 10px; border-radius:20px; font-size:11px; font-weight:700; display:inline-block; }
        .badge-sell { background:rgba(239,68,68,.15);   color:var(--red);   padding:2px 10px; border-radius:20px; font-size:11px; font-weight:700; display:inline-block; }
        .badge-closed-sm { background:rgba(100,116,139,.12); color:var(--text3); padding:2px 10px; border-radius:20px; font-size:11px; display:inline-block; }

        /* Qty cell — show sign like Zerodha */
        .qty-positive { color:var(--green); font-weight:600; }
        .qty-negative { color:var(--red);   font-weight:600; }

        /* P&L cells */
        .pl-cell { font-weight:700; }
        .pl-label { font-size:10px; font-weight:400; color:var(--text3); margin-top:1px; }

        /* Status badges */
        .hit-target { color:var(--green); font-weight:700; font-size:11px; }
        .hit-sl     { color:var(--red);   font-weight:700; font-size:11px; }

        /* Trade bar */
        .trade-bar-wrap { min-width:140px; }
        .trade-bar-track { position:relative; height:5px; border-radius:3px; background:var(--bg3); margin:5px 0 4px; }
        .trade-bar-zone  { position:absolute; height:100%; }
        .trade-bar-pin   { position:absolute; width:2px; height:11px; top:-3px; border-radius:2px; transform:translateX(-50%); }
        .trade-bar-curr-pin { position:absolute; width:3px; height:13px; top:-4px; border-radius:2px; transform:translateX(-50%); box-shadow:0 0 4px rgba(0,0,0,.6); }
        .trade-bar-ltp   { font-size:10px; font-weight:600; }
        .trade-bar-axis  { display:flex; justify-content:space-between; font-size:9px; color:var(--text3); }

        /* Action buttons */
        .btn-sm { background:transparent; border:1px solid var(--border); color:var(--text2); border-radius:4px; padding:3px 9px; font-size:11px; cursor:pointer; }
        .btn-sm:hover { border-color:var(--accent); color:var(--accent); }
        .btn-sm-close { border-color:rgba(34,197,94,.4); color:var(--green); }
        .btn-sm-close:hover { border-color:var(--green); background:rgba(34,197,94,.08); }
        .btn-sm-del { border-color:rgba(239,68,68,.3); color:var(--red); }
        .btn-sm-del:hover { border-color:var(--red); background:rgba(239,68,68,.08); }
        .actions-wrap { display:flex; gap:5px; flex-wrap:wrap; }

        .empty-wl { text-align:center; padding:60px 20px; color:var(--text3); font-size:14px; }

        /* Close modal */
        .close-modal-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,.75); z-index:600; align-items:center; justify-content:center; }
        .close-modal-overlay.open { display:flex; }
        .close-modal-box { background:var(--bg2); border:1px solid var(--border); border-radius:12px; width:90%; max-width:400px; padding:28px; }
        .close-modal-box h3 { font-size:16px; font-weight:700; margin-bottom:6px; }
        .close-modal-box .close-subtitle { font-size:12px; color:var(--text3); margin-bottom:20px; }
        .close-form-group { margin-bottom:14px; }
        .close-form-group label { display:block; font-size:12px; color:var(--text3); margin-bottom:5px; }
        .close-form-group input { width:100%; background:var(--bg3); border:1px solid var(--border); border-radius:var(--radius); padding:9px 12px; color:var(--text); font-size:14px; font-weight:600; outline:none; box-sizing:border-box; }
        .close-form-group input:focus { border-color:var(--accent); }
        .close-pl-preview { background:var(--bg3); border-radius:8px; padding:12px 14px; margin-bottom:16px; font-size:13px; }
        .close-pl-preview .lbl { color:var(--text3); font-size:11px; margin-bottom:4px; }
        .close-pl-preview .val { font-size:18px; font-weight:700; }
        .close-modal-footer { display:flex; gap:10px; justify-content:flex-end; }
    </style>
</head>
<body>

<header class="topbar">
    <div class="topbar-logo">MarketStatus <span>/ My Portfolio</span></div>
    <div class="topbar-right">
        <span style="color:var(--text2);font-size:13px;">Hi, <?= htmlspecialchars($user['name']) ?></span>
        <a href="/ms/pages/fno.php"    style="color:var(--accent);text-decoration:none;font-size:13px;">FNO Dashboard</a>
        <a href="/ms/pages/logout.php" style="color:var(--text3);text-decoration:none;font-size:13px;">Logout</a>
    </div>
</header>

<div class="summary-row">
    <div class="summary-box"><div class="lbl">Total Trades</div><div class="val blue" id="s-total">—</div></div>
    <div class="summary-box"><div class="lbl">Open</div><div class="val" id="s-open">—</div></div>
    <div class="summary-box"><div class="lbl">Unrealised P/L</div><div class="val" id="s-pl">—</div></div>
    <div class="summary-box"><div class="lbl">Realised P/L</div><div class="val" id="s-realised">—</div></div>
    <div class="summary-box"><div class="lbl">Targets Hit</div><div class="val green" id="s-targets">—</div></div>
    <div class="summary-box"><div class="lbl">SL Hit</div><div class="val red" id="s-sl">—</div></div>
</div>

<div class="wl-controls">
    <button class="btn-add" onclick="openPortfolioModal(null, null)">+ Add Trade</button>
    <div class="filter-tabs">
        <button class="filter-tab active" onclick="setFilter(this,'ALL')">All</button>
        <button class="filter-tab"        onclick="setFilter(this,'OPEN')">Open</button>
        <button class="filter-tab"        onclick="setFilter(this,'CLOSED')">Closed</button>
    </div>
</div>

<div class="wl-table-wrap">
    <table class="wl-table">
        <thead>
            <tr>
                <th>Instrument</th>
                <th class="num">Qty</th>
                <th class="num">Avg Price</th>
                <th class="num">LTP / Change</th>
                <th>Day Range</th>
                <th class="num">Target</th>
                <th class="num">Stop Loss</th>
                <th class="num">P&amp;L</th>
                <th class="ctr">Position</th>
                <th class="ctr">Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody id="wl-tbody">
            <tr><td colspan="11" class="empty-wl">Loading...</td></tr>
        </tbody>
        <tfoot id="wl-tfoot"></tfoot>
    </table>
</div>

<!-- Close Trade Modal -->
<div class="close-modal-overlay" id="close-modal">
    <div class="close-modal-box">
        <h3 id="close-modal-title">Close Trade</h3>
        <div class="close-subtitle" id="close-subtitle"></div>
        <div class="close-form-group">
            <label>Exit Price ₹</label>
            <input type="number" id="close-price" step="0.05" placeholder="0.00" oninput="updateClosePL()">
        </div>
        <div class="close-pl-preview" id="close-pl-preview" style="display:none;">
            <div class="lbl">Estimated Realised P/L</div>
            <div class="val" id="close-pl-val">—</div>
        </div>
        <div class="close-modal-footer">
            <button class="port-btn-cancel" onclick="document.getElementById('close-modal').classList.remove('open')">Cancel</button>
            <button class="port-btn-save"   onclick="confirmClose()">Confirm Close</button>
        </div>
    </div>
    <input type="hidden" id="close-id">
</div>

<?php require __DIR__ . '/../includes/portfolio_modal.php'; ?>

<script>
window.APP_BASE     = '/ms';
window.IS_LOGGED_IN = true;
const BASE          = '/ms/api';
let allData         = [];
let filter          = 'ALL';
let _closeTradeData = null;

function load() {
    fetch(BASE + '/watchlist.php?action=list')
        .then(r => r.json())
        .then(res => {
            if (!res.success) return;
            allData = res.data;
            render();
            updateSummary();
        });
}

function setFilter(el, f) {
    filter = f;
    document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    render();
    updateSummary();
}

// ── Trade position bar ──────────────────────────────
function tradeBar(d) {
    const curr   = d.current_price;
    const entry  = d.entry_price;
    const target = d.target_price;
    const sl     = d.stop_loss;
    const isBuy  = d.trade_type === 'BUY';
    if (!curr || !entry) return '—';

    const prices = [curr, entry, target, sl].filter(Boolean);
    const spread = Math.max(...prices) - Math.min(...prices);
    const pad    = spread * 0.18 || entry * 0.01;
    const minP   = Math.min(...prices) - pad;
    const maxP   = Math.max(...prices) + pad;
    const range  = maxP - minP;
    const pct    = v => Math.min(100, Math.max(0, ((v - minP) / range) * 100)).toFixed(1);

    const ep = pct(entry), cp = pct(curr);
    const tp = target ? pct(target) : null;
    const sp = sl     ? pct(sl)     : null;

    let zones = '';
    if (sp !== null) {
        const l = isBuy ? sp : ep, r = isBuy ? ep : sp;
        zones += `<div class="trade-bar-zone" style="left:${l}%;width:${r-l}%;background:rgba(239,68,68,.3);border-radius:3px 0 0 3px;"></div>`;
    }
    if (tp !== null) {
        const l = isBuy ? ep : tp, r = isBuy ? tp : ep;
        zones += `<div class="trade-bar-zone" style="left:${l}%;width:${r-l}%;background:rgba(34,197,94,.3);border-radius:0 3px 3px 0;"></div>`;
    }

    const profitable = isBuy ? curr > entry : curr < entry;
    const currColor  = profitable ? 'var(--green)' : 'var(--red)';

    const axisLeft  = sl     ? `<span style="color:#f87171;">SL ${sl.toLocaleString('en-IN')}</span>`     : `<span></span>`;
    const axisRight = target ? `<span style="color:#4ade80;">T ${target.toLocaleString('en-IN')}</span>` : `<span></span>`;

    // Current price label — floated above the current pin
    const currLbl = `<div style="position:relative;height:16px;margin-bottom:1px;">
        <span style="position:absolute;left:${cp}%;transform:translateX(-50%);font-size:10px;font-weight:700;color:${currColor};white-space:nowrap;">${d.current_price.toLocaleString('en-IN',{minimumFractionDigits:2})}</span>
    </div>`;

    // Entry label — floated below the entry pin
    const entryLbl = `<div style="position:relative;height:14px;margin-top:1px;">
        <span style="position:absolute;left:${ep}%;transform:translateX(-50%);font-size:9px;color:var(--accent);white-space:nowrap;">Avg ${entry.toLocaleString('en-IN',{minimumFractionDigits:2})}</span>
    </div>`;

    return `<div class="trade-bar-wrap">
        ${currLbl}
        <div class="trade-bar-track">
            ${zones}
            <div class="trade-bar-pin"      style="left:${ep}%;background:var(--accent);height:10px;top:-2.5px;"></div>
            <div class="trade-bar-curr-pin" style="left:${cp}%;background:${currColor};"></div>
        </div>
        ${entryLbl}
        <div class="trade-bar-axis">${axisLeft}<span></span>${axisRight}</div>
    </div>`;
}

// ── Render table ────────────────────────────────────
function render() {
    const rows = allData.filter(d => filter === 'ALL' || d.status === filter);
    if (!rows.length) {
        document.getElementById('wl-tbody').innerHTML = `<tr><td colspan="11" class="empty-wl">No trades yet. Click "+ Add Trade" to start.</td></tr>`;
        return;
    }

    let html = '';
    rows.forEach(d => {
        const isClosed   = d.status === 'CLOSED';
        const isBuy      = d.trade_type === 'BUY';
        const plClass    = d.pl > 0 ? 'chg-up' : d.pl < 0 ? 'chg-down' : 'chg-flat';
        const plSign     = d.pl > 0 ? '+' : '';
        const pctSign    = d.pl_pct > 0 ? '+' : '';

        // LTP / Change cell — styled like FNO dashboard
        const ltp        = isClosed && d.sell_price ? d.sell_price : (d.current_price || 0);
        const chgPct     = d.change_percent || 0;
        const chgAmt     = d.change_amount  || 0;
        const chgClass   = chgPct > 0 ? 'chg-up' : chgPct < 0 ? 'chg-down' : 'chg-flat';
        const chgSign    = chgPct > 0 ? '+' : '';
        const chgAmtSign = chgAmt > 0 ? '+' : '';
        const ltpDisplay = isClosed && d.sell_price
            ? `<div style="font-size:14px;font-weight:700;color:#cbd5e1;">${fmtPrice(d.sell_price)}</div><div style="font-size:11px;color:#7a8fa6;">Exit price</div>`
            : ltp > 0
                ? `<div class="price-ltp">${fmtPrice(ltp)}</div>
                   <div class="${chgClass}" style="font-size:11px;">${chgSign}${chgPct.toFixed(2)}% (${chgAmtSign}₹${Math.abs(chgAmt).toFixed(2)})</div>`
                : `<div style="color:#7a8fa6;font-size:12px;">No price data</div>`;

        // Day Range bar
        const rangeLow  = d.low_price  || 0;
        const rangeHigh = d.high_price || 0;
        const rangeSpan = rangeHigh - rangeLow;
        const rangePct  = rangeSpan > 0 ? Math.min(100, Math.max(0, ((ltp - rangeLow) / rangeSpan) * 100)) : 50;
        const dayRangeCell = (rangeLow && rangeHigh)
            ? `<div style="min-width:140px;">
                <div class="range-bar-labels" style="display:flex;justify-content:space-between;font-size:10px;color:#94a3b8;margin-bottom:3px;">
                    <span>₹${rangeLow.toLocaleString('en-IN',{minimumFractionDigits:2})}</span>
                    <span>₹${rangeHigh.toLocaleString('en-IN',{minimumFractionDigits:2})}</span>
                </div>
                <div class="range-bar-track" style="position:relative;height:4px;background:var(--bg3);border-radius:3px;">
                    <div style="position:absolute;left:0;width:${rangePct}%;height:100%;background:linear-gradient(90deg,var(--red),var(--green));border-radius:3px;"></div>
                    <div style="position:absolute;left:${rangePct}%;top:-3px;width:8px;height:8px;background:#fff;border-radius:50%;transform:translateX(-50%);box-shadow:0 0 4px rgba(0,0,0,.5);border:2px solid var(--accent);"></div>
                </div>
               </div>`
            : '<span style="color:#475569;">—</span>';

        // Qty with direction sign + lot size breakdown
        const totalQty   = d.quantity * d.lot_size;
        const qtyDisplay = isBuy
            ? `<span class="qty-positive">+ ${d.quantity} lot${d.quantity > 1 ? 's' : ''}</span><div style="font-size:10px;color:var(--text3);">(${totalQty.toLocaleString('en-IN')} shares)</div>`
            : `<span class="qty-negative">- ${d.quantity} lot${d.quantity > 1 ? 's' : ''}</span><div style="font-size:10px;color:var(--text3);">(${totalQty.toLocaleString('en-IN')} shares)</div>`;

        // Target cell — colour-coded, show % away for open trades
        let targetCell = '<span class="na">—</span>';
        if (d.target_price) {
            const toPct = d.to_target_pct !== null ? `<div style="font-size:10px;color:var(--green);">${d.to_target_pct > 0 ? '+' : ''}${d.to_target_pct.toFixed(1)}% away</div>` : '';
            const hitMark = d.target_hit ? ' <span style="color:var(--green);font-size:10px;">✓</span>' : '';
            targetCell = `<div style="color:var(--green);font-weight:600;">${fmtPrice(d.target_price)}${hitMark}</div>${!isClosed ? toPct : ''}`;
        }

        // SL cell
        let slCell = '<span class="na">—</span>';
        if (d.stop_loss) {
            const hitMark = d.sl_hit ? ' <span style="color:var(--red);font-size:10px;">⚠</span>' : '';
            slCell = `<div style="color:var(--red);font-weight:600;">${fmtPrice(d.stop_loss)}${hitMark}</div>`;
        }

        // Status cell
        let statusCell;
        if (isClosed) {
            statusCell = '<span class="badge-closed-sm">Closed</span>';
        } else if (d.target_hit) {
            statusCell = '<span class="hit-target">✓ Target Hit</span>';
        } else if (d.sl_hit) {
            statusCell = '<span class="hit-sl">⚠ SL Hit</span>';
        } else {
            statusCell = '<span style="color:var(--green);font-size:11px;font-weight:600;">● Open</span>';
        }

        // Product badge
        const badge = isClosed
            ? `<span class="badge-closed-sm">Closed</span>`
            : `<span class="badge-${d.trade_type.toLowerCase()}">${d.trade_type}</span>`;

        // Sub-info: expiry + notes under instrument name
        const metaParts = [];
        if (d.expiry) metaParts.push(`<span>${d.expiry}</span>`);
        if (d.notes)  metaParts.push(`<span class="note">${d.notes}</span>`);

        // Actions
        const actions = isClosed
            ? `<div class="actions-wrap"><button class="btn-sm btn-sm-del" onclick="del(${d.id})">Delete</button></div>`
            : `<div class="actions-wrap">
                <button class="btn-sm" onclick="openEdit(${d.id})">Edit</button>
                <button class="btn-sm btn-sm-close" onclick="openClose(${d.id}, ${d.current_price}, '${d.symbol}', '${d.trade_type}', ${d.entry_price}, ${d.quantity}, ${d.lot_size})">Close</button>
                <button class="btn-sm btn-sm-del" onclick="del(${d.id})">Del</button>
               </div>`;

        html += `<tr class="${isClosed ? 'closed-row' : ''}">
            <td>
                <div class="sym-name">${d.symbol}</div>
                ${metaParts.length ? `<div class="sym-meta">${metaParts.join('')}</div>` : ''}
            </td>
            <td class="num">${qtyDisplay}</td>
            <td class="num" style="font-size:14px;font-weight:600;color:#cbd5e1;">${fmtPrice(d.entry_price)}</td>
            <td class="num">${ltpDisplay}</td>
            <td>${dayRangeCell}</td>
            <td class="num">${targetCell}</td>
            <td class="num">${slCell}</td>
            <td class="num ${plClass}">
                <div class="pl-cell" style="font-size:14px;">${plSign}₹${Math.abs(d.pl).toLocaleString('en-IN',{minimumFractionDigits:2})}</div>
                <div style="font-size:10px;color:#64748b;">${isClosed ? 'Realised' : (pctSign + d.pl_pct.toFixed(2) + '%')}</div>
            </td>
            <td class="ctr">${isClosed ? '<span style="color:#475569;">—</span>' : tradeBar(d)}</td>
            <td class="ctr">${statusCell}</td>
            <td>${actions}</td>
        </tr>`;
    });

    document.getElementById('wl-tbody').innerHTML = html;
}

function fmtPrice(n) {
    return '₹' + parseFloat(n).toLocaleString('en-IN', {minimumFractionDigits:2, maximumFractionDigits:2});
}

// ── Summary ─────────────────────────────────────────
function updateSummary() {
    const open     = allData.filter(d => d.status === 'OPEN');
    const closed   = allData.filter(d => d.status === 'CLOSED');
    const openPL   = open.reduce((s,d) => s + d.pl, 0);
    const realPL   = closed.reduce((s,d) => s + d.pl, 0);
    const totalPL  = openPL + realPL;

    document.getElementById('s-total').textContent    = allData.length;
    document.getElementById('s-open').textContent     = open.length;
    document.getElementById('s-targets').textContent  = open.filter(d => d.target_hit).length;
    document.getElementById('s-sl').textContent       = open.filter(d => d.sl_hit).length;

    const plEl = document.getElementById('s-pl');
    plEl.textContent = (openPL >= 0 ? '+' : '') + '₹' + Math.abs(openPL).toLocaleString('en-IN',{minimumFractionDigits:2});
    plEl.className   = 'val ' + (openPL > 0 ? 'green' : openPL < 0 ? 'red' : '');

    const rEl = document.getElementById('s-realised');
    rEl.textContent = (realPL >= 0 ? '+' : '') + '₹' + Math.abs(realPL).toLocaleString('en-IN',{minimumFractionDigits:2});
    rEl.className   = 'val ' + (realPL > 0 ? 'green' : realPL < 0 ? 'red' : '');

    // Totals footer row — only show when there are rows visible
    const visibleRows = allData.filter(d => filter === 'ALL' || d.status === filter);
    const visPL  = visibleRows.reduce((s,d) => s + d.pl, 0);
    const tfoot  = document.getElementById('wl-tfoot');
    if (!visibleRows.length) { tfoot.innerHTML = ''; return; }

    const visPLClass = visPL > 0 ? 'chg-up' : visPL < 0 ? 'chg-down' : '';
    const visPLSign  = visPL > 0 ? '+' : '';
    const openCount  = visibleRows.filter(d => d.status === 'OPEN').length;
    const closedCount= visibleRows.filter(d => d.status === 'CLOSED').length;

    tfoot.innerHTML = `<tr>
        <td colspan="7" style="color:var(--text3);font-size:12px;font-weight:500;">
            Total — ${visibleRows.length} trade${visibleRows.length !== 1 ? 's' : ''}
            ${openCount   ? `<span style="color:var(--green);margin-left:10px;">${openCount} open</span>`   : ''}
            ${closedCount ? `<span style="color:var(--text3);margin-left:10px;">${closedCount} closed</span>` : ''}
        </td>
        <td class="num ${visPLClass}" style="font-size:14px;">${visPLSign}₹${Math.abs(visPL).toLocaleString('en-IN',{minimumFractionDigits:2})}</td>
        <td colspan="4" style="color:var(--text3);font-size:11px;text-align:right;">
            Unrealised: <span class="${openPL > 0 ? 'chg-up' : openPL < 0 ? 'chg-down' : ''}">${openPL >= 0 ? '+' : ''}₹${Math.abs(openPL).toLocaleString('en-IN',{minimumFractionDigits:2})}</span>
            &nbsp;·&nbsp;
            Realised: <span class="${realPL > 0 ? 'chg-up' : realPL < 0 ? 'chg-down' : ''}">${realPL >= 0 ? '+' : ''}₹${Math.abs(realPL).toLocaleString('en-IN',{minimumFractionDigits:2})}</span>
        </td>
    </tr>`;
}

// ── Edit trade ──────────────────────────────────────
function openEdit(id) {
    const d = allData.find(x => x.id === id);
    if (!d) return;

    // Reset all fields and disabled states cleanly
    document.getElementById('port-modal-title').textContent  = 'Edit Trade — ' + d.symbol;
    document.getElementById('port-edit-id').value            = id;

    const symEl = document.getElementById('port-symbol');
    symEl.value    = d.symbol;
    symEl.disabled = true;

    const typeEl = document.getElementById('port-type');
    typeEl.value    = d.trade_type;
    typeEl.disabled = true;

    const entryEl = document.getElementById('port-entry');
    entryEl.value    = d.entry_price;
    entryEl.disabled = true;

    document.getElementById('port-qty').value   = d.quantity;
    document.getElementById('port-notes').value = d.notes || '';

    const sel = document.getElementById('port-expiry');
    sel.innerHTML = `<option value="${d.expiry||''}">${d.expiry||'—'}</option>`;
    sel.disabled = true;

    // Clear pct fields first, then set price and sync
    document.getElementById('port-target').value            = '';
    document.getElementById('port-target-pct').value        = '';
    document.getElementById('port-target-hint').textContent = '';
    document.getElementById('port-sl').value                = '';
    document.getElementById('port-sl-pct').value            = '';
    document.getElementById('port-sl-hint').textContent     = '';

    if (d.target_price) {
        document.getElementById('port-target').value = d.target_price;
        syncFromPrice('target');
    }
    if (d.stop_loss) {
        document.getElementById('port-sl').value = d.stop_loss;
        syncFromPrice('sl');
    }

    document.getElementById('port-sym-results').innerHTML = '';
    document.getElementById('port-modal').classList.add('open');
}

// ── Close trade ─────────────────────────────────────
function openClose(id, currPrice, symbol, tradeType, entryPrice, qty, lotSize) {
    _closeTradeData = { id, entryPrice, tradeType, qty, lotSize };
    document.getElementById('close-id').value          = id;
    document.getElementById('close-price').value       = currPrice;
    document.getElementById('close-modal-title').textContent = 'Close Trade — ' + symbol;
    document.getElementById('close-subtitle').textContent    = tradeType + ' @ ₹' + entryPrice.toLocaleString('en-IN') + '  ·  ' + qty + ' lot' + (qty > 1 ? 's' : '');
    updateClosePL();
    document.getElementById('close-modal').classList.add('open');
}

function updateClosePL() {
    if (!_closeTradeData) return;
    const exitPrice = parseFloat(document.getElementById('close-price').value);
    if (!exitPrice) { document.getElementById('close-pl-preview').style.display = 'none'; return; }

    const { entryPrice, tradeType, qty, lotSize } = _closeTradeData;
    const isBuy = tradeType === 'BUY';
    const pl    = isBuy ? (exitPrice - entryPrice) * qty * lotSize
                        : (entryPrice - exitPrice) * qty * lotSize;
    const pct   = entryPrice > 0 ? ((isBuy ? exitPrice - entryPrice : entryPrice - exitPrice) / entryPrice * 100) : 0;

    const preview = document.getElementById('close-pl-preview');
    const valEl   = document.getElementById('close-pl-val');
    preview.style.display = 'block';
    const sign = pl >= 0 ? '+' : '';
    valEl.textContent = `${sign}₹${Math.abs(pl).toLocaleString('en-IN',{minimumFractionDigits:2})}  (${sign}${pct.toFixed(2)}%)`;
    valEl.className   = 'val ' + (pl > 0 ? 'chg-up' : pl < 0 ? 'chg-down' : '');
}

function confirmClose() {
    const fd = new FormData();
    fd.append('action',     'close');
    fd.append('id',         document.getElementById('close-id').value);
    fd.append('sell_price', document.getElementById('close-price').value);
    fetch(BASE + '/watchlist.php', {method:'POST', body:fd})
        .then(r => r.json())
        .then(() => {
            document.getElementById('close-modal').classList.remove('open');
            _closeTradeData = null;
            load();
        });
}

function del(id) {
    if (!confirm('Delete this trade?')) return;
    const fd = new FormData();
    fd.append('action','delete');
    fd.append('id', id);
    fetch(BASE + '/watchlist.php', {method:'POST', body:fd}).then(() => load());
}

document.getElementById('close-modal').addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('open');
});

load();
</script>
<script src="/ms/assets/js/fno.js?v=9"></script>
</body>
</html>
