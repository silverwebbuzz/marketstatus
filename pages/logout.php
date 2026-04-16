<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../auth.php';
authLogout();
header('Location: ' . BASE_URL . '/pages/login.php');
exit;
