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
        /* ── Controls ── */
        .wl-controls { padding:10px 20px; display:flex; gap:10px; flex-wrap:wrap; align-items:center; background:var(--bg2); border-bottom:1px solid var(--border); }
        .btn-add { background:var(--accent); color:#fff; border:none; border-radius:6px; padding:8px 18px; font-size:13px; font-weight:600; cursor:pointer; letter-spacing:.2px; transition:opacity .15s; }
        .btn-add:hover { opacity:.85; }
        .filter-tabs { display:flex; gap:4px; }
        .filter-tab { background:transparent; border:1px solid var(--border); border-radius:6px; padding:5px 14px; font-size:12px; cursor:pointer; color:var(--text3); transition:all .15s; }
        .filter-tab:hover { color:var(--text); border-color:var(--text3); }
        .filter-tab.active { background:rgba(79,142,247,.15); border-color:var(--accent); color:var(--accent); font-weight:600; }

        /* ── Summary strip ── */
        .summary-row { display:flex; gap:1px; background:var(--border); border-bottom:1px solid var(--border); }
        .summary-box { flex:1; background:var(--bg2); padding:12px 18px; min-width:110px; }
        .summary-box .lbl { font-size:10px; font-weight:600; color:var(--text4); text-transform:uppercase; letter-spacing:.6px; }
        .summary-box .val { font-size:18px; font-weight:700; margin-top:4px; color:var(--text); }
        .summary-box .val.green { color:var(--green); }
        .summary-box .val.red   { color:var(--red); }
        .summary-box .val.blue  { color:var(--accent); }

        /* ── Table ── */
        .wl-table-wrap { overflow-x:auto; background:var(--bg); }
        .wl-table { width:100%; border-collapse:collapse; }
        .wl-table thead tr { border-bottom:1px solid var(--border); }
        .wl-table thead th {
            padding:11px 16px; font-size:10px; font-weight:700;
            text-transform:uppercase; letter-spacing:.7px; color:var(--text4);
            background:var(--bg); white-space:nowrap; text-align:left;
        }
        .wl-table thead th.r { text-align:right; }
        .wl-table thead th.c { text-align:center; }
        .wl-table tbody tr { border-bottom:1px solid var(--border2); transition:background .12s; }
        .wl-table tbody tr:hover { background:var(--bg-hover); }
        .wl-table tbody tr.closed-row { opacity:.55; }
        .wl-table tbody td { padding:13px 16px; font-size:13px; vertical-align:middle; white-space:nowrap; color:var(--text2); }
        .wl-table tbody td.r { text-align:right; }
        .wl-table tbody td.c { text-align:center; }
        .wl-table tfoot td { padding:12px 16px; font-size:13px; font-weight:700; border-top:2px solid var(--border); background:var(--bg2); white-space:nowrap; color:var(--text2); }
        .wl-table tfoot td.r { text-align:right; }

        /* ── Instrument ── */
        .sym-name { font-weight:700; font-size:14px; color:var(--text); letter-spacing:-.1px; }
        .sym-expiry { display:inline-block; margin-left:7px; font-size:10px; font-weight:500; color:var(--text3); background:var(--bg3); border-radius:4px; padding:1px 6px; vertical-align:middle; }
        .sym-note { font-size:11px; color:var(--text3); margin-top:3px; font-style:italic; }

        /* ── Qty ── */
        .qty-val { font-size:13px; font-weight:700; }
        .qty-val.buy  { color:var(--green); }
        .qty-val.sell { color:var(--red); }
        .qty-shares { font-size:11px; color:var(--text3); margin-top:2px; }

        /* ── Price ── */
        .price-main { font-size:14px; font-weight:600; color:var(--text); }
        .price-sub  { font-size:11px; margin-top:2px; color:var(--text3); }

        /* ── P&L ── */
        .pl-main { font-size:14px; font-weight:700; }
        .pl-sub  { font-size:11px; margin-top:2px; }
        .pl-main.up, .pl-sub.up { color:var(--green); }
        .pl-main.dn, .pl-sub.dn { color:var(--red); }
        .pl-main.fl, .pl-sub.fl { color:var(--text3); }

        /* ── SL / Target ── */
        .sl-price  { font-size:13px; font-weight:600; color:var(--red); }
        .sl-pct    { font-size:11px; color:var(--text3); margin-top:2px; }
        .tgt-price { font-size:13px; font-weight:600; color:var(--green); }
        .tgt-pct   { font-size:11px; color:var(--text3); margin-top:2px; }

        /* ── Status chips ── */
        .chip { display:inline-flex; align-items:center; gap:4px; padding:3px 10px; border-radius:20px; font-size:11px; font-weight:600; }
        .chip-open   { background:var(--green-dim);  color:var(--green); border:1px solid var(--green-border); }
        .chip-closed { background:rgba(100,116,139,.1); color:var(--text3); border:1px solid var(--border); }
        .chip-target { background:var(--green-dim);  color:var(--green); border:1px solid var(--green-border); }
        .chip-sl     { background:var(--red-dim);    color:var(--red);   border:1px solid var(--red-border); }

        /* ── Trade bar ── */
        .tbar-wrap { min-width:160px; }
        .tbar-track { position:relative; height:5px; border-radius:3px; background:var(--bg3); }
        .tbar-zone  { position:absolute; top:0; height:100%; }
        .tbar-pin   { position:absolute; top:50%; transform:translate(-50%,-50%); width:2px; height:12px; border-radius:2px; }
        .tbar-curr  { position:absolute; top:50%; transform:translate(-50%,-50%); width:10px; height:10px; border-radius:50%; border:2px solid var(--bg); box-shadow:0 0 6px rgba(0,0,0,.6); }
        .tbar-labels { display:flex; justify-content:space-between; margin-top:5px; font-size:9px; color:var(--text4); }
        .trade-bar-zone.loss { background:var(--red-dim); border-radius:3px 0 0 3px; }
        .trade-bar-zone.gain { background:var(--green-dim); border-radius:0 3px 3px 0; }

        /* ── Actions ── */
        .act-wrap { display:flex; gap:5px; }
        .btn-act { border:none; border-radius:5px; padding:5px 11px; font-size:11px; font-weight:600; cursor:pointer; transition:opacity .15s; }
        .btn-act:hover { opacity:.8; }
        .btn-act-edit  { background:rgba(79,142,247,.15); color:var(--accent); }
        .btn-act-close { background:var(--green-dim); color:var(--green); }
        .btn-act-del   { background:var(--red-dim);   color:var(--red); }

        .empty-wl { text-align:center; padding:80px 20px; color:var(--text3); font-size:14px; }

        /* ── Close modal ── */
        .close-modal-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,.8); z-index:600; align-items:center; justify-content:center; }
        .close-modal-overlay.open { display:flex; }
        .close-modal-box { background:var(--bg2); border:1px solid var(--border); border-radius:14px; width:90%; max-width:400px; padding:28px; }
        .close-modal-box h3 { font-size:17px; font-weight:700; color:var(--text); margin-bottom:4px; }
        .close-modal-box .close-subtitle { font-size:12px; color:var(--text3); margin-bottom:20px; }
        .close-form-group { margin-bottom:14px; }
        .close-form-group label { display:block; font-size:11px; font-weight:600; color:var(--text3); text-transform:uppercase; letter-spacing:.4px; margin-bottom:6px; }
        .close-form-group input { width:100%; background:var(--bg3); border:1px solid var(--border); border-radius:8px; padding:10px 14px; color:var(--text); font-size:16px; font-weight:700; outline:none; box-sizing:border-box; transition:border-color .15s; }
        .close-form-group input:focus { border-color:var(--accent); }
        .close-pl-preview { background:var(--bg3); border-radius:10px; padding:14px 16px; margin-bottom:16px; }
        .close-pl-preview .lbl { font-size:10px; font-weight:600; color:var(--text3); text-transform:uppercase; letter-spacing:.5px; margin-bottom:4px; }
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
                <th class="r">Qty</th>
                <th class="r">Avg Price</th>
                <th class="r">LTP / Change</th>
                <th class="r">P&amp;L</th>
                <th class="r">Stop Loss</th>
                <th class="c">Position</th>
                <th class="r">Target</th>
                <th class="c">Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody id="wl-tbody">
            <tr><td colspan="10" class="empty-wl">Loading...</td></tr>
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
        zones += `<div class="trade-bar-zone loss" style="left:${l}%;width:${r-l}%;"></div>`;
    }
    if (tp !== null) {
        const l = isBuy ? ep : tp, r = isBuy ? tp : ep;
        zones += `<div class="trade-bar-zone gain" style="left:${l}%;width:${r-l}%;"></div>`;
    }

    const profitable = isBuy ? curr > entry : curr < entry;
    const currColor  = profitable ? 'var(--green)' : 'var(--red)';

    const axisLeft  = sl     ? `<span style="color:var(--red);">SL ${sl.toLocaleString('en-IN')}</span>`     : `<span></span>`;
    const axisRight = target ? `<span style="color:var(--green);">T ${target.toLocaleString('en-IN')}</span>` : `<span></span>`;

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
        document.getElementById('wl-tbody').innerHTML = `<tr><td colspan="10" class="empty-wl">No trades yet. Click "+ Add Trade" to start.</td></tr>`;
        return;
    }

    let html = '';
    rows.forEach(d => {
        const isClosed = d.status === 'CLOSED';
        const isBuy    = d.trade_type === 'BUY';

        // P&L
        const plUp   = d.pl > 0, plDn = d.pl < 0;
        const plMod  = plUp ? 'up' : plDn ? 'dn' : 'fl';
        const plSign = plUp ? '+' : plDn ? '-' : '';
        const pctSign= d.pl_pct > 0 ? '+' : d.pl_pct < 0 ? '-' : '';

        // LTP
        const ltp        = isClosed && d.sell_price ? d.sell_price : (d.current_price || 0);
        const chgPct     = d.change_percent || 0;
        const chgAmt     = d.change_amount  || 0;
        const chgMod     = chgPct > 0 ? 'up' : chgPct < 0 ? 'dn' : 'fl';
        const chgColor   = chgPct > 0 ? 'var(--green)' : chgPct < 0 ? 'var(--red)' : 'var(--text3)';
        const chgSign    = chgPct > 0 ? '+' : '';
        const chgAmtSign = chgAmt > 0 ? '+' : '';

        // Day range bar
        const rLow = d.low_price || 0, rHigh = d.high_price || 0;
        const rSpan = rHigh - rLow;
        const rPct  = rSpan > 0 ? Math.min(100, Math.max(0, ((ltp - rLow) / rSpan) * 100)).toFixed(1) : 50;
        const dayBar = (rLow && rHigh && !isClosed) ? `
            <div style="margin-top:7px;min-width:160px;">
                <div style="display:flex;justify-content:space-between;font-size:9px;color:var(--text4);margin-bottom:3px;">
                    <span>₹${rLow.toLocaleString('en-IN',{minimumFractionDigits:2})}</span>
                    <span>₹${rHigh.toLocaleString('en-IN',{minimumFractionDigits:2})}</span>
                </div>
                <div style="position:relative;height:3px;background:var(--bg3);border-radius:3px;">
                    <div style="position:absolute;left:0;width:${rPct}%;height:100%;background:linear-gradient(90deg,var(--red),var(--green));border-radius:3px;opacity:.7;"></div>
                    <div style="position:absolute;left:${rPct}%;top:50%;transform:translate(-50%,-50%);width:9px;height:9px;border-radius:50%;background:var(--text);border:2px solid var(--accent);box-shadow:0 0 5px rgba(0,0,0,.7);"></div>
                </div>
            </div>` : '';

        // LTP cell
        const ltpCell = isClosed && d.sell_price
            ? `<div class="price-main" style="color:var(--text3);">${fmtPrice(d.sell_price)}</div>
               <div class="price-sub">Exit price</div>`
            : ltp > 0
                ? `<div class="price-main">${fmtPrice(ltp)}</div>
                   <div class="price-sub" style="color:${chgColor};">${chgSign}${chgPct.toFixed(2)}%&nbsp;&nbsp;${chgAmtSign}₹${Math.abs(chgAmt).toFixed(2)}</div>
                   ${dayBar}`
                : `<div class="price-sub">No data</div>`;

        // Qty
        const totalQty = d.quantity * d.lot_size;
        const qtyCell  = `<div class="qty-val ${isBuy ? 'buy' : 'sell'}">${isBuy ? '+' : '-'}${d.quantity} lot${d.quantity > 1 ? 's' : ''}</div>
                          <div class="qty-shares">${totalQty.toLocaleString('en-IN')} shares</div>`;

        // SL
        let slCell = '<span style="color:var(--text4);">—</span>';
        if (d.stop_loss) {
            const slPct = d.entry_price > 0 ? ((d.stop_loss - d.entry_price) / d.entry_price * 100) : 0;
            slCell = `<div class="sl-price">${fmtPrice(d.stop_loss)}${d.sl_hit ? ' <span style="font-size:10px;">⚠</span>' : ''}</div>
                      <div class="sl-pct">${(slPct > 0 ? '+' : '')}${slPct.toFixed(2)}% from avg</div>`;
        }

        // Target
        let tgtCell = '<span style="color:var(--text4);">—</span>';
        if (d.target_price) {
            const tPct = d.entry_price > 0 ? ((d.target_price - d.entry_price) / d.entry_price * 100) : 0;
            tgtCell = `<div class="tgt-price">${fmtPrice(d.target_price)}${d.target_hit ? ' <span style="font-size:10px;">✓</span>' : ''}</div>
                       <div class="tgt-pct">${(tPct > 0 ? '+' : '')}${tPct.toFixed(2)}% from avg</div>`;
        }

        // Status
        const statusCell = isClosed      ? `<span class="chip chip-closed">Closed</span>`
                         : d.target_hit  ? `<span class="chip chip-target">✓ Target</span>`
                         : d.sl_hit      ? `<span class="chip chip-sl">⚠ SL Hit</span>`
                         : `<span class="chip chip-open">● Open</span>`;

        // Instrument
        const instrCell = `<div class="sym-name">${d.symbol}${d.expiry ? `<span class="sym-expiry">${d.expiry}</span>` : ''}</div>
                           ${d.notes ? `<div class="sym-note">${d.notes}</div>` : ''}`;

        // Actions
        const actions = isClosed
            ? `<div class="act-wrap"><button class="btn-act btn-act-del" onclick="del(${d.id})">Delete</button></div>`
            : `<div class="act-wrap">
                <button class="btn-act btn-act-edit"  onclick="openEdit(${d.id})">Edit</button>
                <button class="btn-act btn-act-close" onclick="openClose(${d.id},${d.current_price},'${d.symbol}','${d.trade_type}',${d.entry_price},${d.quantity},${d.lot_size})">Close</button>
                <button class="btn-act btn-act-del"   onclick="del(${d.id})">Del</button>
               </div>`;

        html += `<tr class="${isClosed ? 'closed-row' : ''}">
            <td>${instrCell}</td>
            <td class="r">${qtyCell}</td>
            <td class="r"><div class="price-main">${fmtPrice(d.entry_price)}</div></td>
            <td class="r">${ltpCell}</td>
            <td class="r">
                <div class="pl-main ${plMod}">${plSign}₹${Math.abs(d.pl).toLocaleString('en-IN',{minimumFractionDigits:2})}</div>
                <div class="pl-sub  ${plMod}">${isClosed ? 'Realised' : (pctSign + Math.abs(d.pl_pct).toFixed(2) + '%')}</div>
            </td>
            <td class="r">${slCell}</td>
            <td class="c">${isClosed ? '<span style="color:var(--text4);">—</span>' : tradeBar(d)}</td>
            <td class="r">${tgtCell}</td>
            <td class="c">${statusCell}</td>
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

    const plColor  = visPL > 0 ? 'var(--green)' : visPL < 0 ? 'var(--red)' : 'var(--text3)';
    const oPLColor = openPL  > 0 ? 'var(--green)' : openPL  < 0 ? 'var(--red)' : 'var(--text3)';
    const rPLColor = realPL  > 0 ? 'var(--green)' : realPL  < 0 ? 'var(--red)' : 'var(--text3)';
    tfoot.innerHTML = `<tr>
        <td colspan="4" style="color:var(--text3);font-size:12px;font-weight:500;">
            ${visibleRows.length} trade${visibleRows.length !== 1 ? 's' : ''}
            ${openCount   ? `<span style="color:var(--green);margin-left:12px;">${openCount} open</span>`   : ''}
            ${closedCount ? `<span style="color:var(--text3);margin-left:12px;">${closedCount} closed</span>` : ''}
        </td>
        <td class="r" style="font-size:15px;font-weight:700;color:${plColor};">${visPLSign}₹${Math.abs(visPL).toLocaleString('en-IN',{minimumFractionDigits:2})}</td>
        <td colspan="5" style="font-size:11px;text-align:right;color:var(--text3);">
            Unrealised:&nbsp;<span style="color:${oPLColor};font-weight:600;">${openPL >= 0 ? '+' : ''}₹${Math.abs(openPL).toLocaleString('en-IN',{minimumFractionDigits:2})}</span>
            &nbsp;&nbsp;·&nbsp;&nbsp;
            Realised:&nbsp;<span style="color:${rPLColor};font-weight:600;">${realPL >= 0 ? '+' : ''}₹${Math.abs(realPL).toLocaleString('en-IN',{minimumFractionDigits:2})}</span>
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
