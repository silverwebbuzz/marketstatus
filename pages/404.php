<?php
http_response_code(404);
$pageTitle = '404 - Page Not Found | Market Status';
$pageDescription = 'The page you are looking for could not be found.';

includeHeader($pageTitle, $pageDescription);
?>

<div class="container" style="text-align: center; padding: 100px 20px;">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>The page you are looking for could not be found.</p>
    <a href="<?php echo url('/'); ?>" class="btn-primary">Go to Homepage</a>
</div>

<?php includeFooter(); ?>

