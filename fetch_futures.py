#!/usr/bin/env python3
"""
Simple Python script to fetch Zerodha futures data
Uses requests and BeautifulSoup - no browser needed
Saves HTML to temp file first, then parses it

Installation:
    pip3 install requests beautifulsoup4

Or:
    pip install requests beautifulsoup4
"""

import requests
import json
import re
import time
import sys
import os
from bs4 import BeautifulSoup
from datetime import datetime
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

# Configuration
URL = 'https://zerodha.com/margin-calculator/Futures/'
OUTPUT_FILE = 'data/futures_margins.json'
TEMP_HTML_FILE = 'data/zerodha_temp.html'
MAX_RETRIES = 3
RETRY_DELAY = 5

def fetch_with_retry(url, max_retries=3, initial_delay=5):
    """Fetch URL with retry logic for rate limiting - simulates real browser"""
    delay = initial_delay
    
    # Exact browser headers from Firefox (matching user's browser)
    headers = {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:146.0) Gecko/20100101 Firefox/146.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Referer': 'https://zerodha.com/margin-calculator/SPAN/',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-User': '?1',
        'Priority': 'u=0, i',
        'TE': 'trailers',
    }
    
    # Create session with cookie handling
    session = requests.Session()
    
    # First, visit main page to get Cloudflare cookies (like a real browser)
    try:
        print("Initializing session (visiting main page for cookies)...")
        main_headers = headers.copy()
        main_headers['Referer'] = 'https://zerodha.com/'
        main_headers['Sec-Fetch-Site'] = 'none'
        session.get('https://zerodha.com/', headers=main_headers, timeout=10)
        time.sleep(1)  # Let cookies settle
    except Exception as e:
        print(f"Warning: Could not initialize session: {e}")
        # Continue anyway
    
    retry_strategy = Retry(
        total=max_retries,
        backoff_factor=1,
        status_forcelist=[429, 500, 502, 503, 504],
    )
    adapter = HTTPAdapter(max_retries=retry_strategy)
    session.mount("http://", adapter)
    session.mount("https://", adapter)
    
    for attempt in range(1, max_retries + 1):
        if attempt > 1:
            print(f"Rate limited (HTTP 429). Waiting {delay} seconds before retry {attempt}/{max_retries}...")
            time.sleep(delay)
            delay *= 2  # Exponential backoff
            # Try to refresh cookies
            try:
                session.get('https://zerodha.com/', timeout=5)
                time.sleep(1)
            except:
                pass
        
        try:
            # Add delay before request to be respectful
            if attempt == 1:
                time.sleep(2)  # Initial delay
            
            print(f"Fetching page (attempt {attempt}/{max_retries})...")
            response = session.get(url, headers=headers, timeout=60, allow_redirects=True)
            
            if response.status_code == 200:
                # requests library should automatically decompress, but verify
                html_content = response.text
                
                # Check if content looks like binary/compressed data
                # If response.text is very short or contains binary chars, try manual decompression
                raw_content = response.content
                
                # Check if raw content is compressed
                is_compressed = False
                if raw_content[:2] == b'\x1f\x8b':  # Gzip magic number
                    is_compressed = True
                    import gzip
                    try:
                        html_content = gzip.decompress(raw_content).decode('utf-8')
                        print("  ✓ Decompressed gzip content")
                    except Exception as e:
                        print(f"  ⚠ Failed to decompress gzip: {e}")
                elif len(raw_content) > 4 and raw_content[:4] in [b'\xce\xb2\xcf\x81', b'BrS\x01']:  # Brotli magic
                    is_compressed = True
                    try:
                        import brotli
                        html_content = brotli.decompress(raw_content).decode('utf-8')
                        print("  ✓ Decompressed brotli content")
                    except ImportError:
                        print("  ⚠ Brotli not installed, trying requests default")
                        html_content = response.text
                    except Exception as e:
                        print(f"  ⚠ Failed to decompress brotli: {e}")
                
                # Verify it's actually HTML text (not binary)
                if len(html_content) > 0:
                    # Check for HTML indicators
                    has_html_tags = '<html' in html_content.lower() or '<!doctype' in html_content.lower() or '<body' in html_content.lower()
                    has_symbols = '360ONE' in html_content or 'ABB' in html_content or 'ABCAPITAL' in html_content
                    has_table = '<table' in html_content.lower() or '<tbody' in html_content.lower()
                    
                    if not has_html_tags and not has_symbols:
                        # Might be binary or wrong encoding
                        print(f"  ⚠ Content doesn't look like HTML")
                        print(f"  First 200 bytes (hex): {raw_content[:200].hex()[:400]}")
                        print(f"  First 200 chars (text): {html_content[:200]}")
                        if attempt < max_retries:
                            continue
                
                # Check if we got valid HTML (not a rate limit page)
                if 'margin-calculator' in response.url.lower() and len(html_content) > 10000:
                    # Verify it's actually HTML text with expected content
                    if has_html_tags or has_symbols or has_table:
                        # Save HTML to temp file
                        os.makedirs(os.path.dirname(TEMP_HTML_FILE), exist_ok=True)
                        with open(TEMP_HTML_FILE, 'w', encoding='utf-8') as f:
                            f.write(html_content)
                        print(f"✓ HTML saved to {TEMP_HTML_FILE} ({len(html_content)} characters)")
                        if has_symbols:
                            print(f"✓ Found expected symbols in HTML")
                        return html_content
                    else:
                        print(f"⚠ Got HTTP 200 but content doesn't look like valid HTML")
                        print(f"  Has HTML tags: {has_html_tags}")
                        print(f"  Has symbols: {has_symbols}")
                        print(f"  Has table: {has_table}")
                        if attempt < max_retries:
                            continue
                else:
                    print(f"⚠ Got HTTP 200 but response seems invalid")
                    print(f"  URL: {response.url}")
                    print(f"  Content length: {len(html_content)}")
                    if attempt < max_retries:
                        continue
            elif response.status_code == 429:
                print(f"HTTP 429 (Rate Limited) on attempt {attempt}")
                continue
            elif response.status_code == 403:
                print(f"HTTP 403 (Cloudflare challenge) on attempt {attempt}")
                # Try to refresh session
                try:
                    session.get('https://zerodha.com/', timeout=10)
                    time.sleep(2)
                except:
                    pass
                continue
            else:
                print(f"Attempt {attempt} failed: HTTP {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            print(f"Attempt {attempt} error: {e}")
            if attempt < max_retries:
                time.sleep(delay)
    
    return None

def parse_futures_data(html):
    """Parse futures data from HTML"""
    futures_data = []
    
    # Try to find JSON in script tags
    script_pattern = r'<script[^>]*>(.*?)</script>'
    scripts = re.findall(script_pattern, html, re.DOTALL | re.IGNORECASE)
    
    for script in scripts:
        # Look for data objects
        json_match = re.search(r'var\s+\w+(?:Data|Futures|Margins)\s*=\s*(\[.*?\]|\{.*?\});', script, re.DOTALL)
        if json_match:
            try:
                data = json.loads(json_match.group(1))
                if isinstance(data, list) and len(data) > 0:
                    return data
            except:
                pass
    
    # Debug: Check HTML content
    print(f"HTML length: {len(html)} characters")
    has_symbols = '360ONE' in html or 'ABB' in html or 'ABCAPITAL' in html
    has_margin = 'NRML Margin' in html or 'nrml' in html.lower()
    has_table_tag = '<table' in html.lower()
    has_tbody_tag = '<tbody' in html.lower()
    has_tr_tag = '<tr' in html.lower()
    
    print(f"  Contains symbols: {has_symbols}")
    print(f"  Contains margin text: {has_margin}")
    print(f"  Contains <table>: {has_table_tag}")
    print(f"  Contains <tbody>: {has_tbody_tag}")
    print(f"  Contains <tr>: {has_tr_tag}")
    
    # Parse HTML table using BeautifulSoup
    soup = BeautifulSoup(html, 'html.parser')
    
    # Try multiple ways to find the table
    tables = soup.find_all('table')
    
    # Also try finding by class or id
    if not tables:
        tables = soup.find_all('table', class_=re.compile('table|margin|futures', re.I))
    
    # Try finding tbody directly (even without table tag)
    if not tables and has_tbody_tag:
        tbody = soup.find('tbody')
        if tbody:
            # Create a fake table structure
            table = soup.new_tag('table')
            table.append(tbody)
            tables = [table]
            print("  Found tbody without table tag, creating wrapper")
    
    # Try finding rows directly (maybe table structure is different)
    if not tables and has_tr_tag:
        # Look for rows that contain our symbols
        all_rows = soup.find_all('tr')
        if all_rows and len(all_rows) > 5:
            # Check if any row contains expected data
            for row in all_rows[:10]:
                row_text = row.get_text()
                if '360ONE' in row_text or 'ABB' in row_text or 'Lot size' in row_text:
                    print(f"  Found {len(all_rows)} rows with data, creating table wrapper")
                    # Create a fake table with all rows
                    table = soup.new_tag('table')
                    for r in all_rows:
                        table.append(r)
                    tables = [table]
                    break
    
    # If still no tables, try regex parsing directly from HTML
    if not tables and has_symbols:
        print("  No table structure found, trying regex parsing from HTML...")
        # Extract data using regex patterns directly from HTML
        # Pattern: **SYMBOL** DD-MMM-YYYY Lot size XXX MWPL XX.XX%
        pattern = r'\*\*([A-Z0-9&]+(?:\s[A-Z0-9&]+)*)\*\*\s+(\d{1,2}-[A-Z]{3}-\d{4})\s+Lot\s+size\s+(\d+)\s+MWPL\s+([\d.]+)%'
        matches = re.finditer(pattern, html, re.IGNORECASE)
        
        for match in matches:
            symbol = match.group(1).strip()
            expiry = match.group(2).upper()
            lot_size = int(match.group(3))
            mwpl = float(match.group(4))
            
            # Find the values after this match (NRML Margin, Rate, Price)
            # Look for numbers after the match in the same line/context
            match_end = match.end()
            context = html[match_end:match_end+200]  # Next 200 chars
            
            # Extract NRML Margin, Rate, Price using regex
            nrml_match = re.search(r'(\d{1,3}(?:,\d{3})*)', context)
            rate_match = re.search(r'(\d+\.?\d*)%', context)
            price_match = re.search(r'(\d+\.?\d*)', context[50:])  # Price usually comes later
            
            nrml_margin = float(nrml_match.group(1).replace(',', '')) if nrml_match else None
            nrml_margin_rate = float(rate_match.group(1)) if rate_match else None
            price = float(price_match.group(1)) if price_match else None
            
            if symbol and expiry and nrml_margin:
                futures_data.append({
                    'symbol': symbol,
                    'expiry': expiry,
                    'lot_size': lot_size,
                    'mwpl': mwpl,
                    'nrml_margin': nrml_margin,
                    'nrml_margin_rate': nrml_margin_rate,
                    'price': price,
                })
        
        if futures_data:
            print(f"  Extracted {len(futures_data)} contracts using regex")
            return futures_data
    
    print(f"Found {len(tables)} table(s) in HTML")
    
    for table_idx, table in enumerate(tables):
        rows = table.find_all('tr')
        print(f"Processing table {table_idx + 1} with {len(rows)} rows...")
        
        if len(rows) == 0:
            # Try to find rows in tbody
            tbody = table.find('tbody')
            if tbody:
                rows = tbody.find_all('tr')
                print(f"  Found {len(rows)} rows in tbody")
        
        # Skip first row if it's a header
        start_idx = 0
        if rows:
            first_row_cells = rows[0].find_all(['td', 'th'])
            first_cell_text = first_row_cells[0].get_text(strip=True).lower() if first_row_cells else ''
            if 'contract' in first_cell_text or 'nrml' in first_cell_text or len(first_row_cells) < 2:
                start_idx = 1
                print(f"  Skipping header row, starting from row {start_idx + 1}")
        
        for row_idx, row in enumerate(rows[start_idx:], start=start_idx):
            cells = row.find_all(['td', 'th'])
            
            # Skip rows with insufficient cells
            if len(cells) < 4:
                continue
                
            # Get contract text from first cell
            contract_cell = cells[0]
            contract_text = contract_cell.get_text(separator=' ', strip=True)
            
            # Debug: Show first few rows
            if row_idx < 5:
                print(f"  Row {row_idx + 1} contract text: {contract_text[:150]}")
            
            # Look for pattern: SYMBOL DD-MMM-YYYY (with or without **)
            # Try with ** first
            symbol_match = re.search(r'\*\*([A-Z0-9&]+(?:\s[A-Z0-9&]+)*)\*\*', contract_text)
            if not symbol_match:
                # Try without ** - match symbol at start (uppercase letters/numbers)
                symbol_match = re.search(r'^([A-Z0-9&]+(?:\s[A-Z0-9&]+)*)', contract_text)
            
            # Date format: 30-DEC-2025 (1-2 digits, 3 letters, 4 digits)
            expiry_match = re.search(r'(\d{1,2}-[A-Z]{3}-\d{4})', contract_text, re.IGNORECASE)
            
            if symbol_match and expiry_match:
                symbol = symbol_match.group(1).strip()
                expiry = expiry_match.group(1).upper()  # Normalize to uppercase
                
                # Extract lot size and MWPL from contract text
                lot_size = None
                mwpl = None
                lot_match = re.search(r'Lot\s+size\s+(\d+)', contract_text, re.IGNORECASE)
                mwpl_match = re.search(r'MWPL\s+([\d.]+)%', contract_text, re.IGNORECASE)
                
                if lot_match:
                    lot_size = int(lot_match.group(1))
                if mwpl_match:
                    mwpl = float(mwpl_match.group(1))
                
                # Get values from table cells
                # Column order: Contract | NRML Margin | NRML Margin Rate | Price
                nrml_margin_text = cells[1].get_text(strip=True) if len(cells) > 1 else ''
                nrml_margin_rate_text = cells[2].get_text(strip=True) if len(cells) > 2 else ''
                price_text = cells[3].get_text(strip=True) if len(cells) > 3 else ''
                
                # Clean and parse values (remove commas, currency symbols, etc.)
                nrml_margin = None
                nrml_margin_rate = None
                price = None
                
                try:
                    nrml_margin = float(re.sub(r'[₹,\s]', '', nrml_margin_text))
                except:
                    pass
                
                try:
                    nrml_margin_rate = float(re.sub(r'[%,\s]', '', nrml_margin_rate_text))
                except:
                    pass
                
                try:
                    price = float(re.sub(r'[₹,\s]', '', price_text))
                except:
                    pass
                
                # Only add if we have valid data
                if symbol and expiry and nrml_margin:
                    futures_data.append({
                        'symbol': symbol,
                        'expiry': expiry,
                        'lot_size': lot_size,
                        'mwpl': mwpl,
                        'nrml_margin': nrml_margin,
                        'nrml_margin_rate': nrml_margin_rate if nrml_margin_rate else None,
                        'price': price if price else None,
                    })
            elif row_idx < 10:  # Debug first 10 rows that don't match
                print(f"  ⚠ Row {row_idx + 1} didn't match pattern. Text: {contract_text[:80]}")
    
    print(f"Parsed {len(futures_data)} contracts from HTML")
    return futures_data

def main():
    print("Fetching futures data from Zerodha...")
    
    # Check if cached file exists and is valid
    if os.path.exists(TEMP_HTML_FILE):
        file_size = os.path.getsize(TEMP_HTML_FILE)
        if file_size < 10000:  # Too small, likely invalid
            print(f"⚠ Removing invalid cached file ({file_size} bytes)...")
            os.remove(TEMP_HTML_FILE)
    
    # Always fetch fresh data (don't use cache)
    print("Fetching fresh data from Zerodha...")
    html = fetch_with_retry(URL, MAX_RETRIES, RETRY_DELAY)
    
    if not html:
        # Try to use cached file as fallback only if fetch completely fails
        if os.path.exists(TEMP_HTML_FILE):
            file_size = os.path.getsize(TEMP_HTML_FILE)
            if file_size > 10000:  # Only use if substantial
                print("⚠ Fetch failed. Using cached HTML file as fallback...")
                with open(TEMP_HTML_FILE, 'r', encoding='utf-8') as f:
                    html = f.read()
                # Check if cached HTML is valid
                if len(html) < 1000 or 'margin-calculator' not in html.lower():
                    print("ERROR: Cached HTML file is invalid or too small")
                    sys.exit(1)
            else:
                print(f"ERROR: Cached file too small ({file_size} bytes)")
                sys.exit(1)
        else:
            print("ERROR: Failed to fetch data after multiple attempts.")
            print("Zerodha may be rate-limiting requests.")
            print("Please try again later or check if they have an API endpoint.")
            sys.exit(1)
    
    # Parse data
    print("Parsing data from HTML...")
    futures_data = parse_futures_data(html)
    
    if not futures_data:
        print("WARNING: No data extracted. Page structure may have changed.")
        print("You may need to manually update data/futures_margins.json")
        sys.exit(1)
    
    # Format and save
    output_data = {
        'last_updated': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'source': 'Zerodha',
        'source_url': URL,
        'html_cached': TEMP_HTML_FILE if os.path.exists(TEMP_HTML_FILE) else None,
        'total_contracts': len(futures_data),
        'data': futures_data
    }
    
    # Ensure data directory exists
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    
    # Save to JSON
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)
    
    print(f"\n✓ Success: {len(futures_data)} contracts saved to {OUTPUT_FILE}")
    if os.path.exists(TEMP_HTML_FILE):
        print(f"✓ HTML cached at: {TEMP_HTML_FILE}")
    sys.exit(0)

if __name__ == '__main__':
    main()

