<?php
/**
 * Auth helper — session management, login check, current user
 */

require_once __DIR__ . '/db.php';

function authStart() {
    if (session_status() === PHP_SESSION_NONE) {
        session_name('ms_sess');
        session_start();
    }
}

function authUser(): ?array {
    authStart();
    return $_SESSION['user'] ?? null;
}

function authRequire(): array {
    $user = authUser();
    if (!$user) {
        header('Location: ' . BASE_URL . '/pages/login.php');
        exit;
    }
    return $user;
}

function authLogin(string $email, string $password): bool {
    $db   = getDB();
    $stmt = $db->prepare("SELECT id, name, email, password FROM users WHERE email = ? LIMIT 1");
    $stmt->execute([strtolower(trim($email))]);
    $row  = $stmt->fetch();
    if (!$row || !password_verify($password, $row['password'])) return false;
    authStart();
    $_SESSION['user'] = ['id' => $row['id'], 'name' => $row['name'], 'email' => $row['email']];
    return true;
}

function authLogout(): void {
    authStart();
    $_SESSION = [];
    session_destroy();
}

function authRegister(string $name, string $email, string $password): true|string {
    $db   = getDB();
    $email = strtolower(trim($email));
    // Check duplicate
    $stmt = $db->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) return 'Email already registered.';
    $db->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)")
       ->execute([trim($name), $email, password_hash($password, PASSWORD_BCRYPT)]);
    return true;
}
