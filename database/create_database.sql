CREATE DATABASE IF NOT EXISTS open_source_dance;

DROP TABLE user_table;
DROP TABLE video_table;
DROP TABLE user_video_table;

CREATE TABLE user_table (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL
);

CREATE TABLE video_table (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(255) NOT NULL,
    url varchar(255) NOT NULL
);

CREATE TABLE user_video_table (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id int REFERENCES user_table(id),
    video_id int REFERENCES video_table(id)
);