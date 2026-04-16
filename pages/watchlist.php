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
        .page-header { background:var(--bg2); border-bottom:1px solid var(--border); padding:14px 20px; display:flex; align-items:center; justify-content:space-between; }
        .wl-controls { padding:12px 20px; display:flex; gap:10px; flex-wrap:wrap; align-items:center; background:var(--bg2); border-bottom:1px solid var(--border); }
        .btn-add { background:var(--accent); color:#fff; border:none; border-radius:var(--radius); padding:7px 16px; font-size:13px; font-weight:600; cursor:pointer; }
        .filter-tabs { display:flex; gap:6px; }
        .filter-tab { background:var(--bg3); border:1px solid var(--border); border-radius:var(--radius); padding:5px 14px; font-size:12px; cursor:pointer; color:var(--text2); }
        .filter-tab.active { background:var(--accent); border-color:var(--accent); color:#fff; }
        .wl-table-wrap { overflow-x:auto; }
        .wl-table { width:100%; border-collapse:collapse; }
        .wl-table thead th { background:var(--bg3); padding:9px 12px; font-size:11px; font-weight:600; text-transform:uppercase; letter-spacing:.4px; color:var(--text3); border-bottom:1px solid var(--border); white-space:nowrap; }
        .wl-table tbody td { padding:10px 12px; border-bottom:1px solid var(--border); font-size:13px; vertical-align:middle; white-space:nowrap; }
        .wl-table tbody tr:hover { background:var(--bg3); }
        .badge-buy  { background:rgba(34,197,94,.15);  color:var(--green); padding:2px 8px; border-radius:4px; font-size:11px; font-weight:700; }
        .badge-sell { background:rgba(239,68,68,.15);   color:var(--red);   padding:2px 8px; border-radius:4px; font-size:11px; font-weight:700; }
        .badge-closed { background:rgba(100,116,139,.15); color:var(--text3); padding:2px 8px; border-radius:4px; font-size:11px; }
        .hit-target { color:var(--green); font-weight:700; }
        .hit-sl     { color:var(--red);   font-weight:700; }
        .btn-sm { background:var(--bg3); border:1px solid var(--border); color:var(--accent); border-radius:4px; padding:3px 9px; font-size:11px; cursor:pointer; margin-right:4px; }
        .btn-sm:hover { border-color:var(--accent); }
        .btn-sm-red { color:var(--red); }
        .btn-sm-red:hover { border-color:var(--red); }
        .empty-wl { text-align:center; padding:60px 20px; color:var(--text3); }
        .summary-row { display:flex; gap:1px; background:var(--border); border-bottom:1px solid var(--border); }
        .summary-box { flex:1; background:var(--bg2); padding:10px 16px; min-width:120px; }
        .summary-box .lbl { font-size:11px; color:var(--text3); text-transform:uppercase; }
        .summary-box .val { font-size:16px; font-weight:700; margin-top:2px; }

        /* Close modal */
        .close-modal-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,.75); z-index:600; align-items:center; justify-content:center; }
        .close-modal-overlay.open { display:flex; }
        .close-modal-box { background:var(--bg2); border:1px solid var(--border); border-radius:12px; width:90%; max-width:380px; padding:28px; }
        .close-modal-box h3 { font-size:16px; font-weight:700; margin-bottom:20px; }
        .close-form-group { margin-bottom:14px; }
        .close-form-group label { display:block; font-size:12px; color:var(--text3); margin-bottom:5px; }
        .close-form-group input { width:100%; background:var(--bg3); border:1px solid var(--border); border-radius:var(--radius); padding:9px 12px; color:var(--text); font-size:13px; outline:none; }
        .close-form-group input:focus { border-color:var(--accent); }
        .close-modal-footer { display:flex; gap:10px; justify-content:flex-end; margin-top:20px; }
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
    <div class="summary-box"><div class="lbl">Total Trades</div><div class="val blue"  id="s-total">—</div></div>
    <div class="summary-box"><div class="lbl">Open Trades</div><div class="val"        id="s-open">—</div></div>
    <div class="summary-box"><div class="lbl">Unrealised P/L</div><div class="val"     id="s-pl">—</div></div>
    <div class="summary-box"><div class="lbl">Targets Hit</div><div class="val green"  id="s-targets">—</div></div>
    <div class="summary-box"><div class="lbl">SL Hit</div><div class="val red"         id="s-sl">—</div></div>
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
                <th>Symbol</th><th>Type</th><th>Entry</th><th>Current</th>
                <th>Target</th><th>Stop Loss</th><th>Lots</th>
                <th>P/L</th><th>To Target</th><th>Status</th><th>Actions</th>
            </tr>
        </thead>
        <tbody id="wl-tbody">
            <tr><td colspan="11" class="empty-wl">Loading...</td></tr>
        </tbody>
    </table>
