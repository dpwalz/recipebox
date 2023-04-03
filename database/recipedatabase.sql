

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
('I_001','extra virgin olive oil'),
('I_002','onion (yellow)'),
('I_003','carrot'),
('I_004','whole garlic cloves'),
('I_005','cumin'),
('I_006','curry powder'),
('I_007','thyme dried'),
('I_008','tomatoes diced'),
('I_009','lentils'),
('I_010','vegetable stock'),
('I_011','water'),
('I_012','table salt'),
('I_013','red pepper flakes'),
('I_014','ground pepper'),
('I_015','kale'),
('I_016','lemon juice'),
('I_017','butter'),
('I_018','flour'),
('I_019','cream (half-and-half)'),
('I_020','broccoli'),
('I_021','paprika'),
('I_022','mustard powder'),
('I_023','cayenne pepper'),
('I_024','cheddar cheese');

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
	ri_id					varchar(255) DEFAULT(uuid()) not null,
	recipe_id 				varchar(255) DEFAULT(uuid()) not null,
	ingredient_id 			varchar(255) DEFAULT(uuid()) not null,
	quantity				decimal(13, 2),
	unit 					varchar(255),
	primary key (ri_id),
	foreign key (recipe_id) references RECIPES(recipe_id) ON DELETE CASCADE,
	foreign key (ingredient_id) references INGREDIENTS(ingredient_id)
);

INSERT INTO RECIPE_INGREDIENTS (ri_id, recipe_id, ingredient_id, quantity, unit)
VALUES
('RI_001', 'R_001','I_017','4','tbsps'),
('RI_002', 'R_001','I_002','1', ''),
('RI_003', 'R_001','I_004','1', ''),
('RI_004', 'R_001','I_018','0.25', 'cups'),
('RI_005', 'R_001','I_010','2', 'cups'),
('RI_006', 'R_001','I_019','2', 'cups'),
('RI_007', 'R_001','I_020','4', 'cups'),
('RI_008', 'R_001','I_003','2', ''),
('RI_009', 'R_001','I_012','0.75', 'tsps'),
('RI_010', 'R_001','I_014','0.75', 'tsps'),
('RI_011', 'R_001','I_021','0.5', 'tsps'),
('RI_012', 'R_001','I_022','0.5', 'tsps'),
('RI_013', 'R_001','I_023','1', 'pinch'),
('RI_014', 'R_001','I_024','8', 'oz'),
('RI_015', 'R_002','I_001','0.25', 'cups'),
('RI_016', 'R_002','I_002','1', ''),
('RI_017', 'R_002','I_003','2', ''),
('RI_018', 'R_002','I_004','4', ''),
('RI_019', 'R_002','I_005','2', 'tsps'),
('RI_020', 'R_002','I_006','1', 'tsps'),
('RI_021', 'R_002','I_007','0.5', 'tsps'),
('RI_022', 'R_002','I_008','28', 'oz'),
('RI_023', 'R_002','I_009','1', 'cups'),
('RI_024', 'R_002','I_010','4', 'cups'),
('RI_025', 'R_002','I_011','2', 'cups'),
('RI_026', 'R_002','I_012','1', 'tsps'),
('RI_027', 'R_002','I_013','1', 'pinch'),
('RI_028', 'R_002','I_014','1', 'pinch'),
('RI_029', 'R_002','I_015','1', 'cups'),
('RI_030', 'R_002','I_016','2', 'tbsps');

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
	sld_id					varchar(255) DEFAULT(uuid()) not null,
	list_id 				varchar(255) DEFAULT(uuid()) not null,
	ingredient_id 				varchar(255) DEFAULT(uuid()) not null,
	quantity				decimal(13, 2),
	unit 					varchar(255),
	primary key (sld_id),
    foreign key (list_id) references SHOPPING_LIST(list_id) ON DELETE CASCADE,
	foreign key (ingredient_id) references INGREDIENTS(ingredient_id)
);
SELECT * FROM SHOPPING_LIST;
SELECT * FROM SHOPPING_LIST_DETAILS;

SELECT * FROM REGISTERED_USER;

SELECT * FROM RECIPES;
SELECT * FROM RECIPE_INGREDIENTS;
SELECT * FROM INGREDIENTS;

SELECT * FROM RECIPE_INGREDIENTS WHERE recipe_id = '805b2234-ea7a-4232-a69b-79cebda50b18' AND ingredient_id = 'bf61dfa4-70a1-4bcb-9f09-5b3654be1458';
-- DELETE FROM SHOPPING_LIST_DETAILS WHERE list_id = "3a85ee34-2ff0-481c-8c31-d5d4a3ec1f7f";
-- SELECT * FROM SHOPPING_LIST_DETAILS;