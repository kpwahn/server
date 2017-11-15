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
  question varchar(255) NOT NULL,
  quiz_id int NOT NULL,
  FOREIGN KEY (quiz_id) REFERENCES quiz_table(id)
);

insert into quiz_table (name, book) value ("Hardest quiz eva", "1");
insert into multiple_choice_question_table(question, quiz_id) values("This is some complicated question", (
  SELECT id FROM quiz_table where name = "Hardest quiz eva"
));
insert into multiple_choice_question_table(question, quiz_id) values("This is some easy", (
  SELECT id FROM quiz_table where name = "Hardest quiz eva"
));

#SELECT question FROM multiple_choice_question_table WHERE quiz_id = ( SELECT id FROM quiz_table where name = "Hardest quiz eva" );
