CREATE DATABASE IF NOT EXISTS brownie_points CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE brownie_points;

CREATE TABLE categories (
  id   INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);

CREATE TABLE products (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT REFERENCES categories(id),
  name        VARCHAR(200) NOT NULL,
  description TEXT,
  price       DECIMAL(10,2) NOT NULL,
  image_url   VARCHAR(500),
  badge       VARCHAR(50),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contact_messages (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(200) NOT NULL,
  email      VARCHAR(200) NOT NULL,
  message    TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE newsletter_subscriptions (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  email      VARCHAR(200) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed data
INSERT INTO categories (name) VALUES ('Brownies'), ('Coffee'), ('Seasonal'), ('Vegan');

INSERT INTO products (category_id, name, description, price, image_url, badge) VALUES
(1, 'Midnight Fudge',       'Our signature triple-chocolate brownie with a decadent, gooey center.',                          4.50,  'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=480&q=80', 'Best Seller'),
(2, 'Caramel Oat Latte',    'Smooth espresso with creamy oat milk and a drizzle of house-made sea salt caramel.',             5.75,  'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=480&q=80', NULL),
(3, 'Honey Lavender',       'Soft-baked shortbread infused with local honey and organic lavender buds.',                      3.95,  'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=480&q=80', 'Seasonal'),
(1, 'Salted Pecan Blondie', 'A buttery, golden blondie packed with toasted pecans and finished with sea salt.',               4.25,  'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=480&q=80', NULL),
(2, 'Iced Mocha Swirl',     'Double shot of espresso, Belgian chocolate, and chilled milk over slow-melt ice.',               6.25,  'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=480&q=80', NULL),
(1, 'Sampler Box',          'A curated collection of our top 6 brownie flavors, packaged in a premium gift box.',             24.00, 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=480&q=80', 'Perfect Gift'),
(2, 'House Blend Beans',    'Medium roast whole beans with notes of dark chocolate and toasted hazelnut.',                    18.00, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=480&q=80', NULL),
(4, 'Almond Swirl Dark',    'Rich 70% dark chocolate brownie swirled with roasted almond butter. Dairy-free.',                4.95,  'https://images.unsplash.com/photo-1607478900766-efe13248b125?w=480&q=80', 'Vegan Friendly');
