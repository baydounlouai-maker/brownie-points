<?php
require_once '_bootstrap.php';

$db = db();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql    = 'SELECT p.*, c.name AS category FROM products p LEFT JOIN categories c ON p.category_id = c.id';
    $params = [];

    if (!empty($_GET['category_id'])) {
        $sql     .= ' WHERE p.category_id = ?';
        $params[] = (int) $_GET['category_id'];
    }

    $sql .= ' ORDER BY p.created_at DESC';
    $stmt = $db->prepare($sql);
    $stmt->execute($params);
    respond($stmt->fetchAll());
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $b = body();
    if (empty($b['name']) || !isset($b['price'])) respond(['error' => 'name and price are required'], 422);

    $stmt = $db->prepare('INSERT INTO products (category_id, name, description, price, image_url, badge) VALUES (?,?,?,?,?,?)');
    $stmt->execute([$b['category_id'] ?? null, $b['name'], $b['description'] ?? null, $b['price'], $b['image_url'] ?? null, $b['badge'] ?? null]);
    respond(['id' => (int) $db->lastInsertId()], 201);
}

respond(['error' => 'Method not allowed'], 405);
