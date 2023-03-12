

DROP DATABASE IF EXISTS RECIPEBOX;
CREATE DATABASE RECIPEBOX; 
USE RECIPEBOX;

DROP TABLE IF EXISTS REGISTERED_USER;
CREATE TABLE REGISTERED_USER (
	id 						varchar(255) DEFAULT(uuid()) not null,
	first_name 					varchar(255),
	last_name 					varchar(255),
	email_address 					varchar(255) 	not null unique,
	password 					varchar(255),
	primary key (id)
);

-- user passwords have been hashed. All users have password '1234'
INSERT INTO REGISTERED_USER (id, first_name, last_name, email_address, password)
VALUES
('U_0001','Bob', 'The_Guy','derekpwalz@hotmail.com', '$2a$10$zAxcyOQuH0eKdrStYwUW6uuKjXGGAhReom3WNKNCLw0RSADqj.DAq'),
('U_0002','Real', 'Person','rperson@ucalgary.ca', '$2a$10$zAxcyOQuH0eKdrStYwUW6uuKjXGGAhReom3WNKNCLw0RSADqj.DAq');


DROP TABLE IF EXISTS INGREDIENTS;
CREATE TABLE INGREDIENTS (
	ingredient_id 					varchar(255) DEFAULT(uuid()) not null,
	ingredient_name 				varchar(255) 	not null,
	primary key (ingredient_id),
    UNIQUE(ingredient_name)
);

INSERT INTO INGREDIENTS (ingredient_id, ingredient_name)
VALUES
('I_001','Olive Oil'),
('I_002','Onion (Yellow)'),
('I_003','Carrot'),
('I_004','Garlic (Clove)'),
('I_005','Cumin'),
('I_006','Curry Powder'),
('I_007','Thyme (dried)'),
('I_008','Tomatoes (diced)'),
('I_009','Lentils'),
('I_010','Vegetable Stock'),
('I_011','Water'),
('I_012','Salt'),
('I_013','Red Pepper Flakes'),
('I_014','Ground Pepper'),
('I_015','Kale'),
('I_016','Lemon Juice'),
('I_017','Butter'),
('I_018','Flour'),
('I_019','Cream (Half-and-Half)'),
('I_020','Broccoli'),
('I_021','Paprika'),
('I_022','Mustard (Powder)'),
('I_023','Cayenne Pepper'),
('I_024','Cheddar Cheese');

DROP TABLE IF EXISTS RECIPES;
CREATE TABLE RECIPES(
	user_id 					varchar(255) DEFAULT(uuid()) not null,
    recipe_id 					varchar(255) DEFAULT(uuid()) not null,
	recipe_name 				varchar(255) 	not null,
	primary key (recipe_id),
    foreign key (user_id) references REGISTERED_USER(id)
);

INSERT INTO RECIPES (user_id, recipe_id, recipe_name)
VALUES
('U_0001','R_001', 'Broccoli Cheese Soup'),
('U_0001','R_002', 'Lentil Soup');

DROP TABLE IF EXISTS RECIPE_INGREDIENTS;
CREATE TABLE RECIPE_INGREDIENTS(
	recipe_id 					varchar(255) DEFAULT(uuid()) not null,
	ingredient_id 				varchar(255) DEFAULT(uuid()) not null,
	quantity				decimal(13, 2),
	unit 					varchar(255),
	primary key (recipe_id, ingredient_id),
	foreign key (recipe_id) references RECIPES(recipe_id) ON DELETE CASCADE,
	foreign key (ingredient_id) references INGREDIENTS(ingredient_id)
);

INSERT INTO RECIPE_INGREDIENTS (recipe_id, ingredient_id, quantity, unit)
VALUES
('R_001','I_017','4','tbsp'),
('R_001','I_002','1', 'bulk'),
('R_001','I_004','1', 'bulk'),
('R_001','I_018','0.25', 'cup'),
('R_001','I_010','2', 'cup'),
('R_001','I_019','2', 'cup'),
('R_001','I_020','4', 'cup'),
('R_001','I_003','2', 'bulk'),
('R_001','I_012','0.75', 'tsp'),
('R_001','I_014','0.75', 'tsp'),
('R_001','I_021','0.5', 'tsp'),
('R_001','I_022','0.5', 'tsp'),
('R_001','I_023','1', 'pinch'),
('R_001','I_024','8', 'oz'),
('R_002','I_001','0.25', 'cup'),
('R_002','I_002','1', 'bulk'),
('R_002','I_003','2', 'large'),
('R_002','I_004','4', 'clove'),
('R_002','I_005','2', 'tsp'),
('R_002','I_006','1', 'tsp'),
('R_002','I_007','0.5', 'tsp'),
('R_002','I_008','28', 'oz'),
('R_002','I_009','1', 'cup'),
('R_002','I_010','4', 'cup'),
('R_002','I_011','2', 'cup'),
('R_002','I_012','1', 'tsp'),
('R_002','I_013','1', 'pinch'),
('R_002','I_014','1', 'pinch'),
('R_002','I_015','1', 'cup'),
('R_002','I_016','2', 'tbsp');

DROP TABLE IF EXISTS SHOPPING_LIST;
CREATE TABLE SHOPPING_LIST(
	user_id					varchar(255) DEFAULT(uuid()),
	list_id 				varchar(255) DEFAULT(uuid()) not null,
    creation_date				datetime DEFAULT(now()) not null,
	primary key (list_id),
    foreign key (user_id) references REGISTERED_USER(id)
);

INSERT INTO SHOPPING_LIST (user_id, list_id)
VALUES 
('U_0001', 1231235);

DROP TABLE IF EXISTS SHOPPING_LIST_DETAILS;
CREATE TABLE SHOPPING_LIST_DETAILS(
	list_id 				varchar(255) DEFAULT(uuid()) not null,
	ingredient_id 				varchar(255) DEFAULT(uuid()) not null,
	quantity				decimal(13, 2),
	unit 					varchar(255),
	primary key (list_id, ingredient_id),
    foreign key (list_id) references SHOPPING_LIST(list_id) ON DELETE CASCADE,
	foreign key (ingredient_id) references INGREDIENTS(ingredient_id)
);
SELECT * FROM SHOPPING_LIST;
SELECT * FROM SHOPPING_LIST_DETAILS;

SELECT * FROM REGISTERED_USER;

SELECT * FROM RECIPES;
SELECT * FROM RECIPE_INGREDIENTS;
-- DELETE FROM SHOPPING_LIST_DETAILS WHERE list_id = "3a85ee34-2ff0-481c-8c31-d5d4a3ec1f7f";
-- SELECT * FROM SHOPPING_LIST_DETAILS;