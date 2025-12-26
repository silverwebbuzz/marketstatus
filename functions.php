<?php
/**
 * Helper Functions
 */

/**
 * Get current route
 */
function getCurrentRoute() {
    $request_uri = $_SERVER['REQUEST_URI'];
    $script_name = $_SERVER['SCRIPT_NAME'];
    
    // Remove query string
    $request_uri = strtok($request_uri, '?');
    
    // Remove base path if exists
    $base_path = dirname($script_name);
    if ($base_path !== '/' && $base_path !== '\\') {
        $request_uri = str_replace($base_path, '', $request_uri);
    }
    
    // Ensure route starts with /
    if (substr($request_uri, 0, 1) !== '/') {
        $request_uri = '/' . $request_uri;
    }
    
    return $request_uri;
}

/**
 * Get route parameter by index
 */
function getRouteParam($index) {
    $route = getCurrentRoute();
    $parts = explode('/', trim($route, '/'));
    return isset($parts[$index]) ? $parts[$index] : null;
}

/**
 * Load JSON data file
 */
function loadJsonData($filename) {
    $filepath = DATA_PATH . '/' . $filename;
    if (file_exists($filepath)) {
        $content = file_get_contents($filepath);
        return json_decode($content, true);
    }
    return null;
}

/**
 * Escape HTML output
 */
function e($string) {
    return htmlspecialchars($string, ENT_QUOTES, 'UTF-8');
}

/**
 * Generate asset URL
 */
function asset($path) {
    return BASE_URL . '/assets/' . ltrim($path, '/');
}

/**
 * Generate page URL
 */
function url($path) {
    return BASE_URL . '/' . ltrim($path, '/');
}

/**
 * Include header
 */
function includeHeader($title = '', $description = '') {
    include INCLUDES_PATH . '/header.php';
}

/**
 * Include footer
 */
function includeFooter() {
    include INCLUDES_PATH . '/footer.php';
}

/**
 * Include navbar
 */
function includeNavbar() {
    include INCLUDES_PATH . '/navbar.php';
}

/**
 * Format number with commas
 */
function formatNumber($number, $decimals = 2) {
    return number_format($number, $decimals);
}

/**
 * Format currency
 */
function formatCurrency($amount, $symbol = '₹') {
    return $symbol . ' ' . formatNumber($amount);
}

/**
 * Format percentage
 */
function formatPercentage($value, $decimals = 2) {
    return formatNumber($value, $decimals) . '%';
}

/**
 * Get page title
 */
function getPageTitle($default = '') {
    global $pageTitle;
    return !empty($pageTitle) ? $pageTitle : ($default ?: SITE_NAME);
}

/**
 * Get page description
 */
function getPageDescription($default = '') {
    global $pageDescription;
    return !empty($pageDescription) ? $pageDescription : ($default ?: SITE_DESCRIPTION);
}

/**
 * Scroll to top function (for JavaScript)
 */
function scrollToTop() {
    return "window.scrollTo({top: 0, behavior: 'smooth'});";
}
?>

