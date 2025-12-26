<?php
/**
 * Configuration File
 */

// Base URL
define('BASE_URL', '/ms');

// Paths
define('ROOT_PATH', __DIR__);
define('DATA_PATH', __DIR__ . '/data');
define('ASSETS_PATH', __DIR__ . '/assets');
define('INCLUDES_PATH', __DIR__ . '/includes');
define('PAGES_PATH', __DIR__ . '/pages');

// Google Analytics ID
define('GA_ID', 'G-4XC6ZTHXRW');

// API URLs
define('API_BASE_URL', 'https://devapi.marketstatus.in/sm/');

// Site Information
define('SITE_NAME', 'Market Status');
define('SITE_DESCRIPTION', 'Get real-time updates on the Indian stock market with Market Status. Track stock prices, indices, and trends instantly.');

// Error Reporting (set to false in production)
define('DEBUG_MODE', false);

if (DEBUG_MODE) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}
?>

