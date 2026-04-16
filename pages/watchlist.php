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
        .summary-box .lbl { font-size:11px; color:var(--text3); text-transform:uppercase; letter-spacing:.3px; }
        .summary-box .val { font-size:16px; font-weight:700; margin-top:2px; }

        /* Table */
        .wl-table-wrap { overflow-x:auto; }
        .wl-table { width:100%; border-collapse:collapse; }
        .wl-table thead th {
            background:var(--bg2); padding:10px 14px;
            font-size:11px; font-weight:600; text-transform:uppercase;
            letter-spacing:.4px; color:var(--text3);
            border-bottom:2px solid var(--border); white-space:nowrap;
            text-align:left;
        }
        .wl-table thead th.num { text-align:right; }
        .wl-table tbody td { padding:12px 14px; border-bottom:1px solid var(--border); font-size:13px; vertical-align:middle; white-space:nowrap; }
        .wl-table tbody td.num { text-align:right; }
        .wl-table tbody tr:hover { background:rgba(255,255,255,.03); }
        .wl-table tbody tr.closed-row { opacity:.7; }

        /* Name cell */
        .sym-name { font-weight:600; font-size:13px; }
        .sym-meta { font-size:10px; color:var(--text3); margin-top:2px; display:flex; gap:8px; flex-wrap:wrap; }
        .sym-meta .tgt  { color:#4ade80; }
        .sym-meta .sl   { color:#f87171; }
        .sym-meta .note { color:var(--text3); font-style:italic; }

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
                <th>Product</th>
                <th class="num">Qty</th>
                <th class="num">Avg Price</th>
                <th class="num">LTP</th>
                <th class="num">Target</th>
                <th class="num">Stop Loss</th>
                <th class="num">P&amp;L</th>
                <th class="num">% Change</th>
                <th>Position</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody id="wl-tbody">
            <tr><td colspan="12" class="empty-wl">Loading...</td></tr>
        </tbody>
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

    const axisLeft  = sl     ? `<span style="color:#f87171;">SL ${sl.toLocaleString('en-IN')}</span>` : `<span>${Math.min(minP+pad, entry).toLocaleString('en-IN',{maximumFractionDigits:0})}</span>`;
    const axisRight = target ? `<span style="color:#4ade80;">T ${target.toLocaleString('en-IN')}</span>` : `<span>${Math.max(maxP-pad, entry).toLocaleString('en-IN',{maximumFractionDigits:0})}</span>`;

    return `<div class="trade-bar-wrap">
        <div class="trade-bar-track">
            ${zones}
            <div class="trade-bar-pin"      style="left:${ep}%;background:var(--accent);height:10px;top:-2.5px;"></div>
            <div class="trade-bar-curr-pin" style="left:${cp}%;background:${currColor};"></div>
        </div>
        <div class="trade-bar-axis">${axisLeft}<span style="color:var(--accent)">Avg</span>${axisRight}</div>
    </div>`;
}

// ── Render table ────────────────────────────────────
function render() {
    const rows = allData.filter(d => filter === 'ALL' || d.status === filter);
    if (!rows.length) {
        document.getElementById('wl-tbody').innerHTML = `<tr><td colspan="12" class="empty-wl">No trades yet. Click "+ Add Trade" to start.</td></tr>`;
        return;
    }

    let html = '';
    rows.forEach(d => {
        const isClosed   = d.status === 'CLOSED';
        const isBuy      = d.trade_type === 'BUY';
        const plClass    = d.pl > 0 ? 'chg-up' : d.pl < 0 ? 'chg-down' : 'chg-flat';
        const plSign     = d.pl > 0 ? '+' : '';
        const pctSign    = d.pl_pct > 0 ? '+' : '';

        // LTP: show exit price for closed, live price for open
        const ltpDisplay = isClosed && d.sell_price
            ? `<span style="color:var(--text3);">${fmtPrice(d.sell_price)}</span>`
            : fmtPrice(d.current_price);

        // Qty with direction sign
        const qtyDisplay = isBuy
            ? `<span class="qty-positive">+ ${d.quantity}</span>`
            : `<span class="qty-negative">- ${d.quantity}</span>`;

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
            <td>${badge}</td>
            <td class="num">${qtyDisplay}</td>
            <td class="num" style="color:var(--text2);">${fmtPrice(d.entry_price)}</td>
            <td class="num">${ltpDisplay}</td>
            <td class="num">${targetCell}</td>
            <td class="num">${slCell}</td>
            <td class="num ${plClass}">
                <div class="pl-cell">${plSign}₹${Math.abs(d.pl).toLocaleString('en-IN',{minimumFractionDigits:2})}</div>
                ${isClosed ? '<div class="pl-label">Realised</div>' : ''}
            </td>
            <td class="num ${plClass}">${pctSign}${d.pl_pct.toFixed(2)}%</td>
            <td>${isClosed ? '—' : tradeBar(d)}</td>
            <td>${statusCell}</td>
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
}

// ── Edit trade ──────────────────────────────────────
function openEdit(id) {
    const d = allData.find(x => x.id === id);
    if (!d) return;

    document.getElementById('port-modal-title').textContent  = 'Edit Trade — ' + d.symbol;
    document.getElementById('port-edit-id').value            = id;
    document.getElementById('port-symbol').value             = d.symbol;
    document.getElementById('port-symbol').disabled          = true;
    document.getElementById('port-type').value               = d.trade_type;
    document.getElementById('port-qty').value                = d.quantity;
    document.getElementById('port-entry').value              = d.entry_price;
    document.getElementById('port-notes').value              = d.notes || '';

    const sel = document.getElementById('port-expiry');
    sel.innerHTML = `<option value="${d.expiry||''}">${d.expiry||'—'}</option>`;

    document.getElementById('port-target').value            = d.target_price || '';
    document.getElementById('port-target-pct').value        = '';
    document.getElementById('port-target-hint').textContent = '';
    if (d.target_price) syncFromPrice('target');

    document.getElementById('port-sl').value            = d.stop_loss || '';
    document.getElementById('port-sl-pct').value        = '';
    document.getElementById('port-sl-hint').textContent = '';
    if (d.stop_loss) syncFromPrice('sl');

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
<script src="/ms/assets/js/fno.js?v=7"></script>
</body>
</html>
