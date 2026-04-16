<style>
.port-modal-overlay { display:none; position:fixed; inset:0; background:rgba(0,0,0,.75); z-index:600; align-items:center; justify-content:center; }
.port-modal-overlay.open { display:flex; }
.port-modal-box { background:var(--bg2); border:1px solid var(--border); border-radius:12px; width:90%; max-width:480px; padding:28px; position:relative; }
.port-modal-head { display:flex; align-items:center; justify-content:space-between; margin-bottom:22px; }
.port-modal-head h3 { font-size:16px; font-weight:700; }
.port-modal-close { background:var(--bg3); border:1px solid var(--border); color:var(--text); border-radius:6px; padding:4px 10px; cursor:pointer; font-size:15px; }
.port-form-group { margin-bottom:14px; position:relative; }
.port-form-group label { display:block; font-size:12px; color:var(--text3); margin-bottom:5px; font-weight:500; }
.port-form-group input,
.port-form-group select {
    width:100%; background:var(--bg3); border:1px solid var(--border);
    border-radius:var(--radius); padding:9px 12px; color:var(--text);
    font-size:13px; outline:none; font-family:var(--font);
    transition:border-color .15s;
}
.port-form-group input:focus,
.port-form-group select:focus { border-color:var(--accent); }
.port-form-group input:disabled { opacity:.5; cursor:not-allowed; }
.port-form-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }
.port-modal-footer { display:flex; gap:10px; justify-content:flex-end; margin-top:22px; }
.port-btn-cancel { background:transparent; border:1px solid var(--border); color:var(--text2); border-radius:var(--radius); padding:9px 18px; cursor:pointer; font-size:13px; }
.port-btn-save   { background:var(--accent); color:#fff; border:none; border-radius:var(--radius); padding:9px 22px; font-size:13px; font-weight:600; cursor:pointer; transition:opacity .2s; }
.port-btn-save:hover { opacity:.85; }

/* Symbol search */
.sym-search-wrap { position:relative; }
.sym-result-list { position:absolute; top:100%; left:0; right:0; background:var(--bg3); border:1px solid var(--border); border-radius:var(--radius); z-index:700; max-height:200px; overflow-y:auto; margin-top:2px; }
.sym-result-item { padding:8px 12px; cursor:pointer; font-size:13px; border-bottom:1px solid var(--border); }
.sym-result-item:hover { background:var(--border); color:var(--accent); }
.sym-result-item:last-child { border-bottom:none; }

/* Price+% dual input */
.dual-input-wrap { display:grid; grid-template-columns:1fr 80px; gap:6px; }
.dual-input-wrap input { min-width:0; }
.pct-input { text-align:center; }
.pct-hint { font-size:10px; margin-top:3px; height:14px; }
.pct-hint.up   { color:var(--green); }
.pct-hint.down { color:var(--red); }
</style>

<div class="port-modal-overlay" id="port-modal">
    <div class="port-modal-box">
        <div class="port-modal-head">
            <h3 id="port-modal-title">Add to Portfolio</h3>
            <button class="port-modal-close" id="port-modal-close">✕</button>
        </div>
        <input type="hidden" id="port-edit-id">

        <div class="port-form-group sym-search-wrap">
            <label>Symbol</label>
            <input type="text" id="port-symbol" placeholder="Search e.g. RELIANCE, TCS..." autocomplete="off" style="text-transform:uppercase;">
            <div class="sym-result-list" id="port-sym-results"></div>
        </div>

        <div class="port-form-group">
            <label>Expiry</label>
            <select id="port-expiry"><option value="">Search a symbol first</option></select>
        </div>

        <div class="port-form-row">
            <div class="port-form-group">
                <label>Trade Type</label>
                <select id="port-type">
                    <option value="BUY">BUY (Long)</option>
                    <option value="SELL">SELL (Short)</option>
                </select>
            </div>
            <div class="port-form-group">
                <label>Lots (Qty)</label>
                <input type="number" id="port-qty" value="1" min="1">
            </div>
        </div>

        <div class="port-form-group">
            <label>Entry Price ₹</label>
            <input type="number" id="port-entry" step="0.05" placeholder="0.00">
        </div>

        <div class="port-form-group">
            <label>Target <span style="color:var(--text3);font-weight:400;">— enter price or %</span></label>
            <div class="dual-input-wrap">
                <input type="number" id="port-target"     step="0.05" placeholder="Price ₹"  oninput="syncFromPrice('target')">
                <input type="number" id="port-target-pct" step="0.01" placeholder="%" class="pct-input" oninput="syncFromPct('target')">
            </div>
            <div class="pct-hint" id="port-target-hint"></div>
        </div>

        <div class="port-form-group">
            <label>Stop Loss <span style="color:var(--text3);font-weight:400;">— enter price or %</span></label>
            <div class="dual-input-wrap">
                <input type="number" id="port-sl"     step="0.05" placeholder="Price ₹" oninput="syncFromPrice('sl')">
                <input type="number" id="port-sl-pct" step="0.01" placeholder="%" class="pct-input" oninput="syncFromPct('sl')">
            </div>
            <div class="pct-hint" id="port-sl-hint"></div>
        </div>

        <div class="port-form-group">
            <label>Notes <span style="color:var(--text3);font-weight:400;">(optional)</span></label>
            <input type="text" id="port-notes" placeholder="e.g. Breakout trade">
        </div>

        <div class="port-modal-footer">
            <button class="port-btn-cancel" id="port-cancel">Cancel</button>
            <button class="port-btn-save" onclick="savePortfolioEntry()">Save Trade</button>
        </div>
    </div>
</div>

<!-- syncFromPrice / syncFromPct / savePortfolioEntry / openPortfolioModal are defined in fno.js -->
