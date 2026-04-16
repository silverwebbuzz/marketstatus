/* FNO Dashboard JS */
(function () {
    'use strict';

    let allData   = [];
    let sortCol   = 'change_percent';
    let sortDir   = 'desc';
    let filterSym = '';
    let filterInd = '';
    let filterExp = '';

    const tbody      = document.getElementById('fno-tbody');
    const searchInp  = document.getElementById('search-sym');
    const indFilter  = document.getElementById('filter-ind');
    const expFilter  = document.getElementById('filter-exp');
    const refreshBtn = document.getElementById('btn-refresh');
    const statsTotal = document.getElementById('stat-total');
    const statsAdv   = document.getElementById('stat-adv');
    const statsDec   = document.getElementById('stat-dec');
    const statsTime  = document.getElementById('stat-time');

    const BASE = (window.APP_BASE || '') + '/api';

    // ── Load Data ─────────────────────────────────────
    function loadData() {
        setLoading(true);
        fetch(BASE + '/fno_data.php')
            .then(r => r.json())
            .then(res => {
                if (!res.success) throw new Error('API error');
                allData = res.data || [];
                populateFilters();
                renderTable();
                updateStats();
            })
            .catch(() => {
                tbody.innerHTML = '<tr class="empty-row"><td colspan="13">Failed to load data. Run fetch scripts first.</td></tr>';
            })
            .finally(() => setLoading(false));
    }

    // ── Refresh Prices (calls step1 — single NSE call, fast) ──
    function refreshPrices() {
        refreshBtn.disabled    = true;
        refreshBtn.textContent = 'Refreshing...';
        fetch(BASE + '/step1_fetch_symbols.php')
            .then(() => loadData())
            .catch(() => alert('Price refresh failed.'))
            .finally(() => {
                refreshBtn.disabled    = false;
                refreshBtn.textContent = '⟳ Refresh Prices';
            });
    }

    // ── Populate Filters ──────────────────────────────
    function populateFilters() {
        const industries = [...new Set(allData.map(d => d.industry).filter(Boolean))].sort();
        indFilter.innerHTML = '<option value="">All Industries</option>';
        industries.forEach(i => {
            const o = document.createElement('option');
            o.value = i; o.textContent = i;
            indFilter.appendChild(o);
        });

        const expiries = [...new Set(allData.flatMap(d => d.contracts.map(c => c.expiry)).filter(Boolean))].sort();
        expFilter.innerHTML = '<option value="">All Expiries</option>';
        expiries.forEach(e => {
            const o = document.createElement('option');
            o.value = e; o.textContent = e;
            expFilter.appendChild(o);
        });
    }

    // ── Render Table ──────────────────────────────────
    function renderTable() {
        let rows = allData.filter(d => {
            if (filterSym && !d.symbol.includes(filterSym.toUpperCase())) return false;
            if (filterInd && d.industry !== filterInd) return false;
            if (filterExp && !d.contracts.some(c => c.expiry === filterExp)) return false;
            return true;
        });

        rows = sortRows(rows);

        if (!rows.length) {
            tbody.innerHTML = '<tr class="empty-row"><td colspan="13">No data found.</td></tr>';
            return;
        }

        let html = '';
        rows.forEach(d => {
            const c0       = d.contracts[0] || {};
            const chgClass = d.change_percent > 0 ? 'chg-up' : d.change_percent < 0 ? 'chg-down' : 'chg-flat';
            const chgSign  = d.change_percent > 0 ? '+' : '';
            const chgAmt   = d.change_amount  > 0 ? '+' : '';

            // Day range bar
            const range = d.high_price - d.low_price;
            const pct   = range > 0 ? Math.min(100, Math.max(0, ((d.current_price - d.low_price) / range) * 100)) : 50;

            // P/L & ROI based on nearest expiry
            const todayPL  = d.change_amount * c0.lot_size;
            const plClass  = todayPL > 0 ? 'chg-up' : todayPL < 0 ? 'chg-down' : 'chg-flat';
            const plSign   = todayPL > 0 ? '+' : '';
            const roi      = c0.nrml_margin > 0 ? (todayPL / c0.nrml_margin) * 100 : 0;
            const roiClass = roi > 0 ? 'chg-up' : roi < 0 ? 'chg-down' : 'chg-flat';
            const roiSign  = roi > 0 ? '+' : '';

            const signal = getSignal(d);
            const delPct = d.delivery_pct > 0 ? d.delivery_pct.toFixed(1) + '%' : '<span class="na">—</span>';
            const cval   = c0.lot_size * (c0.futures_price || d.current_price);

            // Futures premium = futures_price - current_price
            const premium     = c0.futures_price > 0 && d.current_price > 0 ? c0.futures_price - d.current_price : 0;
            const premiumClass = premium > 0 ? 'chg-up' : premium < 0 ? 'chg-down' : 'chg-flat';
            const premiumSign  = premium > 0 ? '+' : '';

            html += `
            <tr class="main-row" data-symbol="${d.symbol}">
                <td>
                    <div class="symbol-name">${d.symbol}</div>
                    <div class="company-name" title="${d.company_name || ''}">${d.company_name || ''}</div>
                    ${d.industry ? `<div class="badge-industry">${d.industry}</div>` : ''}
                </td>
                <td>
                    <div class="price-ltp">${fmt(d.current_price)}</div>
                    <div class="${chgClass}" style="font-size:11px;">${chgSign}${fmtPct(d.change_percent)} (${chgAmt}${fmtInr(d.change_amount)})</div>
                </td>
                <td>
                    <div class="range-bar-wrap">
                        <div class="range-bar-labels"><span>${fmt(d.low_price)}</span><span>${fmt(d.high_price)}</span></div>
                        <div class="range-bar-track">
                            <div class="range-bar-fill" style="width:${pct}%"></div>
                            <div class="range-bar-dot" style="left:${pct}%"></div>
                        </div>
                    </div>
                </td>
                <td>
                    <div style="font-size:11px;color:var(--text3);">52W H: ${fmt(d.week52_high)}</div>
                    <div style="font-size:11px;color:var(--text3);">52W L: ${fmt(d.week52_low)}</div>
                    <div style="font-size:10px;color:var(--text3);">O:${fmt(d.open_price)} PC:${fmt(d.prev_close)}</div>
                </td>
                <td>
                    <div class="margin-val">${fmtInr(c0.nrml_margin)}</div>
                    <div class="margin-rate">NRML ${c0.nrml_margin_rate ? c0.nrml_margin_rate.toFixed(1) + '%' : ''}</div>
                    ${c0.mis_margin ? `<div class="margin-rate">MIS ${fmtInr(c0.mis_margin)}</div>` : ''}
                </td>
                <td>
                    <div>${c0.lot_size ? c0.lot_size.toLocaleString() : '<span class="na">—</span>'}</div>
                    <div style="font-size:11px;color:var(--text3);">${c0.expiry || ''}</div>
                </td>
                <td>
                    <div>${fmtInr(cval)}</div>
                    ${premium !== 0 ? `<div class="${premiumClass}" style="font-size:11px;">${premiumSign}${fmtInr(premium)} premium</div>` : ''}
                </td>
                <td class="${plClass}">${c0.lot_size ? plSign + fmtInr(todayPL) : '<span class="na">—</span>'}</td>
                <td class="${roiClass}">${c0.nrml_margin > 0 ? roiSign + roi.toFixed(2) + '%' : '<span class="na">—</span>'}</td>
                <td>${fmtVol(d.volume)}</td>
                <td>${delPct}</td>
                <td><span class="signal-badge signal-${signal.toLowerCase()}">${signal}</span></td>
                <td>
                    <button class="btn-detail" onclick="showDetail('${d.symbol}')">Detail</button>
                    <button class="btn-detail btn-ai" style="margin-top:4px;background:rgba(124,92,252,.15);color:#a78bfa;border-color:#7c5cfc;" onclick="showAI('${d.symbol}')">AI</button>
                    ${window.IS_LOGGED_IN ? `<button class="btn-detail" style="margin-top:4px;" onclick="addToPortfolio('${d.symbol}', ${d.current_price})">+ Port</button>` : ''}
                    ${d.contracts.length > 1 ? `<button class="btn-detail" style="margin-top:4px;" onclick="toggleSub('${d.symbol}')">+${d.contracts.length - 1}</button>` : ''}
                </td>
            </tr>`;

            // Sub rows — extra expiries
            if (d.contracts.length > 1) {
                d.contracts.slice(1).forEach(ct => {
                    const ctPremium = ct.futures_price > 0 && d.current_price > 0 ? ct.futures_price - d.current_price : 0;
                    const ctPremClass = ctPremium > 0 ? 'chg-up' : 'chg-down';
                    html += `
                    <tr class="sub-row hidden" data-parent="${d.symbol}">
                        <td colspan="2" style="padding-left:28px;color:var(--text3);">↳ ${d.symbol} — ${ct.expiry}</td>
                        <td colspan="2"></td>
                        <td>
                            <div class="margin-val">${fmtInr(ct.nrml_margin)}</div>
                            <div class="margin-rate">NRML ${ct.nrml_margin_rate ? ct.nrml_margin_rate.toFixed(1) + '%' : ''}</div>
                            ${ct.mis_margin ? `<div class="margin-rate">MIS ${fmtInr(ct.mis_margin)}</div>` : ''}
                        </td>
                        <td>${ct.lot_size ? ct.lot_size.toLocaleString() : '—'}</td>
                        <td>
                            <div>${fmtInr(ct.lot_size * (ct.futures_price || d.current_price))}</div>
                            ${ctPremium !== 0 ? `<div class="${ctPremClass}" style="font-size:11px;">${ctPremium > 0 ? '+' : ''}${fmtInr(ctPremium)} premium</div>` : ''}
                        </td>
                        <td colspan="6"></td>
                    </tr>`;
                });
            }
        });

        tbody.innerHTML = html;
        updateStats(rows);
    }

    // ── Signal Logic ──────────────────────────────────
    function getSignal(d) {
        let score = 0;
        if (d.change_percent > 1)  score++;
        if (d.change_percent > 2)  score++;
        if (d.change_percent < -1) score--;
        if (d.change_percent < -2) score--;
        if (d.delivery_pct > 50)   score++;
        if (d.delivery_pct < 20 && d.delivery_pct > 0) score--;
        if (d.current_price > 0 && d.week52_high > 0) {
            const fromHigh = (d.week52_high - d.current_price) / d.week52_high;
            if (fromHigh < 0.05) score--;
            if (fromHigh > 0.40) score++;
        }
        if (score >= 2)  return 'BUY';
        if (score <= -2) return 'SELL';
        return 'NEUTRAL';
    }

    // ── Sort ──────────────────────────────────────────
    function sortRows(rows) {
        return rows.sort((a, b) => {
            let av = sortVal(a), bv = sortVal(b);
            if (typeof av === 'string') return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
            return sortDir === 'asc' ? av - bv : bv - av;
        });
    }
    function sortVal(d) {
        const c0 = d.contracts[0] || {};
        switch (sortCol) {
            case 'symbol':          return d.symbol;
            case 'current_price':   return d.current_price;
            case 'change_percent':  return d.change_percent;
            case 'nrml_margin':     return c0.nrml_margin;
            case 'lot_size':        return c0.lot_size;
            case 'volume':          return d.volume;
            case 'delivery_pct':    return d.delivery_pct;
            case 'week52_high':     return d.week52_high;
            case 'contract_value':  return c0.lot_size * (c0.futures_price || d.current_price);
            case 'today_pl':        return d.change_amount * c0.lot_size;
            case 'roi':             return c0.nrml_margin > 0 ? (d.change_amount * c0.lot_size / c0.nrml_margin) * 100 : 0;
            default:                return 0;
        }
    }

    // ── Stats ─────────────────────────────────────────
    function updateStats(rows) {
        rows = rows || allData;
        statsTotal.textContent = rows.length;
        statsAdv.textContent   = rows.filter(d => d.change_percent > 0).length;
        statsDec.textContent   = rows.filter(d => d.change_percent < 0).length;
        statsTime.textContent  = new Date().toLocaleTimeString('en-IN');
    }

    // ── Toggle Sub-rows ───────────────────────────────
    window.toggleSub = function (symbol) {
        document.querySelectorAll(`tr.sub-row[data-parent="${symbol}"]`).forEach(r => r.classList.toggle('hidden'));
    };

    // ── Detail Modal ──────────────────────────────────
    window.showDetail = function (symbol) {
        const d = allData.find(x => x.symbol === symbol);
        if (!d) return;
        const c0 = d.contracts[0] || {};

        // Use prev_close as fallback for pivot (close is 0 during market hours)
        const closeForPivot = d.close_price > 0 ? d.close_price : d.prev_close;
        const pivot   = calcPivot(d.high_price, d.low_price, closeForPivot);
        const fib     = calcFib(d.week52_high, d.week52_low);
        const signal  = getSignal(d);
        const todayPL = d.change_amount * c0.lot_size;
        const roi     = c0.nrml_margin > 0 ? ((todayPL / c0.nrml_margin) * 100).toFixed(2) : '—';
        const fromHigh = d.week52_high > 0 ? ((d.week52_high - d.current_price) / d.week52_high * 100).toFixed(1) : 0;
        const fromLow  = d.week52_low  > 0 ? ((d.current_price - d.week52_low)  / d.week52_low  * 100).toFixed(1) : 0;
        const premium  = c0.futures_price > 0 ? c0.futures_price - d.current_price : 0;

        document.getElementById('modal-symbol').textContent = `${symbol}${d.company_name ? ' — ' + d.company_name : ''}`;

        let html = `<div style="text-align:center;margin-bottom:16px;">
            <span class="signal-badge signal-${signal.toLowerCase()}" style="font-size:14px;padding:6px 20px;">${signal} SIGNAL</span>
        </div><div class="modal-grid">`;

        html += card('Price Info', [
            ['LTP',        fmt(d.current_price)],
            ['Open',       fmt(d.open_price)],
            ['High',       fmt(d.high_price)],
            ['Low',        fmt(d.low_price)],
            ['Prev Close', fmt(d.prev_close)],
            ['Change',     `<span class="${d.change_percent >= 0 ? 'chg-up' : 'chg-down'}">${d.change_percent >= 0 ? '+' : ''}${fmtPct(d.change_percent)}</span>`],
        ]);

        html += card('52-Week Range', [
            ['52W High',   fmt(d.week52_high)],
            ['52W Low',    fmt(d.week52_low)],
            ['From High',  `<span class="chg-down">-${fromHigh}%</span>`],
            ['From Low',   `<span class="chg-up">+${fromLow}%</span>`],
        ]);

        html += card('Volume & Delivery', [
            ['Volume',       fmtVol(d.volume)],
            ['Traded Value', fmtInr(d.total_traded_value)],
            ['Delivery Qty', fmtVol(d.delivery_qty)],
            ['Delivery %',   d.delivery_pct > 0 ? d.delivery_pct.toFixed(2) + '%' : '—'],
        ]);

        html += card('Margin & Contract', [
            ['Expiry',         c0.expiry || '—'],
            ['Lot Size',       c0.lot_size ? c0.lot_size.toLocaleString() : '—'],
            ['Futures Price',  fmt(c0.futures_price)],
            ['Premium',        `<span class="${premium >= 0 ? 'chg-up' : 'chg-down'}">${premium >= 0 ? '+' : ''}${fmtInr(premium)}</span>`],
            ['NRML Margin',    fmtInr(c0.nrml_margin)],
            ['MIS Margin',     fmtInr(c0.mis_margin)],
            ['Margin Rate',    c0.nrml_margin_rate ? c0.nrml_margin_rate.toFixed(2) + '%' : '—'],
            ['MWPL',           c0.mwpl ? c0.mwpl.toFixed(2) + '%' : '—'],
            ['Contract Value', fmtInr(c0.lot_size * (c0.futures_price || d.current_price))],
            ['Today P/L',      `<span class="${todayPL >= 0 ? 'chg-up' : 'chg-down'}">${todayPL >= 0 ? '+' : ''}${fmtInr(todayPL)}</span>`],
            ['ROI Today',      `<span class="${parseFloat(roi) >= 0 ? 'chg-up' : 'chg-down'}">${roi}%</span>`],
        ]);

        html += card('Pivot Points (Classic)', [
            ['R3',        fmt(pivot.r3)],
            ['R2',        fmt(pivot.r2)],
            ['R1',        fmt(pivot.r1)],
            ['Pivot (P)', `<strong>${fmt(pivot.p)}</strong>`],
            ['S1',        fmt(pivot.s1)],
            ['S2',        fmt(pivot.s2)],
            ['S3',        fmt(pivot.s3)],
            ['Bias',      d.current_price > pivot.p
                ? '<span class="trend-bull">Above Pivot ▲ Bullish</span>'
                : '<span class="trend-bear">Below Pivot ▼ Bearish</span>'],
        ]);

        html += card('Fibonacci (52W)', [
            ['0% (High)',  fmt(fib[0])],
            ['23.6%',      fmt(fib[23.6])],
            ['38.2%',      fmt(fib[38.2])],
            ['50%',        fmt(fib[50])],
            ['61.8%',      fmt(fib[61.8])],
            ['100% (Low)', fmt(fib[100])],
        ]);

        // OI card — show cached data or Fetch OI button
        html += oiCard(d, symbol);

        // All contracts table
        if (d.contracts.length > 0) {
            let ctHtml = `<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;font-size:11px;font-weight:600;color:var(--text3);padding:4px 0;border-bottom:1px solid var(--border);">
                <span>Expiry</span><span>Lot</span><span>Fut Price</span><span>NRML</span><span>MIS</span>
            </div>`;
            ctHtml += d.contracts.map(c => {
                const p = c.futures_price > 0 ? c.futures_price - d.current_price : 0;
                const pc = p > 0 ? 'chg-up' : 'chg-down';
                return `<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;font-size:12px;padding:5px 0;border-bottom:1px solid var(--border);">
                    <span>${c.expiry}</span>
                    <span>${c.lot_size?.toLocaleString()}</span>
                    <span>${fmt(c.futures_price)} <span class="${pc}" style="font-size:10px;">(${p >= 0 ? '+' : ''}${fmtInr(p)})</span></span>
                    <span>${fmtInr(c.nrml_margin)}</span>
                    <span>${fmtInr(c.mis_margin)}</span>
                </div>`;
            }).join('');
            html += `<div class="modal-card" style="grid-column:1/-1"><h4>All Expiry Contracts</h4>${ctHtml}</div>`;
        }

        html += '</div>';
        document.getElementById('modal-body').innerHTML = html;
        document.getElementById('fno-modal').classList.add('open');
    };

    function card(title, rows) {
        const inner = rows.map(([l, v]) => `<div class="mval"><span class="mlbl">${l}:</span> ${v}</div>`).join('');
        return `<div class="modal-card"><h4>${title}</h4>${inner}</div>`;
    }

    function oiCard(d, symbol) {
        const c0 = d.contracts[0] || {};
        // Check if OI data exists for nearest expiry
        if (c0.open_interest > 0) {
            const oiChgClass = c0.oi_change >= 0 ? 'chg-up' : 'chg-down';
            const oiChgSign  = c0.oi_change >= 0 ? '+' : '';
            const pcrClass   = c0.pcr >= 1.2 ? 'chg-up' : c0.pcr <= 0.8 ? 'chg-down' : 'chg-flat';
            const pcrBias    = c0.pcr >= 1.2 ? 'Bullish' : c0.pcr <= 0.8 ? 'Bearish' : 'Neutral';
            const updatedAgo = c0.oi_updated ? `<span style="font-size:10px;color:var(--text3);">Updated: ${c0.oi_updated}</span>` : '';
            return `<div class="modal-card">
                <h4>Open Interest ${updatedAgo}</h4>
                <div class="mval"><span class="mlbl">OI (Nearest):</span> ${fmtVol(c0.open_interest)}</div>
                <div class="mval"><span class="mlbl">OI Change:</span> <span class="${oiChgClass}">${oiChgSign}${fmtVol(c0.oi_change)} (${oiChgSign}${c0.oi_change_pct.toFixed(2)}%)</span></div>
                <div class="mval"><span class="mlbl">PCR:</span> <span class="${pcrClass}">${c0.pcr.toFixed(2)} — ${pcrBias}</span></div>
                <button class="btn-detail" style="margin-top:10px;width:100%;" onclick="fetchOI('${symbol}')">↻ Refresh OI</button>
            </div>`;
        }
        // No OI data yet — show fetch button
        return `<div class="modal-card">
            <h4>Open Interest</h4>
            <div style="color:var(--text3);font-size:12px;margin-bottom:10px;">No OI data yet.</div>
            <button class="btn-detail" style="width:100%;" id="btn-fetch-oi-${symbol}" onclick="fetchOI('${symbol}')">Fetch OI from NSE</button>
        </div>`;
    }

    window.fetchOI = function(symbol) {
        const btn = document.getElementById('btn-fetch-oi-' + symbol)
                 || document.querySelector(`button[onclick="fetchOI('${symbol}')"]`);
        if (btn) { btn.disabled = true; btn.textContent = 'Fetching...'; }

        fetch(BASE + '/fetch_oi.php?symbol=' + encodeURIComponent(symbol))
            .then(r => r.json())
            .then(res => {
                if (!res.success) {
                    alert('OI fetch failed: ' + (res.error || 'Unknown error'));
                    if (btn) { btn.disabled = false; btn.textContent = 'Fetch OI from NSE'; }
                    return;
                }
                // Update allData with fresh OI for this symbol's contracts
                const d = allData.find(x => x.symbol === symbol);
                if (d) {
                    res.data.forEach(oi => {
                        const ct = d.contracts.find(c => c.expiry === oi.expiry);
                        if (ct) {
                            ct.open_interest  = oi.oi;
                            ct.oi_change      = oi.oi_change;
                            ct.oi_change_pct  = oi.oi_change_pct;
                            ct.pcr            = oi.pcr;
                            ct.oi_updated     = new Date().toLocaleString('en-IN');
                        }
                    });
                }
                // Re-open modal with fresh data
                showDetail(symbol);
            })
            .catch(() => {
                alert('OI fetch failed. Check NSE connectivity.');
                if (btn) { btn.disabled = false; btn.textContent = 'Fetch OI from NSE'; }
            });
    };

    // ── Calculators ───────────────────────────────────
    function calcPivot(h, l, c) {
        const p = (h + l + c) / 3;
        return { p, r1: 2*p-l, r2: p+(h-l), r3: h+2*(p-l), s1: 2*p-h, s2: p-(h-l), s3: l-2*(h-p) };
    }
    function calcFib(high, low) {
        const d = high - low;
        return { 0: high, 23.6: high-d*0.236, 38.2: high-d*0.382, 50: high-d*0.5, 61.8: high-d*0.618, 100: low };
    }

    // ── Formatters ────────────────────────────────────
    function fmt(n) {
        if (!n && n !== 0) return '<span class="na">—</span>';
        return '₹' + parseFloat(n).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    function fmtPct(n) { return parseFloat(n).toFixed(2) + '%'; }
    function fmtInr(n) {
        if (!n && n !== 0) return '<span class="na">—</span>';
        const abs = Math.abs(n), sign = n < 0 ? '-' : '';
        if (abs >= 1e7) return sign + '₹' + (abs/1e7).toFixed(2) + ' Cr';
        if (abs >= 1e5) return sign + '₹' + (abs/1e5).toFixed(2) + ' L';
        return sign + '₹' + abs.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }
    function fmtVol(n) {
        if (!n) return '<span class="na">—</span>';
        if (n >= 1e7) return (n/1e7).toFixed(2) + ' Cr';
        if (n >= 1e5) return (n/1e5).toFixed(2) + ' L';
        return n.toLocaleString('en-IN');
    }

    function setLoading(on) {
        if (on) tbody.innerHTML = '<tr class="loading-row"><td colspan="13"><span class="spinner"></span>Loading FNO data...</td></tr>';
    }

    // ── Events ────────────────────────────────────────
    searchInp.addEventListener('input',  () => { filterSym = searchInp.value.trim(); renderTable(); });
    indFilter.addEventListener('change', () => { filterInd = indFilter.value; renderTable(); });
    expFilter.addEventListener('change', () => { filterExp = expFilter.value; renderTable(); });
    refreshBtn.addEventListener('click', refreshPrices);

    document.getElementById('btn-clear').addEventListener('click', () => {
        searchInp.value = indFilter.value = expFilter.value = '';
        filterSym = filterInd = filterExp = '';
        renderTable();
    });

    document.getElementById('modal-close').addEventListener('click', () => {
        document.getElementById('fno-modal').classList.remove('open');
    });
    document.getElementById('fno-modal').addEventListener('click', function (e) {
        if (e.target === this) this.classList.remove('open');
    });

    document.querySelectorAll('th[data-sort]').forEach(th => {
        th.addEventListener('click', () => {
            const col = th.dataset.sort;
            sortDir = (sortCol === col && sortDir === 'desc') ? 'asc' : 'desc';
            sortCol = col;
            document.querySelectorAll('th[data-sort]').forEach(h => h.classList.remove('asc', 'desc'));
            th.classList.add(sortDir);
            renderTable();
        });
    });

    // ── AI Report ─────────────────────────────────────
    window.showAI = function(symbol) {
        if (!window.IS_LOGGED_IN) {
            if (confirm('Login required to use AI reports. Go to login page?')) {
                window.location.href = (window.APP_BASE || '') + '/pages/login.php';
            }
            return;
        }
        const modal    = document.getElementById('ai-modal');
        const body     = document.getElementById('ai-modal-body');
        const title    = document.getElementById('ai-modal-title');
        title.textContent = 'AI Report — ' + symbol;
        body.innerHTML = `<div class="ai-generating"><span class="spinner"></span>Generating AI analysis for ${symbol}...<br><small style="color:var(--text3);margin-top:8px;display:block;">This may take 10-20 seconds</small></div>`;
        modal.classList.add('open');

        fetch(BASE + '/ai_report.php?symbol=' + encodeURIComponent(symbol))
            .then(r => r.json())
            .then(res => {
                if (!res.success) {
                    body.innerHTML = `<div style="color:var(--red);padding:20px;">${res.error}</div>`;
                    return;
                }
                renderAIReport(res, symbol, body);
            })
            .catch(() => {
                body.innerHTML = '<div style="color:var(--red);padding:20px;">Failed to connect to AI service.</div>';
            });
    };

    function renderAIReport(res, symbol, body) {
        const r          = res.report;
        const biasClass  = r.bias === 'BULLISH' ? 'ai-bias-bullish' : r.bias === 'BEARISH' ? 'ai-bias-bearish' : 'ai-bias-neutral';
        const fillColor  = r.bias === 'BULLISH' ? 'var(--green)' : r.bias === 'BEARISH' ? 'var(--red)' : 'var(--yellow)';
        const ageText    = res.cached ? `Cached report · ${res.age_hours}h ago` : 'Just generated';
        // Convert markdown-style bold to <strong>
        const formatted  = (r.report_text || '')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/^(\d+\.\s)/gm, '<br><strong>$1</strong>');

        body.innerHTML = `
            <div class="ai-meta">
                <span>${ageText} · ${r.model_used}</span>
                <button class="btn-ai-refresh" onclick="refreshAI('${symbol}')">↻ Regenerate</button>
            </div>
            <div style="text-align:center;margin-bottom:4px;">
                <span class="${biasClass}" style="font-size:20px;">${r.bias}</span>
                <span style="font-size:14px;color:var(--text3);margin-left:8px;">${r.confidence}% confidence</span>
            </div>
            <div class="confidence-bar">
                <div class="confidence-fill" style="width:${r.confidence}%;background:${fillColor};"></div>
            </div>
            <div class="ai-report-text">${formatted}</div>
        `;
    }

    window.refreshAI = function(symbol) {
        const body  = document.getElementById('ai-modal-body');
        const title = document.getElementById('ai-modal-title');
        title.textContent = 'AI Report — ' + symbol;
        body.innerHTML = `<div class="ai-generating"><span class="spinner"></span>Regenerating...<br><small style="color:var(--text3);margin-top:8px;display:block;">Fetching fresh AI analysis</small></div>`;
        fetch(BASE + '/ai_report.php?symbol=' + encodeURIComponent(symbol) + '&refresh=1')
            .then(r => r.json())
            .then(res => {
                if (!res.success) { body.innerHTML = `<div style="color:var(--red);padding:20px;">${res.error}</div>`; return; }
                renderAIReport(res, symbol, body);
            });
    };

    document.getElementById('ai-modal-close').addEventListener('click', () => {
        document.getElementById('ai-modal').classList.remove('open');
    });
    document.getElementById('ai-modal').addEventListener('click', function(e) {
        if (e.target === this) this.classList.remove('open');
    });

    // ── Add to Portfolio (quick-add from table) ────────
    window.addToPortfolio = function(symbol, currentPrice) {
        const price = prompt(`Add ${symbol} to portfolio\nEnter your entry price:`, currentPrice);
        if (!price) return;
        const type = confirm('Click OK for BUY, Cancel for SELL') ? 'BUY' : 'SELL';
        const fd   = new FormData();
        fd.append('action',      'add');
        fd.append('symbol',      symbol);
        fd.append('trade_type',  type);
        fd.append('entry_price', price);
        fd.append('quantity',    '1');
        fd.append('target_price', '');
        fd.append('stop_loss',    '');
        fd.append('notes',        '');
        fetch(BASE + '/watchlist.php', { method:'POST', body:fd })
            .then(r => r.json())
            .then(res => {
                if (res.success) alert(`${symbol} added to your portfolio!`);
                else alert('Error: ' + res.error);
            });
    };

    loadData();
})();
