<?php
require_once '_bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] !== 'GET') respond(['error' => 'Method not allowed'], 405);

respond(db()->query('SELECT * FROM categories ORDER BY name')->fetchAll());
