# Market Status - PHP Version

This is the PHP conversion of the Market Status React application.

## Project Structure

```
MS/
├── index.php              # Main entry point and router
├── config.php             # Configuration file
├── functions.php          # Helper functions
├── setup.php              # Setup script to copy assets
├── .htaccess              # Apache URL rewriting rules
├── includes/              # Shared components
│   ├── header.php
│   ├── footer.php
│   └── navbar.php
├── pages/                 # Page templates
│   ├── dashboard.php
│   ├── market/
│   ├── calculators/
│   ├── mutualfunds/
│   ├── financecompanies/
│   ├── insurance/
│   ├── loans/
│   └── news/
├── components/            # Reusable components
├── assets/                # CSS, JS, images
│   ├── css/
│   ├── js/
│   └── images/
└── data/                  # JSON data files
```

## Setup Instructions

1. **Run the setup script** to copy assets and data files:
   ```bash
   php setup.php
   ```

2. **Configure your web server**:
   - Point your document root to the `MS` directory
   - Ensure mod_rewrite is enabled (for Apache)
   - For Nginx, configure URL rewriting accordingly

3. **Update configuration**:
   - Edit `config.php` and update `BASE_URL` if needed
   - Adjust paths if your installation is in a subdirectory

4. **File Permissions**:
   - Ensure PHP has read access to all files
   - Data directory should be readable

## URL Structure

The application uses clean URLs:
- `/` - Dashboard
- `/indices` - Stock Indices
- `/sip-calculator` - SIP Calculator
- `/mutual-funds/amc` - AMC Funds
- etc.

All routes are handled by `index.php` through URL rewriting.

## Converting Components

To convert a React component to PHP:

1. Create a PHP file in the appropriate `pages/` subdirectory
2. Set `$pageTitle` and `$pageDescription` variables
3. Include header: `includeHeader($pageTitle, $pageDescription);`
4. Add your page content
5. Include footer: `includeFooter();`
6. Add the route to `index.php`

## Helper Functions

- `loadJsonData($filename)` - Load JSON data from data directory
- `e($string)` - Escape HTML output
- `asset($path)` - Generate asset URL
- `url($path)` - Generate page URL
- `formatNumber($number, $decimals)` - Format numbers
- `formatCurrency($amount, $symbol)` - Format currency
- `formatPercentage($value, $decimals)` - Format percentages

## Notes

- All React state management is replaced with PHP variables
- API calls can be made using `file_get_contents()` or cURL
- JavaScript for interactivity should be added in script tags
- CSS files are copied from the React project and can be used as-is

## Development

1. Start a local PHP server:
   ```bash
   php -S localhost:8000 -t MS
   ```

2. Access the application at `http://localhost:8000`

## Production Deployment

1. Ensure all files are uploaded
2. Set `DEBUG_MODE` to `false` in `config.php`
3. Configure proper error handling
4. Set up SSL certificate if needed
5. Configure caching headers in `.htaccess`

## Differences from React Version

- No client-side routing (all server-side)
- No React state management
- Components are PHP includes instead of React components
- Data fetching is server-side
- JavaScript is used only for interactivity, not for rendering

