CREATE DATABASE IF NOT EXISTS tasks;

CREATE USER tasks_app IDENTIFIED WITH mysql_native_password BY 'password1';

CREATE TABLE IF NOT EXISTS tasks.tasks (
	id integer not null auto_increment, 
	name char(100) not null default '', 
	status char(20) not null default 'open', 
	constraint pk_id primary key (id)
);

INSERT INTO tasks.tasks (name) VALUES ('buy milk'), ('call mom');

GRANT ALL ON tasks.* TO tasks_app;
