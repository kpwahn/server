CREATE DATABASE IF NOT EXISTS harry_potter;

use harry_potter;

DROP TABLE IF EXISTS user_table;
DROP TABLE IF EXISTS quiz_table;

CREATE TABLE user_table (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL
);

CREATE TABLE quiz_table (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL,
  difficulty enum("1", "2", "3", "4", "5", "6", "7", "8", "9", "10") NOT NULL,
  book enum("1", "2", "3", "4", "5", "6", "7") NOT NULL #TODO replace with actual book names
);
