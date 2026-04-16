<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../auth.php';

authStart();
if (authUser()) { header('Location: ' . BASE_URL . '/pages/fno.php'); exit; }

$error = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (authLogin($_POST['email'] ?? '', $_POST['password'] ?? '')) {
        header('Location: ' . BASE_URL . '/pages/fno.php'); exit;
    }
    $error = 'Invalid email or password.';
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login — MarketStatus</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/ms/assets/css/style.css">
    <style>
        .auth-wrap { min-height:100vh; display:flex; align-items:center; justify-content:center; }
        .auth-box { background:var(--bg2); border:1px solid var(--border); border-radius:12px; padding:36px; width:100%; max-width:400px; }
        .auth-box h1 { font-size:22px; font-weight:700; color:var(--accent); margin-bottom:6px; }
        .auth-box p  { font-size:13px; color:var(--text3); margin-bottom:28px; }
        .form-group { margin-bottom:16px; }
        .form-group label { display:block; font-size:12px; color:var(--text3); margin-bottom:6px; font-weight:500; }
        .form-group input {
            width:100%; background:var(--bg3); border:1px solid var(--border);
            border-radius:var(--radius); padding:10px 12px; color:var(--text);
            font-size:13px; outline:none; transition:border-color .2s;
        }
        .form-group input:focus { border-color:var(--accent); }
        .btn-auth { width:100%; background:var(--accent); color:#fff; border:none; border-radius:var(--radius); padding:11px; font-size:14px; font-weight:600; cursor:pointer; margin-top:8px; transition:opacity .2s; }
        .btn-auth:hover { opacity:.85; }
        .auth-error { background:rgba(239,68,68,.1); border:1px solid var(--red); color:var(--red); border-radius:var(--radius); padding:10px 12px; font-size:13px; margin-bottom:16px; }
        .auth-link { text-align:center; margin-top:20px; font-size:13px; color:var(--text3); }
        .auth-link a { color:var(--accent); text-decoration:none; font-weight:500; }
    </style>
</head>
<body>
<div class="auth-wrap">
    <div class="auth-box">
        <h1>MarketStatus</h1>
        <p>Sign in to access your portfolio & AI reports</p>
        <?php if ($error): ?>
            <div class="auth-error"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>
        <form method="POST">
            <div class="form-group">
                <label>Email</label>
                <input type="email" name="email" required placeholder="you@example.com" value="<?= htmlspecialchars($_POST['email'] ?? '') ?>">
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" name="password" required placeholder="••••••••">
            </div>
            <button type="submit" class="btn-auth">Sign In</button>
        </form>
        <div class="auth-link">Don't have an account? <a href="/ms/pages/register.php">Register</a></div>
    </div>
</div>
</body>
</html>
