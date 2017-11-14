DROP DATABASE harry_potter;

CREATE DATABASE IF NOT EXISTS harry_potter;

use harry_potter;

DROP TABLE IF EXISTS user_table;
DROP TABLE IF EXISTS quiz_table;
DROP TABLE IF EXISTS multiple_choice_question_table;
DROP TABLE IF EXISTS quiz_multiple_choice_question_table;

CREATE TABLE user_table (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL
);

insert into user_table (email, password) value ("k@k.com", "k");

CREATE TABLE quiz_table (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name varchar(255) NOT NULL,
  book enum("Harry Potter and the Sorcerer's Stone") NOT NULL
);

CREATE TABLE multiple_choice_question_table (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  question varchar(255) NOT NULL
);

CREATE TABLE quiz_multiple_choice_question_table (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  quiz_id int NOT NULL,
  multiple_choice_question_id INT NOT NULL,
  FOREIGN KEY (quiz_id) REFERENCES quiz_table(id),
  FOREIGN KEY (multiple_choice_question_id) REFERENCES multiple_choice_question_table(id)
);

insert into multiple_choice_question_table(question) values("multiple_choice_question_table");
insert into quiz_table (name, book) value ("HP and the Sorcerer's Stone", "1");
insert into quiz_multiple_choice_question_table (quiz_id, multiple_choice_question_id) values(
  (select id from quiz_table where name = "HP and the Sorcerer's Stone"),
  (select id from multiple_choice_question_table where question = "multiple_choice_question_table")
);
