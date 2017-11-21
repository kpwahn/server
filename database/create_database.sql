DROP DATABASE harry_potter;

CREATE DATABASE IF NOT EXISTS harry_potter;

use harry_potter;

DROP TABLE IF EXISTS user_table;
DROP TABLE IF EXISTS book_table;
DROP TABLE IF EXISTS quiz_table;
DROP TABLE IF EXISTS question_table;
DROP TABLE IF EXISTS choice_question_table;
DROP TABLE IF EXISTS answer_table;

CREATE TABLE user_table (
    id varchar(36) NOT NULL PRIMARY KEY,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL
);

insert into user_table values (UUID(), "k@k.com", "k");

CREATE TABLE book_table (
  id varchar(36) NOT NULL PRIMARY KEY,
  name varchar(255) NOT NULL
);

CREATE TABLE quiz_table (
  id varchar(36) NOT NULL PRIMARY KEY,
  name varchar(255) NOT NULL,
  book_id varchar(36) NOT NULL NOT NULL,
  FOREIGN KEY (book_id) REFERENCES book_table(id)
);

CREATE TABLE question_table (
  id varchar(36) NOT NULL PRIMARY KEY,
  question varchar(255) NOT NULL,
  quiz_id varchar(36) NOT NULL NOT NULL,
  FOREIGN KEY (quiz_id) REFERENCES quiz_table(id)
);

CREATE TABLE answer_table (
  id varchar(36) NOT NULL PRIMARY KEY,
  answer varchar(255) NOT NULL
);

CREATE TABLE question_answer_table (
  id varchar(36) NOT NULL PRIMARY KEY,
  question_id varchar(36) NOT NULL NOT NULL,
  answer_id varchar(36) NOT NULL NOT NULL,
  correct tinyint(1) NOT NULL,
  FOREIGN KEY(question_id) REFERENCES question_table(id),
  FOREIGN KEY(answer_id) REFERENCES answer_table(id)
);
