# Quick Start Guide

## Step 1: Run Setup Script

Copy all assets and data files from the React project:

```bash
cd MS
php setup.php
```

This will:
- Create necessary directories
- Copy CSS files
- Copy images
- Copy JSON data files
- Copy asset images

## Step 2: Configure Web Server

### Option A: PHP Built-in Server (Development)

```bash
php -S localhost:8000 -t MS
```

Access at: `http://localhost:8000`

### Option B: Apache

1. Point document root to `MS` directory
2. Ensure mod_rewrite is enabled
3. `.htaccess` file is already configured

### Option C: Nginx

Configure URL rewriting:
```nginx
location / {
    try_files $uri $uri/ /index.php?$query_string;
}
```

## Step 3: Update Configuration

Edit `config.php`:

```php
// If installed in subdirectory, update BASE_URL
define('BASE_URL', '/MS');  // or '/your-subdirectory'

// For production, disable debug mode
define('DEBUG_MODE', false);
```

## Step 4: Test Installation

1. Visit homepage: `http://localhost:8000/`
2. Test dashboard
3. Test SIP calculator: `http://localhost:8000/sip-calculator`
4. Check that CSS and images load correctly

## Step 5: Continue Conversion

Follow the patterns in existing files to convert remaining React components:

1. Look at `pages/dashboard.php` for page structure
2. Look at `pages/calculators/sip.php` for calculator pattern
3. Look at `pages/mutualfunds/equity.php` for data listing pattern
4. Refer to `CONVERSION_GUIDE.md` for detailed instructions

## Troubleshooting

### Routes not working?
- Check `.htaccess` file exists
- Ensure mod_rewrite is enabled
- Check BASE_URL in config.php

### CSS/Images not loading?
- Run `setup.php` again
- Check file permissions
- Verify asset paths in `functions.php`

### JSON data not loading?
- Verify data files exist in `data/` directory
- Check file permissions
- Use `loadJsonData()` function correctly

### 500 Internal Server Error?
- Check PHP error logs
- Enable DEBUG_MODE in config.php
- Verify all required files exist

## File Structure Quick Reference

```
MS/
├── index.php              # Main router - add routes here
├── config.php             # Configuration
├── functions.php          # Helper functions
├── includes/              # Header, Footer, Navbar
├── pages/                 # Page templates
├── components/            # Reusable components
├── assets/                # CSS, JS, Images
└── data/                  # JSON data files
```

## Common Tasks

### Adding a New Route

Edit `index.php`:
```php
case '/new-route':
    include __DIR__ . '/pages/newpage.php';
    break;
```

### Creating a New Page

1. Create file in `pages/` directory
2. Set `$pageTitle` and `$pageDescription`
3. Call `includeHeader()`
4. Add page content
5. Call `includeFooter()`
6. Add route to `index.php`

### Loading JSON Data

```php
$data = loadJsonData('filename.json');
```

### Generating URLs

```php
<a href="<?php echo url('/path'); ?>">Link</a>
```

### Including Assets

```php
<link rel="stylesheet" href="<?php echo asset('css/style.css'); ?>">
<img src="<?php echo asset('images/logo.png'); ?>">
```

## Next Steps

1. ✅ Run setup script
2. ✅ Test basic pages
3. ⏳ Convert remaining components
4. ⏳ Add JavaScript libraries
5. ⏳ Test all functionality
6. ⏳ Deploy to production

For detailed conversion instructions, see `CONVERSION_GUIDE.md`.