</div>

<!-- Close Trade Modal -->
<div class="close-modal-overlay" id="close-modal">
    <div class="close-modal-box">
        <h3>Close Trade</h3>
        <input type="hidden" id="close-id">
        <div class="close-form-group">
            <label>Exit / Sell Price ₹</label>
            <input type="number" id="close-price" step="0.05" placeholder="0.00">
        </div>
        <div class="close-modal-footer">
            <button class="port-btn-cancel" onclick="document.getElementById('close-modal').classList.remove('open')">Cancel</button>
            <button class="port-btn-save"   onclick="confirmClose()">Confirm Close</button>
        </div>
    </div>
</div>

<?php require __DIR__ . '/../includes/portfolio_modal.php'; ?>

<script>
window.APP_BASE      = '/ms';
window.IS_LOGGED_IN  = true;
const BASE           = '/ms/api';
let allData          = [];
let filter           = 'ALL';

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

function render() {
    const rows = allData.filter(d => filter === 'ALL' || d.status === filter);
    if (!rows.length) {
        document.getElementById('wl-tbody').innerHTML = '<tr><td colspan="11" class="empty-wl">No trades yet. Click "+ Add Trade" to start.</td></tr>';
        return;
    }
    let html = '';
    rows.forEach(d => {
        const plClass   = d.pl > 0 ? 'chg-up' : d.pl < 0 ? 'chg-down' : 'chg-flat';
        const plSign    = d.pl > 0 ? '+' : '';
        const targetTxt = d.target_price ? '₹' + d.target_price.toLocaleString('en-IN') : '<span class="na">—</span>';
        const slTxt     = d.stop_loss    ? '₹' + d.stop_loss.toLocaleString('en-IN')    : '<span class="na">—</span>';

        let toTargetTxt = '<span class="na">—</span>';
        if (d.to_target_pct !== null) {
            toTargetTxt = d.target_hit
                ? '<span class="hit-target">✓ HIT</span>'
                : `<span class="${d.to_target_pct > 0 ? 'chg-up' : 'chg-down'}">${d.to_target_pct > 0 ? '+' : ''}${d.to_target_pct.toFixed(2)}%</span>`;
        }

        const statusBadge = d.status === 'CLOSED'
            ? '<span class="badge-closed">CLOSED</span>'
            : (d.sl_hit ? '<span class="hit-sl">SL HIT</span>' : '<span style="color:var(--green);font-size:11px;font-weight:600;">OPEN</span>');

        const actions = d.status === 'OPEN'
            ? `<button class="btn-sm" onclick="openEdit(${d.id})">Edit</button>
               <button class="btn-sm" onclick="openClose(${d.id},${d.current_price})">Close</button>
               <button class="btn-sm btn-sm-red" onclick="del(${d.id})">Del</button>`
            : `<button class="btn-sm btn-sm-red" onclick="del(${d.id})">Del</button>`;

        html += `<tr>
            <td><strong>${d.symbol}</strong><div style="font-size:10px;color:var(--text3);">${d.expiry || ''}</div></td>
            <td><span class="badge-${d.trade_type.toLowerCase()}">${d.trade_type}</span></td>
            <td>₹${d.entry_price.toLocaleString('en-IN',{minimumFractionDigits:2})}</td>
            <td>₹${d.current_price.toLocaleString('en-IN',{minimumFractionDigits:2})}
                <div class="${d.pl_pct>=0?'chg-up':'chg-down'}" style="font-size:10px;">${d.pl_pct>=0?'+':''}${d.pl_pct.toFixed(2)}%</div>
            </td>
            <td>${targetTxt}</td>
            <td>${slTxt}</td>
            <td>${d.quantity}</td>
            <td class="${plClass}">${plSign}₹${Math.abs(d.pl).toLocaleString('en-IN',{minimumFractionDigits:2})}</td>
            <td>${toTargetTxt}</td>
            <td>${statusBadge}</td>
            <td>${actions}</td>
        </tr>`;
    });
    document.getElementById('wl-tbody').innerHTML = html;
}

