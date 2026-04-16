<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'silverwebbuzz_in_ms');
define('DB_USER', 'silverwebbuzz_in_ms');
define('DB_PASS', 'SilverMS@1109');
define('DB_CHARSET', 'utf8mb4');

define('SITE_NAME', 'MarketStatus FNO');
define('BASE_URL', '/ms');
define('DEBUG_MODE', true); // set false in production

if (DEBUG_MODE) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}
