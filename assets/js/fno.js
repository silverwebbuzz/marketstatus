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
                tbody.innerHTML = '<tr class="empty-row"><td colspan="13">Failed to load data. Check DB connection or run margin fetch first.</td></tr>';
            })
            .finally(() => setLoading(false));
    }

    // ── Refresh Prices ────────────────────────────────
    function refreshPrices() {
        refreshBtn.disabled    = true;
        refreshBtn.textContent = 'Refreshing...';
        fetch(BASE + '/fetch_prices.php')
            .then(r => r.json())
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

            const range    = d.high_price - d.low_price;
            const pct      = range > 0 ? Math.min(100, Math.max(0, ((d.current_price - d.low_price) / range) * 100)) : 50;

            const todayPL  = d.change_amount * c0.lot_size;
            const plClass  = todayPL > 0 ? 'chg-up' : todayPL < 0 ? 'chg-down' : 'chg-flat';
            const plSign   = todayPL > 0 ? '+' : '';

            const roi      = c0.nrml_margin > 0 ? (todayPL / c0.nrml_margin) * 100 : 0;
            const roiClass = roi > 0 ? 'chg-up' : roi < 0 ? 'chg-down' : 'chg-flat';
            const roiSign  = roi > 0 ? '+' : '';

            const signal   = getSignal(d);
            const delPct   = d.delivery_pct > 0 ? d.delivery_pct.toFixed(1) + '%' : '<span class="na">—</span>';
            const cval     = c0.lot_size * (d.current_price || c0.futures_price);

            html += `
            <tr class="main-row" data-symbol="${d.symbol}">
                <td>
                    <div class="symbol-name">${d.symbol}</div>
                    <div class="company-name" title="${d.company_name || ''}">${d.company_name || ''}</div>
                    ${d.industry ? `<div class="badge-industry">${d.industry}</div>` : ''}
                </td>
                <td>
                    <div class="price-ltp">${fmt(d.current_price)}</div>
                    <div class="${chgClass}" style="font-size:11px;">${chgAmt}${fmt(d.change_amount)} (${chgSign}${fmtPct(d.change_percent)})</div>
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
                    <div style="font-size:11px;color:var(--text3);">52W: ${fmt(d.week52_low)} – ${fmt(d.week52_high)}</div>
                    <div style="font-size:11px;">O:${fmt(d.open_price)} C:${fmt(d.close_price)}</div>
                </td>
                <td>
                    <div class="margin-val">${fmtInr(c0.nrml_margin)}</div>
                    <div class="margin-rate">${c0.nrml_margin_rate ? c0.nrml_margin_rate.toFixed(1) + '%' : ''}</div>
                </td>
                <td class="lot-size">${c0.lot_size ? c0.lot_size.toLocaleString() : '<span class="na">—</span>'}</td>
                <td>
                    <div>${fmtInr(cval)}</div>
                    <div style="font-size:11px;color:var(--text3);">${c0.expiry || ''}</div>
                </td>
                <td class="${plClass}">${c0.lot_size ? plSign + fmtInr(todayPL) : '<span class="na">—</span>'}</td>
                <td class="${roiClass}">${c0.nrml_margin > 0 ? roiSign + roi.toFixed(2) + '%' : '<span class="na">—</span>'}</td>
                <td>${fmtVol(d.volume)}</td>
                <td>${delPct}</td>
                <td><span class="signal-badge signal-${signal.toLowerCase()}">${signal}</span></td>
                <td>
                    <button class="btn-detail" onclick="showDetail('${d.symbol}')">Detail</button>
                    ${d.contracts.length > 1 ? `<button class="btn-detail" style="margin-top:4px;" onclick="toggleSub('${d.symbol}')">+${d.contracts.length - 1} exp</button>` : ''}
                </td>
            </tr>`;

            if (d.contracts.length > 1) {
                d.contracts.slice(1).forEach(ct => {
                    html += `
                    <tr class="sub-row hidden" data-parent="${d.symbol}">
                        <td colspan="2" style="padding-left:28px;color:var(--text3);">↳ ${d.symbol} — ${ct.expiry}</td>
                        <td colspan="2"></td>
                        <td><div class="margin-val">${fmtInr(ct.nrml_margin)}</div><div class="margin-rate">${ct.nrml_margin_rate ? ct.nrml_margin_rate.toFixed(1) + '%' : ''}</div></td>
                        <td>${ct.lot_size ? ct.lot_size.toLocaleString() : '—'}</td>
                        <td>${fmtInr(ct.lot_size * (d.current_price || ct.futures_price))}</td>
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
        if (d.delivery_pct < 20)   score--;
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
            case 'symbol':         return d.symbol;
            case 'current_price':  return d.current_price;
            case 'change_percent': return d.change_percent;
            case 'change_amount':  return d.change_amount;
            case 'nrml_margin':    return c0.nrml_margin;
            case 'lot_size':       return c0.lot_size;
            case 'volume':         return d.volume;
            case 'delivery_pct':   return d.delivery_pct;
            case 'week52_high':    return d.week52_high;
            default:               return 0;
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
        const c0     = d.contracts[0] || {};
        const pivot  = calcPivot(d.high_price, d.low_price, d.close_price);
        const fib    = calcFib(d.week52_high, d.week52_low);
        const signal = getSignal(d);
        const todayPL = d.change_amount * c0.lot_size;
        const roi     = c0.nrml_margin > 0 ? ((todayPL / c0.nrml_margin) * 100).toFixed(2) : '—';
        const fromHigh = d.week52_high > 0 ? ((d.week52_high - d.current_price) / d.week52_high * 100).toFixed(1) : 0;
        const fromLow  = d.week52_low  > 0 ? ((d.current_price - d.week52_low)  / d.week52_low  * 100).toFixed(1) : 0;

        document.getElementById('modal-symbol').textContent = `${symbol}  ${d.company_name ? '— ' + d.company_name : ''}`;

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
            ['High',      fmt(d.week52_high)],
            ['Low',       fmt(d.week52_low)],
            ['From High', `<span class="chg-down">-${fromHigh}%</span>`],
            ['From Low',  `<span class="chg-up">+${fromLow}%</span>`],
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
            ['NRML Margin',    fmtInr(c0.nrml_margin)],
            ['Margin Rate',    c0.nrml_margin_rate ? c0.nrml_margin_rate.toFixed(2) + '%' : '—'],
            ['Contract Value', fmtInr(c0.lot_size * d.current_price)],
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

        // All contracts
        if (d.contracts.length > 0) {
            let ctHtml = d.contracts.map(c => `
                <div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid var(--border);font-size:12px;">
                    <span>${c.expiry}</span>
                    <span>Lot: ${c.lot_size?.toLocaleString()}</span>
                    <span>NRML: ${fmtInr(c.nrml_margin)}</span>
                    <span>${c.nrml_margin_rate ? c.nrml_margin_rate.toFixed(1) + '%' : ''}</span>
                </div>`).join('');
            html += `<div class="modal-card" style="grid-column:1/-1"><h4>All Contracts</h4>${ctHtml}</div>`;
        }

        html += '</div>';
        document.getElementById('modal-body').innerHTML = html;
        document.getElementById('fno-modal').classList.add('open');
    };

    function card(title, rows) {
        const inner = rows.map(([l, v]) => `<div class="mval">${l}: <span class="mlbl">${v}</span></div>`).join('');
        return `<div class="modal-card"><h4>${title}</h4>${inner}</div>`;
    }

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
    function fmtPct(n) {
        return parseFloat(n).toFixed(2) + '%';
    }
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

    loadData();
})();
