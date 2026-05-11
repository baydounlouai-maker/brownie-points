<?php
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = rtrim($uri, '/') ?: '/';

// Serve existing files/directories as-is (static assets, PHP API files, etc.)
if ($uri !== '/' && file_exists(__DIR__ . $uri) && !is_dir(__DIR__ . $uri)) {
    return false;
}

$routes = [
    '/'            => '/frontend/pages/homepage/homepage.html',
    '/homepage'    => '/frontend/pages/homepage/homepage.html',
    '/menu'        => '/frontend/pages/menu/menu.html',
    '/contact'     => '/frontend/pages/contact/contact.html',
    '/add-product' => '/frontend/pages/add-product/add-product.html',
];

if (isset($routes[$uri])) {
    $file = __DIR__ . $routes[$uri];
    header('Content-Type: text/html');
    readfile($file);
    exit;
}

http_response_code(404);
echo '404 Not Found';
