<?php
require_once '_bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(['error' => 'Method not allowed'], 405);

$b = body();
if (empty($b['email'])) respond(['error' => 'email is required'], 422);

try {
    $stmt = db()->prepare('INSERT INTO newsletter_subscriptions (email) VALUES (?)');
    $stmt->execute([$b['email']]);
    respond(['ok' => true], 201);
} catch (PDOException) {
    respond(['error' => 'already subscribed'], 409);
}
