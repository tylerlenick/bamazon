CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(30),
    department_name VARCHAR(30),
    price DECIMAL(10,2),
    stock_quantity INT,   
    PRIMARY KEY (item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantiy)
VALUES('laptop', 'technology', 500, 2);

INSERT INTO products(product_name, department_name, price, stock_quantiy)
VALUES('smart phone', 'technology', 600, 5);

INSERT INTO products(product_name, department_name, price, stock_quantiy)
VALUES('nintendo switch', 'technology', 300, 4);

INSERT INTO products(product_name, department_name, price, stock_quantiy)
VALUES('shoes', 'clothing', 80, 7);

INSERT INTO products(product_name, department_name, price, stock_quantiy)
VALUES('polo shirt', 'clothin', 20, 11);

INSERT INTO products(product_name, department_name, price, stock_quantiy)
VALUES('frying pan', 'kitchen supplies', 25, 2);

INSERT INTO products(product_name, department_name, price, stock_quantiy)
VALUES('sunglasses', 'clothing',50 , 12);

INSERT INTO products(product_name, department_name, price, stock_quantiy)
VALUES('pillow', 'home', 30, 7);

INSERT INTO products(product_name, department_name, price, stock_quantiy)
VALUES('toothbrush', 'home', 5, 9);

INSERT INTO products(product_name, department_name, price, stock_quantiy)
VALUES('salt and pepper shaker', 'kitchen supplies', 10, 2);




CREATE TABLE departments(
    department_id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30),
    over_head_costs DECIMAL(10,2),
    PRIMARY KEY (department_id)
);

INSERT INTO departments(department_name, over_head_costs)
values('kitchen supplies', 10);

INSERT INTO departments(department_name, over_head_costs)
values('kitchen', 10);