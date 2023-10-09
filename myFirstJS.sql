drop database if exists myfirstjs;
create database myfirstjs;
	use myfirstjs;

create table user
(
	id_user int(5) not null auto_increment,
	email_user varchar(60) not null UNIQUE,
	username_user varchar(100) not null,
    password_user varchar(50) not null,
    primary key (id_user)
)engine=innodb;
