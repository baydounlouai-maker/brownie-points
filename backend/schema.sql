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
(1, 'Midnight Fudge',       'Our signature triple-chocolate brownie with a decadent, gooey center.',                          4.50,  'https://i.imgur.com/4GybaCI.png', 'Best Seller'),
(2, 'Caramel Oat Latte',    'Smooth espresso with creamy oat milk and a drizzle of house-made sea salt caramel.',             5.75,  'https://i.imgur.com/uoHtBrJ.png', NULL),
(3, 'Honey Lavender',       'Soft-baked cookies infused with local honey and organic lavender buds.',                         3.95,  'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=480&q=80', 'Seasonal'),
(1, 'Salted Pecan Blondie', 'A buttery, golden blondie packed with toasted pecans and finished with sea salt.',               4.25,  'https://bakerbynature.com/wp-content/uploads/2015/03/IMG_8750-2.jpg', NULL),
(2, 'Iced Mocha Swirl',     'Double shot of espresso, Belgian chocolate, and chilled milk over slow-melt ice.',               6.25,  'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=480&q=80', NULL),
(1, 'Sampler Box',          'A curated collection of our top 6 brownie flavors, packaged in a premium gift box.',             24.00, 'https://i.imgur.com/KHOLHfw.png', 'Perfect Gift'),
(2, 'House Blend Beans',    'Medium roast whole beans with notes of dark chocolate and toasted hazelnut.',                    18.00, 'https://i.imgur.com/T7dID3X.png', NULL),
(4, 'Almond Swirl Dark',    'Rich 70% dark chocolate brownie swirled with roasted almond butter. Dairy-free.',                4.95,  'https://www.ambitiouskitchen.com/wp-content/uploads/2019/09/Fudgy-Almond-Butter-Brownies-4.jpg', 'Vegan Friendly');
