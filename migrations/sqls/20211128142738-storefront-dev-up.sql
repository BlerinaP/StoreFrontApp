CREATE TABLE users (id SERIAL PRIMARY KEY, firstname VARCHAR(30) NOT NULL, lastname VARCHAR(30) NOT NULL, password VARCHAR NOT NULL);
CREATE TABLE products (id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, price INTEGER NOT NULL);
CREATE TABLE orders (id SERIAL PRIMARY KEY, user_id INTEGER, status VARCHAR(20));
CREATE TABLE order_products (id SERIAL PRIMARY KEY, quantity integer, order_id bigint REFERENCES orders(id), product_id bigint REFERENCES products(id))