### Schema

CREATE DATABASE gadzconnect_db;
USE gadzconnect_db;

CREATE TABLE Users
(
	id int NOT NULL AUTO_INCREMENT,
	email varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
	description varchar (255) ,
	admin BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);
