<?php
require_once __DIR__ . '/config.php';

function db(): PDO {
    static $pdo;
    if (!$pdo) {
        $baseDsn = 'mysql:host=' . DB_HOST . ';port=' . DB_PORT . ';charset=utf8mb4';
        $init = new PDO($baseDsn, DB_USER, DB_PASS,
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
        );
        $dbExists = $init->query(
            "SELECT SCHEMA_NAME FROM information_schema.SCHEMATA WHERE SCHEMA_NAME = '" . DB_NAME . "'"
        )->fetchColumn();
        $tableExists = $dbExists && $init->query(
            "SELECT COUNT(*) FROM information_schema.TABLES WHERE TABLE_SCHEMA = '" . DB_NAME . "' AND TABLE_NAME = 'products'"
        )->fetchColumn();
        if (!$dbExists || !$tableExists) {
            $statements = array_filter(array_map('trim', explode(';', file_get_contents(__DIR__ . '/schema.sql'))));
            foreach ($statements as $stmt) {
                $init->exec($stmt);
            }
        }
        $dsn = $baseDsn . ';dbname=' . DB_NAME;
        $pdo = new PDO($dsn, DB_USER, DB_PASS,
            [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC]
        );
    }
    return $pdo;
}
