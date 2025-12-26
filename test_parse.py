#!/usr/bin/env python3
"""
Quick test to see what's in the HTML
"""

import re
from bs4 import BeautifulSoup

html_file = 'data/zerodha_temp.html'

with open(html_file, 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')
tables = soup.find_all('table')

print(f"Found {len(tables)} tables\n")

for table_idx, table in enumerate(tables):
    rows = table.find_all('tr')
    print(f"Table {table_idx + 1}: {len(rows)} rows")
    
    # Show first 3 data rows
    for i, row in enumerate(rows[:5]):
        cells = row.find_all(['td', 'th'])
        if len(cells) >= 4:
            contract = cells[0].get_text(separator=' ', strip=True)
            print(f"  Row {i+1}: {contract[:150]}")
            print(f"    Cells: {len(cells)}")
            if len(cells) > 1:
                print(f"    Cell 1: {cells[1].get_text(strip=True)[:50]}")
            print()

