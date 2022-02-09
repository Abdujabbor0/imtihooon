
create table Categories (
	categor_id int generated always as identity,
	categor_name character varying(30) not null unique
);

insert into Categories (categor_name) values
('Sport'),
('Texnika'),
('Kitoblar'),
('Sovgalar');


---------------------------------------------------------------------------------
create table Products (
	product_id int generated always as identity,
	product_name character varying(30) not null unique,
	categor_id int not null,
	price character varying(20) not null,
	short_desc text,
	long_desc text,
	picture character varying(100) not null,
);


insert into Products (product_name, categor_id, price, short_desc, long_desc, picture) values
('koptok', 1, '170.000', 'qwertyuioplkjhg','qwertyuioplkjhgfdsazxcvbnm', '/images/tommy.jpg'),
('tennis_raketkasi', 1, '130.000', 'qwertyuioplkjhg','qwertyuioplkjhgfdsazxcvbnm', '/images/tommy.jpg'),
('muzlatgich', 2, '400.000', 'qwertyuioplkjhg','qwertyuioplkjhgfdsazxcvbnm', '/images/carbon(7).png'),
('changyutgich', 2, '850.000', 'qwertyuioplkjhg','qwertyuioplkjhgfdsazxcvbnm', '/images/carbon(7).png'),
('oltin_meros', 3, '340.000', 'qwertyuioplkjhg','qwertyuioplkjhgfdsazxcvbnm', '/images/tommy.jpg'),
('shum_bola', 3, '250.000', 'qwertyuioplkjhg','qwertyuioplkjhgfdsazxcvbnm', '/images/tommy.jpg'),
('kopilka', 4, '90.000', 'qwertyuioplkjhg','qwertyuioplkjhgfdsazxcvbnm', '/images/Samandar.jpg'),
('vaza', 4, '120.000', 'qwertyuioplkjhg','qwertyuioplkjhgfdsazxcvbnm', '/images/Samandar.jpg');



----------------------------------------------------------------------------------------
create table Users (
	user_id int generated always as identity,
	user_name character varying(30) not null unique,
	email character varying(100) not null check (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$'),
	password character varying(256) not null,
	contact character varying(12) not null,
	role boolean default false
);


insert into users (user_name, email, password, contact, role) values
('admin', 'admin@gmail.com', crypt('admin', gen_salt('bf')), '998977372409', true),
('Abdujabbor', 'jabu@gmail.com', crypt('1111', gen_salt('bf')),'998337372409', false),
('Samandar', 'samandar@gmail.com', crypt('1234', gen_salt('bf')),'998938003004', false),
('Abdurashid', 'rashid@gmail.com', crypt('2222', gen_salt('bf')),'998993043014', false);

----------------------------------------------------
DROP TABLE Orders;

create table Orders (
	order_id int generated always as identity,
	user_id int not null,
	products varchar[],
	total_price character varying(100) not null,
	is_paid boolean
);


insert into Orders (products, total_price, is_paid,user_id) values
(Array[1,2], '300.000', true,2),
(Array[3,4], '200.000', false,3),
(Array[5,6], '590.000', false,4);


