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
    
    # More realistic browser headers
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Cache-Control': 'max-age=0',
        'DNT': '1',
        'Referer': 'https://zerodha.com/',
    }
    
    # Create session with retry strategy
    session = requests.Session()
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
        
        try:
            # Add delay before request to be respectful
            if attempt == 1:
                time.sleep(3)  # Longer initial delay
            
            print(f"Fetching page (attempt {attempt}/{max_retries})...")
            response = session.get(url, headers=headers, timeout=60, allow_redirects=True)
            
            if response.status_code == 200:
                # Save HTML to temp file
                os.makedirs(os.path.dirname(TEMP_HTML_FILE), exist_ok=True)
                with open(TEMP_HTML_FILE, 'w', encoding='utf-8') as f:
                    f.write(response.text)
                print(f"✓ HTML saved to {TEMP_HTML_FILE}")
                return response.text
            elif response.status_code == 429:
                print(f"HTTP 429 (Rate Limited) on attempt {attempt}")
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
    
    # Parse HTML table using BeautifulSoup
    soup = BeautifulSoup(html, 'html.parser')
    tables = soup.find_all('table')
    
    print(f"Found {len(tables)} table(s) in HTML")
    
    for table in tables:
        rows = table.find_all('tr')
        print(f"Processing table with {len(rows)} rows...")
        
        for row in rows:
            cells = row.find_all(['td', 'th'])
            
            # Skip header rows
            if len(cells) < 4:
                continue
                
            # Check if first cell contains contract info (has ** symbol **)
            contract_cell = cells[0]
            contract_text = contract_cell.get_text(strip=True)
            
            # Look for pattern: **SYMBOL** DD-MMM-YYYY Lot size XXX MWPL XX.XX%
            symbol_match = re.search(r'\*\*([^*]+)\*\*', contract_text)
            expiry_match = re.search(r'(\d{2}-\w{3}-\d{4})', contract_text)
            
            if symbol_match and expiry_match:
                symbol = symbol_match.group(1).strip()
                expiry = expiry_match.group(1)
                
                # Extract lot size and MWPL from contract text
                lot_size = None
                mwpl = None
                lot_match = re.search(r'Lot size\s+(\d+)', contract_text)
                mwpl_match = re.search(r'MWPL\s+([\d.]+)%', contract_text)
                
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
    
    print(f"Parsed {len(futures_data)} contracts from HTML")
    return futures_data

def main():
    print("Fetching futures data from Zerodha...")
    
    # Try to load from temp file first (if exists and recent)
    html = None
    if os.path.exists(TEMP_HTML_FILE):
        file_age = time.time() - os.path.getmtime(TEMP_HTML_FILE)
        if file_age < 3600:  # Less than 1 hour old
            print(f"Loading from cached HTML file ({TEMP_HTML_FILE})...")
            with open(TEMP_HTML_FILE, 'r', encoding='utf-8') as f:
                html = f.read()
        else:
            print(f"Temp file is old ({int(file_age/60)} minutes), fetching fresh data...")
    
    # Fetch HTML if not loaded from cache
    if not html:
        html = fetch_with_retry(URL, MAX_RETRIES, RETRY_DELAY)
        
        if not html:
            # Try to use cached file as fallback
            if os.path.exists(TEMP_HTML_FILE):
                print("⚠ Using cached HTML file as fallback...")
                with open(TEMP_HTML_FILE, 'r', encoding='utf-8') as f:
                    html = f.read()
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

