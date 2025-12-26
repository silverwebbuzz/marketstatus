# Conversion Guide - React to PHP

This guide explains how to convert React components to PHP pages.

## Structure Overview

### React Component Structure
```jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Component.css';

const Component = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);
  
  return (
    <div>
      <h1>Title</h1>
      {data && data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};

export default Component;
```

### PHP Page Structure
```php
<?php
$pageTitle = 'Page Title | Market Status';
$pageDescription = 'Page description';

// Load data
$data = loadJsonData('data.json');

includeHeader($pageTitle, $pageDescription);
?>

<div>
    <h1>Title</h1>
    <?php if ($data && is_array($data)): ?>
        <?php foreach ($data as $item): ?>
            <div><?php echo e($item['name'] ?? 'N/A'); ?></div>
        <?php endforeach; ?>
    <?php endif; ?>
</div>

<?php includeFooter(); ?>
```

## Key Conversions

### 1. Imports → Includes
- React: `import Component from './Component'`
- PHP: `include __DIR__ . '/components/component.php';`

### 2. State Management
- React: `useState()`, `useEffect()`
- PHP: Regular variables, load data at top of file

### 3. Data Fetching
- React: `fetch()`, `axios.get()`
- PHP: `loadJsonData()`, `file_get_contents()`, `curl`

### 4. Conditional Rendering
- React: `{condition && <div>Content</div>}`
- PHP: `<?php if ($condition): ?><div>Content</div><?php endif; ?>`

### 5. Loops
- React: `{array.map(item => <div key={item.id}>{item.name}</div>)}`
- PHP: `<?php foreach ($array as $item): ?><div><?php echo e($item['name']); ?></div><?php endforeach; ?>`

### 6. Links
- React: `<Link to="/path">Link</Link>`
- PHP: `<a href="<?php echo url('/path'); ?>">Link</a>`

### 7. Event Handlers
- React: `onClick={() => doSomething()}`
- PHP: `onclick="doSomething()"` (JavaScript)

### 8. CSS Classes
- React: `className="class-name"`
- PHP: `class="class-name"`

## Component Conversion Checklist

For each React component:

1. ✅ Create PHP file in appropriate `pages/` subdirectory
2. ✅ Set `$pageTitle` and `$pageDescription`
3. ✅ Convert `useState` to PHP variables
4. ✅ Convert `useEffect` to data loading at top
5. ✅ Convert JSX to PHP/HTML
6. ✅ Convert React Router `Link` to PHP `url()` function
7. ✅ Convert event handlers to JavaScript
8. ✅ Add route to `index.php`
9. ✅ Test the page

## Example: Calculator Component

### React Version
```jsx
const SIPCalculator = () => {
  const [result, setResult] = useState(null);
  
  const calculate = (values) => {
    // calculation logic
    setResult(calculatedValue);
  };
  
  return (
    <form onSubmit={calculate}>
      <input type="number" />
      <button>Calculate</button>
      {result && <div>{result}</div>}
    </form>
  );
};
```

### PHP Version
```php
<?php
$pageTitle = 'SIP Calculator';
includeHeader($pageTitle);
?>

<form id="sip-form" onsubmit="calculateSIP(event)">
    <input type="number" id="amount" />
    <button type="submit">Calculate</button>
    <div id="result" style="display: none;"></div>
</form>

<script>
function calculateSIP(e) {
    e.preventDefault();
    // calculation logic
    document.getElementById('result').style.display = 'block';
    document.getElementById('result').textContent = calculatedValue;
}
</script>

<?php includeFooter(); ?>
```

## Data Loading Patterns

### Loading JSON Data
```php
// Single file
$data = loadJsonData('filename.json');

// Nested data
$data = loadJsonData('folder/subfolder/file.json');

// With error handling
$data = loadJsonData('filename.json');
if (!$data) {
    $data = [];
}
```

### API Calls
```php
// Using cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, 'https://api.example.com/data');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);
$data = json_decode($response, true);
```

## Remaining Components to Convert

### Market Components
- [ ] IndicesTable
- [ ] FnO
- [ ] IPO
- [ ] StockData
- [ ] Crypto_currency
- [ ] Forex
- [ ] WorldIndices

### Calculators (Partially Done)
- [x] SIP Calculator
- [ ] EMI Calculator
- [ ] FD Calculator
- [ ] Lumpsum Calculator
- [ ] Yearly SIP Calculator
- [ ] CAGR Calculator
- [ ] RD Calculator
- [ ] PPF Calculator
- [ ] CI Calculator
- [ ] SI Calculator
- [ ] ROI Calculator
- [ ] NPS Calculator

### Finance Companies
- [ ] Analysis_companies
- [ ] Broker_Companies
- [ ] Crypto_currency_companies
- [ ] Fintech_company
- [ ] Banks
- [ ] Investment_management_companies
- [ ] Funding_Companies
- [ ] CA_companies
- [ ] CS_companies
- [ ] International_money_transfer_companies
- [ ] Micro_Finance_companies
- [ ] Payment_gateways
- [ ] Insurance_companies

### Insurance
- [ ] General_Insurance
- [ ] Life_Insurance
- [ ] Health_Insurance
- [ ] Car_Insurance
- [ ] Bike_Insurance
- [ ] Term_Insurance
- [ ] Travel_Insurance
- [ ] Business_Insurance
- [ ] Pet_Insurance
- [ ] Fire_Insurance

### Loans
- [ ] Personal_loan
- [ ] Home_loan
- [ ] Gold_loan
- [ ] Auto_loan
- [ ] Business_loan
- [ ] Mortgage_loan
- [ ] Student_loan

### News & Blog
- [ ] Business_news
- [ ] Economy_news
- [ ] Political_news
- [ ] World_news
- [ ] Blog

## Tips

1. **Start with simple components** - Convert static components first
2. **Test frequently** - Check each converted page in browser
3. **Preserve functionality** - Ensure all features work in PHP version
4. **Keep JavaScript** - Use JavaScript for interactivity (forms, charts, etc.)
5. **Use helper functions** - Leverage functions in `functions.php`
6. **Follow naming conventions** - Use lowercase with underscores for PHP files

## Common Issues

### Issue: Routes not working
**Solution**: Check `.htaccess` file and ensure mod_rewrite is enabled

### Issue: JSON data not loading
**Solution**: Verify file path in `loadJsonData()` and check file permissions

### Issue: CSS not loading
**Solution**: Check `asset()` function paths and ensure CSS files are copied

### Issue: JavaScript errors
**Solution**: Ensure all required libraries (ApexCharts, etc.) are included in header

