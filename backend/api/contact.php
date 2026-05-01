<?php
require_once '_bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') respond(['error' => 'Method not allowed'], 405);

$b = body();
if (empty($b['name']) || empty($b['email']) || empty($b['message'])) {
    respond(['error' => 'name, email and message are required'], 422);
}

$stmt = db()->prepare('INSERT INTO contact_messages (name, email, message) VALUES (?,?,?)');
$stmt->execute([$b['name'], $b['email'], $b['message']]);
respond(['ok' => true], 201);
