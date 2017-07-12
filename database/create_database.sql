CREATE DATABASE IF NOT EXISTS express_api_boilerplate;

DROP TABLE user_table;

CREATE TABLE user_table (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL
);