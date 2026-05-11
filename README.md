# Brownie Points

A brownie & coffee shop website with a product menu, contact form, and newsletter signup.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML, CSS, Havascript |
| Backend | PHP 8.1 |
| Database | MySQL 8.0 |
| Server | Apache (via XAMPP) |

## Prerequisites

- [XAMPP](https://www.apachefriends.org) (includes Apache, PHP, and MySQL)

## Setup

**1. Install XAMPP** and start the **Apache** and **MySQL** modules from the XAMPP Control Panel.

**2. Copy the project folder** into `C:\xampp\htdocs\` so it looks like:

```
C:\xampp\htdocs\brownie-points\
```

**3. Configure your database credentials** in `config/config.php`:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'brownie_points');
define('DB_USER', 'root');
define('DB_PASS', '');  // XAMPP MySQL has no password by default
```

**4.** Open [http://localhost/brownie-points](http://localhost/brownie-points) in your browser.

The database and tables are created automatically on the first request. No manual setup needed.

## Troubleshooting

**Getting a 403 or rewrite errors?** Make sure `mod_rewrite` is enabled:

1. Open `C:\xampp\apache\conf\httpd.conf`
2. Find the `<Directory "C:/xampp/htdocs">` block
3. Change `AllowOverride None` to `AllowOverride All`
4. Restart Apache from the XAMPP Control Panel
