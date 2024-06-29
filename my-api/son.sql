CREATE TABLE  IF NOT EXISTS customer (
  customer_id INT AUTO_INCREMENT primary key,
  name_surname varchar(150),
  order_date varchar(50),
  address varchar(255),
  phone_number varchar(20)
);

CREATE TABLE IF NOT EXISTS carpet (
    carpet_id INT AUTO_INCREMENT PRIMARY KEY,
    order_number INT NOT NULL,
    length INT NOT NULL,
    width INT NOT NULL,
    price_per_square_meter DECIMAL(10, 2),
    customer_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

CREATE TABLE IF NOT EXISTS rug (
    rug_id INT AUTO_INCREMENT PRIMARY KEY,
    length INT NOT NULL,
    width INT NOT NULL,
    price_per_square_meter DECIMAL(10, 2),
    customer_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

CREATE TABLE IF NOT EXISTS pillow (
    unit_number INT NOT NULL,
    price_per_square_meter DECIMAL(10, 2),
    customer_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

CREATE TABLE IF NOT EXISTS blanket (
    unit_number INT NOT NULL,
    price_per_square_meter DECIMAL(10, 2),
    customer_id INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id)
);

CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
/*alter table user add column adres varchar(255);*/
CREATE TABLE customercarpet (
    id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
    carpet_count INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE customerpilow (
    id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
    pilow_count INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE customerrug (
    id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
    rug_count INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE customerblanket (
    id INT AUTO_INCREMENT PRIMARY KEY,
	user_id INT NOT NULL,
    blanket_count INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE orderdetails (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    date_want varchar(50) NOT NULL,
    time varchar(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);
CREATE TABLE status (
    user_id INT NOT NULL,
    state INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);
