<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../auth.php';

authStart();
if (authUser()) { header('Location: ' . BASE_URL . '/pages/fno.php'); exit; }

$error   = '';
$success = '';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name  = trim($_POST['name']     ?? '');
    $email = trim($_POST['email']    ?? '');
    $pass  = trim($_POST['password'] ?? '');
    $conf  = trim($_POST['confirm']  ?? '');

    if (!$name || !$email || !$pass) {
        $error = 'All fields are required.';
    } elseif (strlen($pass) < 6) {
        $error = 'Password must be at least 6 characters.';
    } elseif ($pass !== $conf) {
        $error = 'Passwords do not match.';
    } else {
        $result = authRegister($name, $email, $pass);
        if ($result === true) {
            authLogin($email, $pass);
            header('Location: ' . BASE_URL . '/pages/fno.php'); exit;
        }
        $error = $result;
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register — MarketStatus</title>
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
        <h1>Create Account</h1>
        <p>Join MarketStatus to track your portfolio & get AI reports</p>
        <?php if ($error): ?>
            <div class="auth-error"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>
        <form method="POST">
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" name="name" required placeholder="John Doe" value="<?= htmlspecialchars($_POST['name'] ?? '') ?>">
            </div>
            <div class="form-group">
                <label>Email</label>
                <input type="email" name="email" required placeholder="you@example.com" value="<?= htmlspecialchars($_POST['email'] ?? '') ?>">
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" name="password" required placeholder="Min. 6 characters">
            </div>
            <div class="form-group">
                <label>Confirm Password</label>
                <input type="password" name="confirm" required placeholder="Repeat password">
            </div>
            <button type="submit" class="btn-auth">Create Account</button>
        </form>
        <div class="auth-link">Already have an account? <a href="/ms/pages/login.php">Sign In</a></div>
    </div>
</div>
</body>
</html>
