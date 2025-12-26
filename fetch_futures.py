#!/usr/bin/env python3
"""
Simple Python script to fetch Zerodha futures data
Uses requests and BeautifulSoup - no browser needed

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

# Configuration
URL = 'https://zerodha.com/margin-calculator/Futures/'
OUTPUT_FILE = 'data/futures_margins.json'
MAX_RETRIES = 3
RETRY_DELAY = 5

def fetch_with_retry(url, max_retries=3, initial_delay=5):
    """Fetch URL with retry logic for rate limiting"""
    delay = initial_delay
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
    }
    
    for attempt in range(1, max_retries + 1):
        if attempt > 1:
            print(f"Rate limited (HTTP 429). Waiting {delay} seconds before retry {attempt}/{max_retries}...")
            time.sleep(delay)
            delay *= 2  # Exponential backoff
        
        try:
            # Add delay before request
            if attempt == 1:
                time.sleep(2)  # Be respectful
            
            response = requests.get(url, headers=headers, timeout=60)
            
            if response.status_code == 200:
                return response.text
            elif response.status_code == 429:
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
    
    for table in tables:
        rows = table.find_all('tr')
        
        for row in rows:
            cells = row.find_all(['td', 'th'])
            
            if len(cells) >= 4:
                contract_text = cells[0].get_text(strip=True)
                
                # Extract symbol and expiry
                symbol_match = re.search(r'\*\*([^*]+)\*\*', contract_text)
                expiry_match = re.search(r'(\d{2}-\w{3}-\d{4})', contract_text)
                
                if symbol_match and expiry_match:
                    symbol = symbol_match.group(1).strip()
                    expiry = expiry_match.group(1)
                    
                    # Extract lot size and MWPL
                    lot_size = None
                    mwpl = None
                    lot_match = re.search(r'Lot size\s+(\d+)', contract_text)
                    mwpl_match = re.search(r'MWPL\s+([\d.]+)%', contract_text)
                    
                    if lot_match:
                        lot_size = int(lot_match.group(1))
                    if mwpl_match:
                        mwpl = float(mwpl_match.group(1))
                    
                    # Get other values
                    nrml_margin_text = cells[1].get_text(strip=True) if len(cells) > 1 else ''
                    nrml_margin_rate_text = cells[2].get_text(strip=True) if len(cells) > 2 else ''
                    price_text = cells[3].get_text(strip=True) if len(cells) > 3 else ''
                    
                    # Clean and parse values
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
                    
                    futures_data.append({
                        'symbol': symbol,
                        'expiry': expiry,
                        'lot_size': lot_size,
                        'mwpl': mwpl,
                        'nrml_margin': nrml_margin if nrml_margin and nrml_margin > 0 else None,
                        'nrml_margin_rate': nrml_margin_rate if nrml_margin_rate and nrml_margin_rate > 0 else None,
                        'price': price if price and price > 0 else None,
                    })
    
    return futures_data

def main():
    print("Fetching futures data from Zerodha...")
    
    # Fetch HTML
    html = fetch_with_retry(URL, MAX_RETRIES, RETRY_DELAY)
    
    if not html:
        print("ERROR: Failed to fetch data after multiple attempts.")
        print("Zerodha may be rate-limiting requests.")
        print("Please try again later or check if they have an API endpoint.")
        sys.exit(1)
    
    # Parse data
    print("Parsing data...")
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
        'total_contracts': len(futures_data),
        'data': futures_data
    }
    
    # Ensure data directory exists
    os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
    
    # Save to JSON
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(output_data, f, indent=2, ensure_ascii=False)
    
    print(f"Success: {len(futures_data)} contracts saved to {OUTPUT_FILE}")
    sys.exit(0)

if __name__ == '__main__':
    main()

