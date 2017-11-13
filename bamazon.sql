CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT(10) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL, 
	department_name VARCHAR(30) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT(100) NOT NULL,
	PRIMARY KEY (item_id)
);

INSERT INTO products 
(product_name, department_name, price, stock_quantity)
VALUES
('PS4', 'Electronics', '399.99', 250),
('IPhone X', 'Electronics', '899.99', 750),
('Leather Couch', 'Home & Living', '599.99', 20),
('Dyson Fan', 'Home & Living', '350.00', 50),
('Dyson Vaccum', 'Home & Living', '250.00', 50),
('Sour Patch Kids', 'Food', '1.25', 1000),
('Flamin Hot Cheetos', 'Food', '1.99', 2000),
('Ultra Dishwasher', 'Kitchen', '3499.00', 5),
('Draino', 'Kitchen', '4.99', 100),
('Sprite', 'Beverages', '1.50', 500)