function updateSummary() {
    const open    = allData.filter(d => d.status === 'OPEN');
    const totalPL = open.reduce((s,d) => s + d.pl, 0);
    document.getElementById('s-total').textContent   = allData.length;
    document.getElementById('s-open').textContent    = open.length;
    document.getElementById('s-targets').textContent = open.filter(d => d.target_hit).length;
    document.getElementById('s-sl').textContent      = open.filter(d => d.sl_hit).length;
    const plEl = document.getElementById('s-pl');
    plEl.textContent = (totalPL >= 0 ? '+' : '') + '₹' + Math.abs(totalPL).toLocaleString('en-IN',{minimumFractionDigits:2});
    plEl.className   = 'val ' + (totalPL > 0 ? 'green' : totalPL < 0 ? 'red' : '');
}

function openEdit(id) {
    const d = allData.find(x => x.id === id);
    if (!d) return;
    // Pre-fill shared modal for edit
    document.getElementById('port-modal-title').textContent = 'Edit Trade — ' + d.symbol;
    document.getElementById('port-edit-id').value  = id;
    document.getElementById('port-symbol').value   = d.symbol;
    document.getElementById('port-symbol').disabled = true;
    document.getElementById('port-type').value     = d.trade_type;
    document.getElementById('port-qty').value      = d.quantity;
    document.getElementById('port-entry').value    = d.entry_price;
    document.getElementById('port-target').value   = d.target_price || '';
    document.getElementById('port-sl').value       = d.stop_loss    || '';
    document.getElementById('port-notes').value    = d.notes        || '';
    // Show expiry as static text since it can't be changed
    const sel = document.getElementById('port-expiry');
    sel.innerHTML = `<option value="${d.expiry||''}">${d.expiry||'—'}</option>`;
    document.getElementById('port-modal').classList.add('open');
}

function openClose(id, curr) {
    document.getElementById('close-id').value    = id;
    document.getElementById('close-price').value = curr;
    document.getElementById('close-modal').classList.add('open');
}

function confirmClose() {
    const fd = new FormData();
    fd.append('action',     'close');
    fd.append('id',         document.getElementById('close-id').value);
    fd.append('sell_price', document.getElementById('close-price').value);
    fetch(BASE + '/watchlist.php', {method:'POST', body:fd})
        .then(r => r.json())
        .then(() => { document.getElementById('close-modal').classList.remove('open'); load(); });
}

function del(id) {
    if (!confirm('Delete this trade?')) return;
    const fd = new FormData();
    fd.append('action','delete'); fd.append('id',id);
    fetch(BASE + '/watchlist.php', {method:'POST', body:fd}).then(() => load());
}

document.getElementById('close-modal').addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('open');
});

load();
</script>
<script src="/ms/assets/js/fno.js?v=4"></script>
</body>
</html>
